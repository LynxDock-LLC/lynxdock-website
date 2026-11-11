// The second LynxDock 0.3.1 build, frozen: public/beta-0.3.1-cd0b286.json is a byte copy of the 0.3.1 manifest the slot
// held from 10 November 2026 (beta-publish run 42852045375, relaying signed release run 42847922301, source cd0b286d).
//
// That build's Report-a-bug panel (Settings → About) drew its controls as plain text: the buttons carried none of the
// app's control styling, so a Send that could not act looked the same as a live one. The corrected build (owner,
// 2026-11-11) replaces this build in the slot with a new source commit and new hashes, at a new build address. Once the
// slot holds that build, the site links only the new one and lists this build for identification only: its SHA-256
// values in the archive, no download links. Its files stay at their original addresses on the beta origin. While the
// slot still holds this build, nothing changes.
import raw from "../../public/beta-0.3.1-cd0b286.json";
import { CURRENT_VERSION } from "./currentRelease.mjs";
import { loadRound } from "./releaseRound";

export const release031Second = loadRound(raw, CURRENT_VERSION);

export default release031Second;
