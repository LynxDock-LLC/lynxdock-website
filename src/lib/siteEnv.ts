// Which kind of build this is, resolved once at build time (the site is a static export).
//
// Cloudflare Pages sets CF_PAGES_BRANCH for every build, and only the production branch (`main`) is served at
// lynxdock.app. Every other build (branch previews, local builds) is a preview: it is not indexed, it shows the
// preview notice, and its forms and analytics are switched off. LYNXDOCK_SITE_ENV=production|preview overrides the
// detection for a local check. The decision is made once, in src/lib/buildEnv.mjs, and next.config.mjs inlines it as
// LYNXDOCK_BUILD_ENV, so server-rendered pages and the browser bundle always agree.

export type SiteEnv = "production" | "preview";

export const siteEnv: SiteEnv = process.env.LYNXDOCK_BUILD_ENV === "production" ? "production" : "preview";

export const isPreview = siteEnv === "preview";

/** The canonical origin. Metadata always names the real domain, in previews too. */
export const siteOrigin = "https://lynxdock.app";
