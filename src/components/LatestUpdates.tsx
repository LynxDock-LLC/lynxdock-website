import Link from "next/link";
import PostCover, { CategoryChip } from "@/components/PostCover";
import { PostMeta, SeriesBadge } from "@/components/PostMeta";
import { latestPosts } from "@/data/posts";

/**
 * Homepage surface for the three newest journal entries. Server-rendered from
 * posts.ts, so it stays current with no extra wiring - publish a post and it
 * appears here on the next build.
 */
export default function LatestUpdates() {
  const items = latestPosts(3);
  if (items.length === 0) return null;

  return (
    <section className="border-t border-line/60 bg-graphite-950">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="hud-label text-signal-cyan">Notes from the build</span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Latest updates
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#9fb2ba]">
              What we built, what problem it solved, and what we learned - published
              as we go.
            </p>
          </div>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-signal-bright"
          >
            All articles <span aria-hidden>&rarr;</span>
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group flex flex-col overflow-hidden rounded-xl border border-line bg-graphite-800/40 transition-colors hover:border-signal-cyan/40"
            >
              <PostCover post={post} className="h-14 w-full" />
              <div className="flex flex-1 flex-col p-6">
                <CategoryChip post={post} />
                <SeriesBadge post={post} className="mt-3" />
                <h3 className="mt-3 text-base font-semibold leading-snug text-white transition-colors group-hover:text-signal-bright">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9fb2ba]">
                  {post.excerpt}
                </p>
                <PostMeta post={post} className="mt-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
