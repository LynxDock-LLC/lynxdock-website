// production-gate.mjs - runs after `next build` (package.json "build"). In a PRODUCTION build (Cloudflare Pages on
// `main`, or LYNXDOCK_SITE_ENV=production) it runs the full production check, so a build with an unfilled [OWNER]
// field, an [UNCONFIRMED] claim or any other check failure FAILS, and Cloudflare Pages keeps the previous deployment.
// Preview and local builds skip it (run `npm run check` for those). Owner instruction 2026-10-28: do not bypass guards
// or publish placeholders.
import { spawnSync } from "node:child_process";
import { resolveSiteEnv } from "../src/lib/buildEnv.mjs";

if (resolveSiteEnv(process.env) !== "production") {
  console.log("production-gate: preview build, the production check is not required here.");
  process.exit(0);
}
console.log("production-gate: production build - running scripts/check-site.mjs --production");
const r = spawnSync(process.execPath, ["scripts/check-site.mjs", "--production"], { stdio: "inherit" });
if (r.status !== 0) {
  console.error("production-gate: the production check FAILED; this build must not be deployed.");
  process.exit(r.status || 1);
}
