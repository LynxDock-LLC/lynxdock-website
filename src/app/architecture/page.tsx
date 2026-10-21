import MovedPage, { movedMetadata } from "@/components/site/MovedPage";

// Moved in the October 2026 redesign (docs/REDESIGN-2026-10-MIGRATION.md). public/_redirects sends a 301 first.
export const metadata = movedMetadata("Architecture", "/technology/#architecture");

export default function Moved() {
  return (
    <MovedPage
      title="Architecture"
      to="/technology/#architecture"
      toLabel="the technology page"
      why="The architecture is now described on the technology page."
    />
  );
}
