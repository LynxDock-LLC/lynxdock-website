import type { ReactNode } from "react";

/**
 * A stand-in for reviewed wording that does not exist yet (keyed-beta preparation, 2026-11-06: no draft legal or
 * privacy text enters the repository before review, so the layout uses a clearly labelled fixture instead). It names
 * what the reviewed text must cover, renders visibly in review builds, and scripts/check-site.mjs fails any
 * production build that still contains one, like an [OWNER] field. Replace each one with the reviewed wording; never
 * fill one with drafted text.
 */
export default function Fixture({ children }: { children: ReactNode }) {
  return <mark className="owner-field">[INTERNAL FIXTURE - DO NOT PUBLISH: {children}]</mark>;
}
