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

test("tester eligibility is 18+, self-declared, and never presented as verified", () => {
  const form = readFileSync(join(src, "components", "site", "EnquiryForm.tsx"), "utf8");
  assert.ok(status.includes('statement: "Testers must be 18 or older."'), "the eligibility statement");
  assert.match(status, /LynxDock does not verify age/, "the self-declaration says age is not verified");
  assert.match(page, /s\.eligibility\.statement/, "the tester hub shows it");
  // The beta form's checkbox starts unticked and must be ticked to send; only the beta form asks for it.
  assert.match(form, /name="ageConfirmed"[\s\S]{0,80}required/, "the 18+ box is required");
  assert.ok(!/defaultChecked|checked=\{true\}|\schecked\b/.test(form), "the 18+ box is never pre-ticked");
  assert.equal((form.match(/ageDeclaration: true/g) ?? []).length, 1, "only the beta form asks for it");
  assert.match(form, /self-declared 18 or older \(not verified\)/, "what the service receives says it is not verified");
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
