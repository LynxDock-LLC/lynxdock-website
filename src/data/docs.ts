export type DocLink = { href: string; label: string };
export type DocSection = { title: string; links: DocLink[] };

export const docsNav: DocSection[] = [
  {
    title: "Getting started",
    links: [
      { href: "/docs/", label: "Overview" },
      { href: "/docs/getting-started/", label: "Quickstart" },
      { href: "/docs/architecture/", label: "Architecture" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/docs/self-hosting/", label: "Self-hosting a server" },
      { href: "/docs/communities/", label: "Calls & communities" },
      { href: "/docs/bootstrap/", label: "Bootstrap basics" },
    ],
  },
  {
    title: "Reference",
    links: [
      { href: "/docs/developers/", label: "Developers" },
      { href: "/docs/faq/", label: "FAQ" },
    ],
  },
];
