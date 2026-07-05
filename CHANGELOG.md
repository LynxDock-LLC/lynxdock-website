# Changelog

All notable changes to the LynxDock website are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this
project aims to follow semantic versioning once it reaches a stable release.

## [Unreleased]

### Added

- **Blog** — `/blog` index plus statically-generated post pages (`/blog/[slug]`)
  driven by `src/data/posts.ts`, with two starter posts. Added to nav and footer.
- **Early-access form** — accessible email-capture component (`EarlyAccessForm`)
  wired into the Support and Roadmap CTAs. Posts to `NEXT_PUBLIC_FORM_ENDPOINT`
  when configured, and falls back to a prefilled `mailto:` link otherwise.
- **Social & icons** — branded 1200×630 Open Graph image (`/og.png`),
  `apple-icon.png`, and a multi-size `favicon.ico`. Wired into metadata with a
  `summary_large_image` Twitter card.
- `.env.example` documenting the optional form endpoint.

## [0.1.0] — 2026-07-04

### Added

- **Genesis website foundation** — Next.js 15 (App Router) + TypeScript +
  Tailwind CSS 3, configured for static export to Cloudflare Pages.
- **Design system** — dark graphite / mission-control aesthetic with neon
  cyan-blue accents, glass panels, thin borders, and subtle glow. Tokens in
  `tailwind.config.ts`; shared styles in `globals.css`.
- **Reusable components** — Navigation, Footer, Hero, ProductCard, FeatureCard,
  ScreenshotShowcase, RoadmapTimeline, GlowButton, GlassPanel, SectionHeader,
  PageHeader.
- **Pages** — Home, Products (+ LynxDock, Studio, Bootstrap), Roadmap, Docs,
  Company, Support (with e