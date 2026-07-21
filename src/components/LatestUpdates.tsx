import Link from "next/link";
import { latestPosts, formatDate, postKind } from "@/data/posts";

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
              className="group flex flex-col rounded-xl border border-line bg-graphite-800/40 p-6 transition-colors hover:border-signal-cyan/40"
            >
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#7f939b]">
                <span className="hud-label text-signal-cyan">{post.tag}</span>
                <span aria-hidden className="text-[#41525a]">|</span>
                <span>{postKind(post) === "founder" ? "Founder" : "Dev Log"}</span>
              </div>
              <h3 className="mt-3 text-base font-semibold leading-snug text-white transition-colors group-hover:text-signal-bright">
                {post.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9fb2ba]">
                {post.excerpt}
              </p>
              <span className="mt-4 text-xs text-[#6f838b]">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                {" · "}
                {post.readingTime}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
