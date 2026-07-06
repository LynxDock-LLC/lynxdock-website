// Generated from GSpec. Do not edit manually.
// Source: gspec/modules/products.yaml
// Regenerate with: lynxdock-bootstrap  ->  npm run generate

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  stage: string;
  href: string;
};

export const products: Product[] = [
  {
    slug: "lynxdock",
    name: "LynxDock",
    tagline: "The flagship communication app",
    summary:
      "LynxDock is the flagship: a lightweight communication app for voice, chat, and screen sharing. Start a quick P2P call or run a self-hosted, persistent community - your accounts and data stay with the server you choose.",
    stage: "Core Product",
    href: "/products/lynxdock/",
  },
  {
    slug: "studio",
    name: "LynxDock Studio",
    tagline: "The ecosystem IDE",
    summary:
      "The IDE for the LynxDock ecosystem - an AI-assisted workspace that links docs, sprints, architecture, and research into one navigable knowledge graph.",
    stage: "In Development",
    href: "/products/studio/",
  },
  {
    slug: "bootstrap",
    name: "LynxDock Bootstrap",
    tagline: "The GSpec compiler",
    summary:
      "The compiler for the ecosystem - it reads the Genesis Specification and generates the website, docs, and project scaffolding automatically, from a single source of truth.",
    stage: "In Development",
    href: "/products/bootstrap/",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
