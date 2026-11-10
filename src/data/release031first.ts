// The first LynxDock 0.3.1 build, frozen: public/beta-0.3.1-d840ce1.json is a byte copy of the 0.3.1 manifest the slot
// held from 10 November 2026 (beta-publish run 42785194583, relaying signed release run 42779415949, source d840ce1c).
//
// That build's desktop app reported its own version as 0.3.0 (its About panel and the client version it sends the
// server). The corrected 0.3.1 build, in the owner's words (2026-11-10): "Desktop version constant corrected; installers
// rebuilt and re-signed." It replaces this build in the slot with a new source commit and new hashes, at a new build
// address. Once the slot holds that build, the site links only the new one and lists this build
// for identification only: its SHA-256 values in the archive, no download links. Its files stay at their original
// addresses on the beta origin. While the slot still holds this build, nothing changes.
import raw from "../../public/beta-0.3.1-d840ce1.json";
import { CURRENT_VERSION } from "./currentRelease.mjs";
import { loadRound } from "./releaseRound";

export const release031First = loadRound(raw, CURRENT_VERSION);

export default release031First;
