import type { ReactNode } from "react";

/**
 * A fact only the owner can supply (a retention period, a contact address, a date). It renders visibly in review
 * builds so it cannot be missed, and scripts/check-site.mjs fails any production build that still contains one.
 */
export default function OwnerField({ children }: { children: ReactNode }) {
  return <mark className="owner-field">[OWNER: {children}]</mark>;
}
