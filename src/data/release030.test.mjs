// release030.test.mjs - the current-release slot (node --test).
//
// public/beta-manifest.json is the slot the product repository's beta-publish pipeline fills. The site presents
// LynxDock 0.3.0 as the current beta only when that file is a complete, signed 0.3.0 manifest (currentRelease.mjs);
// until then it keeps the 0.1.0 record the slot has always held, and the archive reads that record's frozen copy,
// public/beta-0.1.0.json. Coordinator, 2026-11-10: the 0.3.0 installers are the keyed configuration (licence 1.1, a
// beta access key at first start); nothing under licence 1.0 has been published.
// SCOPE: synthetic manifests and source text. scripts/check-site.mjs applies the same rules to the built out/.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { classifyManifest, pacificDate, CURRENT_VERSION, PREVIOUS_VERSION, PREVIOUS_FILE, EXPECTED_ARTIFACTS } from "./currentRelease.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const read = (...p) => readFileSync(join(root, ...p), "utf8");
const lf = (s) => s.replace(/\r\n/g, "\n");
const ws = (s) => lf(s).replace(/\s+/g, " ");

// A synthetic, complete manifest in the pipeline's own shape (make-beta-manifest.mjs). Its hashes, commit and sizes are
// made up for this test and appear nowhere else.
const COMMIT = "0123456789abcdef0123456789abcdef01234567";
function complete() {
  return {
    channel: "trusted-tester",
    channelLabel: "Trusted Tester",
    version: CURRENT_VERSION,
    platformLabel: "Windows x64",
    authenticode: "signed",
    publicBetaOpen: false,
    artifacts: EXPECTED_ARTIFACTS.map((e, i) => {
      const filename = e.filenameTemplate.replaceAll("{version}", CURRENT_VERSION);
      return {
        product: e.product,
        productLabel: e.product === "desktop" ? "LynxDock" : "LynxDock Host",
        platform: "windows",
        arch: "x64",
        installerType: e.installerType,
        installerLabel: e.installerType === "msi" ? "MSI installer (.msi)" : "Windows installer (.exe)",
        filename,
        version: CURRENT_VERSION,
        sourceCommit: COMMIT,
        size: `${i + 3}.2 MB`,
        sha256: String(i).repeat(64),
        url: `https://beta-dl.lynxdock.app/beta/${CURRENT_VERSION}/${COMMIT.slice(0, 7)}/${encodeURIComponent(filename)}`,
        signed: true,
        publishedAt: "2026-11-10T05:30:00.000Z",
        available: true,
      };
    }),
  };
}

test("a complete, signed 0.3.0 manifest is the current release", () => {
  const r = classifyManifest(complete());
  assert.equal(r.state, "complete", r.problems.join("; "));
  assert.equal(r.sourceCommit, COMMIT);
  assert.equal(r.publishedAt, "2026-11-10T05:30:00.000Z");
});

test("anything short of complete is refused, with the reason", () => {
  const cases = [
    ["unsigned round", (m) => (m.authenticode = "pending"), /authenticode/],
    ["public beta flag", (m) => (m.publicBetaOpen = true), /publicBetaOpen/],
    ["an installer missing", (m) => m.artifacts.pop(), /3 artifact|found 0 time/],
    ["an installer not uploaded", (m) => (m.artifacts[1].available = false), /is not available/],
    ["an unsigned installer", (m) => (m.artifacts[2].signed = false), /is not signed/],
    ["an empty hash", (m) => (m.artifacts[0].sha256 = ""), /sha256/],
    ["an uppercase hash", (m) => (m.artifacts[0].sha256 = "A".repeat(64)), /sha256/],
    ["a URL on another host", (m) => (m.artifacts[0].url = m.artifacts[0].url.replace("beta-dl.lynxdock.app", "example.com")), /url/],
    ["a URL for another commit", (m) => (m.artifacts[3].url = m.artifacts[3].url.replace("/0123456/", "/fedcba9/")), /url/],
    ["two source commits", (m) => {
      m.artifacts[3].sourceCommit = "f".repeat(40);
      m.artifacts[3].url = m.artifacts[3].url.replace("/0123456/", "/fffffff/");
    }, /different source commits/],
    ["a duplicated installer", (m) => (m.artifacts[1] = { ...m.artifacts[0] }), /found 2 time|found 0 time/],
    ["no publish time", (m) => (m.artifacts[0].publishedAt = ""), /publishedAt/],
    ["no size", (m) => (m.artifacts[0].size = ""), /size/],
  ];
  for (const [name, mutate, expected] of cases) {
    const m = complete();
    mutate(m);
    const r = classifyManifest(m);
    assert.equal(r.state, "incomplete", `${name} must be refused`);
    assert.ok(r.problems.some((p) => expected.test(p)), `${name}: ${r.problems.join("; ")}`);
  }
  assert.equal(classifyManifest(null).state, "incomplete");
  assert.equal(classifyManifest([]).state, "incomplete");
});

