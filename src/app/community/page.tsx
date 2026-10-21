import MovedPage, { movedMetadata } from "@/components/site/MovedPage";

// Moved in the October 2026 redesign (docs/REDESIGN-2026-10-MIGRATION.md). public/_redirects sends a 301 first.
export const metadata = movedMetadata("Community", "/support/");

export default function Moved() {
  return (
    <MovedPage
      title="Community"
      to="/support/"
      toLabel="the support page"
      why="Ways to get in touch and follow development are now on the support page."
    />
  );
}
