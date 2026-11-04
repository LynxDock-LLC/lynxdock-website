import MovedPage, { movedMetadata } from "@/components/site/MovedPage";

// Moved in the October 2026 redesign (docs/REDESIGN-2026-10-MIGRATION.md). public/_redirects sends a 301 first.
export const metadata = movedMetadata("FAQ", "/products/lynxdock/#faq");

export default function Moved() {
  return (
    <MovedPage
      title="FAQ"
      to="/products/lynxdock/#faq"
      toLabel="the product FAQ"
      why="Frequently asked questions are now on the product page."
    />
  );
}