test("a manifest for another version is not presented as current", () => {
  const m = complete();
  m.version = "0.1.0";
  assert.equal(classifyManifest(m).state, "other");
});

test("the slot holds either the frozen 0.3.0 record or a complete 0.3.1 manifest, nothing else", () => {
  assert.equal(CURRENT_VERSION, "0.3.1");
  assert.equal(PREVIOUS_VERSION, "0.3.0");
  const slotText = read("public", "beta-manifest.json");
  const r = classifyManifest(JSON.parse(slotText));
  assert.notEqual(r.state, "incomplete", `the slot is a half-filled manifest: ${r.problems.join("; ")}`);
  if (r.state === "other") {
    assert.equal(lf(slotText), lf(read("public", PREVIOUS_FILE)), "until 0.3.1 is in, the slot is the 0.3.0 record, unchanged");
  }
});

test("the frozen 0.3.0 record is the published beta-publish manifest, complete and signed", () => {
  // Beta-publish run 42759542278, relaying signed release run 42756852607 (9fc2af3b); live since 9 November 2026.
  const text = read("public", "beta-0.3.0.json");
  assert.equal(createHash("sha256").update(lf(text)).digest("hex").slice(0, 16), "15f9b3e3ee132af8", "the frozen file is the published manifest");
  const r = classifyManifest(JSON.parse(text), PREVIOUS_VERSION);
  assert.equal(r.state, "complete", r.problems.join("; "));
  assert.equal(r.sourceCommit, "9fc2af3b681a41590ad92ffffd24bed27af837b3");
  assert.match(read("src", "data", "release030.ts"), /import raw from "\.\.\/\.\.\/public\/beta-0\.3\.0\.json";/);
  assert.match(read("src", "data", "release031.ts"), /import raw from "\.\.\/\.\.\/public\/beta-manifest\.json";/);
});

