# Release Pipeline (design)

How a LynxDock build becomes a live download. **Not yet implemented** - this
documents the intended flow so the pieces are ready.

```
GitHub Release ──▶ release-tools ──▶ releases.json ──▶ Bootstrap ──▶ Website ──▶ Users
```

## Repository responsibilities (kept intentionally modular)

- **gspec** - describes products and **release policy** (channels, platforms,
  the current version, artifact placeholders) in `modules/releases.yaml`.
- **bootstrap** - the **compiler**. Turns specifications into website/app
  assets. It does *not* talk to CI or GitHub. Its `website-releases` generator
  emits `src/data/releases.ts` (build-time source) and a placeholder
  `public/releases.json`.
- **release-tools** *(planned, not built)* - the only component that touches
  **CI, GitHub Releases, checksums, installers, signing, and manifests**. It
  produces the real `releases.json`. Keeping this separate stops Bootstrap from
  becoming a "do everything" project.
- **website** - **renders** whatever release data exists. No assumptions.

## Intended flow (to build later)

1. A maintainer publishes a **GitHub Release** (e.g. `v0.1.0-alpha`) with the
   platform artifacts attached (`LynxDockSetup.exe`, `LynxDock.AppImage`,
   `LynxDock.dmg`, `lynxdock-server.tar.gz`).
2. **release-tools** runs in CI on `release: published`:
   - reads the release assets (name, size, `browser_download_url`);
   - computes/collects each `sha256`; handles signing where applicable;
   - writes an updated `releases.json` with `released: true`, `releaseDate`,
     and each download's `url`/`sha256`/`size`/`available: true`;
   - publishes that manifest to a stable URL and/or commits it to the website.
3. **Bootstrap** consumes GSpec + the manifest; Cloudflare Pages rebuilds; the
   **Download Center** renders real, enabled download buttons - no code change.

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

Bootstrap emits this placeholder today; **release-tools** will fill `url`,
`sha256`, `size`, and flip `available`/`released` from real GitHub Releases.
