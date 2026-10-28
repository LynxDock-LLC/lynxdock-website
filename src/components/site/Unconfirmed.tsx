import type { ReactNode } from "react";

/**
 * A claim about where a submission or an email ends up (delivered, stored, forwarded, read) that has not been
 * evidenced (owner instruction 2026-10-27: leave submission and routing claims unconfirmed until evidence is supplied;
 * a form that shows a success state is not evidence of delivery). It renders the claim visibly as unconfirmed in review
 * builds, and scripts/check-site.mjs fails any production build that still contains one, like an [OWNER] field.
 */
export default function Unconfirmed({ children }: { children: ReactNode }) {
  return <mark className="owner-field">[UNCONFIRMED: {children}]</mark>;
}
