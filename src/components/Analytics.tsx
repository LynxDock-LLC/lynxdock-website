import Script from "next/script";

// Cloudflare Web Analytics - privacy-first, cookieless, no personal data.
// Set NEXT_PUBLIC_CF_BEACON_TOKEN (from Cloudflare dashboard > Web Analytics)
// to enable. When unset, nothing is loaded and no analytics run.
const TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN ?? "";

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
