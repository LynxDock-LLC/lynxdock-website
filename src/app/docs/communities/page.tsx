import MovedPage, { movedMetadata } from "@/components/site/MovedPage";

// Moved in the October 2026 redesign (docs/REDESIGN-2026-10-MIGRATION.md). public/_redirects sends a 301 first.
export const metadata = movedMetadata("Calls and communities", "/products/lynxdock/");

export default function Moved() {
  return (
    <MovedPage
      title="Calls and communities"
      to="/products/lynxdock/"
      toLabel="the LynxDock app"
      why="Communications and communities are now covered in the product tour."
    />
  );
}
