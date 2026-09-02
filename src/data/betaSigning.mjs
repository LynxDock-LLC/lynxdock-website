// betaSigning.mjs — derive the /beta page's Authenticode presentation from MANIFEST TRUTH.
//
// Pure, dependency-free, and covered by src/data/betaSigning.test.mjs (node --test). The page
// must never claim a build is signed unless the manifest says so; the rule is deliberately
// strict: the round is "signed" only when the manifest's top-level `authenticode` is "signed"
// AND every artifact that is actually available carries `signed: true`. Anything else (pending,
// mixed, unknown values, no available artifacts) renders the existing unsigned caution copy.

/** Publisher name that Windows shows for LynxDock's Authenticode signatures. */
export const SIGNING_PUBLISHER = "LynxDock LLC";

/**
 * @param {{ authenticode?: unknown, artifacts?: Array<{ signed?: unknown, available?: unknown }> }} manifest
 * @returns {{ signed: boolean, statusValue: string, statusTone: "ok" | "pending", noticeHeading: string, tableAuthenticode: string }}
 */
export function deriveAuthenticodeStatus(manifest) {
  const artifacts = Array.isArray(manifest?.artifacts) ? manifest.artifacts : [];
  const available = artifacts.filter((a) => a && a.available === true);
  const manifestSaysSigned = manifest?.authenticode === "signed";
  const everyAvailableSigned = available.length > 0 && available.every((a) => a.signed === true);
  const signed = manifestSaysSigned && everyAvailableSigned;

  return {
    signed,
    statusValue: signed ? `Signed · ${SIGNING_PUBLISHER}` : "Pending",
    statusTone: signed ? "ok" : "pending",
    noticeHeading: signed
      ? `This build is signed by ${SIGNING_PUBLISHER}`
      : "This build is unsigned right now",
    tableAuthenticode: signed ? "signed" : "pending",
  };
}
