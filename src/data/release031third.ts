// The third LynxDock 0.3.1 build, frozen: public/beta-0.3.1-bc50a6a.json is a byte copy of the 0.3.1 manifest the slot
// held from 10 November 2026 (beta-publish run 42976774906, relaying signed release run 42973856280, source bc50a6a1).
//
// That build's Host could not create a certificate in its secure-sharing setup, and its start refusal gave no way
// forward. The fourth 0.3.1 build (source: the merge commit of the product repository's PR #42,
// fix/host-secure-sharing-onboarding) adds the Host's guided "Who can connect?" setup with Host-made certificates and
// each device's trust steps, with lifecycle and diagnostic fixes; installers rebuilt and re-signed. It replaces this
// build in the slot with a new source commit and new hashes, at a new build address. Once the slot holds that build,
// the site links only the new one and lists this build for identification only: its SHA-256 values in the archive, no
// download links. Its files stay at their original addresses on the beta origin. While the slot still holds this
// build, nothing changes.
import raw from "../../public/beta-0.3.1-bc50a6a.json";
import { CURRENT_VERSION } from "./currentRelease.mjs";
import { loadRound } from "./releaseRound";

export const release031Third = loadRound(raw, CURRENT_VERSION);

export default release031Third;
