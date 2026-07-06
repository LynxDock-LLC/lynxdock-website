// Generated from GSpec. Do not edit manually.
// Source: gspec/modules/products.yaml
// Regenerate with: lynxdock-bootstrap  ->  npm run generate

export type ProductFeature = { title: string; description: string; icon: string };
export type ProductCta = {
  label: string;
  href: string;
  variant: "primary" | "secondary" | "ghost";
  external?: boolean;
};
export type ProductShot = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  width: number;
  height: number;
};
export type ProductDetail = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  stage: string;
  status: string;
  href: string;
  intro: string;
  features: ProductFeature[];
  ctas: ProductCta[];
  screenshots: ProductShot[];
};

export const productDetails: Record<string, ProductDetail> = {
  "lynxdock": {
    slug: "lynxdock",
    name: "LynxDock",
    tagline: "Calls and communities, without the weight",
    summary: "A lightweight communication platform for voice, chat, and screen sharing. Start a quick P2P call or settle into a self-hosted, persistent community - your accounts and data stay with the server you choose.",
    stage: "Core Product",
    status: "in-development",
    href: "/products/lynxdock/",
    intro: "Calls and communities, without the weight. A lightweight platform for voice, chat, and screen sharing - from spontaneous P2P calls to fully self-hosted communities you own.",
    features: [
      { title: "Quick Calls", description: "Temporary P2P rooms for voice, chat, and screen sharing. Start now, share a code, and disappear after inactivity.", icon: "bolt" },
      { title: "Persistent Servers", description: "A self-hosted home with accounts, rooms, history, and admin controls. Accounts and data stay with the server you choose.", icon: "server" },
      { title: "Guided Server Setup", description: "A calm first-run wizard creates a local server with SQLite, safe self-hosting defaults, and a random session secret.", icon: "shield" },
      { title: "Communities & Squadrons", description: "Text and voice channels, member rosters, and a mission-control command view for organizing people at any scale.", icon: "users" },
    ],
    ctas: [
      { label: "View on GitHub", href: "https://github.com/LynxDock-LLC", variant: "primary", external: true },
      { label: "Read the Docs", href: "/docs/", variant: "secondary" },
    ],
    screenshots: [
      { src: "/screenshots/community-connect.webp", alt: "LynxDock connect screen offering a Quick Call or a persistent self-hosted server", label: "LynxDock - Connect", caption: "Start a Quick Call, or connect to a persistent community server.", width: 1341, height: 916 },
      { src: "/screenshots/server-setup.webp", alt: "LynxDock Guided Server Setup wizard with server basics, network, and storage settings", label: "LynxDock - Guided Server Setup", caption: "Generate a real config with safe self-hosting defaults - no terminal required.", width: 1124, height: 805 },
      { src: "/screenshots/mission-control.webp", alt: "LynxDock squadron command view with wing readiness and a live command tree", label: "LynxDock - Squadron / Mission Control", caption: "Organize communities into wings and squadrons with a live command tree.", width: 1600, height: 1044 },
    ],
  },
  "studio": {
    slug: "studio",
    name: "LynxDock Studio",
    tagline: "An AI-assisted development workspace",
    summary: "A connected workspace for planning, documentation, and engineering knowledge. Link ideas, sprints, architecture, and research into one navigable graph - with AI assistance that respects your context.",
    stage: "In Development",
    status: "in-development",
    href: "/products/studio/",
    intro: "An AI-assisted development workspace. Plan, document, and connect engineering knowledge into a single graph - with AI that understands your context.",
    features: [
      { title: "Connected knowledge graph", description: "Docs, sprints, architecture, research, and decisions linked into one navigable map instead of scattered files.", icon: "layers" },
      { title: "AI grounded in your context", description: "Assistance that draws on your project's own knowledge - not generic answers detached from your work.", icon: "cpu" },
      { title: "Engineering hubs", description: "Dedicated spaces for architecture, design, QA, and technical debt keep the whole project legible.", icon: "code" },
      { title: "Private by design", description: "Your workspace, your data. Studio follows the same privacy-first principles as the rest of LynxDock.", icon: "shield" },
    ],
    ctas: [
      { label: "Track on the Roadmap", href: "/roadmap/", variant: "primary" },
    ],
    screenshots: [
      { src: "/screenshots/studio-graph.webp", alt: "LynxDock Studio knowledge graph view showing hundreds of linked notes across dashboards, engineering, research, and documentation", label: "LynxDock Studio - Knowledge Graph", caption: "A living graph of everything your project knows - dashboards, architecture, research, and decisions, all connected.", width: 1600, height: 1310 },
    ],
  },
  "bootstrap": {
    slug: "bootstrap",
    name: "LynxDock Bootstrap",
    tagline: "Automation engine for product foundations",
    summary: "The engine that scaffolds repositories, documentation, and product foundations automatically - turning a blank slate into a structured, ready-to-build project in minutes.",
    stage: "In Development",
    status: "in-development",
    href: "/products/bootstrap/",
    intro: "The automation engine for product foundations. Bootstrap creates repositories, documentation, and product scaffolding automatically - so building starts from structure, not a blank page.",
    features: [
      { title: "Repository scaffolding", description: "Generate clean, consistent repositories with sensible structure and configuration from the start.", icon: "server" },
      { title: "Documentation foundations", description: "Bootstrap READMEs, guides, and knowledge bases so projects start documented, not empty.", icon: "layers" },
      { title: "Product foundations", description: "Templates and automation that turn an idea into a structured, ready-to-build product foundation.", icon: "cpu" },
      { title: "One-command genesis", description: "Go from a blank slate to a working foundation in minutes - the engine that started this very website.", icon: "bolt" },
    ],
    ctas: [
      { label: "Track on the Roadmap", href: "/roadmap/", variant: "primary" },
    ],
    screenshots: [],
  },
};

export function getProductDetail(slug: string): ProductDetail | undefined {
  return productDetails[slug];
}

export default productDetails;
