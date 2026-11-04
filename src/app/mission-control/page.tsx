import MovedPage, { movedMetadata } from "@/components/site/MovedPage";

// Moved in the October 2026 redesign (docs/REDESIGN-2026-10-MIGRATION.md). public/_redirects sends a 301 first.
export const metadata = movedMetadata("Mission Control", "/products/lynxdock/");

export default function Moved() {
  return (
    <MovedPage
      title="Mission Control"
      to="/products/lynxdock/"
      toLabel="the product tour"
      why="The operations features that used to be described here are now part of the product tour."
    />
  );
}
