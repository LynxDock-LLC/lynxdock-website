export type RoadmapPhase = {
  phase: string;
  title: string;
  description: string;
  status: "shipped" | "active" | "planned";
  items?: string[];
};

// Canonical roadmap - shared by the homepage roadmap section and the
// /roadmap page so both always tell the same story. Focused on the road
// to the LynxDock communication app.
export const roadmap: RoadmapPhase[] = [
  {
    phase: "2026",
    title: "Genesis foundation",
    description:
      "The shared design system, brand, and this site - the base the whole app is built on.",
    status: "shipped",
  },
  {
    phase: "2026",
    title: "Core app",
    description:
      "The lightweight LynxDock client: accounts, servers, channels, and the app shell.",
    status: "active",
  },
  {
    phase: "2026",
    title: "Voice & chat alpha",
    description:
      "Real-time voice, text chat, and screen sharing land in an early, invite-only alpha.",
    status: "active",
  },
  {
    phase: "2026",
    title: "Private beta",
    description:
      "Invite-only testing of self-hosted servers, communities, and Mission Control.",
    status: "planned",
  },
  {
    phase: "2026",
    title: "Public beta",
    description: "Open desktop builds for Windows, Linux, and macOS.",
    status: "planned",
  },
  {
    phase: "2026",
    title: "Plugin ecosystem",
    description:
      "An extension surface so the community can build on and around LynxDock.",
    status: "planned",
  },
];
