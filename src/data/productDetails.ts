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
    tagline: "The flagship communication app",
    summary: "LynxDock is the flagship: a lightweight communication app for voice, chat, and screen sharing. Start a quick P2P call or run a self-hosted, persistent community - your accounts and data stay with the server you choose.",
    stage: "Core Product",
    status: "in-development",
    href: "/products/lynxdock/",
    intro: "The flagship LynxDock app. Voice, chat, and screen sharing - from a spontaneous P2P call to a fully self-hosted community you own.",
    features: [
      { title: "Quick Calls", description: "Temporary P2P rooms for voice, chat, and screen sharing. Start now, share a code, and disappear after inactivity.", icon: "bolt" },
      { title: "Persistent Servers", description: "A self-hosted home with accounts, rooms, history, and admin controls. Accounts and data stay with the server you choose.", icon: "server" },
      { title: "Guided Server Setup", description: "A calm first-run wizard creates a local server with SQLite, safe self-hosting defaults, and a random session secret.", icon: "shield" },
      { title: "Communities & Squadrons", description: "Text and voice channels, member rosters, and a mission-control command view for organizing people at any scale.", icon: "users" },
    ],
    ctas: [
      { label: "Download", href: "/download/", variant: "primary" },
      { label: "Documentation", href: "/docs/", variant: "secondary" },
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
    tagline: "The ecosystem IDE",
    summary: "The IDE for the LynxDock ecosystem - an AI-assisted workspace that links docs, sprints, architecture, and research into one navigable knowledge graph.",
    stage: "In Development",
    status: "in-development",
    href: "/products/studio/",
    intro: "The ecosystem IDE. Plan, document, and connect engineering knowledge into a single graph - with AI that understands your context.",
    features: [
      { title: "Connected knowledge graph", description: "Docs, sprints, architecture, research, and decisions linked into one navigable map instead of scattered files.", icon: "layers" },
      { title: "AI grounded in your context", description: "Assistance that draws on your project's own knowledge - not generic answers detached from your work.", icon: "cpu" },
      { title: "Engineering hubs", description: "Dedicated spaces for architecture, design, QA, and technical debt keep the whole project legible.", icon: "code" },
      { title: "Private by design", description: "Your workspace, your data. Studio follows the same privacy-first principles as the rest of LynxDock.", icon: "shield" },
    ],
    ctas: [
      { label: "View Roadmap", href: "/roadmap/", variant: "primary" },
    ],
    screenshots: [
      { src: "/screenshots/studio-graph.webp", alt: "LynxDock Studio knowledge graph view showing hundreds of linked notes across dashboards, engineering, research, and documentation", label: "LynxDock Studio - Knowledge Graph", caption: "A living graph of everything your project knows - dashboards, architecture, research, and decisions, all connected.", width: 1600, height: 1310 },
    ],
  },
  "bootstrap": {
    slug: "bootstrap",
    name: "LynxDock Bootstrap",
    tagline: "The GSpec compiler",
    summary: "The compiler for the ecosystem - it reads the Genesis Specification and generates the website, docs, and project scaffolding automatically, from a single source of truth.",
    stage: "In Development",
    status: "in-development",
    href: "/products/bootstrap/",
    intro: "The compiler for the LynxDock ecosystem. Bootstrap reads the Genesis Specification and generates the website, docs, and project scaffolding - so everything stays consistent from one source of truth.",
    features: [
      { title: "Reads the specification", description: "Bootstrap parses and validates GSpec, then compiles it - no hand-maintained config drifting out of sync.", icon: "server" },
      { title: "Generates the website", description: "Product data, design tokens, metadata, navigation, and company copy are all generated from the specification.", icon: "layers" },
      { title: "Scaffolds projects", description: "Repositories, documentation, and product foundations, created with consistent structure from the start.", icon: "cpu" },
      { title: "One source of truth", description: "Everything downstream is generated, so the whole ecosystem stays coherent as it grows.", icon: "bolt" },
    ],
    ctas: [
      { label: "View Roadmap", href: "/roadmap/", variant: "primary" },
    ],
    screenshots: [],
  },
};

export function getProductDetail(slug: string): ProductDetail | undefined {
  return productDetails[slug];
}

export default productDetails;
