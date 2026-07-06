# Contributing to lynxdock-website

Thanks for your interest in LynxDock. This is an **early-stage** project - issues
and pull requests may be triaged slowly or declined while the architecture
stabilizes. We appreciate your patience.

## Ground rules

- Be respectful and assume good intent.
- **Never commit secrets, tokens, or credentials.**
- Keep changes focused. Update `CHANGELOG.md` where relevant.

## Development

Next.js with static export (Cloudflare Pages).

```bash
npm install
npm run dev
```

Most content is **generated from GSpec** by Bootstrap. Files stamped
`Generated from GSpec. Do not edit manually.` (e.g. `src/data/*.ts`,
`public/releases.json`, `public/sitemap.xml`) must not be hand-edited - change
the spec and regenerate instead.

## Standards

- Use the Genesis Design System tokens; do not introduce new colors/spacing.
- Preserve static-export compatibility (no server-only features).
- Validate: `npx tsc --noEmit` and `npm run build`.

Built for People. Not Platforms.
