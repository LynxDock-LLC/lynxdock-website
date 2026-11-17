// The fourth LynxDock 0.3.1 build, frozen: public/beta-0.3.1-4b3549e.json is a byte copy of the 0.3.1 manifest the slot
// held from 15 November 2026, Pacific (published 2026-11-16T02:00:56Z by beta-publish run 43789492103, relaying signed
// release run 43785634471, source 4b3549ef: the merge commit of the product repository's PR #42, merged 2026-11-16).
// Its four installers are at https://beta-dl.lynxdock.app/beta/0.3.1/4b3549e/ with these SHA-256 values, as the frozen
// manifest records them (the site reads them from the file, never from this comment):
//   LynxDock_0.3.1_x64-setup.exe       4b2556dd445855a32adcca40336eb715e8580d4e410968a6837c7fa7de0ba337
//   LynxDock_0.3.1_x64_en-US.msi       da5c06f6d26cf76c97ec400869d5fd4ad218d02c8f9af277e75db86ce99f13db
//   LynxDock Host_0.3.1_x64-setup.exe  eae02627887ac7cd5efd17f5f67c32ed2309e7fc069ad218e29d298d12045857
//   LynxDock Host_0.3.1_x64_en-US.msi  752f20691d2b8cb9208b16b5b5433f5a9ef0ee167588a268589a7dab21d8434b
//
// Members on the same network as the Host could not connect voice media: the Host configured LiveKit to advertise only
// the router's public address (use_external_ip). The fifth build adds the media-address setting (this PC's own addresses
// by default). That fifth 0.3.1 build (source: the merge commit of the product repository's PR #43) replaces this build
// in the slot with a new source commit and new hashes, at a new build address. Once the slot holds that build, the site
// links only the new one and lists this build for identification only: its SHA-256 values in the archive, no download
// links. Its files stay at their original addresses on the beta origin. While the slot still holds this build, nothing
// changes.
import raw from "../../public/beta-0.3.1-4b3549e.json";
import { CURRENT_VERSION } from "./currentRelease.mjs";
import { loadRound } from "./releaseRound";

export const release031Fourth = loadRound(raw, CURRENT_VERSION);

export default release031Fourth;
