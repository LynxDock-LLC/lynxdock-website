// Run: node --test src/data/
// Pins that the /beta page's Authenticode copy is driven by manifest truth and can never claim
// "signed" unless the manifest says so for every available artifact.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { deriveAuthenticodeStatus, SIGNING_PUBLISHER } from "./betaSigning.mjs";

const art = (over = {}) => ({ available: true, signed: false, ...over });

test("pending manifest → unsigned caution copy", () => {
  const s = deriveAuthenticodeStatus({ authenticode: "pending", artifacts: [art(), art()] });
  assert.equal(s.signed, false);
  assert.equal(s.statusValue, "Pending");
  assert.equal(s.statusTone, "pending");
  assert.equal(s.noticeHeading, "This build is unsigned right now");
  assert.equal(s.tableAuthenticode, "pending");
});

test("signed manifest with every available artifact signed → LynxDock LLC signed copy", () => {
  const s = deriveAuthenticodeStatus({
    authenticode: "signed",
    artifacts: [art({ signed: true }), art({ signed: true }), art({ signed: true }), art({ signed: true })],
  });
  assert.equal(s.signed, true);
  assert.equal(s.statusValue, `Signed · ${SIGNING_PUBLISHER}`);
  assert.equal(s.statusTone, "ok");
  assert.equal(s.noticeHeading, `This build is signed by ${SIGNING_PUBLISHER}`);
  assert.equal(s.tableAuthenticode, "signed");
  assert.equal(SIGNING_PUBLISHER, "LynxDock LLC");
});

test("top-level 'signed' but one available artifact unsigned → NOT signed (mixed rounds never claim signed)", () => {
  const s = deriveAuthenticodeStatus({
    authenticode: "signed",
    artifacts: [art({ signed: true }), art({ signed: false })],
  });
  assert.equal(s.signed, false);
  assert.equal(s.statusValue, "Pending");
});

test("per-artifact signed:true but top-level pending → NOT signed (manifest header is authoritative too)", () => {
  const s = deriveAuthenticodeStatus({ authenticode: "pending", artifacts: [art({ signed: true })] });
  assert.equal(s.signed, false);
});

test("unavailable artifacts are ignored for the every-signed rule, but no available artifacts → NOT signed", () => {
  const mixed = deriveAuthenticodeStatus({
    authenticode: "signed",
    artifacts: [art({ signed: true }), art({ available: false, signed: false })],
  });
  assert.equal(mixed.signed, true, "an unavailable (not downloadable) artifact does not veto");
  const none = deriveAuthenticodeStatus({ authenticode: "signed", artifacts: [art({ available: false, signed: true })] });
  assert.equal(none.signed, false, "nothing downloadable ⇒ nothing to call signed");
});

test("unknown / malformed values fail safe to unsigned", () => {
  for (const m of [
    {},
    { authenticode: "valid", artifacts: [art({ signed: true })] }, // only the literal "signed" counts
    { authenticode: "SIGNED", artifacts: [art({ signed: true })] },
    { authenticode: "signed", artifacts: [art({ signed: "true" })] }, // strings are not booleans
    { authenticode: "signed", artifacts: "nope" },
    { authenticode: "signed" },
    null,
    undefined,
  ]) {
    assert.equal(deriveAuthenticodeStatus(m).signed, false, JSON.stringify(m));
  }
});

test("the committed public/beta-manifest.json derives consistently with its own fields", () => {
  const manifest = JSON.parse(readFileSync(new URL("../../public/beta-manifest.json", import.meta.url), "utf8"));
  const s = deriveAuthenticodeStatus(manifest);
  const expected =
    manifest.authenticode === "signed" &&
    manifest.artifacts.filter((a) => a.available).length > 0 &&
    manifest.artifacts.filter((a) => a.available).every((a) => a.signed === true);
  assert.equal(s.signed, expected);
  assert.equal(manifest.publicBetaOpen, false, "public beta must remain closed");
});
