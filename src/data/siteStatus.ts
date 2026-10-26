// The site's one content-status source: beta stage, the next release's state, the published releases kept in the
// archive, push-to-talk scope and known limitations. Every page that mentions any of these reads it from here, so
// the pages cannot disagree with each other.
//
// Hand-maintained (not generated from GSpec). Rules, set by the owner on 2026-10-21:
// - The current state is the next tester release, worded exactly as `nextRelease.statement`.
// - Only releases that were actually published to testers appear on the site, in a dated archive. A release that
//   was signed but never published is not mentioned, and neither are its hashes or remaining acceptance steps:
//   those belong in the internal release records in the product repository.
// - 0.2.6 comes from public/beta-0.2.6.json, generated from its frozen signed release manifest (signing run
//   37623249656). NEVER type a version, signing state, SHA-256 or download URL here that its record does not show.
//   A release only gets download links once its bytes are uploaded and the served bytes re-verified.
import release026, { type ReleaseDownload } from "./release026";

export type ReleaseArtifact = {
  product: "desktop" | "host";
  label: string;
  filename: string;
  format: "exe" | "msi";
  sizeBytes: number;
  sha256: string;
  signed: boolean;
  /** Set only when the object is published and re-verified. */
  url?: string;
};

export type ReleaseRecord = {
  version: string;
  tag: string;
  sourceCommit: string;
  /** ISO date of the event the label names. */
  date: string;
  dateLabel: string;
  publisher: string;
  signed: boolean;
  /** True only when every artifact below is downloadable from this site. */
  downloadsOnThisSite: boolean;
  summary: string;
  provenance: string;
  artifacts: ReleaseArtifact[];
};

const fromManifest = (d: ReleaseDownload): ReleaseArtifact => ({
  product: d.product,
  label: d.label,
  filename: d.filename,
  format: d.filename.endsWith(".msi") ? "msi" : "exe",
  sizeBytes: d.sizeBytes,
  sha256: d.sha256,
  signed: d.signed,
  url: release026.published ? d.url : undefined,
});

/** LynxDock 0.2.6: an earlier release, still published, kept in the dated archive with its verified links. */
export const release026Record: ReleaseRecord = {
  version: release026.version,
  tag: release026.tag,
  sourceCommit: release026.sourceCommit,
  date: "2026-10-07",
  dateLabel: "Published on this site",
  publisher: release026.publisher,
  signed: release026.signed,
  downloadsOnThisSite: release026.published,
  summary:
    "Signed Windows installers for the LynxDock app and LynxDock Host. The Host includes the community server and sets up the voice services.",
  provenance: `Signing run ${release026.signingRunId} · clean-machine qualification run ${release026.qualificationRunId}`,
  artifacts: release026.downloads.map(fromManifest),
};

export type NextRelease = {
  heading: string;
  /** The owner's wording for the current state. Use it verbatim. */
  statement: string;
  provisionalVersion: string;
  approved: boolean;
  installerState: "unavailable";
};

/** The next tester release. Nothing about it is approved until its own record says so. */
export const nextRelease: NextRelease = {
  heading: "Next release in qualification",
  statement: "The next tester release is in qualification and is not yet available for distribution.",
  provisionalVersion: "0.3.0",
  approved: false,
  installerState: "unavailable",
};

export const pushToTalk = {
  heading: "Push-to-talk is foreground-only",
  statement:
    "Push-to-talk is foreground-only. The LynxDock window must have focus. Switching away releases a held press. After refocusing, release the key and press it again. Background PTT is separate development work.",
  /** Shown with the statement. */
  qualifier: "This describes how push-to-talk is intended to behave in the current release line.",
};

/**
 * Beta eligibility. Owner decision 2026-10-26: "18 or older" applies to EVERYONE in the beta (people who request
 * access here, people a community invites directly, and Host operators), not only website applicants. It is an
 * eligibility POLICY confirmed by SELF-DECLARATION: LynxDock asks people to confirm it and does not verify age.
 * Nothing in the website, apps, installers or community servers checks it, so no page may imply verification or
 * enforcement. How each route is asked to confirm is in `routes` (the next release's app and Host ask on first start,
 * per the release coordinator; the older 0.2.6 app has no such screen, so its users confirm on the tester hub).
 */
export const eligibility = {
  heading: "Everyone in the beta must be 18 or older",
  statement: "Everyone in the LynxDock beta must be 18 or older.",
  scope:
    "That includes people who request access on this site, people a community invites directly, and people who run a community server with LynxDock Host.",
  selfDeclaration:
    "Age is self-declared: LynxDock asks you to confirm that you are 18 or older and does not verify age. Nothing in the apps, the installers or community servers checks it.",
  routes: {
    site: "On this site, the beta access form asks you to tick a box to confirm it.",
    nextRelease:
      "From the next tester release, the installers and the LynxDock app and LynxDock Host show the beta licence, which includes this requirement, and ask you to accept it: on the installer page and again before you sign in or start services.",
    olderApp:
      "The older 0.2.6 app shows no licence screen. If you will use it, read the beta requirements on the tester hub and accept them there before you join your community.",
  },
  checkboxLabel: "I confirm I am 18 or older.",
  checkboxHint: "A self-declaration. LynxDock does not verify age.",
  termsCheckboxLabel: "I have read the beta requirements and the beta licence on this page, and I accept the licence.",
};

export type Limitation = { title: string; text: string };

/** Known limitations every visitor and tester should see. Pages render all of them in body text. */
export const limitations: Limitation[] = [
  { title: pushToTalk.heading, text: `${pushToTalk.statement} ${pushToTalk.qualifier}` },
  {
    title: eligibility.heading,
    text: `${eligibility.statement} ${eligibility.scope} ${eligibility.selfDeclaration}`,
  },
  {
    title: "Windows only",
    text: "The desktop app and LynxDock Host are Windows (x64) builds. There are no macOS, Linux or mobile builds.",
  },
  {
    title: "A closed beta, by invitation",
    text: "Testers join a community server through an invitation from whoever runs it. There is no public sign-up and no hosted LynxDock service.",
  },
  {
    title: "Your community runs the server",
    text: "Voice, screen sharing and records run on infrastructure the community controls. LynxDock Host helps the administrator, who stays responsible for running it.",
  },
  {
    title: "Plans and reports, not game telemetry",
    text: "Players supply operational information. LynxDock does not move game inventory or verify that an objective was completed.",
  },
  {
    title: "The overlay needs windowed or borderless",
    text: "The in-game overlay is a separate click-through window. It cannot appear over a game in exclusive fullscreen, and compatibility depends on the build and the game's display mode.",
  },
];

export const siteStatus = {
  asOf: "2026-10-21",
  asOfLabel: "21 October 2026",
  stage: "Closed beta",
  audience: "Invited testers",
  platform: "Windows (x64)",
  hosting: "Community-run servers",
  generation: {
    name: "V8",
    meaning: "V8 is the current development generation, not an installer version.",
  },
  nextRelease,
  /** The most recent release published to testers on this site; it lives in the dated archive. */
  earlierPublished: release026Record,
  pushToTalk,
  eligibility,
  limitations,
};

export default siteStatus;

export const formatBytes = (n: number) => `${n.toLocaleString("en-US")} bytes`;
