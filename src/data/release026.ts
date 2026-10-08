// The 0.2.6 closed-beta round, read from public/beta-0.2.6.json.
//
// That file is generated from the FROZEN signed release manifest (signing run 37623249656, built from
// facc36a), not typed by hand: every SHA-256 and size on the page is the bytes' own. Its URLs follow the
// beta-publish key scheme (beta/<version>/<sha7>/<file>), the place the pipeline uploads the exact bytes to
// and re-downloads them from before anything links to them.
//
// 0.2.6 ships four signed installers and nothing else: the LynxDock desktop app and LynxDock Host, each as
// .exe and .msi. There is no portable ZIP and no standalone server package in this round - the server and the
// voice services are bundled inside the Host - so the page must not offer either.
import raw from "../../public/beta-0.2.6.json";

export type ReleaseDownload = {
  key: string;
  product: "desktop" | "host";
  label: string;
  note: string;
  filename: string;
  sizeBytes: number;
  sha256: string;
  signed: boolean;
  url: string;
};

export type ReleaseRound = {
  round: string;
  version: string;
  sourceCommit: string;
  tag: string;
  signingRunId: string;
  qualificationRunId: string;
  signed: boolean;
  publisher: string;
  /** True only once the four objects are uploaded and their served bytes re-verified. */
  published: boolean;
  downloads: ReleaseDownload[];
};

export const release026 = raw as unknown as ReleaseRound;
export const release026Desktop = release026.downloads.filter((d) => d.product === "desktop");
export const release026Host = release026.downloads.filter((d) => d.product === "host");

export default release026;
