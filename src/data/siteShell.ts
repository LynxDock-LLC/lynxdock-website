// Header and footer navigation for the redesigned site (hand-maintained).
//
// The GSpec-generated `siteNavigation.ts` is left untouched; it describes the previous information architecture.
// If gspec/modules/website.yaml is updated to match, this file can be replaced by its generated output.

export type ShellLink = { label: string; href: string };

export const headerLinks: ShellLink[] = [
  { label: "Product", href: "/products/lynxdock/" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Company", href: "/company/" },
  { label: "Updates", href: "/blog/" },
];

export const betaAccessLink: ShellLink = { label: "Beta access", href: "/download/" };

/** No-JS destination of every "Request a demo" control; with JS it opens the demo dialog instead. */
export const demoLink: ShellLink = { label: "Request a demo", href: "/support/#request-demo" };

export const footerColumns: { title: string; links: ShellLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "App", href: "/products/lynxdock/" },
      { label: "Host", href: "/products/lynxdock-host/" },
      { label: "Beta access", href: "/download/" },
      { label: "Product direction", href: "/roadmap/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Technology & capabilities", href: "/technology/" },
      { label: "Documentation", href: "/docs/" },
      { label: "Quickstart", href: "/docs/getting-started/" },
      { label: "Release status", href: "/releases/" },
      { label: "Support", href: "/support/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/company/" },
      { label: "Updates", href: "/blog/" },
      { label: "Business enquiries", href: "/company/#contact" },
    ],
  },
];

export const legalLinks: ShellLink[] = [
  { label: "Privacy", href: "/privacy/" },
  { label: "Terms", href: "/terms/" },
];

export const githubOrg = "https://github.com/LynxDock-LLC";

/** The published support contact (also on /beta/ since the V5 round, and in GSpec company.yaml). */
export const supportEmail = "admin@lynxdock.app";
