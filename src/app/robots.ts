import type { MetadataRoute } from "next";
import { isPreview, siteOrigin } from "@/lib/siteEnv";

export const dynamic = "force-static";

// Configured per build: production keeps the site's existing policy (crawl everything, with the sitemap);
// every preview build asks crawlers to stay out entirely.
export default function robots(): MetadataRoute.Robots {
  if (isPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
