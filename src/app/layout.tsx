import type { Metadata, Viewport } from "next";
import "./globals.css";
import { dmSans, manrope } from "./fonts";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import PreviewNotice from "@/components/site/PreviewNotice";
import DemoDialog from "@/components/site/DemoDialog";
import Analytics from "@/components/Analytics";
import siteMetadata from "@/data/siteMetadata";
import { companyInfo } from "@/data/companyInfo";
import { isPreview, siteOrigin } from "@/lib/siteEnv";

const title = "LynxDock: voice, chat and operations on your server";
const description =
  "LynxDock brings your community together in a desktop workspace for text, voice, screen sharing and operations, on a server you control. Windows closed beta.";

export const metadata: Metadata = {
  // The real domain in every build. Previews are kept out of search by `robots` below, not by a different origin.
  metadataBase: new URL(siteOrigin),
  title: {
    default: title,
    template: `%s · ${siteMetadata.name}`,
  },
  description,
  applicationName: siteMetadata.name,
  authors: [{ name: companyInfo.name }],
  creator: companyInfo.name,
  alternates: {
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: `${siteMetadata.name} updates` }],
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    url: `${siteOrigin}/`,
    siteName: siteMetadata.name,
    title,
    description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "LynxDock" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
  // Indexing is configured per build: production follows the site's existing policy (indexed); every preview
  // build is noindex. Individual pages (the tester hub, drafts, moved-page notices) opt out on their own.
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#090e12",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteOrigin}/#organization`,
      name: companyInfo.name,
      url: siteOrigin,
      logo: `${siteOrigin}/apple-icon.png`,
      sameAs: [companyInfo.github],
    },
    {
      "@type": "WebSite",
      "@id": `${siteOrigin}/#website`,
      name: siteMetadata.name,
      url: siteOrigin,
      description,
      publisher: { "@id": `${siteOrigin}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: the inline script below adds data-js to <html> before React hydrates.
    <html lang="en" className={`${manrope.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-bg antialiased">
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.setAttribute('data-js','')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-panel-2 focus:px-4 focus:py-3 focus:text-ink"
        >
          Skip to content
        </a>
        <PreviewNotice />
        <SiteHeader />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
        <DemoDialog />
        <Analytics />
      </body>
    </html>
  );
}
