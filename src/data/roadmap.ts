export type RoadmapPhase = {
  phase: string;
  title: string;
  description: string;
  status: "shipped" | "active" | "planned";
  items?: string[];
};

// Canonical roadmap - shared by the homepage roadmap section and the
// /roadmap page so both always tell the same story.
export const roadmap: RoadmapPhase[] = [
  {
    phase: "2026",
    title: "Genesis",
    description:
      "The foundation: LynxDock communication, self-hosting, and Mission Control.",
    status: "active",
  },
  {
    phase: "2026",
    title: "LynxDock Studio",
    description: "The AI-assisted knowledge workspace comes online.",
    status: "active",
  },
  {
    phase: "2026",
    title: "Public beta",
    description: "Open desktop builds for Windows, Linux, and macOS.",
    status: "planned",
  },
  {
    phase: "2026",
    title: "Plugins",
    description:
      "An extension surface so the community can build on LynxDock.",
    status: "planned",
  },
  {
    phase: "2026",
    title: "Marketplace",
    description: "A home for community plugins, themes, and templates.",
    status: "planned",
  },
  {
    phase: "2026",
    title: "Mobile",
    description:
      "LynxDock on the devices you carry, with the same ownership guarantees.",
    status: "planned",
  },
];
