import type { Metadata } from "next";
import Link from "next/link";

/**
 * The static fallback at an old URL. On Cloudflare Pages, public/_redirects answers these URLs with a 301 before
 * this page is served; on any other static host the page itself sends the browser on (an immediate refresh) and
 * links to the new address, so an old bookmark never dead-ends.
 */
export function movedMetadata(title: string, to: string): Metadata {
  return {
    title,
    robots: { index: false, follow: true },
    alternates: { canonical: to.split("#")[0] },
  };
}

export default function MovedPage({ title, to, toLabel, why }: { title: string; to: string; toLabel: string; why: string }) {
  return (
    <section className="wrap-narrow py-20">
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <p className="eyebrow">This page has moved</p>
      <h1 className="h-page mt-3">{title}</h1>
      <p className="lead mt-4">{why}</p>
      <Link href={to} className="btn btn-primary mt-8">
        Go to {toLabel}
      </Link>
    </section>
  );
}
