// Generated from GSpec. Do not edit manually.
// Source: gspec/modules/roadmap.yaml
// Regenerate with: lynxdock-bootstrap  ->  npm run generate

export type RoadmapPhase = {
  phase: string;
  title: string;
  description: string;
  status: "shipped" | "active" | "planned";
  items?: string[];
};

export const roadmap: RoadmapPhase[] = [
  {
    phase: "2026",
    title: "Genesis foundation",
    description:
      "The design system, brand, and this site - the shared foundation the whole ecosystem is built on.",
    status: "shipped",
  },
  {
    phase: "2026",
    title: "Core app",
    description:
      "The lightweight LynxDock client - accounts, servers, channels, and the app shell.",
    status: "active",
  },
  {
    phase: "2026",
    title: "Private alpha",
    description:
      "Real-time voice, chat, and screen sharing, tested with a small group before wider release.",
    status: "active",
  },
  {
    phase: "2026",
    title: "Private beta",
    description:
      "Wider testing of self-hosted servers, communities, and Mission Control.",
    status: "planned",
  },
  {
    phase: "2026",
    title: "Public beta",
    description:
      "Open desktop builds for Windows, Linux, and macOS.",
    status: "planned",
  },
  {
    phase: "2026",
    title: "Plugin ecosystem",
    description:
      "An extension surface so the community can build on LynxDock.",
    status: "planned",
  },
];
