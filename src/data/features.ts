export type Feature = {
  title: string;
  description: string;
  icon: string;
};

// Core principles - the "why LynxDock exists" pillars
export const principles: Feature[] = [
  {
    title: "Privacy by default",
    description:
      "No surveillance, no data harvesting, no dark patterns. Your accounts and data stay with the server you choose - not ours.",
    icon: "shield",
  },
  {
    title: "Performance first",
    description:
      "Lightweight by design. Fast to launch, light on resources, and calm to use - even on modest hardware.",
    icon: "bolt",
  },
  {
    title: "Self-hosting, made simple",
    description:
      "A guided setup wizard generates a real config with sensible defaults - no config files or terminal commands required.",
    icon: "server",
  },
  {
    title: "You own your space",
    description:
      "Persistent servers with accounts, rooms, history, and admin controls that belong to you and your community.",
    icon: "lock",
  },
  {
    title: "Built for builders",
    description:
      "Developer-grade tooling across the ecosystem - from mission-control dashboards to an AI-assisted knowledge workspace.",
    icon: "cpu",
  },
  {
    title: "One coherent ecosystem",
    description:
      "LynxDock, Studio, and Bootstrap share one design language and one philosophy: built for people, not platforms.",
    icon: "layers",
  },
];

// Feature highlights for the LynxDock product page
export const lynxdockFeatures: Feature[] = [
  {
    title: "Quick Calls",
    description:
      "Temporary P2P rooms for voice, chat, and screen sharing. Start now, share a code, and disappear after inactivity.",
    icon: "bolt",
  },
  {
    title: "Persistent Servers",
    description:
      "A self-hosted home with accounts, rooms, history, and admin controls. Accounts and data stay with the server you choose.",
    icon: "server",
  },
  {
    title: "Guided Server Setup",
    description:
      "A calm first-run wizard creates a local server with SQLite, safe self-hosting defaults, and a random session secret.",
    icon: "shield",
  },
  {
    title: "Communities & Squadrons",
    description:
      "Text and voice channels, member rosters, and a mission-control command view for organizing people at any scale.",
    icon: "users",
  },
];
