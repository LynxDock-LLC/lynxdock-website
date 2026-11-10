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
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { classifyManifest, pacificDate, CURRENT_VERSION, EXPECTED_ARTIFACTS } from "./currentRelease.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const read = (...p) => readFileSync(join(root, ...p), "utf8");
const lf = (s) => s.replace(/\r\n/g, "\n");

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

test("the slot holds either the frozen 0.1.0 record or a complete 0.3.0 manifest, nothing else", () => {
  const slotText = read("public", "beta-manifest.json");
  const r = classifyManifest(JSON.parse(slotText));
  assert.notEqual(r.state, "incomplete", `the slot is a half-filled manifest: ${r.problems.join("; ")}`);
  if (r.state === "other") {
    assert.equal(lf(slotText), lf(read("public", "beta-0.1.0.json")), "until 0.3.0 is in, the slot is the 0.1.0 record, unchanged");
  }
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
  assert.match(read("src", "data", "release030.ts"), /import raw from "\.\.\/\.\.\/public\/beta-manifest\.json";/);
});

test("the Pacific date is the one the notices use", () => {
  assert.equal(pacificDate("2026-11-10T05:30:00.000Z"), "2026-11-09");
  assert.equal(pacificDate("2026-11-10T09:00:00.000Z"), "2026-11-10");
});

test("every page switches on currentRelease, and the copy says what the keyed 0.3.0 builds are", () => {
  const status = read("src", "data", "siteStatus.ts");
  const blocks = read("src", "components", "site", "ReleaseBlocks.tsx");
  const hub = lf(read("src", "app", "beta", "page.tsx")).replace(/\s+/g, " ");
  assert.match(status, /export const release030Record: ReleaseRecord \| null = release030\.published/);
  assert.match(
    status,
    /statement: `LynxDock \$\{release030Record\.version\} is the current beta\. Its in-app voice test over a secure remote connection, with real listeners, is still outstanding\.`/,
  );
  assert.match(status, /: \{ published: false, heading: nextRelease\.heading, statement: nextRelease\.statement \}/);
  assert.match(status, /ship version \$\{betaLicenceKeyed\.version\} of the beta licence and ask for your beta access key/);
  for (const page of ["page.tsx", join("releases", "page.tsx")]) {
    const text = read("src", "app", page);
    assert.ok(!/s\.nextRelease\.statement/.test(text), `${page} states the release through releaseNow`);
    assert.match(text, /s\.releaseNow\.statement/);
  }
  assert.match(read("src", "app", "releases", "page.tsx"), /<ReleaseNowCard headingLevel=\{3\} idBase="releases-next" \/>/);
  assert.ok(hub.includes('<ReleaseNowCard headingLevel={3} idBase="beta-next" withDownloads />'), "the hub offers downloads only through the card");
  assert.ok(!/withDownloads/.test(read("src", "app", "releases", "page.tsx")), "downloads stay on the tester hub");
  assert.match(blocks, /r\.downloadsOnThisSite && a\.url \?/);
  // Licence 1.1 for the next release: the published 0.3.0 is keyed, and no build shipped under 1.0.
  assert.ok(hub.includes("ships version{\" \"} {betaLicenceKeyed.version} of the {betaLicenceKeyed.name} ({betaLicenceKeyed.id})"), "the hub names licence 1.1 for 0.3.0");
  assert.ok(hub.includes("No build has been released with it."), "and says no build shipped under 1.0");
  assert.ok(!/The next release&rsquo;s app and Host are used under the \{betaLicence\.name\}/.test(hub), "the 1.0 wording for the next release is gone");
});

test("the roadmap's published state says what 0.3.0 includes, and when it applies", () => {
  // Coordinator, 2026-11-10: the signed 0.3.0 build ships all three voice items (its release notes, "On the server");
  // they apply once the community's server runs 0.3.0.
  const roadmap = read("src", "app", "roadmap", "page.tsx");
  assert.ok(!/\[UNCONFIRMED/.test(roadmap), "no unconfirmed claim remains");
  assert.ok(
    roadmap.includes("These are in LynxDock ${current.version}, and take effect once your community’s server runs ${current.version}."),
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
  assert.ok(
    releases.includes(
      "was published with step 3&rsquo;s hands-on voice test still outstanding for its new secure remote connection: voice signalling and TURN over TLS were verified in qualification, an in-app voice call with real listeners over that connection was not.",
    ),
    "/releases says which step is outstanding",
  );
  assert.match(read("scripts", "check-site.mjs"), /is the current beta\. Its in-app voice test over a secure remote connection, with real listeners, is still outstanding\.`;/);
});

test("the check-site rules use the same classifier", () => {
  const check = read("scripts", "check-site.mjs");
  assert.match(check, /import \{ classifyManifest, CURRENT_VERSION \} from "\.\.\/src\/data\/currentRelease\.mjs";/);
  assert.match(check, /if \(slot\.state === "incomplete"\) for \(const p of slot\.problems\) fail/);
  assert.match(check, /neither \$\{CURRENT_VERSION\} nor the frozen 0\.1\.0 record/);
});
