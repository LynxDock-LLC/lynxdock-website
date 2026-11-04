// betaStanding.test.mjs — guard the /beta page's ROUND STANDING (node --test).
//
// Why this exists: on 2026-09-21 the page still headed the pre-V5 0.1.0 installer round
// "Current published build" and recommended it to "Most testers", while the qualified V5
// closed beta sat above it under "Next round". A tester who followed the page installed the
// superseded generation — the reported "the latest beta from the website doesn't work". The
// artifacts were never the problem: every published object downloaded and hashed correctly.
//
// October 2026 (owner decision, 2026-10-21): the current state is the next tester release, worded
// exactly "The next tester release is in qualification and is not yet available for distribution.",
// with no installer. Releases that were published to testers stay in a clearly dated archive; only
// 0.2.6 keeps its verified links there. A release that was never published is not mentioned at all.
//
// SCOPE, stated honestly: this reads the page SOURCE and the data modules as text. It does NOT
// render the page; scripts/check-site.mjs checks the built out/ (exactly four download links, all on
// the published 0.2.6 round, the exact statement present, no unpublished release named), and the
// post-deploy download check covers what is actually served.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "..");
const page = readFileSync(join(src, "app", "beta", "page.tsx"), "utf8");
const blocks = readFileSync(join(src, "components", "site", "ReleaseBlocks.tsx"), "utf8");
const status = readFileSync(join(here, "siteStatus.ts"), "utf8");
const data = readFileSync(join(here, "closedBeta.ts"), "utf8");

const STATEMENT = "The next tester release is in qualification and is not yet available for distribution.";

function sources(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return sources(p);
    return /\.(tsx?|json)$/.test(f) ? [p] : [];
  });
}

test("the superseded installer round is never headed as the current build", () => {
  assert.ok(
    !page.includes("Current published build"),
    'the 0.1.0 installer round must not be headed "Current published build"',
  );
  assert.ok(
    !page.includes('eyebrow="Most testers"'),
    'the superseded installers must not be recommended to "Most testers"',
  );
  assert.ok(!/Current build · V5 closed beta/.test(page), "the V5 round must not be headed as the current build");
});

test("the current state is the next release, in the owner's exact words, with no installer", () => {
  assert.ok(status.includes(`statement: "${STATEMENT}"`), "siteStatus carries the exact statement");
  assert.match(blocks, /\{n\.statement\}/, "the next-release card renders it");
  assert.match(status, /approved: false/);
  assert.match(status, /installerState: "unavailable"/);
  assert.match(blocks, /Installer unavailable/);
  assert.ok(!/data-beta-round="current"/.test(page), "no release is presented as the current download");
  assert.match(page, /data-beta-round="next"/, "the status section is marked as the next release");
});

test("published releases live in a dated archive; only 0.2.6 keeps links", () => {
  assert.match(page, /round="archive-published"/, "0.2.6 is an archive entry");
  assert.match(page, /<time dateTime=\{date\}/, "archive entries are dated");
  assert.equal((page.match(/round="archive-published"/g) ?? []).length, 1, "one archived release keeps links");
  assert.match(
    blocks,
    /r\.downloadsOnThisSite && a\.url \?/,
    "ReleaseArtifacts links an installer only when its release is published here",
  );
  assert.match(status, /downloadsOnThisSite: release026\.published/, "0.2.6 follows its manifest's published flag");
});

test("only published releases (and the provisional next number) are named in the site source", () => {
  // An allow-list, so this file never has to name an unpublished build to keep it off the site.
  const allowedVersions = new Set(["0.2.6", "0.3.0"]);
  const allowedTags = new Set(["desktop-v0.2.6"]);
  for (const file of sources(src)) {
    const text = readFileSync(file, "utf8");
    for (const v of text.match(/\b0\.[23]\.\d+\b/g) ?? []) {
      assert.ok(allowedVersions.has(v), `${file} names release ${v}, which is not a published release`);
    }
    for (const t of text.match(/desktop-v\d+\.\d+\.\d+/g) ?? []) {
      assert.ok(allowedTags.has(t), `${file} names tag ${t}, which is not a published release`);
    }
  }
});

test("the push-to-talk scope is stated in the approved wording", () => {
  assert.ok(
    status.includes(
      "Push-to-talk is foreground-only. The LynxDock window must have focus. Switching away releases a held press. After refocusing, release the key and press it again. Background PTT is separate development work.",
    ),
  );
});

