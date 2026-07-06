# LynxDock Genesis Design System

The shared visual language for the LynxDock ecosystem - website, desktop app,
server host, Studio, Bootstrap, and future products. The goal is one coherent,
recognizable look: a calm, premium, technical mission-control aesthetic.

Motto: **Built for People. Not Platforms.**

## Source of truth

Three synchronized representations - change all three together:

- `src/styles/tokens.css` - CSS custom properties (`--ld-*`). Import into any
  product for the raw values.
- `src/data/designSystem.ts` - typed token object for JS/TS consumers.
- `tailwind.config.ts` - how the website consumes tokens as utility classes.

The website's `src/app/globals.css` references the CSS tokens directly.

## Design language

Dark graphite / near-black foundation. Neon cyan and electric blue accents.
Thin cyan hairline borders. Translucent glass panels with subtle glow. A
sci-fi command-center feel - but restrained: calm, premium, and technical, never
childish or loud "gamer" styling. The logo (a glowing isometric cube) and the
app's Mission Control screens are the reference points.

---

## 1. Color tokens

| Token | Value | Use |
| --- | --- | --- |
| `--ld-bg` | `#05090c` | Page background |
| `--ld-bg-elevated` | `#080d11` | Slightly raised surfaces |
| `--ld-panel` | `#0d141a` | Glass panel base |
| `--ld-panel-strong` | `#141d25` | Denser panels, chips |
| `--ld-border` | `rgba(94,242,242,0.14)` | Thin hairline borders |
| `--ld-border-strong` | `rgba(94,242,242,0.35)` | Hover / active borders |
| `--ld-text` | `#cdd9de` | Body text |
| `--ld-text-strong` | `#ffffff` | Headings / emphasis |
| `--ld-muted` | `#9fb2ba` | Secondary text |
| `--ld-muted-2` | `#7f939b` | Captions / tertiary |
| `--ld-cyan` | `#35e0e0` | Primary accent |
| `--ld-cyan-bright` | `#5ef2f2` | Hover, links, HUD labels |
| `--ld-blue` | `#3b82f6` | Secondary accent |
| `--ld-blue-deep` | `#1d4ed8` | Gradients / depth |
| `--ld-warning` | `#f5b544` | Caution states |
| `--ld-success` | `#34d399` | Confirmations / ready |
| `--ld-danger` | `#f87171` | Errors / destructive |

Rule: cyan is the hero accent; blue is the supporting accent (gradients,
secondary highlights). Status colors are used sparingly and never decoratively.

---

## 2. Typography

- **Headings & body:** a clean system sans stack (`--ld-font-sans`). No external
  font fetch - keeps builds fast and offline-friendly. Futurism comes from
  spacing and weight, not a novelty typeface. If a display face is ever added,
  keep body on the system stack.
- **HUD / mono labels:** monospace stack (`--ld-font-mono`) for small uppercase
  labels and code.

Scale:

| Level | Size | Notes |
| --- | --- | --- |
| H1 | `3.5rem` (56px) | Scale down to ~2.5-3rem on mobile |
| H2 | `2.25rem` (36px) | Section titles |
| H3 | `1.35rem` (~22px) | Card / subsection titles |
| Body | `1rem` (16px) | Line-height 1.7 |
| Small | `0.8rem` (~13px) | Captions, meta |

Letter spacing: headings use `-0.02em` (tight). Uppercase HUD labels use
`0.22em` tracking. Body uses default tracking.

---

## 3. Layout

- **Max content width:** `72rem` (1152px). Center with auto margins.
- **Section spacing:** `4rem` vertical on mobile, `5rem` at `>= sm`.
- **Page gutter:** `1.25rem` horizontal padding.
- **Grid:** responsive card grids collapse `1 -> 2 -> 3/4` columns as width
  grows; gaps ~1.25rem. Prefer CSS grid / flex-wrap, not fixed columns.
- **Breakpoints:** `sm 640` / `md 768` / `lg 1024` / `xl 1280`.

---

## 4. Components

