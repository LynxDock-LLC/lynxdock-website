// Generated from GSpec. Do not edit manually.
// Source: gspec/modules/{website,company,products,brand}.yaml
// Regenerate with: lynxdock-bootstrap  ->  npm run generate

export type OpenGraphDefaults = {
  type: string;
  url: string;
  siteName: string;
  title: string;
  description: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
};

export type SiteMetadata = {
  name: string;
  domain: string;
  url: string;
  title: string;
  description: string;
  motto: string;
  githubOrg: string;
  primaryProduct: { name: string; href: string };
  openGraph: OpenGraphDefaults;
};

export const siteMetadata: SiteMetadata = {
  name: "LynxDock",
  domain: "lynxdock.app",
  url: "https://lynxdock.app",
  title: "LynxDock - Built for People. Not Platforms.",
  description: "LynxDock brings voice, chat, screen sharing, server hosting, and community tools together in a privacy-first app built to stay out of your way.",
  motto: "Built for People. Not Platforms.",
  githubOrg: "https://github.com/LynxDock-LLC",
  primaryProduct: { name: "LynxDock", href: "/products/lynxdock/" },
  openGraph: {
    type: "website",
    url: "https://lynxdock.app/",
    siteName: "LynxDock",
    title: "LynxDock - Built for People. Not Platforms.",
    description: "LynxDock brings voice, chat, screen sharing, server hosting, and community tools together in a privacy-first app built to stay out of your way.",
    image: "/og.png",
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: "LynxDock - Built for People. Not Platforms.",
  },
};

export default siteMetadata;
