# LynxDock Community Platform - Architecture Plan

Status: Proposal (Phase 1). Nothing here is deployed yet.
Owner: LynxDock LLC (solo founder). Target: community.lynxdock.app

---

## 1. Objective

Create the public hub for the LynxDock ecosystem: a place to discuss the app,
report bugs, request features, share Squadron operations, publish themes and
plugins, follow development, and participate in the roadmap. It must feel like
part of LynxDock - same dark HUD aesthetic, same "Built for People. Not
Platforms." ethos - not a bolted-on external forum.

Guiding constraint: **practical for a solo founder. No unnecessary complexity.
No custom forum rewrite unless clearly justified.**

---

## 2. Platform comparison

| Option | Strengths | Weaknesses | Fit |
| --- | --- | --- | --- |
| **Discourse** | Mature, categories + tags + trust levels, built-in voting plugin, chat, theming, SSO (DiscourseConnect), backups, huge plugin ecosystem, self-hostable & open source | Heaviest to self-host (Docker, ~4 GB RAM), Ruby stack | **Primary** |
| Flarum | Lightweight (PHP/MySQL, cheap shared hosting), clean UX | Younger ecosystem, fewer plugins, weaker roadmap/voting/theming story, smaller talent pool | Backup option |
| GitHub Discussions | Zero hosting, free, native to issues/roadmap, devs already there | Weak for themes/showcase/branding, no custom-domain identity, limited categories, doesn't feel like "LynxDock" | Complement, not hub |
| Custom forum in LynxDock | Perfect integration | Months of build + ongoing security/maintenance; huge distraction from the product | Rejected |
| Static community pages | Trivial to host on Pages | No accounts, threads, or interaction - not a community | Rejected as hub |

### Recommendation: **Discourse, self-hosted**

Why:

1. **It does everything the brief asks** out of the box - categories, tags,
   feature voting, showcase-friendly posts, moderation tooling, and a real
   theming system to match the LynxDock look.
2. **Self-hosting matches the brand.** LynxDock's whole pitch is "own your
   space." Running our own community on our own box is on-message and gives full
   data control.
3. **Cost fits a solo founder** - roughly $27/mo self-hosted vs ~$100/mo managed.
4. **Future SSO is built in.** DiscourseConnect lets LynxDock accounts become the
   identity provider later, with zero re-platforming.
5. **Reversible.** Discourse backups are portable; if self-hosting becomes a
   burden, migrating to managed Discourse hosting is a supported, one-file move.

**Complementary, not replaced:** keep **GitHub Issues** as the canonical
engineering bug tracker (it already exists and links to code). The community Bug
Reports category triages and routes confirmed bugs to GitHub. This avoids
duplicate trackers while giving non-developers a friendly front door.

**Fallback:** if self-hosting Discourse proves too heavy, switch to **managed
Discourse hosting** (same software, same data) rather than changing platforms.

---

## 3. Subdomain architecture

All under `lynxdock.app`, DNS managed in Cloudflare.

| Subdomain | Purpose | Hosting | Phase |
| --- | --- | --- | --- |
| `lynxdock.app` | Marketing site (live) | Cloudflare Pages | Done |
| `community.lynxdock.app` | Discourse forum / hub | Self-hosted VPS | **Now** |
| `docs.lynxdock.app` | Product documentation | Reserve; today docs live at `lynxdock.app/docs`. Later: dedicated docs (Starlight/Docusaurus) on Pages, CNAME here | Later |
| `status.lynxdock.app` | Uptime / incident status | Uptime Kuma on the VPS, or Instatus free tier | Soon |
| `download.lynxdock.app` | Desktop builds | Reserve; today `lynxdock.app/download`. Later: redirect to GitHub Releases or a Pages route | Later |
| `developer.lynxdock.app` | Plugin/API developer portal | Reserve; later a Pages docs site | Later |

Principle: **reserve the names now (so they're consistent), but only stand up
`community` and `status` in the first pass.** Everything else can keep living on
the main site until it earns its own subdomain.

---

## 4. Cloudflare DNS & routing

- **community**: `A` record -> VPS IPv4 (and `AAAA` -> IPv6 if available).
  Start **DNS-only (grey cloud)** so Discourse manages its own Let's Encrypt TLS
  cleanly. (Discourse behind the orange-cloud proxy works but adds caching/
  websocket gotchas; not worth it on day one.) Revisit proxying later for DDoS
  protection with `Full (strict)` SSL + cache rules that bypass `/`.
- **status**: `A` -> VPS (same box, different port/reverse-proxied) or `CNAME`
  to the status provider.
- **docs / download / developer**: create as needed - `CNAME` to
  `lynxdock-website.pages.dev` (or a new Pages project) when built.
- Keep the existing Pages custom-domain records for apex + `www` untouched.

---

## 5. Hosting

**Recommended: Hetzner Cloud CX22** (~EUR 4-5/mo): 2 vCPU, 4 GB RAM, 40 GB SSD -
comfortably above Discourse's 4 GB production recommendation and the cheapest
credible option. Alternatives: DigitalOcean/Vultr/Linode 4 GB (~$24/mo).

- OS: Ubuntu LTS. Install via the official `discourse_docker` (`./launcher`).
- Single Docker container (Rails + Sidekiq + Postgres + Redis).
- 2 GB swap file (needed for safe `./launcher rebuild`).
- Firewall: allow 22 (SSH, key-only), 80, 443 only.

**Email (required - Discourse cannot run without outbound SMTP):** a
transactional provider. Recommended **Postmark** or **Mailgun** (~$0-15/mo at our
volume). Needs SPF/DKIM/DMARC DNS records in Cloudflare.

Estimated monthly cost: **~$15-30** (VPS + email + backup storage).

---

## 6. Backup strategy

- **Discourse automatic backups** (built in): daily, retained ~7-14 days.
- **Off-box**: enable "backup to S3" -> **Backblaze B2** (S3-compatible, cheap)
  so a dead VPS never means lost data.
- **VPS snapshots**: weekly provider snapshot for whole-box recovery.
- **Restore drill**: document and test a restore once before launch (a backup
  you haven't restored is a wish, not a backup).
- Store B2 keys and SMTP creds in a password manager, not in the repo.

---

## 7. Auth / SSO (future - do NOT build yet)

- **Now:** Discourse native accounts + social login (GitHub, Google) for low
  friction. This covers launch entirely.
- **Later:** when LynxDock has real user accounts, make LynxDock the identity
  provider and Discourse an SSO client via **DiscourseConnect**. One setting
  flip; no data migration. Deferring this is the correct call for launch.

---

## 8. Risks & mitigations

- **Ops burden on a solo founder** -> keep it one box, automate backups, and
  keep managed hosting as the escape hatch.
- **Spam** -> Discourse trust levels + Akismet/`discourse-antispam` + require
  email verification + social login.
- **Email deliverability** -> use a real transactional provider with proper DNS
  auth, never the VPS's own sendmail.
- **Moderation load** -> start invite/approval-light, lean on trust levels, add
  1-2 volunteer mods as it grows (see moderation guide).

---

## 9. Recommended first-pass scope

Stand up **community.lynxdock.app (Discourse)** + **status.lynxdock.app**, with
the category structure, pinned starter posts, and templates from the companion
docs. Wire `lynxdock.app` navigation to point at Community. Defer docs/download/
developer subdomains and SSO. This is the minimum that delivers the success
criteria without over-building.

Sources: Discourse pricing (discourse.org/pricing), Discourse self-host
requirements (meta.discourse.org, github.com/discourse/discourse INSTALL docs).
