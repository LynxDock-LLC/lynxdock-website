import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";

const base = "https://lynxdock.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/products",
    "/products/lynxdock",
    "/products/studio",
    "/products/bootstrap",
    "/roadmap",
    "/docs",
    "/docs/getting-started",
    "/docs/self-hosting",
    "/docs/communities",
    "/docs/bootstrap",
    "/docs/faq",
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
