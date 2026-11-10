// One beta-publish round, read from a manifest in the pipeline's own shape (rules in currentRelease.mjs). Shared by
// release030.ts (0.3.0, frozen) and release031.ts (0.3.1, the slot). Nothing is typed by hand: every hash, size, URL and
// commit is the manifest's own.
import { classifyManifest, pacificDate, EXPECTED_ARTIFACTS } from "./currentRelease.mjs";

export type SlotArtifact = {
  product: "desktop" | "host";
  productLabel: string;
  installerType: "nsis" | "msi";
  installerLabel: string;
  filename: string;
  version: string;
  sourceCommit: string;
  size: string;
  sha256: string;
  url: string;
  signed: boolean;
  publishedAt: string;
  available: boolean;
};

export type Round = {
  version: string;
  /** "complete" when the manifest is a complete, signed manifest for this version; "other" for another version. */
  slotState: "other" | "complete" | "incomplete";
  published: boolean;
  sourceCommit: string;
  /** The Pacific date of the latest publishedAt in the manifest. */
  date: string;
  artifacts: SlotArtifact[];
};

export function loadRound(raw: unknown, version: string): Round {
  const manifest = raw as { version: string; artifacts: SlotArtifact[] };
  const result = classifyManifest(manifest, version) as {
    state: "other" | "complete" | "incomplete";
    problems: string[];
    sourceCommit?: string;
    publishedAt?: string;
  };
  const order = (a: SlotArtifact) =>
    EXPECTED_ARTIFACTS.findIndex((e) => e.filenameTemplate.replaceAll("{version}", version) === a.filename);
  return {
    version,
    slotState: result.state,
    published: result.state === "complete",
    sourceCommit: result.sourceCommit ?? "",
    date: result.publishedAt ? pacificDate(result.publishedAt) : "",
    artifacts: result.state === "complete" ? [...manifest.artifacts].sort((a, b) => order(a) - order(b)) : [],
  };
}
