"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import PostCover, { CategoryChip } from "@/components/PostCover";
import { PostMeta, SeriesBadge } from "@/components/PostMeta";
import { postKind, postTopics, type Post } from "@/data/posts";

type KindFilter = "all" | "devlog" | "founder";

// Labels must not collide with topic names - an "Engineering" type filter sitting
// next to an "Engineering" topic chip is two different controls reading identically.
const KINDS: { id: KindFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "devlog", label: "Dev Log" },
  { id: "founder", label: "Founder Journal" },
];

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

  // Unfiltered view gets a deliberate hierarchy: one hero, two large, then a
  // dense grid. Filtering switches to a uniform grid - once someone has asked a
  // question, every result deserves equal weight.
  const featured = isFiltering ? null : sorted.find((p) => p.featured) ?? sorted[0];
  const rest = featured ? filtered.filter((p) => p.slug !== featured.slug) : filtered;
  const large = isFiltering ? [] : rest.slice(0, 2);
  const small = isFiltering ? rest : rest.slice(2);

  // Explicit focus-visible ring: the default browser outline is effectively
  // invisible on this palette, which makes the filters unusable by keyboard.
  const chip = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ` +
    `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ` +
    `focus-visible:outline-signal-bright motion-reduce:transition-none ${
      active
        ? "border-signal-cyan/60 bg-signal-cyan/15 text-signal-bright"
        : "border-line bg-graphite-800/40 text-[#9fb2ba] hover:border-signal-cyan/40 hover:text-white"
    }`;

  return (
    <section className="mx-auto max-w-6xl px-5 pb-20">
      {/* ---- Filters, kept at the top where they're findable ---- */}
      <div className="flex flex-col gap-3 border-b border-line/60 py-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="hud-label mr-1 w-14 shrink-0 text-[#5b6f77]">Type</span>
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
          <span className="hud-label mr-1 w-14 shrink-0 text-[#5b6f77]">Topics</span>
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

      {/* ---- Featured hero: magazine cover treatment ---- */}
      {featured && (
        <article className="group relative mt-10 overflow-hidden rounded-2xl border border-line bg-graphite-900/50 ring-1 ring-signal-cyan/10 transition-colors hover:border-signal-cyan/40">
          {/*
            The cover art is decoration *behind* the headline rather than a band
            above it. It fills the top of the card and fades out, so the page
            reads as a publication cover while the type stays the loudest thing
            on screen. pointer-events-none keeps it clear of the link overlay.
          */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-56 sm:h-64">
            <PostCover post={featured} variant="backdrop" className="h-full w-full" />
          </div>

          <div className="relative px-7 py-12 sm:px-12 sm:py-16 lg:py-20">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="hud-label text-signal-bright">Latest</span>
              <CategoryChip post={featured} size="md" />
            </div>
            <SeriesBadge post={featured} className="mt-4" />
            <h2 className="mt-4 max-w-4xl text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-5xl">
              <Link
                href={`/blog/${featured.slug}/`}
                className="hover:text-signal-bright focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-bright"
              >
                {featured.title}
              </Link>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#9fb2ba] sm:text-lg">
              {featured.excerpt}
            </p>
            <PostMeta post={featured} className="mt-6" />
            <Link
              href={`/blog/${featured.slug}/`}
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-lg border border-signal-cyan/50 bg-signal-cyan/10 px-5 py-2.5 text-sm font-medium text-signal-bright transition-colors hover:bg-signal-cyan/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-bright motion-reduce:transition-none"
            >
              Read article <span aria-hidden>&rarr;</span>
            </Link>
          </div>
        </article>
      )}

      {/* ---- Large tier ---- */}
      {large.length > 0 && (
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {large.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-line bg-graphite-900/40 transition-colors hover:border-signal-cyan/40"
            >
              <PostCover post={post} className="h-16 w-full" />
              <div className="flex flex-1 flex-col p-6">
                <CategoryChip post={post} />
                <SeriesBadge post={post} className="mt-3" />
                <h3 className="mt-3 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-signal-bright">
                  <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9fb2ba]">
                  {post.excerpt}
                </p>
                <PostMeta post={post} className="mt-4" />
              </div>
            </article>
          ))}
        </div>
      )}

      {/* ---- Dense tier ---- */}
      {small.length > 0 && (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {small.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col overflow-hidden rounded-xl border border-line bg-graphite-900/40 transition-colors hover:border-signal-cyan/40"
            >
              <PostCover post={post} className="h-14 w-full" />
              <div className="flex flex-1 flex-col p-5">
                <CategoryChip post={post} />
                <SeriesBadge post={post} className="mt-3" />
                <h3 className="mt-3 text-base font-semibold leading-snug text-white transition-colors group-hover:text-signal-bright">
                  <Link href={`/blog/${post.slug}/`}>{post.title}</Link>
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9fb2ba]">
                  {post.excerpt}
                </p>
                <PostMeta post={post} className="mt-4" />
              </div>
            </article>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="mt-12 text-sm text-[#9fb2ba]">
          Nothing matches that combination yet.{" "}
          <button
            type="button"
            onClick={() => {
              setKind("all");
              setTopic(null);
            }}
            className="rounded font-medium text-signal-bright underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-bright"
          >
            Clear filters
          </button>
        </p>
      )}
    </section>
  );
}
