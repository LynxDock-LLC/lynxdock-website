// The current-release slot: public/beta-manifest.json, exactly as the product repository's beta-publish pipeline writes
// it (tooling/beta/make-beta-manifest.mjs, workflow .github/workflows/beta-publish.yml). The site presents LynxDock
// 0.3.0 as published only when that file is a complete, signed manifest for 0.3.0; until then every page keeps the
// next-release wording and offers no 0.3.0 download.
//
// Until the 0.3.0 manifest replaces it, the slot still holds the pipeline's earlier 0.1.0 manifest, unchanged: it is
// served at /beta-manifest.json, which the product repository's install scripts read. That file is NOT a current
// release. The site's archive reads its frozen copy, public/beta-0.1.0.json, so the slot can change without touching
// the archive.
//
// Plain JavaScript with no dependencies, so the pages (through release030.ts), the node tests and
// scripts/check-site.mjs all apply the same rules.

export const CURRENT_VERSION = "0.3.0";
export const DOWNLOAD_ORIGIN = "https://beta-dl.lynxdock.app";

/** The four installers a beta-publish round carries (the product repository's tooling/beta/beta-artifacts.json). */
export const EXPECTED_ARTIFACTS = [
  { product: "desktop", installerType: "nsis", filenameTemplate: "LynxDock_{version}_x64-setup.exe" },
  { product: "desktop", installerType: "msi", filenameTemplate: "LynxDock_{version}_x64_en-US.msi" },
  { product: "host", installerType: "nsis", filenameTemplate: "LynxDock Host_{version}_x64-setup.exe" },
  { product: "host", installerType: "msi", filenameTemplate: "LynxDock Host_{version}_x64_en-US.msi" },
];

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Classifies a manifest against one version:
 * - "other": a manifest for another version (today, the 0.1.0 record). Nothing is presented as current.
 * - "complete": every check below passes. The site presents the release as published, with its downloads.
 * - "incomplete": a manifest for this version that fails a check (unsigned, a missing or unavailable installer, a
 *   malformed hash or URL...). scripts/check-site.mjs fails the build, so it can never go out half-filled.
 */
export function classifyManifest(manifest, version = CURRENT_VERSION) {
  if (!manifest || typeof manifest !== "object" || Array.isArray(manifest)) {
    return { state: "incomplete", problems: ["the manifest is not a JSON object"] };
  }
  if (manifest.version !== version) return { state: "other", problems: [] };
  const problems = [];
  if (manifest.channel !== "trusted-tester") problems.push(`channel is ${JSON.stringify(manifest.channel)}, not "trusted-tester"`);
  if (manifest.authenticode !== "signed") problems.push(`authenticode is ${JSON.stringify(manifest.authenticode)}, not "signed"`);
  if (manifest.publicBetaOpen !== false) problems.push("publicBetaOpen is not false");
  const artifacts = Array.isArray(manifest.artifacts) ? manifest.artifacts : [];
  if (artifacts.length !== EXPECTED_ARTIFACTS.length) {
    problems.push(`${artifacts.length} artifact(s), expected exactly ${EXPECTED_ARTIFACTS.length}`);
  }
  const commits = new Set();
  const times = [];
  for (const e of EXPECTED_ARTIFACTS) {
    const filename = e.filenameTemplate.replaceAll("{version}", version);
    const found = artifacts.filter((a) => a && a.filename === filename);
    if (found.length !== 1) {
      problems.push(`${filename}: found ${found.length} time(s), expected once`);
      continue;
    }
    const a = found[0];
    const bad = (msg) => problems.push(`${filename}: ${msg}`);
    if (a.product !== e.product || a.installerType !== e.installerType) bad(`is not the ${e.product} ${e.installerType} installer`);
    if (a.version !== version) bad(`version is ${JSON.stringify(a.version)}`);
    if (a.available !== true) bad("is not available");
    if (a.signed !== true) bad("is not signed");
    if (!/^[0-9a-f]{64}$/.test(a.sha256 ?? "")) bad("sha256 is not 64 lowercase hex characters");
    if (!/^[0-9a-f]{40}$/.test(a.sourceCommit ?? "")) {
      bad("sourceCommit is not a full commit hash");
    } else {
      commits.add(a.sourceCommit);
      const urlRe = new RegExp(
        `^${escapeRe(DOWNLOAD_ORIGIN)}/[a-z0-9][a-z0-9-]*/${escapeRe(version)}/${a.sourceCommit.slice(0, 7)}/${escapeRe(encodeURIComponent(filename))}$`,
      );
      if (!urlRe.test(a.url ?? "")) bad(`url is not ${DOWNLOAD_ORIGIN}/<prefix>/${version}/<commit7>/<file>`);
    }
    if (!/^\d+(\.\d)? (B|KB|MB|GB)$/.test(a.size ?? "")) bad("size is missing or malformed");
    const t = Date.parse(a.publishedAt ?? "");
    if (!/^\d{4}-\d{2}-\d{2}T/.test(a.publishedAt ?? "") || Number.isNaN(t)) bad("publishedAt is not an ISO time");
    else times.push(a.publishedAt);
  }
  if (commits.size > 1) problems.push(`the installers name ${commits.size} different source commits`);
  if (problems.length) return { state: "incomplete", problems };
  const [sourceCommit] = commits;
  return { state: "complete", problems: [], sourceCommit, publishedAt: times.sort()[times.length - 1] };
}

/** The Pacific calendar date (YYYY-MM-DD) of an ISO time: the date the site's notices use. */
export function pacificDate(iso) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(iso));
  const get = (type) => parts.find((p) => p.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}`;
}
