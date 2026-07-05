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
    tagline: "Calls and communities, without the weight",
    summary:
      "A lightweight communication platform for voice, chat, and screen sharing. Start a quick P2P call or settle into a self-hosted, persistent community - your accounts and data stay with the server you choose.",
    stage: "Core Product",
    href: "/products/lynxdock/",
  },
  {
    slug: "studio",
    name: "LynxDock Studio",
    tagline: "An AI-assisted development workspace",
    summary:
      "A connected workspace for planning, documentation, and engineering knowledge. Link ideas, sprints, architecture, and research into one navigable graph - with AI assistance that respects your context.",
    stage: "In Development",
    href: "/products/studio/",
  },
  {
    slug: "bootstrap",
    name: "LynxDock Bootstrap",
    tagline: "Automation engine for product foundations",
    summary:
      "The engine that scaffolds repositories, documentation, and product foundations automatically - turning a blank slate into a structured, ready-to-build project in minutes.",
    stage: "In Development",
    href: "/products/bootstrap/",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
