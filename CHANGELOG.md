# Changelog

All notable changes to the LynxDock website are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/), and this
project aims to follow semantic versioning once it reaches a stable release.

## [Unreleased]

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
  Company, Support (with early-access CTA), Privacy, Terms.
- **Brand assets** — LynxDock logo, derived cube icon, favicon, and three
  in-app screenshots presented in glass-frame mockups.
- **Content data** — structured `products`, `features`, and `roadmap` data.
- **SEO & metadata** — titles, descriptions, Open Graph, Twitter card, theme
  color, and favicon.
- **Docs** — `GENESIS-WEBSITE.md`, `ROADMAP.md`, `CHANGELOG.md`, and an updated
  `README.md` with dev, build, and Cloudflare Pages deployment instructions.

### Notes

- No analytics, email backend, or heavy client libraries included by design.
- Replaces the original single-file static "coming soon" placeholder.
