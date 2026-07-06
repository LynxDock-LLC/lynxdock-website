# Auto-Update Architecture (design)

Design only - **not implemented**. Captures how a future LynxDock updater would
work so today's release data model already supports it.

## Updater manifest

A small, stable JSON the app polls (a superset of `releases.json`), per channel:

```json
{
  "channel": "alpha",
  "version": "0.1.0-alpha",
  "releaseDate": "2026-08-01",
  "notesUrl": "https://lynxdock.app/releases/",
  "platforms": {
    "windows": { "url": "...", "sha256": "...", "size": "12.4 MB" }
  }
}
```

Every field here already exists in `releases.yaml` / `releases.ts`, so the
updater manifest is a projection of the same source of truth.

## Version comparison

- Versions follow **semver** with a pre-release tag (`0.1.0-alpha`).
- The client compares its running version against the channel manifest; a
  higher version means an update is available.
- Pre-release ordering: `alpha < beta < rc < stable` for the same core version.

## Release channels

- The user picks a channel (`nightly`/`alpha`/`beta`/`stable`).
- The updater only offers builds from the selected channel, so stable users are
  never pushed pre-release code.

## Integrity

- Every artifact carries a **`sha256`**; the updater verifies the download
  before applying it. Mismatch = abort.
- Downloads are HTTPS-only from the published release URL.

## Rollback

- The updater keeps the previous known-good version on disk.
- If a new version fails a health check on first launch, it rolls back to the
  prior version and reports the failure.

## Delta updates (future)

- Ship binary diffs between adjacent versions to shrink download size.
- Fall back to the full artifact when no delta path exists or verification
  fails.

## Status

Design only. The data model (`releases.yaml` -> `releases.ts` +
`releases.json`) is intentionally shaped to support all of the above without
schema changes.
