// The LynxDock 0.3.0 round, read from its frozen manifest public/beta-0.3.0.json (rules in currentRelease.mjs).
//
// That file is a byte copy of the manifest the current-release slot (public/beta-manifest.json) held from 9 November
// 2026: the beta-publish relay (run 42759542278) of signed release run 42756852607, source 9fc2af3b. Nothing here is
// typed by hand. 0.3.0 is the current beta until the slot holds a complete, signed 0.3.1 manifest (release031.ts);
// then it is listed in the archive as superseded, with its hashes and without download links.
//
// The 0.3.0 installers are the keyed configuration (coordinator, 2026-11-10): they ship version 1.1 of the beta licence
// and ask for a beta access key at first start. Nothing under version 1.0 has been published.
import raw from "../../public/beta-0.3.0.json";
import { loadRound, type SlotArtifact } from "./releaseRound";

export type { SlotArtifact };

export const release030 = loadRound(raw, "0.3.0");

export default release030;
