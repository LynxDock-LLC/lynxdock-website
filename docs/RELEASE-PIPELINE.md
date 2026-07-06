# Release Pipeline (design)

How a LynxDock build becomes a live download. **Not yet implemented** - this
documents the intended flow so the pieces are ready.

```
GitHub Release ──▶ GitHub Action ──▶ releases.json ──▶ Website ──▶ Download Center ──▶ Users
```

## Source of truth

- **GSpec** (`gspec/modules/releases.yaml`) declares channels, platforms, the
  current version, and per-platform artifact placeholders.
- **Bootstrap** (`website-releases` generator) compiles that into:
  - `src/data/releases.ts` - typed, build-time source the site renders.
  - `public/releases.json` - the runtime manifest (placeholder today).

## Intended CI flow (to build later)

1. A maintainer publishes a **GitHub Release** (e.g. `v0.1.0-alpha`) with the
   platform artifacts attached (`LynxDockSetup.exe`, `LynxDock.AppImage`,
   `LynxDock.dmg`, `lynxdock-server.tar.gz`).
2. A **GitHub Action** triggers on `release: published`:
   - reads the release's assets (name, size, browser_download_url);
   - computes/collects each `sha256`;
   - writes an updated `public/releases.json` with `released: true`,
     `releaseDate`, and each download's `url`/`sha256`/`size`/`available: true`;
   - optionally opens a PR (or commits) to the website repo, or publishes the
     manifest to a stable URL.
3. Cloudflare Pages rebuilds; the **Download Center** now renders real,
   enabled download buttons - no code change required.

## Why a manifest as well as `releases.ts`

- `releases.ts` is consumed at **build time** for the statically-exported site.
- `public/releases.json` is a stable, machine-readable endpoint for **external
  consumers**: the future auto-updater, package tooling, or status checks -
  things that must not depend on a site rebuild.

## Manifest shape (`public/releases.json`)

```json
{
  "current": { "version": "0.1.0-alpha", "channel": "alpha", "released": false },
  "downloads": [
    { "platform": "windows", "filename": "LynxDockSetup.exe", "url": "", "sha256": "", "size": "", "available": false }
  ]
}
```

CI will fill `url`, `sha256`, `size`, and flip `available`/`released`.
