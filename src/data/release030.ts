// The LynxDock 0.3.0 round, read from the current-release slot public/beta-manifest.json (rules in currentRelease.mjs).
//
// The beta-publish pipeline writes that file after it uploads the signed installers to the beta origin and re-downloads
// them; the owner's round drops it in unchanged. Nothing here is typed by hand: every hash, size, URL and commit is the
// manifest's own. Until the file is a complete, signed 0.3.0 manifest, `published` is false and no page offers a 0.3.0
// download or calls 0.3.0 the current beta.
//
// The 0.3.0 installers are the keyed configuration (coordinator, 2026-11-10): they ship version 1.1 of the beta licence
// and ask for a beta access key at first start. Nothing under version 1.0 has been published.
import raw from "../../public/beta-manifest.json";
import { classifyManifest, pacificDate, CURRENT_VERSION, EXPECTED_ARTIFACTS } from "./currentRelease.mjs";

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

const manifest = raw as unknown as { version: string; artifacts: SlotArtifact[] };
const result = classifyManifest(manifest, CURRENT_VERSION) as {
  state: "other" | "complete" | "incomplete";
  problems: string[];
  sourceCommit?: string;
  publishedAt?: string;
};

const order = (a: SlotArtifact) =>
  EXPECTED_ARTIFACTS.findIndex((e) => e.filenameTemplate.replaceAll("{version}", CURRENT_VERSION) === a.filename);

export const release030 = {
  version: CURRENT_VERSION,
  /** "other" while the slot still holds the 0.1.0 record; "complete" once the signed 0.3.0 manifest is in. */
  slotState: result.state,
  published: result.state === "complete",
  sourceCommit: result.sourceCommit ?? "",
  /** The Pacific date of the latest publishedAt in the manifest. */
  date: result.publishedAt ? pacificDate(result.publishedAt) : "",
  artifacts: result.state === "complete" ? [...manifest.artifacts].sort((a, b) => order(a) - order(b)) : [],
};

export default release030;
