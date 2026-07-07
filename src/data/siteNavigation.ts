// Generated from GSpec. Do not edit manually.
// Source: gspec/modules/website.yaml
// Regenerate with: lynxdock-bootstrap  ->  npm run generate

export type NavLink = { label: string; href: string };
export type NavCta = { id: string; label: string; href: string; external?: boolean };
export type FooterColumn = { title: string; links: NavLink[] };
export type SiteNavigation = {
  primary: NavLink[];
  cta: NavCta[];
  footer: { columns: FooterColumn[]; utility: NavLink[] };
};

export const siteNavigation: SiteNavigation = {
  primary: [
  { label: "Mission Control", href: "/mission-control/" },
  { label: "Products", href: "/products/" },
  { label: "Roadmap", href: "/roadmap/" },
  { label: "Architecture", href: "/architecture/" },
  { label: "Docs", href: "/docs/" },
  { label: "Blog", href: "/blog/" },
  { label: "Community", href: "/community/" },
  ],
  cta: [

  ],
  footer: {
    columns: [
    {
      title: "Product",
      links: [
        { label: "LynxDock", href: "/products/lynxdock/" },
        { label: "Mission Control", href: "/mission-control/" },
        { label: "LynxDock Studio", href: "/products/studio/" },
        { label: "LynxDock Bootstrap", href: "/products/bootstrap/" },
        { label: "Download", href: "/download/" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "/docs/" },
        { label: "Architecture", href: "/architecture/" },
        { label: "Roadmap", href: "/roadmap/" },
        { label: "Releases", href: "/releases/" },
        { label: "Future Features", href: "/features/" },
        { label: "Blog", href: "/blog/" },
        { label: "Community", href: "/community/" },
        { label: "vs Discord", href: "/compare/" },
        { label: "Support", href: "/support/" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/company/" },
        { label: "Vision", href: "/vision/" },
        { label: "Privacy", href: "/privacy/" },
        { label: "Terms", href: "/terms/" },
      ],
    },
    ],
    utility: [
    { label: "Design System", href: "/design-system/" },
    ],
  },
};

export default siteNavigation;
