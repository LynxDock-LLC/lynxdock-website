// The V6 candidate round, read from public/v6-candidate.json.
//
// WHY A MANIFEST AND NOT LITERALS: the previous rounds put each build's
// identity (hash, size, build id) straight into this folder by hand, once per
// candidate. That is how a page ends up describing bytes nobody served. The
// build job emits manifest.json beside the artifacts it produced and
// AAA-make-candidate-json.mjs maps it into public/v6-candidate.json, so
// publishing a new candidate is a data change, never a code edit — and the
// numbers on the page came from the bytes themselves.
//
// `published` stays false until the objects are uploaded AND their served bytes
// re-verified against these hashes. While it is false the page shows the
// identities and says the round is being prepared, rather than offering links
// that 404.
import raw from "../../public/v6-candidate.json";

export type CandidateDownload = {
  /** portable | nsis | msi | server | checksums */
  key: string;
  label: string;
  /** One line telling a tester which one they want. */
  note: string;
  filename: string;
  sizeBytes: number;
  sha256: string;
  signed: boolean;
  url: string;
};

export type CandidateBuild = {
  candidate: string;
  version: string;
  buildId: string;
  sourceCommit: string;
  builtAt: string;
  runId: string;
  /** True only when every executable in the round is Authenticode-valid. */
  signed: boolean;
  publisher: string;
  /** True only after upload + served-bytes verification. */
  published: boolean;
  downloads: CandidateDownload[];
  /** The executables inside the packages, so a tester can check what runs. */
  inner: { filename: string; sizeBytes: number; sha256: string; signed: boolean }[];
};

export const v6Candidate = raw as unknown as CandidateBuild;

/** The one a tester should take first. */
export const v6Primary: CandidateDownload | undefined =
  v6Candidate.downloads.find((d) => d.key === "nsis") ?? v6Candidate.downloads[0];

/** Everything else, in the order a tester meets it. */
export const v6Secondary: CandidateDownload[] = v6Candidate.downloads.filter((d) => d !== v6Primary);

export default v6Candidate;
