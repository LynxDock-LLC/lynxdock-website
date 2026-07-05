import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost, formatDate } from "@/data/posts";

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
