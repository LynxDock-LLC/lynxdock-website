import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import { posts, formatDate } from "@/data/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Updates, announcements, and notes from the team building LynxDock.",
};

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  return (
    <>
      <PageHeader
        eyebrow="Notes from the build"
        title="Blog"
        description="Announcements, product notes, and thinking from the team building LynxDock."
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="flex flex-col gap-5">
          {sorted.map((post) => (
            <GlassPanel key={post.slug} as="article" hover className="p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#7f939b]">
                <span className="hud-label text-signal-cyan">{post.tag}</span>
                <span>{formatDate(post.date)}</span>
                <span aria-hidden>&middot;</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-3 text-xl font-semibold text-white">
                <Link
                  href={`/blog/${post.slug}/`}
                  className="transition-colors hover:text-signal-bright"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
                {post.excerpt}
              </p>
              <Link
                href={`/blog/${post.slug}/`}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-signal-bright"
              >
                Read post <span aria-hidden>&rarr;</span>
              </Link>
            </GlassPanel>
          ))}
        </div>
      </section>
    </>
  );
}
