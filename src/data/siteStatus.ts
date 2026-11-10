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
import release030 from "./release030";
import { SIGNING_PUBLISHER } from "./betaSigning.mjs";

export type ReleaseArtifact = {
  product: "desktop" | "host";
  label: string;
  filename: string;
  format: "exe" | "msi";
  /** Exact byte count, when the release's record has one (0.2.6). */
  sizeBytes: number | null;
  /** The manifest's own size text, for a release whose manifest records no byte count (0.3.0). */
  sizeLabel?: string;
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
 * access here, people a community invites directly, Host operators, and members who join with the older 0.2.6 app),
 * not only website applicants. Wording per licence draft r5 (2026-10-27): an AFFIRMATIVE SELF-DECLARATION, not age
 * verification. What is checked is only that the declaration was made (this site's forms and the next release's app
 * and Host will not go on without the ticked box); LynxDock does not independently verify age, and nothing asks for a
 * date of birth or proof of age. No page may imply verification or enforcement. How each route declares is in routes.
 */
export const eligibility = {
  heading: "Everyone in the beta must be 18 or older",
  statement: "Everyone in the LynxDock beta must be 18 or older.",
  scope:
    "That includes people who request access on this site, people a community invites directly, people who run a community server with LynxDock Host, and members who join with the older 0.2.6 app.",
  selfDeclaration:
    `Age is an affirmative self-declaration, not age verification: you declare that you are 18 or older. This site’s forms and ${release030.published ? `the LynxDock ${release030.version}` : "the next release’s"} app and Host check only that the declaration was made; LynxDock does not independently verify age, and nothing asks for a date of birth or proof of age.`,
  routes: {
    site: "On this site, the beta access form asks you to tick a box to declare it.",
    nextRelease: `From ${release030.published ? `LynxDock ${release030.version}` : "the next tester release"}, the installers and the LynxDock app and LynxDock Host show the beta licence, which includes this requirement, and ask you to accept it: on the installer page, and again before you sign in or start services, where you also tick the 18+ declaration. The app or Host keeps a record of your acceptance on your device only; it is not sent anywhere.`,
    olderApp:
      "The older 0.2.6 app shows no licence screen. If you will join with it, acknowledge the beta participation requirements, including this one, in the section below before a community’s administrator invites you.",
  },
  checkboxLabel: "I declare that I am 18 or older.",
  checkboxHint: "An affirmative self-declaration, not age verification. LynxDock does not independently verify age.",
  requirementsCheckboxLabel: "I have read the beta participation requirements on this page, and I acknowledge them.",
};

/**
 * The beta licence for the next release's builds. The text was finalized on the owner's decisions of 2026-11-05
 * (counsel review skipped by owner decision); this ID must match the approved text before anything ships, and
 * /beta/licence/ serves public/legal/LYNXDOCK-BETA-EVAL-1.0.txt as the document (the page links the file and shows
 * its hash), so that file must hold the approved bytes.
 * Members who join with the older 0.2.6 app do not accept this licence (sections 12 and 17); they acknowledge
 * the beta participation requirements instead (participationDocument).
 */
export const betaLicence = {
  name: "LynxDock Beta Evaluation Licence",
  id: "LYNXDOCK-BETA-EVAL-1.0",
  /** Where the licence text is published: a stable URL on this site (owner decision 2026-11-05; whether the path
   * itself carries the version is the open owner question O2, C R195). */
  textUrl: "/beta/licence/" as string | null,
};

/**
 * The document that sets the beta participation requirements older-app (0.2.6) members acknowledge (licence field
 * PARTICIPATION_DOCUMENT; owner decisions 2026-11-05: option A, self-contained, hosted on this site). The
 * acknowledgement form names this title in each submission, so it must match the published document exactly.
 */
export const participationDocument = {
  /** The document's name, as the hub and the acknowledgement form show it. */
  title: "LynxDock 0.3.0 Beta Participation Requirements, v1.0" as string | null,
  /** Where it is published: a stable URL on this site. Licence section 17 bakes this URL into every build that
   * ships it, so whether the path should carry the version is the open owner question O2 (C R195). */
  url: "/beta/participation/" as string | null,
};

/**
 * The beta licence for the KEYED beta builds (ADR-0029 decision K8b, 2026-11-06: the key clauses get their own later
 * licence version). O1: keys never ship in a build whose licence is LYNXDOCK-BETA-EVAL-1.0, so version 1.0 (betaLicence
 * above) stays exactly as published at /beta/licence/, and version 1.1 gets its own address (O2: a published URL keeps
 * serving the version the shipping licence names). /beta/licence/v1.1/ serves public/legal/LYNXDOCK-BETA-EVAL-1.1.txt,
 * which is an INTERNAL FIXTURE with no licence terms until the reviewed text replaces it byte for byte; while it is,
 * the page shows fixture markers and scripts/check-site.mjs fails a production build.
 */
export const betaLicenceKeyed = {
  name: "LynxDock Beta Evaluation Licence",
  id: "LYNXDOCK-BETA-EVAL-1.1",
  version: "1.1",
  textUrl: "/beta/licence/v1.1/",
  file: "LYNXDOCK-BETA-EVAL-1.1.txt",
};

