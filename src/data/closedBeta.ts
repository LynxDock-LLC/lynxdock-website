// V5 closed beta — the qualified desktop build that is NEXT for trusted testers.
//
// This is deliberately separate from `betaDownloads.ts` (the manifest-driven, already
// published 0.1.0 installers) and from the PUBLIC release state in `releases.ts`. It
// describes ONE frozen, qualified executable by identity (commit, build id, size,
// SHA-256) so a tester who receives the file directly from the owner can verify it —
// and it carries NO download URL until the owner has actually uploaded the package.
//
// Rules (2026-09-20):
//   * `downloadUrl` stays "" and `published` stays false until the owner publishes the
//     package and verifies the served bytes. NEVER invent a URL here.
//   * The identity fields are copied from the qualification record (monorepo
//     docs/v5/V5-CLOSURE-REPORT.md §12, D-32 FINAL). Do not hand-edit a hash to a
//     value you have not verified against the exact bytes.
//   * `residuals` are the known issues carried into the beta on purpose, in tester
//     language; keep them honest (unmeasured stays unmeasured).

export type ClosedBetaBuild = {
  /** Product / build version (numeric, unchanged from the installers). */
  productVersion: string;
  /** Build id as reported by the app's diagnostics. */
  buildId: string;
  /** Short source commit in the product monorepo. */
  sourceCommit: string;
  /** ISO date the closed-beta clearance was recorded. */
  qualifiedOn: string;
  platformLabel: string;
  /** Windows portable executable (no installer) in a ZIP. */
  packaging: string;
  /** This build is NOT Authenticode-signed. */
  signed: boolean;
  executable: { filename: string; sizeBytes: number; sha256: string };
  /** The candidate this one replaced before any upload, if any (identity only, so a tester who
   *  was handed the earlier file by mistake can tell). */
  supersedes?: { buildId: string; sha256: string; note: string };
  /** Empty until the owner has published and verified the package. */
  downloadUrl: string;
  published: boolean;
};

export const closedBetaBuild: ClosedBetaBuild = {
  productVersion: "0.1.0",
  buildId: "0.1.0+2ca6589",
  sourceCommit: "2ca6589",
  qualifiedOn: "2026-09-21",
  platformLabel: "Windows 11 x64",
  packaging: "Portable executable (ZIP) — no installer",
  signed: false,
  executable: {
    filename: "lynxdock-desktop.exe",
    sizeBytes: 15_399_936,
    sha256: "1A5CC93BFAFB25AE7D27648CC956867AAF2E78E158BCD8551055AE49C982E55E",
  },
  supersedes: {
    buildId: "0.1.0+5a53bff",
    sha256: "69617FC11C043137EF840F73C3EEED34C4896A94E695E899E54D296E321EF1AC",
    note: "Candidate 1, cleared 2026-09-20 and never distributed. Candidate 2 differs by one client-only change: the Star Citizen Wiki attribution, a source link and the CC BY-SA 4.0 licence link are shown to every member wherever catalog data appears. Its overlay, bridge and live-game qualification carries forward unchanged.",
  },
  downloadUrl: "",
  published: false,
};

/**
 * The server build that goes with the client, for whoever hosts the beta. Server product source
 * as in 5a53bff (unchanged by candidate 2's client-only commit 2ca6589), release profile, network
 * catalog provider compiled in. Identity only; no URL until
 * the owner has uploaded the server package beside the client package and verified the served bytes.
 */
export const closedBetaServer = {
  buildId: "0.1.0+5a53bff",
  sourceCommit: "5a53bff",
  executable: {
    filename: "lynxdock-server.exe",
    sizeBytes: 20_652_544,
    sha256: "B54053D64279822D25AFEF3017517132A44A1745642AD10C7474B74097228766",
  },
  packageFilename: "LynxDock-Server_V5-closed-beta.1_x64.zip",
  setupNotes: "SERVER-SETUP-AND-CATALOG.md",
  downloadUrl: "",
  published: false,
};

/** What is new in this build, in the order a tester meets it. */
export const closedBetaHighlights: { title: string; text: string }[] = [
  {
    title: "In-game overlay (Windows)",
    text: "A transparent, always-on-top overlay that is click-through while passive so the game keeps keyboard and mouse. Micro and Compact modes; a Quick Action control that fires your current primary action, a Pointer / Menu control that takes the cursor, keys 1–8 for the deck, and Escape to hand input back. Borderless or Windowed only.",
  },
  {
    title: "Verse Catalog",
    text: "A patch-aware Star Citizen reference catalog — ships, vehicles, locations, commodities, missions — with search, facets, compare, provenance and a coverage dashboard. Manual import only in this beta; the Wiki provider is present but disabled.",
  },
  {
    title: "Canonical quick actions",
    text: "Every quick action is derived on the server from canonical state, your role and the current revision. Repeats and retries are replayed, not applied twice; stale presses are refused with a clear reason.",
  },
  {
    title: "Control Surface Bridge",
    text: "One local, paired, scoped and rate-limited bridge for the overlay and future control surfaces, bound to 127.0.0.1 only. The Connected devices page shows, pauses and revokes devices.",
  },
];

/** Known issues carried into the beta — the things we are asking testers to watch. */
export const closedBetaResiduals: { title: string; text: string }[] = [
  {
    title: "Brief overlay re-activation after a window vanishes (unmeasured key loss)",
    text: "If the window under the overlay closes while the overlay is handing the cursor back, Windows may make the passive overlay the foreground window for a moment; a watchdog yields within 0.2–1.8 s and the overlay stays click-through. Whether a key pressed inside that moment reaches the game is unmeasured — we do not claim it is not lost. A swallowed key right after closing a window over the game is exactly the report we want.",
  },
  {
    title: "Exclusive fullscreen is not supported",
    text: "Windows draws nothing over exclusive fullscreen. Run the game Borderless or Windowed.",
  },
  {
    title: "Two overlay diagnostics lines are misleading",
    text: "After Escape the diagnostics show the no-op second pass rather than the real restore, and the ‘restore settled’ timing always reads settled on Windows. Behaviour is correct; only the diagnostics text is off.",
  },
  {
    title: "Unsigned, portable, Windows 11 only",
    text: "Expect the SmartScreen prompt; verify the SHA-256 before running. No auto-update (builds are a manual file swap). Windows 10 is untested; no macOS or Linux.",
  },
];

/** Test checklist additions specific to this build. */
export const closedBetaChecklist: { title: string; text: string }[] = [
  { title: "Verify the file", text: "Get-FileHash lynxdock-desktop.exe -Algorithm SHA256 must match the value below before you run it." },
  { title: "Overlay setup", text: "Settings → Game overlay: Show the overlay, pick the game's monitor, set a Quick Action and/or Pointer / Menu control (both start unassigned), choose Micro or Compact, use Move overlay to place it." },
  { title: "Overlay in the game", text: "Star Citizen in Borderless: confirm the game keeps input while the overlay is passive, fire a quick action, take the cursor and click the deck, press Escape and confirm the game has input again." },
  { title: "Verse Catalog", text: "Open Verse Catalog, search and filter, open compare, and use a catalog picker from a hangar / logistics / mission surface." },
  { title: "Quick actions", text: "Press the same action twice and after a reconnect; confirm it is not applied twice and that a stale press is refused with a reason." },
  { title: "Connected devices", text: "Check the bridge state, pause and revoke the overlay device, re-enable it." },
];

export default closedBetaBuild;
