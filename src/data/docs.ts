export type DocLink = { href: string; label: string };
export type DocSection = { title: string; links: DocLink[] };

// Documentation navigation. The current pages come first; the engineering background pages are kept for
// history and attribution (each says which era it describes) and stay out of the primary navigation.
export const docsNav: DocSection[] = [
  {
    title: "Getting started",
    links: [
      { href: "/docs/", label: "Overview" },
      { href: "/docs/getting-started/", label: "Quickstart" },
      { href: "/beta/", label: "Tester hub" },
    ],
  },
  {
    title: "Product",
    links: [
      { href: "/products/lynxdock/", label: "The LynxDock app" },
      { href: "/products/lynxdock-host/", label: "LynxDock Host" },
      { href: "/technology/", label: "Technology & capabilities" },
      { href: "/releases/", label: "Release status" },
    ],
  },
  {
    title: "Guides",
    links: [{ href: "/guides/operations/", label: "Plan, deploy & coordinate an operation (V5)" }],
  },
  {
    title: "Engineering background",
    links: [
      { href: "/docs/architecture/", label: "Monorepo architecture (July 2026)" },
      { href: "/docs/developers/", label: "Developers (July 2026)" },
      { href: "/docs/bootstrap/", label: "Bootstrap basics" },
      { href: "/products/bootstrap/", label: "LynxDock Bootstrap" },
      { href: "/products/studio/", label: "LynxDock Studio" },
      { href: "/genesis/", label: "Genesis: the first website" },
      { href: "/design-system/", label: "Genesis design system" },
    ],
  },
];
