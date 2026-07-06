import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import siteMetadata from "@/data/siteMetadata";
import { companyInfo } from "@/data/companyInfo";

const og = siteMetadata.openGraph;

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: `%s - ${siteMetadata.name}`,
  },
  description: siteMetadata.description,
  keywords: [
    "LynxDock",
    "privacy-first",
    "self-hosted communication",
    "voice chat",
    "self-hosting",
    "developer tools",
    "AI workspace",
  ],
  authors: [{ name: "LynxDock LLC" }],
  creator: "LynxDock LLC",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    url: og.url,
    siteName: og.siteName,
    title: og.title,
    description: og.description,
    images: [
      {
        url: og.image,
        width: og.imageWidth,
        height: og.imageHeight,
        alt: og.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: og.title,
    description: og.description,
    images: [og.image],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05090c",
  width: "device-width",
  initialScale: 1,
};

// Structured data (schema.org) built from GSpec-generated metadata.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteMetadata.url}/#organization`,
      name: companyInfo.name,
      url: siteMetadata.url,
      logo: `${siteMetadata.url}/logo/lynxdock-icon.png`,
      slogan: companyInfo.motto,
      sameAs: [companyInfo.github],
    },
    {
      "@type": "WebSite",
      "@id": `${siteMetadata.url}/#website`,
      name: siteMetadata.name,
      url: siteMetadata.url,
      description: siteMetadata.description,
      publisher: { "@id": `${siteMetadata.url}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-graphite-950 text-[#cdd9de] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-graphite-800 focus:px-4 focus:py-2 focus:text-signal-bright"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
