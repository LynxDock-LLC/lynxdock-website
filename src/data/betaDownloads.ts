// Private-beta (trusted-tester) download metadata — typed view over the fillable
// manifest at public/beta-manifest.json.
//
// This is DELIBERATELY separate from the PUBLIC release state in `releases.ts` /
// `public/releases.json`. Public release truth stays `released: false` until a
// real RC1 promotion; this file describes an UNSIGNED, unlisted, owner-shared
// trusted-tester build and must never be linked from the primary navigation or
// the sitemap.
//
// HOW public/beta-manifest.json IS FILLED
// ---------------------------------------
// The download URLs, SHA-256 checksums, sizes, source commit, and publish time
// are produced by the beta-publish pipeline in the monorepo
// (`.github/workflows/beta-publish.yml`, or `tooling/beta/make-beta-manifest.mjs`
// run against a local build). That pipeline builds the UNSIGNED installers,
// hashes the exact bytes it uploads to the beta object origin, proves the
// anonymous download matches, and writes a replacement beta-manifest.json. The
// owner drops that one file in here and commits — no code edits.
//
// Until a build is published, artifacts stay `available: false` with empty
// url/sha256, and the /beta page renders a calm "being prepared" state rather
// than a broken link. NEVER hand-edit a sha256 or a url to a value you have not
// verified against the actual uploaded bytes.
//
// WHEN AUTHENTICODE LANDS: the pipeline sets `authenticode: "signed"` and each
// artifact's `signed: true` with the signed builds' new hashes. No redesign.
import rawJson from "../../public/beta-manifest.json";

export type BetaChannel = "trusted-tester";
export type BetaProduct = "desktop" | "host";
export type InstallerType = "nsis" | "msi";

export type BetaArtifact = {
  product: BetaProduct;
  productLabel: string;
  platform: "windows";
  arch: "x64";
  installerType: InstallerType;
  installerLabel: string;
  /** Exact installer file name produced by the bundle. */
  filename: string;
  /** Product/build version (numeric, MSI-safe). */
  version: string;
  /** Monorepo commit the bytes were built from. Filled by the pipeline. */
  sourceCommit: string;
  /** Human size, e.g. "3.2 MB". Filled by the pipeline. */
  size: string;
  /** Lowercase hex SHA-256 of the exact uploaded bytes. Filled by the pipeline. */
  sha256: string;
  /** Exact public object URL on the beta origin. Filled by the pipeline. */
  url: string;
  /** Authenticode state of THIS artifact. Unsigned for now. */
  signed: boolean;
  /** ISO-8601 publish time. Filled by the pipeline. */
  publishedAt: string;
  /** True only when url + sha256 are verified and the object is downloadable. */
  available: boolean;
};

export type BetaDownloads = {
  channel: BetaChannel;
  channelLabel: string;
  version: string;
  platformLabel: string;
  /** "pending" until the Microsoft code-signing identity is approved + signing runs. */
  authenticode: "pending" | "signed";
  /** MUST stay false — the public beta is not open. */
  publicBetaOpen: boolean;
  artifacts: BetaArtifact[];
};

export const betaDownloads = rawJson as unknown as BetaDownloads;

/** Convenience: the desktop artifacts most testers use. */
export const betaDesktopArtifacts = betaDownloads.artifacts.filter(
  (a) => a.product === "desktop",
);
/** Convenience: the Host artifacts (only for self-hosting testers). */
export const betaHostArtifacts = betaDownloads.artifacts.filter(
  (a) => a.product === "host",
);

/** True when at least one artifact has a verified, downloadable URL. */
export const betaHasDownloads = betaDownloads.artifacts.some(
  (a) => a.available && a.url !== "" && a.sha256 !== "",
);

export default betaDownloads;
