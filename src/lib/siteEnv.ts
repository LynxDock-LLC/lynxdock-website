// Which kind of build this is, resolved once at build time (the site is a static export).
//
// Cloudflare Pages sets CF_PAGES_BRANCH for every build, and only the production branch (`main`) is served at
// lynxdock.app. Every other build (branch previews, local builds) is a preview: it is not indexed and it shows
// the preview notice. LYNXDOCK_SITE_ENV=production|preview overrides the detection for a local check.
const explicit = process.env.LYNXDOCK_SITE_ENV;

export type SiteEnv = "production" | "preview";

export const siteEnv: SiteEnv =
  explicit === "production" || explicit === "preview"
    ? explicit
    : process.env.CF_PAGES_BRANCH === "main"
      ? "production"
      : "preview";

export const isPreview = siteEnv === "preview";

/** The canonical origin. Metadata always names the real domain, in previews too. */
export const siteOrigin = "https://lynxdock.app";
