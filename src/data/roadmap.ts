export type RoadmapPhase = {
  phase: string;
  title: string;
  description: string;
  status: "shipped" | "active" | "planned";
  items?: string[];
};

export const roadmap: RoadmapPhase[] = [
  {
    phase: "Phase 01",
    title: "Foundations",
    description:
      "The core LynxDock communication experience and self-hosting story.",
    status: "active",
    items: [
      "Quick Calls — temporary P2P voice, chat, and screen share",
      "Persistent, self-hosted servers with accounts and history",
      "Guided Server Setup wizard with safe defaults",
      "Squadron / mission-control community view",
    ],
  },
  {
    phase: "Phase 02",
    title: "Studio",
    description:
      "The AI-assisted development workspace for planning and knowledge.",
    status: "active",
    items: [
      "Connected knowledge graph across docs, sprints, and research",
      "AI assistance grounded in your own project context",
      "Architecture, engineering, and design hubs",
    ],
  },
  {
    phase: "Phase 03",
    title: "Bootstrap",
    description:
      "Automation that turns a blank slate into a structured foundation.",
    status: "planned",
    items: [
      "Automated repository and documentation scaffolding",
      "Product foundation templates",
      "One-command project genesis",
    ],
  },
  {
    phase: "Phase 04",
    title: "Ecosystem",
    description:
      "Deeper integration across LynxDock, Studio, and Bootstrap.",
    status: "planned",
    items: [
      "Shared identity and cross-product workflows",
      "Public documentation and developer guides",
      "Community-driven extensions",
    ],
  },
];
