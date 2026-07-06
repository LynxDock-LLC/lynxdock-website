// Authoritative runtime release manifest.
//
// public/releases.json is the single source of truth for the CURRENT release
// and its per-platform downloads. It is owned by release-tools (which commits
// it here on a published GitHub Release); Bootstrap only seeds the initial
// placeholder. Static release *policy* (channels, history) still comes from
// GSpec via src/data/releases.ts.
import rawJson from "../../public/releases.json";

export type ManifestDownload = {
  platform: string;
  filename: string;
  url: string;
  size: string;
  sha256: string;
  available: boolean;
};

export type ReleaseManifest = {
  current: {
    version: string;
    channel: string;
    released: boolean;
    releaseDate: string | null;
    notesUrl?: string;
    githubUrl?: string;
    docsUrl?: string;
  };
  downloads: ManifestDownload[];
};

type RawCurrent = {
  version: string;
  channel: string;
  released: boolean;
  releaseDate?: string | null;
  notesUrl?: string;
  githubUrl?: string;
  docsUrl?: string;
};
type Raw = { current: RawCurrent; downloads: ManifestDownload[] };

const raw = rawJson as unknown as Raw;

export const releaseManifest: ReleaseManifest = {
  current: { ...raw.current, releaseDate: raw.current.releaseDate ?? null },
  downloads: raw.downloads,
};

export default releaseManifest;
