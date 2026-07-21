"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import GlassPanel from "@/components/GlassPanel";
import { formatDate, postKind, postTopics, type Post } from "@/data/posts";

type KindFilter = "all" | "devlog" | "founder";

const KINDS: { id: KindFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "devlog", label: "Dev Log" },
  { id: "founder", label: "Founder Journal" },
];

const kindLabel = (p: Post) => (postKind(p) === "founder" ? "Founder" : "Dev Log");

function Meta({ post }: { post: Post }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#7f939b]">
      <span className="hud-label text-signal-cyan">{post.tag}</span>
      <span aria-hidden className="text-[#41525a]">|</span>
      <span>{kindLabel(post)}</span>
      <span aria-hidden className="text-[#41525a]">&middot;</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden className="text-[#41525a]">&middot;</span>
      <span>{post.readingTime}</span>
    </div>
  );
}

export default function BlogArchive({ posts }: { posts: Post[] }) {
  const [kind, setKind] = useState<KindFilter>("all");
  const [topic, setTopic] = useState<string | null>(null);

  const sorted = useMemo(
    () => [...posts].sort((a, b) => b.date.localeCompare(a.date)),
    [posts]
  );

  const topics = useMemo(() => {
    const seen = new Set<string>();
    for (const p of sorted) for (const t of postTopics(p)) seen.add(t);
    return [...seen].sort();
  }, [sorted]);

  const filtered = useMemo(
    () =>
      sorted.filter((p) => {
        if (kind !== "all" && postKind(p) !== kind) return false;
        if (topic && !postTopics(p).includes(topic)) return false;
        return true;
      }),
    [sorted, kind, topic]
  );

  const isFiltering = kind !== "all" || topic !== null;
  // Only spotlight a post on the unfiltered view - once someone is filtering,
  // a pinned hero just gets in the way of what they asked for.
  const featured = isFiltering ? null : sorted.find((p) => p.featured) ?? sorted[0];
  const grid = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
      active
        ? "border-signal-cyan/60 bg-signal-cyan/15 text-signal-bright"
        : "border-line bg-graphite-800/40 text-[#9fb2ba] hover:border-signal-cyan/40 hover:text-white"
    }`;

  return (
    <section className="mx-auto max-w-6xl px-5 py-14">
      {/* Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {KINDS.map((k) => (
            <button
              key={k.id}
              type="button"
              onClick={() => setKind(k.id)}
              aria-pressed={kind === k.id}
              className={chip(kind === k.id)}
            >
              {k.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="hud-label mr-1 text-[#5b6f77]">Topics</span>
          <button
            type="button"
            onClick={() => setTopic(null)}
            aria-pressed={topic === null}
            className={chip(topic === null)}
          >
            All
          </button>
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(topic === t ? null : t)}
              aria-pressed={topic === t}
              className={chip(topic === t)}
            >
              {t}
            </button>
          ))}
        </div>

        <p className="text-xs text-[#6f838b]" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "article" : "articles"}
          {isFiltering ? " matching" : ""}
        </p>
      </div>

      {/* Featured */}
      {featured && (
        <GlassPanel
          as="article"
          hover
          className="mt-10 p-7 sm:p-9 ring-1 ring-signal-cyan/20"
        >
          <span className="hud-label text-signal-bright">Latest</span>
          <div className="mt-3">
            <Meta post={featured} />
          </div>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            <Link
              href={`/blog/${featured.slug}/`}
              className="transition-colors hover:text-signal-bright"
            >
              {featured.title}
            </Link>
          </h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-[#9fb2ba]">
            {featured.excerpt}
          </p>
          <Link
            href={`/blog/${featured.slug}/`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-signal-bright"
          >
            Read article <span aria-hidden>&rarr;</span>
          </Link>
        </GlassPanel>
      )}

      {/* Grid */}
      {grid.length > 0 ? (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {grid.map((post) => (
            <GlassPanel
              key={post.slug}
              as="article"
              hover
              className="flex flex-col p-6"
            >
              <Meta post={post} />
              <h3 className="mt-3 text-base font-semibold leading-snug text-white">
                <Link
                  href={`/blog/${post.slug}/`}
                  className="transition-colors hover:text-signal-bright"
                >
                  {post.title}
                </Link>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9fb2ba]">
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
      ) : (
        <p className="mt-10 text-sm text-[#9fb2ba]">
          Nothing matches that combination yet.{" "}
          <button
            type="button"
            onClick={() => {
              setKind("all");
              setTopic(null);
            }}
            className="font-medium text-signal-bright underline-offset-4 hover:underline"
          >
            Clear filters
          </button>
        </p>
      )}
    </section>
  );
}
