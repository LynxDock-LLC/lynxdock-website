import MovedPage, { movedMetadata } from "@/components/site/MovedPage";

// Moved in the October 2026 redesign (docs/REDESIGN-2026-10-MIGRATION.md). public/_redirects sends a 301 first.
export const metadata = movedMetadata("Self-hosting a server", "/products/lynxdock-host/");

export default function Moved() {
  return (
    <MovedPage
      title="Self-hosting a server"
      to="/products/lynxdock-host/"
      toLabel="LynxDock Host"
      why="Running a community server is now explained on the LynxDock Host page."
    />
  );
}
