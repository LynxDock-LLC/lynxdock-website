"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { isProductionHost } from "@/lib/buildEnv.mjs";

// Cloudflare Web Analytics - privacy-first, cookieless, no personal data.
// The token comes from NEXT_PUBLIC_CF_BEACON_TOKEN (Cloudflare dashboard > Web Analytics), passed through by
// next.config.mjs for PRODUCTION builds only (src/lib/buildEnv.mjs): a preview build never loads this beacon, so
// preview visits are not counted in the production analytics. When unset, nothing is loaded and no analytics run.
// This is the site's ONLY analytics beacon (owner decision 2026-10-30: one production beacon, none on previews). The
// Cloudflare Pages automatic beacon and the zone's automatic setup are switched off in the dashboard; check-site.mjs
// refuses a production build that carries a second beacon or no token.
// Hostname boundary (owner instruction 2026-10-30/31): even a production build loads the beacon only when the page is
// served from lynxdock.app or www.lynxdock.app, decided in the browser after hydration. On localhost or any
// *.pages.dev address (a preview, or a production deployment's own alias) nothing is loaded and no request is made.
const TOKEN = process.env.LYNXDOCK_CF_BEACON_TOKEN ?? "";

export default function Analytics() {
  const [onProductionHost, setOnProductionHost] = useState(false);
  useEffect(() => {
    setOnProductionHost(isProductionHost(window.location.hostname));
  }, []);
  if (!TOKEN || !onProductionHost) return null;
  return (
    <Script
      id="cf-web-analytics"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token: TOKEN })}
    />
  );
}
