// betaStanding.test.mjs — guard the /beta page's ROUND STANDING (node --test).
//
// Why this exists: on 2026-09-21 the page still headed the pre-V5 0.1.0 installer round
// "Current published build" and recommended it to "Most testers", while the qualified V5
// closed beta sat above it under "Next round". A tester who followed the page installed the
// superseded generation — the reported "the latest beta from the website doesn't work". The
// artifacts were never the problem: every published object downloaded and hashed correctly.
//
// SCOPE, stated honestly: this reads the page SOURCE and the data module as text. It proves the
// misleading headings are gone and the superseded round is labelled, and it fails if someone
// reintroduces them. It does NOT render the page, exercise Next.js, or check the live site —
// `npm run build` + the generated out/beta/index.html covers the rendered output, and the
// post-deploy download check covers what is actually served.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const page = readFileSync(join(here, "..", "app", "beta", "page.tsx"), "utf8");
const data = readFileSync(join(here, "closedBeta.ts"), "utf8");

test("the superseded installer round is never headed as the current build", () => {
  assert.ok(
    !page.includes("Current published build"),
    'the 0.1.0 installer round must not be headed "Current published build"',
  );
  assert.ok(
    !page.includes('eyebrow="Most testers"'),
    'the superseded installers must not be recommended to "Most testers"',
  );
});

test("the superseded round is labelled as superseded where a tester meets it", () => {
  assert.match(page, /signed installers \(superseded\)/, "the section heading says superseded");
  assert.match(page, /Superseded · rollback only/, "each download card says superseded");
  assert.match(page, /Superseded downloads/, "the download heading says superseded");
});

test("the V5 closed beta is presented as the current build", () => {
  assert.match(page, /Current build · V5 closed beta/, "the closed-beta card leads as the current build");
  assert.ok(
    !page.includes("Next round · V5 closed beta"),
    "the current build must not be labelled a future round",
  );
  assert.match(page, /This is the current trusted-tester build/, "the copy says so in words");
});

test("the stale installer checklist is gone", () => {
  // "Install → Launch → Connect" described the superseded installers and sat directly under
  // them. The current build ships its own checklist (closedBetaChecklist).
  assert.ok(
    !page.includes('{ title: "Install", text: "Run the installer'),
    "the generic installer checklist must not come back",
  );
  assert.match(page, /closedBetaChecklist/, "the current build's own checklist is still rendered");
});

test("closedBeta.ts records the superseding relationship", () => {
  assert.match(data, /export const supersededInstallers/, "supersededInstallers is exported");
  assert.match(data, /supersededBy: closedBetaBuild\.buildId/, "it points at the current build id");
  assert.match(data, /sourceCommit: "084bcb1"/, "it names the superseded source commit");
});

test("the page still derives its signing copy from manifest truth", () => {
  // Unchanged behaviour: only the round's standing moved, never the signed/unsigned derivation.
  assert.match(page, /betaAuthenticode\.noticeHeading/, "notice heading still comes from the manifest");
  assert.match(page, /betaAuthenticode\.statusValue/, "status value still comes from the manifest");
});