test("the archive reads the frozen 0.1.0 record, not the slot", () => {
  const frozen = JSON.parse(read("public", "beta-0.1.0.json"));
  assert.equal(frozen.version, "0.1.0");
  assert.deepEqual(
    frozen.artifacts.map((a) => a.sha256),
    [
      "a7e307dedc3d2961680eacb1a4083eb1edb4d988403ec9965b274a8c18ec7a81",
      "9609e7d17733dcf34b4f32af71e422fb802b44d0dc1d5311f13f9daaac518a72",
      "a959bd4148b73b35d99a4f7fa3f40f3615260f3802267036c6ea48256aec6c43",
      "526411250d51feeaeca492fc7818e177066f415a5c405b986b7725a1a53fba7d",
    ],
    "the 0.1.0 hashes are the ones the archive has always shown",
  );
  const downloads = read("src", "data", "betaDownloads.ts");
  assert.match(downloads, /import rawJson from "\.\.\/\.\.\/public\/beta-0\.1\.0\.json";/);
  assert.ok(!/public\/beta-manifest\.json";/.test(downloads), "the archive no longer imports the slot");
});

test("the Pacific date is the one the notices use", () => {
  assert.equal(pacificDate("2026-11-10T05:30:00.000Z"), "2026-11-09");
  assert.equal(pacificDate("2026-11-10T09:00:00.000Z"), "2026-11-10");
});

test("every page switches on currentRelease: 0.3.0 until 0.3.1 is in, then 0.3.1 with 0.3.0 superseded", () => {
  const status = read("src", "data", "siteStatus.ts");
  const blocks = read("src", "components", "site", "ReleaseBlocks.tsx");
  const hub = lf(read("src", "app", "beta", "page.tsx")).replace(/\s+/g, " ");
  assert.match(status, /const currentRound: Round = release031\.published \? release031 : release030;/);
  assert.match(status, /export const currentReleaseRecord: ReleaseRecord \| null = release031Record \?\? release030Record;/);
  assert.match(status, /export const supersededRelease: ReleaseRecord \| null = release031Record \? release030Record : null;/);
  assert.match(
    status,
    /statement: `LynxDock \$\{currentReleaseRecord\.version\} is the current beta\. Its in-app voice test over a secure remote connection, with real listeners, is still outstanding\.`/,
  );
  assert.match(status, /: \{ published: false, heading: nextRelease\.heading, statement: nextRelease\.statement \}/);
  // 0.3.0 keeps its published text and licence 1.1, and loses its download links once superseded.
  assert.ok(ws(status).includes("`Signed Windows installers for the LynxDock app and LynxDock Host. They ship version ${betaLicenceKeyed.version} of the beta licence and ask for your beta access key.`, !release031.published,"));
  // 0.3.1: its reason, licence 1.2 and its downloads.
  assert.ok(status.includes('const REASON_031 = "A security update to 0.3.0 (bundled SQLite 3.54.1, RUSTSEC-2026-0459).";'));
  assert.ok(ws(status).includes("They ship version ${betaLicenceKeyed12.version} of the beta licence and ask for your beta access key.`, true, REASON_031,"));
  assert.match(status, /url: downloadsOnThisSite \? a\.url : undefined,/);
  for (const page of ["page.tsx", join("releases", "page.tsx")]) {
    const text = read("src", "app", page);
    assert.ok(!/s\.nextRelease\.statement/.test(text), `${page} states the release through releaseNow`);
    assert.match(text, /s\.releaseNow\.statement/);
  }
  assert.match(read("src", "app", "releases", "page.tsx"), /<ReleaseNowCard headingLevel=\{3\} idBase="releases-next" \/>/);
  assert.ok(hub.includes('<ReleaseNowCard headingLevel={3} idBase="beta-next" withDownloads />'), "the hub offers downloads only through the card");
  assert.ok(!/withDownloads/.test(read("src", "app", "releases", "page.tsx")), "downloads stay on the tester hub");
  assert.match(blocks, /r\.downloadsOnThisSite && a\.url \?/);
  assert.match(blocks, /Version \{\(r\.licence \?\? betaLicenceKeyed\)\.version\}/, "the card names the release's own licence");
  // The licence card names the current release's licence; 1.1 stays published for 0.3.0; no build shipped under 1.0.
  assert.ok(hub.includes("const currentLicence = s.currentRelease?.licence ?? betaLicenceKeyed;"));
  assert.ok(hub.includes("ships version{\" \"} {currentLicence.version} of the {currentLicence.name} ({currentLicence.id})"), "the hub names the current release's licence");
  assert.ok(hub.includes("which LynxDock {s.supersededRelease.version}{\" \"} ships, stays published unchanged: <KeyedLicenceTextLink />."));
  assert.ok(hub.includes("No build has been released with it."), "and says no build shipped under 1.0");
  assert.ok(hub.includes("Keyed beta builds, the ones that ship with version {keyedLicenceVersions} of the licence"));
  assert.match(status, /\? `\$\{betaLicenceKeyed\.version\} or \$\{betaLicenceKeyed12\.version\}`\s*: betaLicenceKeyed\.version;/);
  // The superseded 0.3.0 entry: hashes, no links, the reason.
  assert.ok(hub.includes('id="release-0-3-0"') && hub.includes("Superseded by ${s.currentRelease?.version} · identification only"));
  assert.ok(hub.includes("Its installers are no longer offered for download; their SHA-256 values stay here so an install can be identified."));
  // C R252 N1, owner choice (b): the 0.2.6 entry discloses the affected SQLite once 0.3.1 carries the fix; its links stay.
  assert.ok(
    hub.includes(
      "0.2.6 bundles the SQLite version affected by RUSTSEC-2026-0459 (CVE-2026-119375) in both the app and LynxDock Host; the exposure is local and low (a crafted database and sibling -wal file in the data folder), and ${s.currentRelease?.version} carries the fix. Move to ${s.currentRelease?.version} as soon as your community’s server has.",
    ),
    "the 0.2.6 entry discloses the affected SQLite in the 0.3.1 state",
  );
  assert.ok(!/CVSS/.test(hub), "no CVSS number on the site");
});

test("the roadmap says what 0.3.0 includes, and when it applies, before and after 0.3.1", () => {
  // Coordinator, 2026-11-10: the signed 0.3.0 build ships all three voice items (its release notes, "On the server");
  // they apply once the community's server runs 0.3.0. 0.3.1 carries them too.
  const roadmap = read("src", "app", "roadmap", "page.tsx");
  assert.ok(!/\[UNCONFIRMED/.test(roadmap), "no unconfirmed claim remains");
  assert.ok(
    roadmap.includes(
      "These are in LynxDock ${siteStatus.supersededRelease ? `${siteStatus.supersededRelease.version} and later` : current.version}, and take effect once your community’s server runs ${siteStatus.supersededRelease ? `${siteStatus.supersededRelease.version} or later` : current.version}.",
    ),
    "the voice items are stated as included, with the server condition",
  );
  assert.ok(roadmap.includes("These are in qualification, not released."), "and as not released until then");
});

test("privacy names the release that asks for the 18+ declaration (C R247 P1)", () => {
  // "After 0.2.6" was ambiguous: a desktop-v0.2.7 tag exists and shows no declaration screen.
  const privacy = read("src", "app", "privacy", "page.tsx").replace(/\s+/g, " ");
  assert.ok(
    privacy.includes("From LynxDock 0.3.0, the LynxDock app and LynxDock Host ask for this declaration when they first start, as part of accepting the terms for those builds"),
    "the 18+ sentence names 0.3.0",
  );
  assert.ok(!/after 0\.2\.6 ask/.test(privacy), "the ambiguous wording is gone");
});

test("every release claim keeps the outstanding in-app voice test explicit (owner, 2026-11-10)", () => {
  const voice = "its in-app voice test with real listeners over a secure remote connection is still outstanding";
  for (const page of ["page.tsx", join("download", "page.tsx")]) {
    assert.ok(read("src", "app", page).includes(`its installers are on the tester hub; ${voice}`), `${page}: the current-release line`);
  }
  const releases = lf(read("src", "app", "releases", "page.tsx")).replace(/\s+/g, " ");
  assert.ok(releases.includes("was published with step 3&rsquo;s hands-on voice test still outstanding for{\" \"}"), "/releases says which step is outstanding");
  assert.ok(releases.includes('`the secure remote connection ${s.supersededRelease.version} introduced` : "its new secure remote connection"}'));
  assert.ok(releases.includes(": voice signalling and TURN over TLS were verified in qualification, an in-app voice call with real listeners over that connection was not."));
  assert.match(read("scripts", "check-site.mjs"), /is the current beta\. Its in-app voice test over a secure remote connection, with real listeners, is still outstanding\.`;/);
  // C R247 P1 (voice): the /releases page description, its search-result and og:description text, says it too.
  assert.ok(
    releases.includes(
      "Where LynxDock releases stand: LynxDock ${siteStatus.currentRelease.version} is the current beta, with its in-app voice test over a secure remote connection still outstanding; earlier published beta rounds are listed by date.",
    ),
    "/releases metadata description",
  );
  assert.ok(releases.includes("standing: `Superseded by ${s.currentRelease?.version}, a security update · not offered for download`"));
});

test("licence version 1.2 is published byte for byte at its own address (C R250)", () => {
  const sha = (...p) => createHash("sha256").update(readFileSync(join(root, ...p))).digest("hex");
  assert.equal(sha("public", "legal", "LYNXDOCK-BETA-EVAL-1.2.txt"), "931a448292bd3ba6108407c5fd382f4f20081682a8a5c69592a1730fa25f3f05");
  assert.equal(readFileSync(join(root, "public", "legal", "LYNXDOCK-BETA-EVAL-1.2.txt")).length, 16921);
  const text = read("public", "legal", "LYNXDOCK-BETA-EVAL-1.2.txt");
  assert.match(text, /Licence ID: LYNXDOCK-BETA-EVAL-1\.2/);
  assert.match(text, /^Effective date: 2026-11-10$/m);
  const page = read("src", "app", "beta", "licence", "v1.2", "page.tsx");
  assert.match(page, /const FILE = betaLicenceKeyed12\.file;/);
  assert.match(page, /Licence ID: \$\{betaLicenceKeyed12\.id\}/, "the build fails if the file's licence ID is not 1.2");
  assert.match(page, /robots: \{ index: false, follow: false \}/);
  // C R252 P1: the page says what changed from version 1.1, since 0.3.0 users are asked to accept again.
  assert.ok(
    ws(page).includes(
      "Its terms are those of version 1.1. Only its scope changed, from the keyed 0.3.0 builds to the keyed 0.3.1 builds, and its references to beta communities and participants (sections 12, 13 and 17) now say 0.3.0 or 0.3.1.",
    ),
    "the v1.2 page says what changed from v1.1",
  );
  // 1.0 and 1.1 stay as approved.
  assert.equal(sha("public", "legal", "LYNXDOCK-BETA-EVAL-1.0.txt"), "ca695383376fdcc33255a9eb4ec312cc7d1398cb7e1251236c8db71e44f7d313");
  assert.equal(sha("public", "legal", "LYNXDOCK-BETA-EVAL-1.1.txt"), "13a83f87ba3317999cf30064eca782de02e60b0e5f89af4aa1e853cc27410759");
});

test("the check-site rules use the same classifier", () => {
  const check = read("scripts", "check-site.mjs");
  assert.match(check, /import \{ classifyManifest, CURRENT_VERSION, PREVIOUS_VERSION, PREVIOUS_FILE \} from "\.\.\/src\/data\/currentRelease\.mjs";/);
  assert.match(check, /if \(slot\.state === "incomplete"\) for \(const p of slot\.problems\) fail/);
  assert.match(check, /neither \$\{CURRENT_VERSION\} nor the frozen \$\{PREVIOUS_VERSION\} record/);
  assert.match(check, /does not say why \$\{CURRENT_VERSION\} replaces \$\{PREVIOUS_VERSION\}/);
  assert.match(check, /the version 1\.2 page was not built/);
});
