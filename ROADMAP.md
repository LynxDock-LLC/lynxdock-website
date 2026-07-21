# LynxDock Roadmap

LynxDock is early and built in the open. This is the honest state of the
ecosystem — what's active and what's planned. The live version lives at
`/roadmap` on the website (source of truth: `src/data/roadmap.ts`).

## Phase 01 — Foundations · In Progress

The core LynxDock communication experience and self-hosting story.

- Quick Calls — temporary P2P voice, chat, and screen share
- Persistent, self-hosted servers with accounts and history
- Guided Server Setup wizard with safe defaults
- Squadron / mission-control community view

## Phase 02 — Studio · In Progress

The AI-assisted development workspace for planning and knowledge.

- Connected knowledge graph across docs, sprints, and research
- AI assistance grounded in your own project context
- Architecture, engineering, and design hubs

## Phase 03 — Bootstrap · Planned

Automation that turns a blank slate into a structured foundation.

- Automated repository and documentation scaffolding
- Product foundation templates
- One-command project genesis

## Phase 04 — Ecosystem · Planned

Deeper integration across LynxDock, Studio, and Bootstrap.

- Shared identity and cross-product workflows
- Public documentation and developer guides
- Community-driven extensions

---

### Website roadmap (this repo)

Shipped:

- [x] Genesis landing page with brand assets
- [x] Product, roadmap, docs, company, support, legal pages
- [x] Static export configured for Cloudflare Pages
- [x] Blog surface — `/blog` index + statically generated `/blog/[slug]`
- [x] Documentation section — `/docs` hub with sticky sidebar (Getting Started,
      Self-hosting, Communities, Developers, Architecture, Bootstrap, FAQ)
- [x] SEO — build-time `sitemap.xml` + `robots.txt`, OG image, favicons, 404
- [x] `security.txt` (RFC 9116)
- [x] Early-access form component (JSON POST, `mailto:` fallback)
- [x] Analytics component — privacy-first Cloudflare Web Analytics (cookieless)

Open:

- [x] **`NEXT_PUBLIC_FORM_ENDPOINT`** — set in Cloudflare Pages and verified live
      on 2026-07-21: a real submission arrived via Formspree carrying the
      `source: "lynxdock.app early access"` field, which only the JSON POST path
      sends. Signups are being captured.
- [ ] **Set `NEXT_PUBLIC_CF_BEACON_TOKEN`** — analytics ships inert; no traffic
      data is collected until the token is set in Cloudflare Pages.
- [x] **Refresh `src/data/status.ts`** — done 2026-07-20. `overall` now reads
      `operational` (was `unknown`). Root cause was the Vault component: with no
      `package.json` the generator's fallback could never fire, so it stayed
      `unknown` and the worst-wins roll-up dragged the whole board down. Fixed by
      publishing `lynxdock-status.json` in the vault. Run with **both**
      `LYNXDOCK_VAULT_DIR` and `LYNXDOCK_WEBSITE_DIR` set — without the latter the
      website sync target is silently skipped.
      *(Component versions still read `0.0.0`; those come from the real
      `Cargo.toml` / `package.json` and stay honest until bumped.)*
- [ ] Wire `/download` to real release artifacts once desktop builds publish.
- [ ] Deepen documentation content as products ship.
- [ ] Retire `DevelopmentBanner` at public launch.

> **Note:** `/roadmap` renders `src/data/roadmap.ts`, which is **generated from
> GSpec** (`gspec/modules/roadmap.yaml`) — edit the spec, not the output.
> `epics.ts`, `features.ts`, `posts.ts` and `docs.ts` are hand-maintained.
