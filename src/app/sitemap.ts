import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { siteOrigin } from "@/lib/siteEnv";

export const dynamic = "force-static";

// Maintained by hand: blog posts are appended below, static pages are not. Listed: the indexable pages of the
// redesign plus the engineering background pages. Not listed: /beta/ (the unlisted tester hub), drafts, and the
// moved-page fallbacks (public/_redirects answers those URLs).
const routes = [
  "",
  "/products/lynxdock",
  "/products/lynxdock-host",
  "/technology",
  "/company",
  "/download",
  "/blog",
  "/docs",
  "/docs/getting-started",
  "/roadmap",
  "/releases",
  "/support",
  "/privacy",
  "/terms",
  "/guides/operations",
  "/docs/architecture",
  "/docs/developers",
  "/docs/bootstrap",
  "/products/studio",
  "/products/bootstrap",
  "/genesis",
  "/design-system",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = routes.map((route) => ({ url: `${siteOrigin}${route}/` }));
  const postRoutes = posts.map((post) => ({
    url: `${siteOrigin}/blog/${post.slug}/`,
    lastModified: new Date(`${post.date}T00:00:00Z`),
  }));
  return [...pages, ...postRoutes];
}
