// keyedBeta.test.mjs - the keyed-beta preparation (branch site/keyed-beta-prep, 2026-11-06) (node --test).
//
// What it pins, from ADR-0029 in the product repository (PR #35, design of record at a0837581; owner decisions K1-K9
// of 2026-11-06):
// - licence version 1.0 and the participation requirements stay byte for byte as approved on 2026-11-05, at their
//   published addresses (O1: keys never ship under version 1.0; O2: a published URL keeps serving its version);
// - version 1.1, for the keyed builds (K8b), has its own address and file, and that file is an INTERNAL FIXTURE with
//   no licence terms until the reviewed text replaces it; a fixture can never pass a production build;
// - the tester hub's access-key instructions say what the design says, and nothing reads as activation or a sale;
// - the privacy notice gets a key-records section that is a fixture until the reviewed wording arrives, and still
//   says nothing about licensing.
// SCOPE: it reads source files and the published legal files as text. scripts/check-site.mjs checks the built out/.

import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "..", "..");
const read = (...p) => readFileSync(join(root, ...p), "utf8");
const sha256 = (...p) => createHash("sha256").update(readFileSync(join(root, ...p))).digest("hex");
const ws = (s) => s.replace(/\s+/g, " ");
const noComments = (s) => s.replace(/^\s*\/\/.*$/gm, "").replace(/\{\/\*[\s\S]*?\*\/\}/g, "").replace(/\/\*\*[\s\S]*?\*\//g, "");

const status = read("src", "data", "siteStatus.ts");
const hub = read("src", "app", "beta", "page.tsx");
const hubText = ws(hub);

test("licence version 1.0 and the participation requirements stay exactly as approved", () => {
  // The SHA-256 values recorded with the owner's approval of 2026-11-05 (review-drop-1105 APPROVAL-RECORD).
  assert.equal(sha256("public", "legal", "LYNXDOCK-BETA-EVAL-1.0.txt"), "ca695383376fdcc33255a9eb4ec312cc7d1398cb7e1251236c8db71e44f7d313");
  assert.equal(sha256("public", "legal", "PARTICIPATION-REQUIREMENTS-v1.0.txt"), "22f9e7914f114919347e9066247de0f689d623a6f3b7a914050ea9269b99f9dd");
  assert.match(status, /id: "LYNXDOCK-BETA-EVAL-1\.0",/, "betaLicence keeps the version 1.0 ID");
  assert.match(status, /textUrl: "\/beta\/licence\/" as string \| null,/, "version 1.0 stays at /beta/licence/");
  const v10 = read("src", "app", "beta", "licence", "page.tsx");
  assert.match(v10, /const FILE = "LYNXDOCK-BETA-EVAL-1\.0\.txt";/, "the /beta/licence/ page serves the version 1.0 file");
});

test("licence version 1.1 has its own address and its own file", () => {
  assert.match(status, /export const betaLicenceKeyed = \{/);
  assert.match(status, /id: "LYNXDOCK-BETA-EVAL-1\.1",/);
  assert.match(status, /textUrl: "\/beta\/licence\/v1\.1\/",/);
  assert.match(status, /file: "LYNXDOCK-BETA-EVAL-1\.1\.txt",/);
  const v11 = read("src", "app", "beta", "licence", "v1.1", "page.tsx");
  assert.match(v11, /const FILE = betaLicenceKeyed\.file;/, "the version 1.1 page reads its own file");
  assert.match(v11, /robots: \{ index: false, follow: false \}/, "the version 1.1 page is unlisted");
  assert.match(v11, /Licence ID: \$\{betaLicenceKeyed\.id\}/, "the build fails if the file's licence ID is not 1.1");
  assert.ok(existsSync(join(root, "public", "legal", "LYNXDOCK-BETA-EVAL-1.1.txt")), "the version 1.1 file exists");
  assert.equal((hub.match(/<KeyedLicenceTextLink \/>/g) ?? []).length, 1, "the hub's licence card links version 1.1 once");
  assert.ok(!/\/beta\/licence/.test(read("src", "app", "sitemap.ts")), "neither licence page is in the sitemap");
});

test("the version 1.1 file is an internal fixture until the reviewed text replaces it, and no fixture reaches production", () => {
  const text = read("public", "legal", "LYNXDOCK-BETA-EVAL-1.1.txt");
  if (text.includes("INTERNAL FIXTURE")) {
    assert.equal(text.split("\n")[0], "INTERNAL FIXTURE - NOT A LICENCE - DO NOT PUBLISH", "the fixture says what it is on its first line");
    assert.ok(!/^\s*\d+\.\s+[A-Z]/m.test(text), "the fixture holds no numbered clauses: no drafted licence text");
    assert.ok(text.length < 1000, "the fixture stays a short placeholder");
  } else {
    // The reviewed text has replaced the fixture: it must carry its ID and a real effective date.
    assert.match(text, /Licence ID: LYNXDOCK-BETA-EVAL-1\.1/);
    assert.match(text, /^Effective date: (?!.*\[\[).+$/m);
  }
  const v11 = read("src", "app", "beta", "licence", "v1.1", "page.tsx");
  assert.match(v11, /const FIXTURE = text\.includes\("INTERNAL FIXTURE"\);/, "the page detects the fixture");
  assert.match(read("src", "components", "site", "Fixture.tsx"), /\[INTERNAL FIXTURE - DO NOT PUBLISH: \{children\}\]/, "a fixture renders visibly");
  const check = read("scripts", "check-site.mjs");
  assert.match(check, /readFileSync\(f, "utf8"\)\.includes\("INTERNAL FIXTURE"\)/, "check-site looks for fixtures in every file");
  assert.match(check, /fail\(where, "an INTERNAL FIXTURE is in a production build"\)/, "and fails a production build that has one");
});

test("the hub's access-key instructions follow ADR-0029", () => {
  assert.match(hub, /id="keys"/, "the hub has the access keys section");
  assert.match(hub, /\["#keys", "Access keys"\]/, "the hub's page menu links it");
  assert.match(status, /keyPrefix: "LDBETA1-",/, "the key prefix matches the betakey crate");
  for (const phrase of [
    // K9a+c: directly from the owner only, in the owner's key email; never from operators or with an invitation.
    "Your key comes only in the owner&rsquo;s key email",
    "LynxDock&rsquo;s owner emails each participant their own key, personally.",
    "Keys never come from a community&rsquo;s administrator, and never with a community invitation: administrators don&rsquo;t hold or pass on keys.",
    // K2a: per participant, Host operators included.
    "Everyone who runs a keyed build needs their own key, including people who run LynxDock Host.",
    // K1a: entry at first start, after the licence; the stored key and the build's denylist at every start.
    "The first time a keyed app or Host starts, it shows the beta licence. Accept it first.",
    "It then asks for your key.",
    "checks it every time it starts, together with the list of withdrawn keys built into that release.",
    // Offline, no personal data; K3a no expiry.
    "the check contacts no server, and the key holds no name or email address. Keys don&rsquo;t expire.",
    // K5a and K4a: a replacement from the owner; the old key stops working in later builds only.
    "ask the owner for a replacement",
    "Once you have a replacement, your old key stops working in later builds.",
    "Withdrawing a key never affects a copy that is already installed",
    // K6a: keys and invite codes coexist.
    "On a keyed build you need both.",
    // K7a and O1: earlier builds need no key; 0.2.6 members keep the acknowledgement unchanged.
    "Builds released before them need no key and work as they do now: the beta builds used under version 1.0 of the licence, and the older 0.2.6 app, whose members keep acknowledging the participation requirements",
  ]) {
    assert.ok(hubText.includes(phrase), `the hub says: ${phrase}`);
  }
  assert.match(hub, /<EnquiryForm kind="acknowledgement" \/>/, "the 0.2.6 acknowledgement form is unchanged");
});

test("nothing calls the beta access key activation, a purchase or an entitlement", () => {
  const section = noComments(hub.slice(hub.indexOf('<section id="keys"'), hub.indexOf("{/* APP OR HOST */}")));
  assert.ok(section.length > 1000, "the keys section was found");
  assert.ok(!/activat|purchas|entitle|licensed\b|\bsold\b|\bpaid\b/i.test(section), "no activation or sale wording in the keys section");
  // Keyed builds may carry the same 0.3.0 version as unkeyed ones, so no version number tells them apart.
  assert.ok(!/0\.3\.0/.test(section), "the keys section names no 0.3.0 build");
  assert.ok(!/0\.3\.0/.test(read("src", "app", "beta", "licence", "v1.1", "page.tsx")), "neither does the version 1.1 page");
  const check = read("scripts", "check-site.mjs");
  assert.match(check, /a sentence about the beta access key reads as activation or a sale/, "check-site guards every built page");
});

test("privacy: a key-records section that is a fixture until reviewed, and still nothing about licensing", () => {
  const privacy = read("src", "app", "privacy", "page.tsx");
  const section = privacy.slice(privacy.indexOf('<Section id="beta-keys"'), privacy.indexOf('<Section id="email"'));
  assert.ok(privacy.indexOf('<Section id="forms"') < privacy.indexOf('<Section id="beta-keys"'), "the section sits after the forms section");
  assert.ok(section.includes('title="Beta access key records"'), "the section exists, before the email section");
  assert.equal((section.match(/<Fixture>/g) ?? []).length, 1, "its slot is a fixture, not drafted wording");
  assert.ok(!/<p>(?!\s*<Fixture>)/.test(section), "the section holds nothing but the fixture");
  assert.match(privacy, /import Fixture from "@\/components\/site\/Fixture";/);
  assert.ok(!/licen[cs]/i.test(noComments(privacy)), "the privacy notice says nothing about licensing");
  assert.ok(
    ws(privacy).includes("Apart from the in-app record and the beta access key records described above, this notice covers the website only."),
    "the scope sentence names the key records",
  );
});
