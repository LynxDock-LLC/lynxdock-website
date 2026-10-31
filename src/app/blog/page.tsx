import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import BlogArchive from "@/components/BlogArchive";
import { draftPosts, formatDate, posts } from "@/data/posts";
import { isPreview } from "@/lib/siteEnv";

export const metadata: Metadata = {
  title: "Updates",
  description:
    "Updates from LynxDock: founder notes on where the company is going, and dev logs on what was built and what was learned.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Updates"
        title="Notes from building LynxDock."
        intro={
          <p>
            Founder updates and dev logs, newest first. Each post is dated and describes the product as it was
            then; for where things stand now, see{" "}
            <Link href="/releases/" className="text-link">
              release status
            </Link>
            .
          </p>
        }
      />

      {/* Drafts are listed (and built) only in preview builds, so reviewers can reach them. */}
      {isPreview && draftPosts.length > 0 && (
        <section aria-labelledby="drafts-title" className="wrap pt-10">
          <div className="card-notice">
            <h2 id="drafts-title" className="text-base font-bold text-[#ecd6a8]">
              Drafts in review (preview builds only)
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {draftPosts.map((p) => (
                <li key={p.slug} className="small">
                  <Link href={`/blog/${p.slug}/`} className="text-link font-semibold">
                    {p.title}
                  </Link>{" "}
                  · draft dated {formatDate(p.date)}. Not published, not in the feed and not indexed.
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <BlogArchive posts={posts} />
    </>
  );
}
