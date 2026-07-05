# Genesis Website

This document records the foundation ("Genesis") build of the LynxDock website —
what it is, how it's structured, and the decisions behind it.

## Goal

Build the first real LynxDock website: a modern, lightweight, privacy-first
marketing site that feels like an extension of the LynxDock application UI — a
quiet, high-end command center.

## Stack decisions

| Area        | Choice                          | Why                                                        |
| ----------- | ------------------------------- | ---------------------------------------------------------- |
| Framework   | Next.js 15 (App Router)         | Modern React, file-based routing, first-class static export |
| Language    | TypeScript                      | Type safety across components and content data              |
| Styling     | Tailwind CSS 3                  | Fast, consistent, token-driven design system               |
| Rendering   | Static export (`output:export`) | All content is static; simplest reliable Cloudflare Pages deploy |
| Hosting     | Cloudflare Pages                | Fast global CDN, generous static hosting                    |
| Fonts       | System font stack               | Zero external fetch; keeps builds lightweight and offline   |

No unnecessary dependencies: no UI kit, no animation library, no analytics, no
email backend. Interactivity is limited to a single client component (the mobile
nav toggle).

## Design system

- **Aesthetic:** dark graphite / cybernetic mission-control interface.
- **Palette:** graphite `#05090c`–`#141d25`, signal cyan `#35e0e0`, signal blue
  `#3b82f6`. Thin cyan hairline borders, translucent glass panels, subtle glow.
- **Feel:** private, powerful, technical, calm, premium, futuristic, lightweight.
- **Tokens:** defined in `tailwind.config.ts`; shared component styles (`.glass`,
  `.hud-label`, `.text-gradient`, `.bg-hud-grid`) live in `src/app/globals.css`.
- **Motion:** minimal — soft fade-ups and a gentle pulse; fully disabled under
  `prefers-reduced-motion`.

## Components

`Navigation`, `Footer`, `Hero`, `ProductCard`, `FeatureCard`,
`ScreenshotShowcase`, `RoadmapTimeline`, `GlowButton`, `GlassPanel`,
`SectionHeader`, `PageHeader`. All reusable and content-driven.

## Content model

Structured data lives in `src/data/`:

- `products.ts` — the three products
- `features.ts` — core principles + product feature highlights
- `roadmap.ts` — phased roadmap with statuses

## Pages

Home, Products (+ LynxDock / Studio / Bootstrap), Roadmap, Docs, Company,
Support (with early-access CTA), Privacy, Terms.

## Homepage sections

1. Hero — logo anchor, motto, three CTAs (View Roadmap, GitHub, Documentation)
2. Product screenshot showcase — glass-frame mockups of real app screens
3. Product ecosystem — the three products
4. Why LynxDock exists
5. Core principles
6. Roadmap
7. Call to action — Star on GitHub + Request Early Access
8. Footer

## Brand assets

- `public/logo/lynxdock-logo.png` — full logo (cube + wordmark)
- `public/logo/lynxdock-icon.png` — square cube icon (nav, hero, footer)
- `src/app/icon.png` — favicon (derived from the icon)
- `public/screenshots/` — `server-setup`, `community-connect`,
  `mission-control`, `studio-graph`

## Deployment

Static export to `out/`, served by Cloudflare Pages. See `README.md` for exact
build settings.
