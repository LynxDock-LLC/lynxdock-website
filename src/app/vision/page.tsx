import MovedPage, { movedMetadata } from "@/components/site/MovedPage";

// Moved in the October 2026 redesign (docs/REDESIGN-2026-10-MIGRATION.md). public/_redirects sends a 301 first.
export const metadata = movedMetadata("Vision", "/company/");

export default function Moved() {
  return (
    <MovedPage
      title="Vision"
      to="/company/"
      toLabel="the company page"
      why="The mission and principles are now on the company page."
    />
  );
}
