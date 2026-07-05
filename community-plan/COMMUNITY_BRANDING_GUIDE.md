# LynxDock Community - Branding Guide (Discourse)

Goal: the forum should feel like an extension of LynxDock, not a stock forum.
Reuse the exact identity from the marketing site.

## Identity tokens (match the website)

- **Motto:** Built for People. Not Platforms.
- **Positioning:** the command center for organized communities. Use tactical /
  mission-control language ("operations", "wings", "ready check", "briefing").
- **Palette (dark theme = default):**
  - Background graphite: `#05090c` (page), `#080d11`/`#0d141a` (panels)
  - Text: `#cdd9de` primary, `#9fb2ba` secondary
  - Accent - signal cyan: `#35e0e0`; bright: `#5ef2f2`
  - Accent - signal blue: `#3b82f6`
  - Hairline borders: `rgba(94,242,242,0.14)`
- **Logo:** the glowing cube icon (`lynxdock-icon.png`) as the forum logo and
  favicon; full wordmark in the header where space allows.
- **Type:** system sans (as the site); monospace for small HUD-style labels.

## Discourse theme setup

1. Set the **dark scheme as default** (Interface > default theme + "dark").
2. Create a **LynxDock theme** (or fork "Graceful"/base) and set color palette to
   the tokens above via Admin > Customize > Colors.
3. Upload logo, logo-small (cube), and favicon (reuse `public/logo/` assets).
4. Add a **theme component** with CSS for: thin cyan category borders,
   glass-style category boxes, cyan link/hover color, and a subtle top hairline -
   mirroring the site's `.glass` / `.hud-label` look.
5. Category styling: give each category a cyan-tinted icon/color; keep it calm
   (no rainbow of colors - stay graphite + cyan).
6. Homepage: set **Categories + Latest** as the default landing; pin the
   "Welcome / start here" banner (cyan accent, motto in the subtitle).
7. Footer: link back to `lynxdock.app`, Docs, Roadmap, Download, GitHub.

## Voice & tone

- Calm, technical, confident. Short sentences. No hype, no dark patterns.
- Category and system messages rewritten in LynxDock voice (e.g., welcome PM
  signed "- The LynxDock team").

## Cross-linking (make it feel like one product)

- Main site nav -> Community (see website integration plan).
- Community header/footer -> back to main site + Download + Docs + Roadmap.
- Shared OG/social styling: dark graphite, cube, cyan - so shared community
  links look like lynxdock.app links.

## Don'ts

- No stock Discourse blue, no default logo, no light theme as default.
- Don't over-decorate; the brand is restraint. Graphite + cyan + space.
