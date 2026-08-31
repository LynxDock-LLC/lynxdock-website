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
    title: "Core app & self-hosted server",
    description:
      "The lightweight LynxDock client and a self-hostable Rust server - accounts, channels, real-time messaging with offline sync, and backup/restore.",
    status: "shipped",
  },
  {
    phase: "2026",
    title: "Voice, tactical & communities",
    description:
      "Real-time voice and screen sharing with a self-hosted TURN relay, the Squadron Control tactical board, and server-wide roles with first-class text, voice, and tactical channels.",
    status: "shipped",
  },
  {
    phase: "2026",
    title: "Server Host",
    description:
      "A dedicated owner console for running a self-hosted server - guided setup, members, roles, channels, invites, backups, connectivity, and diagnostics.",
    status: "shipped",
  },
  {
    phase: "2026",
    title: "Private beta",
    description:
      "Preparing signed installers and a trusted-squadron cohort - Windows code signing is being wired up now.",
    status: "active",
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
