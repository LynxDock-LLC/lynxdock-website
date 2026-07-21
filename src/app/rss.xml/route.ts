import { posts } from "@/data/posts";
import siteMetadata from "@/data/siteMetadata";

// Rendered once at build time so the feed ships as a static file under
// `output: "export"`. Only GET is supported in a static export.
export const dynamic = "force-static";

const base = siteMetadata.url;

/** Escape the five XML predefined entities. */
function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * CDATA can't be escaped from the inside, so the only illegal sequence is the
 * terminator itself. Break it rather than mangling the surrounding markup.
 */
function cdata(html: string): string {
  return `<![CDATA[${html.replace(/]]>/g, "]]&gt;")}]]>`;
}

function rfc822(date: string): string {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

export function GET() {
  // posts.ts is authored in rough reverse-chronological order but is not
  // strictly sorted, and feed readers rely on the ordering. Sort explicitly.
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  // Use the newest post rather than Date.now() so the output is deterministic
  // and a rebuild with no new posts produces a byte-identical feed.
  const lastBuild = sorted.length ? rfc822(sorted[0].date) : new Date().toUTCString();

  const items = sorted
    .map((post) => {
      const url = `${base}/blog/${post.slug}/`;
      const html = post.body.map((p) => `<p>${p}</p>`).join("");
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(post.date)}</pubDate>`,
        `      <category>${escapeXml(post.tag)}</category>`,
        `      <description>${escapeXml(post.excerpt)}</description>`,
        `      <content:encoded>${cdata(html)}</content:encoded>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(siteMetadata.name)} Blog</title>
    <link>${base}/blog/</link>
    <description>${escapeXml(siteMetadata.description)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${base}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
