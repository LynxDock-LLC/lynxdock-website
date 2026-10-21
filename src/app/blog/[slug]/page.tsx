import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryChip } from "@/components/PostCover";
import {
  AuthorBlock,
  SeriesBadge,
  SeriesFooter,
} from "@/components/PostMeta";
import { isPreview } from "@/lib/siteEnv";
import {
  posts,
  draftPosts,
  getPost,
  formatDate,
  relatedPosts,
  postAuthor,
  postAuthorRole,
} from "@/data/posts";

// Drafts are built only in preview builds; a production build has no page for them until they are published.
export const dynamicParams = false;

export function generateStaticParams() {
  return [...posts, ...(isPreview ? draftPosts : [])].map((p) => ({ slug: p.slug }));
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
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
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

  const related = post.draft ? [] : relatedPosts(slug);

  return (
    <article className="wrap-narrow pb-20 pt-12 sm:pt-16">
      <Link
        href="/blog/"
        className="inline-flex items-center gap-1.5 text-sm text-[#9fb2ba] transition-colors hover:text-signal-bright"
      >
        <span aria-hidden>&larr;</span> All posts
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <CategoryChip post={post} size="md" />
        <span className="text-xs text-[#7f939b]">
          {formatDate(post.date)}
          <span aria-hidden className="mx-1.5 text-[#41525a]">
            &middot;
          </span>
          {post.readingTime}
        </span>
      </div>

      {post.draft ? (
        <p className="card-notice small mt-6">
          <span className="strong text-[#ecd6a8]">Draft, not published.</span> This article is shown only in preview
          builds for review. It is not indexed and not in the feed.
        </p>
      ) : (
        <p className="small mt-6 border-l-2 border-line pl-3">
          Written {formatDate(post.date)}. It describes LynxDock as it was then; for where things stand now, see{" "}
          <Link href="/releases/" className="text-link">
            release status
          </Link>
          .
        </p>
      )}

      <SeriesBadge post={post} className="mt-4" />

      <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
        {post.title}
      </h1>

      {/* Attribution lives here rather than on the archive cards - one place,
          where the reader has actually committed to the piece. */}
      <AuthorBlock author={postAuthor(post)} role={postAuthorRole(post)} />

      <div className="mt-10 flex flex-col gap-5">
        {post.body.map((para, i) => (
          <p key={i} className="text-[16px] leading-relaxed text-[#b7c5cb]">
            {para}
          </p>
        ))}
      </div>

      <SeriesFooter post={post} />

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
