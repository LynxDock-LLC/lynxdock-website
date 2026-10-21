import MovedPage, { movedMetadata } from "@/components/site/MovedPage";

// Moved in the October 2026 redesign (docs/REDESIGN-2026-10-MIGRATION.md). public/_redirects sends a 301 first.
export const metadata = movedMetadata("Future features", "/roadmap/");

export default function Moved() {
  return (
    <MovedPage
      title="Future features"
      to="/roadmap/"
      toLabel="product direction"
      why="Planned and possible features are now on the product direction page."
    />
  );
}
