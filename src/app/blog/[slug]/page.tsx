import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, formatDate, relatedPosts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(slug);

  return (
    <article className="mx-auto max-w-3xl px-5 pb-20 pt-16 sm:pt-20">
      <Link
        href="/blog/"
        className="inline-flex items-center gap-1.5 text-sm text-[#9fb2ba] transition-colors hover:text-signal-bright"
      >
        <span aria-hidden>&larr;</span> All posts
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-[#7f939b]">
        <span className="hud-label text-signal-cyan">{post.tag}</span>
        <span>{formatDate(post.date)}</span>
        <span aria-hidden>&middot;</span>
        <span>{post.readingTime}</span>
      </div>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {post.title}
      </h1>

      <div className="mt-8 flex flex-col gap-5">
        {post.body.map((para, i) => (
          <p key={i} className="text-[16px] leading-relaxed text-[#b7c5cb]">
            {para}
          </p>
        ))}
      </div>

      {related.length > 0 && (
        <section className="mt-14 border-t border-line/60 pt-8">
          <h2 className="hud-label text-[#8da3ad]">Related reading</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/blog/${r.slug}/`}
                className="group flex flex-col rounded-lg border border-line bg-graphite-800/40 p-4 transition-colors hover:border-signal-cyan/40"
              >
                <span className="hud-label text-signal-cyan">{r.tag}</span>
                <span className="mt-2 text-sm font-medium leading-snug text-white transition-colors group-hover:text-signal-bright">
                  {r.title}
                </span>
                <span className="mt-2 text-xs text-[#7f939b]">
                  {formatDate(r.date)} &middot; {r.readingTime}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 border-t border-line/60 pt-8">
        <Link
          href="/blog/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-signal-bright"
        >
          <span aria-hidden>&larr;</span> Back to all posts
        </Link>
      </div>
    </article>
  );
}
