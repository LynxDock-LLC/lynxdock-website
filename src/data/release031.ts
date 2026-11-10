// The LynxDock 0.3.1 round, read from the current-release slot public/beta-manifest.json (rules in currentRelease.mjs).
//
// 0.3.1 is a security update to 0.3.0: it bundles SQLite 3.54.1 for RUSTSEC-2026-0459 and ships version 1.2 of the beta
// licence (owner, 2026-11-10). The beta-publish pipeline writes the slot after it uploads the signed installers to the
// beta origin and re-downloads them; the owner's round drops it in unchanged. Until the slot is a complete, signed 0.3.1
// manifest, `published` is false and every page keeps presenting 0.3.0 (release030.ts) exactly as published.
import raw from "../../public/beta-manifest.json";
import { CURRENT_VERSION } from "./currentRelease.mjs";
import { loadRound } from "./releaseRound";

export const release031 = loadRound(raw, CURRENT_VERSION);

export default release031;
