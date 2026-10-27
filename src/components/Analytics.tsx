import Script from "next/script";

// Cloudflare Web Analytics - privacy-first, cookieless, no personal data.
// The token comes from NEXT_PUBLIC_CF_BEACON_TOKEN (Cloudflare dashboard > Web Analytics), passed through by
// next.config.mjs for PRODUCTION builds only (src/lib/buildEnv.mjs): a preview build never loads this beacon, so
// preview visits are not counted in the production analytics. When unset, nothing is loaded and no analytics run.
// (Cloudflare Pages can also inject its own beacon from the Pages project's Web Analytics setting; that is
// dashboard configuration, not this code.)
const TOKEN = process.env.LYNXDOCK_CF_BEACON_TOKEN ?? "";

export default function Analytics() {
  if (!TOKEN) return null;
  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token: TOKEN })}
    />
  );
}
