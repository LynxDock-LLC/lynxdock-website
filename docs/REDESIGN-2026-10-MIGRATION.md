# Website redesign (October 2026): URL and content migration map

Written 2026-10-20, before any route was changed, on branch `site/v8-redesign` (from `main` @ `04145f0`).
It records what happens to every existing URL and which records are kept. Nothing here is deployed. Cloudflare
Pages builds `main` for lynxdock.app, so only a merge into `main` changes the live site.

## Sources reconciled

1. The approved redesign brief and the private mockup reference (implementation snapshot `22fd1516`). The mockup
   is private (it answered HTTP 401) and its sharing was not changed, so the brief is the spec.
2. Product release records, read-only: `lynxdock` `docs/v8/p9-2026-10-18/RELEASE-PLAN-NEXT.md` and
   `CANDIDATE-MANIFEST-0.3.0.md` (branch `v8/integration-p9`), and `docs/v7/PUBLICATION-PACKET-0.2.6.md`.
3. The owner's V8 Product & Technical Specification (PDF rev 1.0, 15 Oct 2026, found in the owner's Downloads
   folder; not copied into this repo). The brief's capability wording matches it. It describes the development
   generation, not a shipped installer, and states no resource figures or user-count guarantees.
4. This site: its release data files (`public/beta-0.2.6.json`, `v6-candidate.json`, `beta-manifest.json`,
   `src/data/closedBeta.ts`), the legal pages, the screenshots and the blog.

Facts checked on 2026-10-21 03:4xZ with read-only HTTP requests:
- live `/beta/` names 0.2.6 only, and its 0.2.6 objects return 200;
- production builds configure the site's form endpoint (`NEXT_PUBLIC_FORM_ENDPOINT`) and its analytics token.

## New primary routes (14)

| Route | Status | Replaces or absorbs |
|---|---|---|
| `/` | rebuilt | old home sections, the `MissionControlShowcase` and `ScreenshotShowcase` galleries |
| `/products/lynxdock/` | rebuilt: the one product tour | `/products/`, `/mission-control/`, `/compare/`, `/docs/communities/`, `/docs/faq/` |
| `/products/lynxdock-host/` | rebuilt: the one Host page | `/docs/self-hosting/`, the repeated Host pitch on the home page |
| `/technology/` | new | `/architecture/` (content rewritten to the real architecture) |
| `/company/` | rebuilt | `/vision/` |
| `/download/` | rebuilt: request beta access, no default installer | the "coming soon" platform grid (Linux/macOS/server tiles were unsupported promises) |
| `/beta/` | rebuilt: invited tester hub (`noindex`, not in the sitemap) | the long per-round page; every round is kept in a dated archive |
| `/blog/` | rebuilt index | same URL |
| `/blog/a-clearer-path-to-beta/` | new, **draft** (`noindex`; built only in preview) | none |
| `/docs/` | rebuilt hub | same URL |
| `/docs/getting-started/` | rebuilt quickstart for invited testers | the alpha "Quick Call" quickstart, which described peer-to-peer rooms the product does not have |
| `/roadmap/` | rebuilt: Now / Next / Later | `/features/` |
| `/releases/` | rebuilt: release status and dated history | the `releases.json` placeholder (`0.1.0-alpha`, unreleased) |
| `/support/` | rebuilt | `/community/` |

## Redirects (301, `public/_redirects`, plus a static fallback page at each old URL)

No blanket redirect to Home. Each old URL goes to the page that now holds its content.

| Old URL | New URL | Why |
|---|---|---|
| `/products/` | `/products/lynxdock/` | one product page |
| `/mission-control/` | `/products/lynxdock/` | a static "Mission Control" snapshot must not read as current health; its feature list is in the tour |
| `/compare/` | `/products/lynxdock/` | competitor comparison removed |
| `/architecture/` | `/technology/#architecture` | rewritten architecture |
| `/features/` | `/roadmap/` | future features belong to the roadmap |
| `/vision/` | `/company/` | mission and principles |
| `/community/` | `/support/` | contact and follow-along channels |
| `/docs/self-hosting/` | `/products/lynxdock-host/` | one canonical Host explanation |
| `/docs/communities/` | `/products/lynxdock/` | described "Quick Calls" (P2P), which is not the architecture |
| `/docs/faq/` | `/products/lynxdock/#faq` | FAQ moved to the product page |

## Kept, out of primary navigation (engineering background and history)

Linked from `/docs/` ("Engineering background and history"). Each carries a dated note saying what era it
describes. Their content is unchanged apart from that note.

- `/guides/operations/`: the illustrated V5 walkthrough (captures of build 0.1.0+5a53bff, 2026-09-20);
- `/docs/architecture/`, `/docs/developers/`, `/docs/bootstrap/`: monorepo and spec-pipeline notes;
- `/products/studio/`, `/products/bootstrap/`, `/genesis/`, `/design-system/`: Studio, Bootstrap, GSpec and
  Genesis implementation detail and attribution.

## Kept unchanged

- `/privacy/` and `/terms/`: page files untouched; any change to their text is the owner's.
- Every `/blog/<slug>/` URL (23 posts). Posts are dated history; each now shows a "written on" note.
- `/rss.xml` (drafts excluded), `/.well-known/security.txt`, the favicons, `og.png`, every screenshot and logo.
- The release data files, unchanged: `public/beta-0.2.6.json`, `public/v6-candidate.json`,
  `public/beta-manifest.json`, `public/releases.json`, and `src/data/closedBeta.ts`, `v6Candidate.ts`,
  `release026.ts`, `betaDownloads.ts`, plus `betaSigning.mjs` and its tests.
- The GSpec-generated data files (`src/data/siteNavigation.ts`, `siteMetadata.ts`, `companyInfo.ts`, ...) are not
  hand-edited. The redesign's navigation lives in a new hand-maintained file (`src/data/siteShell.ts`).

## Release records

One small source, `src/data/siteStatus.ts`, holds the stage, platform, next-release state, the published
release kept in the archive, push-to-talk scope and known limitations. Every page reads it. Owner rule
(2026-10-21): only releases that were actually published to testers appear on the site; anything signed but not
published, its hashes and its remaining acceptance steps stay in the product repository's internal records.

- **Current state:** "The next tester release is in qualification and is not yet available for distribution."
  (the V8 generation, provisionally 0.3.0). The installer state is "unavailable".
- **0.2.6** (`desktop-v0.2.6`, `facc36a`): published on this site on 2026-10-07, signed. It moves into the
  tester hub's dated archive and keeps its live, verified links, SHA-256 values, notes and known issues.
- **V6 candidate.1c, V5 closed beta, 0.1.0 installers:** dated archive entries, identification only, as before.

## Removed or rewritten claims

- "Quick P2P calls" / peer-to-peer rooms: removed. Media goes participant-to-service (LiveKit, or coturn TURN).
- Linux, macOS, Docker and portable-build promises on `/download/`: removed (Windows only today).
- The "Version 2 / infrastructure complete / desktop under construction / V5 cleared" site banner: removed and
  replaced by the verified status source.
- `/compare/` (vs Discord): removed.
- The ZIP-era (V5 portable) install instructions: archived inside the V5 round on `/beta/`.
- Unsupported performance or "lightweight" figures in the system-requirements table: removed.
