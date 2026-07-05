import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const siteUrl = "https://lynxdock.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "LynxDock - Built for People. Not Platforms.",
    template: "%s - LynxDock",
  },
  description:
    "Privacy-first, performance-focused software for creators, gamers, developers, and self-hosted communities. LynxDock, LynxDock Studio, and LynxDock Bootstrap.",
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
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "LynxDock",
    title: "LynxDock - Built for People. Not Platforms.",
    description:
      "Privacy-first, performance-focused software for creators, gamers, developers, and self-hosted communities.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "LynxDock - Built for People. Not Platforms.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LynxDock - Built for People. Not Platforms.",
    description:
      "Privacy-first, performance-focused software for creators, gamers, developers, and self-hosted communities.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05090c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-graphite-950 text-[#cdd9de] antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-graphite-800 focus:px-4 focus:py-2 focus:text-signal-bright"
        >
          Skip to content
        </a>
        <Navigatio