const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/**
 * LynxDock 0.3.0, the current release, once public/beta-manifest.json holds its complete, signed manifest (release030.ts,
 * rules in currentRelease.mjs); null until then, and every page keeps the next-release wording. Every hash, size, URL and
 * commit comes from that manifest. The 0.3.0 installers are the keyed configuration (coordinator, 2026-11-10): they
 * ship version 1.1 of the beta licence and ask for a beta access key; nothing under version 1.0 has been published.
 */
export const release030Record: ReleaseRecord | null = release030.published
  ? {
      version: release030.version,
      tag: "",
      sourceCommit: release030.sourceCommit,
      date: release030.date,
      dateLabel: "Published on this site",
      publisher: SIGNING_PUBLISHER,
      signed: true,
      downloadsOnThisSite: true,
      summary: `Signed Windows installers for the LynxDock app and LynxDock Host. They ship version ${betaLicenceKeyed.version} of the beta licence and ask for your beta access key.`,
      provenance: `Source commit ${release030.sourceCommit.slice(0, 7)}`,
      artifacts: release030.artifacts.map((a) => ({
        product: a.product,
        label: `${a.productLabel} - ${a.installerLabel}`,
        filename: a.filename,
        format: a.installerType === "msi" ? ("msi" as const) : ("exe" as const),
        sizeBytes: null,
        sizeLabel: a.size,
        sha256: a.sha256.toUpperCase(),
        signed: a.signed,
        url: a.url,
      })),
    }
  : null;

/** What every page says about the release state: the current release once it is published, otherwise the next one. */
export const releaseNow = release030Record
  ? {
      published: true,
      heading: `LynxDock ${release030Record.version}`,
      // Owner, 2026-11-10: the outstanding in-app voice-media test stays explicit in every release claim. Proven in
      // qualification: voice signalling over the server's TLS proxy and TURN over TLS, on the signed bytes. Not proven:
      // an in-app voice call with real listeners over that secure remote connection (coordinator's wording).
      statement: `LynxDock ${release030Record.version} is the current beta. Its in-app voice test over a secure remote connection, with real listeners, is still outstanding.`,
    }
  : { published: false, heading: nextRelease.heading, statement: nextRelease.statement };

/**
 * Beta access keys for the keyed beta builds, as the tester hub describes them (/beta/#keys). Source: ADR-0029 in the
 * product repository (PR #35, design of record at a0837581; the betakey crate at 4f817c8c implements the key format),
 * owner decisions K1-K9 of 2026-11-06:
 * - K1a: a key lets its holder run a keyed beta build, the app and the Host alike, and nothing else. The key is entered
 *   at first start, after the licence is accepted; at EVERY start the app re-checks the stored key and the build's
 *   compiled-in list of withdrawn keys (the denylist).
 * - K2a: one key per participant. K3a: keys do not expire.
 * - K4a: a key is withdrawn through the denylist of each later build: it affects later builds, never installed copies.
 * - K5a: recovery is a replacement key from the owner; the replaced key is denylisted by default, so it stops working
 *   in later builds. A reinstall keeps the stored key; a new PC means pasting the key from the key email again.
 * - K6a: keys and invite codes coexist: the key gates the build, the invite code the community.
 * - K7a and O1: builds at or before the 0.3.0 candidate, and every build under licence 1.0, need no key; 0.2.6 members
 *   keep the acknowledgement flow unchanged.
 *   Keyed builds may carry the same 0.3.0 version (the v1.1 draft heads itself "keyed 0.3.0 beta builds"), so the
 *   site tells builds apart by licence version and key, never by version number.
 * - K9a+c: keys come directly from the owner only, to early-access applicants and directly invited members, in the
 *   owner's key email. Operators never hold or relay keys, and a key never comes with a community invitation.
 * - The check is local and offline (no new network contact), and the key holds no personal data.
 * Never call the key activation, a purchase or an entitlement (ADR-0029 section d; owner rule: LynxDock and Tactical
 * are not described as licensed, activated or sold). No keyed build is released: under ADR-0029 the app gates ship
 * only together with the revised licence version, so this content stays held until the owner releases it.
 */
export const betaAccessKeys = {
  heading: "Beta access keys for keyed builds",
  /** The first characters of every key (betakey crate, PREFIX). */
  keyPrefix: "LDBETA1-",
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
  asOf: release030Record ? release030Record.date : "2026-10-21",
  asOfLabel: release030Record ? longDate(release030Record.date) : "21 October 2026",
  stage: "Closed beta",
  audience: "Invited testers",
  platform: "Windows (x64)",
  hosting: "Community-run servers",
  generation: {
    name: "V8",
    meaning: "V8 is the current development generation, not an installer version.",
  },
  nextRelease,
  /** The release-state wording every page uses (the current release once it is published). */
  releaseNow,
  /** LynxDock 0.3.0 once its complete, signed manifest is in the slot; null until then. */
  currentRelease: release030Record,
  /** The most recent release published to testers on this site; it lives in the dated archive. */
  earlierPublished: release026Record,
  pushToTalk,
  eligibility,
  limitations,
};

export default siteStatus;

export const formatBytes = (n: number) => `${n.toLocaleString("en-US")} bytes`;
