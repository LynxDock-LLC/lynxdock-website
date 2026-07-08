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
    title: "Messaging that's yours",
    description:
      "Channels with edits, reactions, @-mentions, and file attachments - stored locally first and synced to the server you choose.",
    icon: "users",
  },
  {
    title: "Voice & screen share",
    description:
      "Real-time audio and screen sharing over an SFU media plane, with device selection and deafen. Talk and show, not just type.",
    icon: "bolt",
  },
  {
    title: "Works offline",
    description:
      "An outbox queues messages when you're disconnected and drains automatically on reconnect - so a flaky network never costs you a message.",
    icon: "shield",
  },
  {
    title: "Instant full-text search",
    description:
      "Find any message in a moment with a full-text index. Scope to one channel or all of them, and filter to messages with files.",
    icon: "cpu",
  },
  {
    title: "Persistent self-hosted servers",
    description:
      "Accounts, rooms, history, and admin controls on infrastructure you run - with live cross-device read sync. Your space, your data.",
    icon: "server",
  },
  {
    title: "Guided Server Setup",
    description:
      "A calm first-run wizard creates a real server with SQLite, safe self-hosting defaults, and a random session secret - no terminal.",
    icon: "lock",
  },
];
