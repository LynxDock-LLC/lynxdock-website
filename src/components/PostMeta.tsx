import Link from "next/link";
import { formatDate, seriesInfo, type Post } from "@/data/posts";

/**
 * Card metadata, deliberately minimal: date and reading time only.
 *
 * The author used to sit here, but on an archive where nearly every post is by
 * the same two bylines it was pure repetition - it pushed the date and reading
 * time (the parts a reader actually scans for) down the visual order. The
 * category chip carries the "who kind of team wrote this" signal; full
 * attribution lives in the article itself, where it means something.
 */
export function PostMeta({
  post,
  className = "",
}: {
  post: Post;
  className?: string;
}) {
  return (
    <p className={`text-xs text-[#7f939b] ${className}`}>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden className="mx-1.5 text-[#41525a]">
        &middot;
      </span>
      {post.readingTime}
    </p>
  );
}

/**
 * "Part 3 of 11" - only rendered once a series has a second entry, since
 * seriesInfo returns null below that. Static label, no link: the reader is
 * already looking at a card that links to the post.
 */
export function SeriesBadge({
  post,
  className = "",
}: {
  post: Post;
  className?: string;
}) {
  const info = seriesInfo(post);
  if (!info) return null;
  return (
    <p
      className={`text-[11px] font-medium uppercase tracking-[0.12em] text-[#6f838b] ${className}`}
    >
      {info.name}
      <span aria-hidden className="mx-1.5 text-[#41525a]">
        &middot;
      </span>
      Part {info.part} of {info.total}
    </p>
  );
}

/**
 * Article-level series callout with a link onward. Shown at the foot of a post
 * that belongs to a series, so a reader who just finished part 3 has somewhere
 * obvious to go.
 */
export function SeriesFooter({ post }: { post: Post }) {
  const info = seriesInfo(post);
  if (!info) return null;

  return (
    <aside className="mt-12 rounded-xl border border-line bg-graphite-900/40 p-6">
      <p className="hud-label text-signal-cyan">{info.name}</p>
      <p className="mt-2 text-sm text-[#9fb2ba]">
        This is part {info.part} of {info.total} in an ongoing series.
      </p>
      {info.next ? (
        <Link
          href={`/blog/${info.next.slug}/`}
          className="mt-4 inline-flex w-fit items-center gap-2 text-sm font-medium text-signal-bright underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-bright"
        >
          Next: {info.next.title} <span aria-hidden>&rarr;</span>
        </Link>
      ) : (
        <p className="mt-3 text-sm text-[#6f838b]">
          You&rsquo;re up to date &mdash; part {info.total} is the latest.
        </p>
      )}
    </aside>
  );
}

/**
 * Attribution block, sat between the headline and the body as a masthead rule.
 * Bottom border (not top) - it closes the header, it doesn't open the body.
 * Roles come from posts.ts rather than being hardcoded per template.
 */
export function AuthorBlock({
  author,
  role,
}: {
  author: string;
  role: string | null;
}) {
  return (
    <div className="mt-6 border-b border-line/60 pb-6">
      <p className="text-sm text-[#9fb2ba]">
        Written by <span className="font-medium text-white">{author}</span>
        {role ? <span className="text-[#6f838b]">, {role}</span> : null}
      </p>
    </div>
  );
}
