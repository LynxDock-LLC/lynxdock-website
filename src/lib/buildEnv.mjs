// Which kind of build this is, and the only values the browser bundle may see. Plain JavaScript so that
// next.config.mjs (which inlines the values at build time), src/lib/siteEnv.ts and the node tests share one source.
//
// Only the production branch (`main`, served at lynxdock.app) is a production build. Every other build (a branch
// preview on Cloudflare Pages, a local build) is a preview, and a preview must never send a form submission or count
// a page view in the production analytics, whatever environment variables it was given. So the form endpoint and the
// analytics token are passed to the bundle only for production; a preview bundle never contains them.
// LYNXDOCK_SITE_ENV=production|preview overrides the branch detection for a local check.

/**
 * @param {Record<string, string | undefined>} env
 * @returns {"production" | "preview"}
 */
export function resolveSiteEnv(env) {
  const explicit = env.LYNXDOCK_SITE_ENV;
  if (explicit === "production" || explicit === "preview") return explicit;
  return env.CF_PAGES_BRANCH === "main" ? "production" : "preview";
}

/**
 * The values next.config.mjs inlines into every bundle (`env`). The browser code reads these, never the
 * NEXT_PUBLIC_* variables themselves.
 * @param {Record<string, string | undefined>} env
 */
export function browserBuildValues(env) {
  const production = resolveSiteEnv(env) === "production";
  return {
    LYNXDOCK_BUILD_ENV: production ? "production" : "preview",
    LYNXDOCK_FORM_ENDPOINT: production ? (env.NEXT_PUBLIC_FORM_ENDPOINT ?? "").trim() : "",
    LYNXDOCK_CF_BEACON_TOKEN: production ? (env.NEXT_PUBLIC_CF_BEACON_TOKEN ?? "").trim() : "",
  };
}

/**
 * The hosts that serve the production site. The analytics beacon runs only on these, checked in the browser, so a
 * production build served anywhere else (localhost, a Cloudflare Pages *.pages.dev address, including a production
 * deployment's own alias) never loads it. Owner instruction 2026-10-30/31: the hostname boundary as well as the build
 * environment.
 */
export const PRODUCTION_HOSTS = ["lynxdock.app", "www.lynxdock.app"];

/**
 * @param {string | undefined | null} hostname
 * @returns {boolean}
 */
export function isProductionHost(hostname) {
  return PRODUCTION_HOSTS.includes(String(hostname ?? "").toLowerCase());
}
