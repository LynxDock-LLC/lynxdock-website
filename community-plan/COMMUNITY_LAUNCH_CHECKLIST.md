# LynxDock Community - Deployment & Launch Checklist

Concrete, solo-founder-friendly steps to stand up community.lynxdock.app on
self-hosted Discourse. Do them in order. Estimated time: a focused afternoon.

## A. Prerequisites (before touching a server)

- [ ] Pick a VPS: Hetzner CX22 (4 GB) recommended. Create account.
- [ ] Pick an email provider: Postmark or Mailgun. Create account, verify a
      sending domain (e.g. `mail.lynxdock.app`).
- [ ] Create a Backblaze B2 bucket + application key for backups.
- [ ] Have Cloudflare access to `lynxdock.app` DNS.

## B. DNS (Cloudflare)

- [ ] `community` -> `A` record to VPS IPv4, **DNS-only (grey cloud)**.
      (+ `AAAA` to IPv6 if the VPS has one.)
- [ ] Email auth records for the sending domain: SPF (`TXT`), DKIM (`CNAME`/
      `TXT` from provider), DMARC (`TXT`). Copy exact values from the email
      provider.
- [ ] (Optional now) `status` -> `A`/`CNAME` for the status page.

## C. Server setup

- [ ] Create Ubuntu LTS VPS. SSH in as root; create a sudo user; disable root
      password login (keys only).
- [ ] `ufw` firewall: allow 22, 80, 443; deny the rest.
- [ ] Add a **2 GB swap file** (needed for safe rebuilds).
- [ ] Install Docker (Discourse installer can do this).

## D. Install Discourse

- [ ] `git clone https://github.com/discourse/discourse_docker /var/discourse`
- [ ] `cd /var/discourse && ./discourse-setup`
- [ ] Answer prompts: hostname `community.lynxdock.app`, admin email, SMTP host/
      user/pass/port from the email provider, and Let's Encrypt email.
- [ ] Wait for build; confirm the site loads over HTTPS.

## E. First-run configuration

- [ ] Register the founder admin account (use the admin email from setup).
- [ ] Site settings: title "LynxDock Community", tagline "Built for People. Not
      Platforms.", contact email, default locale.
- [ ] **Require email verification**; enable **GitHub + Google login**.
- [ ] Install plugins: `discourse-topic-voting` (feature votes),
      anti-spam/Akismet, `discourse-solved` (mark answers) for support-style
      categories.
- [ ] Enable **automatic backups** -> configure **S3/B2** target + schedule
      (daily). Run one backup now and **test a restore** on a scratch instance.

## F. Structure & content (from COMMUNITY_CATEGORIES.md)

- [ ] Create the 13 categories with descriptions, colors, and per-category
      security (staff-only where noted).
- [ ] Add topic templates: Bug Report, Feature Request, Operation, Theme,
      Plugin.
- [ ] Enable voting on **Feature Requests** only.
- [ ] Create roadmap status tags: `proposed`, `accepted`, `planned`,
      `in-development`, `testing`, `released` + area/game tags.
- [ ] Write pinned starter posts: Welcome/Start Here, How feature requests work,
      Roadmap board, How to submit a theme/plugin, How to share an operation,
      Code of Conduct.

## G. Branding (from COMMUNITY_BRANDING_GUIDE.md)

- [ ] Set dark theme default; apply the LynxDock color palette.
- [ ] Upload cube logo + favicon; set homepage to Categories + Latest.
- [ ] Add the theme-component CSS (cyan hairlines, glass panels, HUD labels).
- [ ] Footer links back to lynxdock.app / Docs / Roadmap / Download / GitHub.

## H. Status page (optional first pass)

- [ ] Install **Uptime Kuma** (Docker) on the same VPS or a tiny separate box;
      or use **Instatus** free tier. Point `status.lynxdock.app` at it.
- [ ] Add monitors for lynxdock.app and community.lynxdock.app.

## I. Website integration (Phase 4/7 - separate approval)

- [ ] Update `lynxdock.app` nav + footer + homepage to link Community
      (implemented in the website repo once the plan is approved).

## J. Launch checklist (final gate)

- [ ] Backups running + one restore tested.
- [ ] Email sends & arrives (test signup + password reset).
- [ ] TLS valid; site loads on mobile.
- [ ] Categories, templates, voting, tags all present.
- [ ] Pinned starter posts published.
- [ ] Code of Conduct pinned; spam controls on.
- [ ] Founder + (optional) one mod account set up.
- [ ] Soft-launch: invite a handful of people, seed a few real topics, then
      announce on the main site + GitHub.

## Ongoing

- Weekly dev log; daily flag-queue check; monthly trust-level review.
- Watch VPS RAM/disk; upgrade a tier before it hurts.