test("beta eligibility is 18+ for everyone, an affirmative self-declaration, and never presented as verified", () => {
  const form = readFileSync(join(src, "components", "site", "EnquiryForm.tsx"), "utf8");
  // Owner decision 2026-10-26: everyone in the beta, not only people who apply on the site. Licence draft r5
  // (2026-10-27): an affirmative self-declaration, not age verification; only the making of the declaration is checked.
  assert.ok(status.includes('statement: "Everyone in the LynxDock beta must be 18 or older."'), "the eligibility statement");
  assert.match(
    status,
    /people a community invites directly, people who run a community server with LynxDock Host, and members who join with the older 0\.2\.6 app/,
    "the scope",
  );
  assert.ok(!/Testers must be 18/.test(status + page + form), "no applicant-only wording remains");
  assert.match(status, /Age is an affirmative self-declaration, not age verification/, "an affirmative self-declaration");
  assert.match(status, /check only that the declaration was made; LynxDock does not independently verify age/, "what is checked");
  assert.match(status, /nothing asks for a date of birth or proof of age/, "no date of birth or proof of age");
  assert.ok(!/Nothing in the apps, the installers or community servers checks it/.test(status), "the r2 wording is gone");
  assert.ok(!/nobody could verify/i.test(status + page + form), "no 'nobody could verify' wording");
  assert.match(page, /s\.eligibility\.statement/, "the tester hub shows it");
  assert.match(page, /id="requirements"/, "the hub has the beta requirements section operators can send people to");
  assert.match(page, /<EnquiryForm kind="acknowledgement" \/>/, "older-app members can acknowledge the requirements on the hub");
  // Both boxes start unticked and must be ticked to send; only the two intake forms ask.
  assert.match(form, /name="ageConfirmed"[\s\S]{0,80}required/, "the 18+ box is required");
  assert.match(form, /name="requirementsAcknowledged"[\s\S]{0,80}required/, "the requirements box is required");
  assert.ok(!/defaultChecked|checked=\{true\}|\schecked\b/.test(form), "no box is ever pre-ticked");
  assert.equal((form.match(/ageDeclaration: true/g) ?? []).length, 2, "only beta access and the acknowledgement ask");
  assert.match(form, /affirmative self-declaration: 18 or older \(not independently verified\)/, "the service is told it is not verified");
  assert.ok(!/betaLicence/.test(form), "the older-app acknowledgement does not accept the licence");
  // Validation messages only appear after interaction, so the build guard cannot see them; pin them here.
  for (const key of ["ageConfirmed", "requirementsAcknowledged"]) {
    const message = (form.match(new RegExp(`next\\.${key} =\\s*"([^"]+)"`)) ?? [])[1] ?? "";
    assert.ok(message.length > 0, `the ${key} validation message exists`);
    assert.ok(!/verif|enforc|prove|proof|licen/i.test(message), `the ${key} message implies no verification and no licence`);
  }
});

test("older-app (0.2.6) members acknowledge the participation requirements; privacy matches what is sent", () => {
  const privacy = readFileSync(join(src, "app", "privacy", "page.tsx"), "utf8").replace(/\s+/g, " ");
  assert.match(page, /id="confirm"/, "the hub has the older-app acknowledgement");
  for (const step of ["Who:", "When:", "Read:", "Acknowledge:", "Then:"]) {
    assert.ok(page.includes(step + "</span>"), "the hub states " + step);
  }
  assert.ok(page.includes("wait until they tell you they have acknowledged the"), "operators wait for the member");
  assert.ok(page.includes("does not license, replace or change the terms of"), "the 0.2.6 app's own terms are left alone");
  assert.equal((page.match(/<ParticipationDocumentLink \/>/g) ?? []).length, 2, "the participation document is on the card and in the steps");
  assert.equal((page.match(/<LicenceTextLink \/>/g) ?? []).length, 1, "the licence link is for the next release only");
  assert.ok(!/betaLicence/.test(privacy), "privacy does not name the licence or its ID");
  assert.ok(privacy.includes("never sent to LynxDock or to any server"), "privacy describes the device-only in-app record");
  assert.ok(privacy.includes("by default Google&rsquo;s public STUN server"), "privacy discloses the apps' default STUN server");
});

test("delivery and routing claims are not made without evidence", () => {
  const form = readFileSync(join(src, "components", "site", "EnquiryForm.tsx"), "utf8");
  // A success state shows only that the form service answered with 2xx; it is not evidence of delivery.
  for (const claim of [
    /was delivered/,
    /delivered to the LynxDock team/,
    /team will reply/,
    /goes to the LynxDock team/,
    /shares the details above with the LynxDock team/,
  ]) {
    assert.ok(!claim.test(form) && !claim.test(page), `no unevidenced claim: ${claim}`);
  }
  assert.match(form, /The form service accepted your message\./, "success says only what the 2xx shows");
  // Where an acknowledgement ends up is now evidenced: a technical test of the exact acknowledgement payload produced a
  // stored entry in the form service's inbox and the matching notification in the monitored mailbox (2026-10-31).
  assert.match(
    page,
    /your acknowledgement reaches the LynxDock team through the site&rsquo;s form service\./,
    "the hub states the evidenced route, and nothing more",
  );
});

test("the stale installer checklist is gone", () => {
  // "Install → Launch → Connect" described the superseded installers and sat directly under them.
  assert.ok(
    !page.includes('{ title: "Install", text: "Run the installer'),
    "the generic installer checklist must not come back",
  );
});

test("closedBeta.ts records the superseding relationship", () => {
  assert.match(data, /export const supersededInstallers/, "supersededInstallers is exported");
  assert.match(data, /supersededBy: closedBetaBuild\.buildId/, "it points at the current build id");
  assert.match(data, /sourceCommit: "084bcb1"/, "it names the superseded source commit");
});

test("the page still derives its signing copy from manifest truth", () => {
  // The 0.1.0 archive entry's Authenticode line comes from the manifest, never a literal.
  assert.match(page, /betaAuthenticode\.statusValue/, "status value still comes from the manifest");
});