- **Navigation** - sticky top bar, translucent graphite with blur, thin bottom
  hairline. Logo + wordmark left, links center/right, one primary GlowButton.
  Collapses to a toggle menu below `md`.
- **Hero** - centered logo, HUD eyebrow label, large H1, gradient tagline, one
  line of supporting copy, 2-3 buttons. Ambient grid + radial glow behind.
- **GlowButton** - three variants: `primary` (cyan fill + glow), `secondary`
  (bordered), `ghost` (text). Subtle glow only on primary. Rounded `--ld-radius`.
- **GlassPanel** - the core surface: `--ld-panel` gradient, `--ld-border`
  hairline, blur, `--ld-radius-lg`. Optional `hover` (border brightens + soft
  glow) and `glow` (ambient outer glow) modifiers.
- **ProductCard** - GlassPanel with HUD stage label, title, tagline, summary,
  and a ghost link. Used for the product ecosystem grid.
- **FeatureCard** - GlassPanel with a small cyan-tinted icon tile, title, and
  short description.
- **ScreenshotFrame** - a windowed "app chrome" frame (dots + HUD label) around a
  product screenshot, thin border + panel shadow, optional live tactical
  overlays (radar sweep, pulsing status). Caption below.
- **RoadmapTimeline** - vertical timeline with a cyan gradient spine, status
  dots, phase labels, and status chips (shipped / active / planned).
- **Footer** - top hairline, logo + tagline, link columns, copyright + motto row.

---

## 5. Motion

Motion is decorative and quiet. Durations: fast `0.2s`, base `0.25s`, slow
`0.6s`; ease `cubic-bezier(0.4, 0, 0.2, 1)`.

- **Glow pulse** - slow opacity pulse on small status dots / "live" badges.
- **Fade up** - content rises ~12px and fades in on load (hero, sections).
- **Card hover** - border brightens to `--ld-border-strong` + soft glow; no
  bounce or large scale.
- **Screenshot hover** - gentle border/glow lift on framed screenshots.
- **Radar sweep / ping** - subtle tactical overlays on Mission Control visuals.

**Reduced motion:** all of the above must be disabled under
`@media (prefers-reduced-motion: reduce)` (durations near-zero, no infinite
animations). This is enforced globally in `globals.css`.

---

## 6. Accessibility

- **Contrast:** body text (`--ld-text`) on `--ld-bg` clears WCAG AA for normal
  text; `--ld-muted` is for secondary text at >= 14px. Never put cyan text on a
  light fill - cyan is for dark backgrounds only. Buttons keep >= 4.5:1 label
  contrast.
- **Focus states:** a visible 2px `--ld-cyan-bright` outline with 2px offset on
  every interactive element (`:focus-visible`). Never remove focus outlines.
- **Keyboard navigation:** logical tab order, a "skip to content" link, and
  proper roles/labels. Menus toggle with `aria-expanded`; icon-only buttons have
  `aria-label`.
- **Motion reduction:** honor `prefers-reduced-motion` (section 5).
- **Semantics:** real headings in order, `alt` text on all images, `aria-hidden`
  on purely decorative glow/grid layers.

---

## 7. Usage rules

**Use glow when** you want to draw the eye to exactly one thing: the primary
CTA, the logo, a "live" indicator, or the single hero screenshot. Glow signals
"this is active / important."

**Do not use glow when** it would compete - never glow every card, every
border, or body text. Two glows fighting in one viewport is one too many.

**Avoid clutter:**
- Graphite + cyan + space. Resist adding more colors; status colors only for
  status.
- One accent action per section. Secondary actions are bordered or ghost.
- Thin hairlines, not heavy boxes. Let negative space do the work.
- Short copy. If a paragraph can be a sentence, make it a sentence.

**Keep it lightweight:**
- Prefer system fonts and CSS over images and JS.
- Static-export friendly: no runtime theming servers, no heavy animation libs.
- Motion is subtle and always reduced-motion aware.
- If a component needs a third glow to feel "done," it's probably too busy -
  remove something instead.

The whole system is an exercise in restraint. When in doubt: darker, calmer,
fewer elements, one clear accent.
