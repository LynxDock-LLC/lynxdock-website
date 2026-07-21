import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";

const base = "https://lynxdock.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // NOTE: this list is maintained by hand — blog posts are appended
  // automatically below, but static pages are not. When you add a route under
  // src/app, add it here too or it will never be indexed.
  const routes = [
    "",
    "/mission-control",
    "/products",
    "/products/lynxdock",
    "/products/studio",
    "/products/bootstrap",
    "/vision",
    "/download",
    "/releases",
    "/roadmap",
    "/features",
    "/architecture",
    "/genesis",
    "/design-system",
    "/docs",
    "/docs/getting-started",
    "/docs/self-hosting",
    "/docs/communities",
    "/docs/developers",
    "/docs/architecture",
    "/docs/bootstrap",
    "/docs/faq",
    "/community",
    "/compare",
    "/blog",
    "/company",
    "/support",
    "/privacy",
    "/terms",
  ].map((route) => ({
    url: `${base}${route}/`,
    lastModified: new Date(),
  }));

  const postRoutes = posts.map((post) => ({
    url: `${base}/blog/${post.slug}/`,
    lastModified: new Date(`${post.date}T00:00:00`),
  }));

  return [...routes, ...postRoutes];
}
