import MovedPage, { movedMetadata } from "@/components/site/MovedPage";

// Moved in the October 2026 redesign (docs/REDESIGN-2026-10-MIGRATION.md). public/_redirects sends a 301 first.
export const metadata = movedMetadata("LynxDock products", "/products/lynxdock/");

export default function Moved() {
  return (
    <MovedPage
      title="LynxDock products"
      to="/products/lynxdock/"
      toLabel="the LynxDock app"
      why="There is now one product page: the LynxDock app, with LynxDock Host on its own page."
    />
  );
}
