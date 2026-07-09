// Epic-level roadmap for LynxDock V2. Hand-maintained on the website.
// Mirrors docs/EPICS.md in the product monorepo.

export type EpicStatus = "completed" | "in-progress" | "planned";

export type Epic = {
  n: string;
  title: string;
  status: EpicStatus;
  description: string;
  highlights: string[];
  future?: string;
};

export const epics: Epic[] = [
  {
    n: "Epic 0",
    title: "Foundation & Runtime",
    status: "completed",
    description:
      "The infrastructure the whole platform is built on: a polyglot monorepo, generated protocol types, shared libraries, CI, and a publish-gated release pipeline.",
    highlights: [
      "pnpm + Turborepo monorepo, Rust Cargo workspace",
      "@lynxdock/shared, @lynxdock/protocol (Rust ↔ TypeScript via ts-rs)",
      "@lynxdock/gspec with a Golden-IR contract test and browser support",
      "CI (JS + Rust) and Changesets release pipeline",
    ],
  },
  {
    n: "Epic 1",
    title: "Workspace & Identity",
    status: "completed",
    description:
      "The top-level container and who you are, stored locally. Everything else hangs off the workspace.",
    highlights: [
      "Local workspace (name, icon) as the root container",
      "Profile: display name, avatar color, Rust-side validation",
      "Settings applied live: theme engine, reduced motion, privacy status",
      "Desktop sidebar: Workspace → Profile → Settings",
    ],
  },
  {
    n: "Epic 2",
    title: "Local Messaging",
    status: "completed",
    description:
      "A full local-first chat client — the messaging layer everything networked now builds on. Workspace → Channel → Message.",
    highlights: [
      "Channels and messages: compose, edit, delete",
      "Reactions, @-mentions, and local file attachments",
      "Full-text search (SQLite FTS5) with channel and attachment filters",
      "Unread counts, previews, day separators, relative timestamps",
    ],
    future: "Now syncing over the network in Epic 3.",
  },
  {
    n: "Epic 3",
    title: "Networking",
    status: "in-progress",
    description:
      "Making messaging real-time over a self-hostable server: a WebSocket hub, live sync, and resilience on flaky connections.",
    highlights: [
      "WebSocket hub transport + RPC",
      "Server-backed read state with live cross-device sync",
      "User display-name resolution over the wire",
      "Offline outbox: queues while disconnected, drains on reconnect",
      "Self-hostable server (Rust / axum) with backup, export & import",
    ],
    future: "Built on the protocol contracts already generated in Epic 0.",
  },
  {
    n: "Epic 4",
    title: "Communities & Servers",
    status: "planned",
    description:
      "Friends, servers, and shared channels over the network, with membership and roles.",
    highlights: ["Friends & presence", "Servers & membership", "Roles & permissions"],
  },
  {
    n: "Epic 5",
    title: "Voice & Screen Sharing",
    status: "in-progress",
    description:
      "Real-time voice and screen sharing over an SFU (LiveKit), with a clean two-plane split between control and media.",
    highlights: [
      "Audio media plane: join, device selection, deafen",
      "Screen sharing",
      "SFU via LiveKit; control and media planes separated",
    ],
    future: "Arriving ahead of the original roadmap order.",
  },
  {
    n: "Epic 6",
    title: "AI & Automation",
    status: "planned",
    description:
      "Agents and tools wired into the workspace, built on the @lynxdock/ai tool contracts.",
    highlights: ["Tool contracts", "Workspace-aware agents"],
  },
  {
    n: "Epic 7",
    title: "Plugins",
    status: "planned",
    description:
      "Third-party extensibility via the @lynxdock/plugins SDK — a capability model and plugin host.",
    highlights: ["Plugin SDK & manifest", "Capability model"],
    future: "The point at which the packages begin publishing to a registry.",
  },
  {
    n: "Epic 8",
    title: "Studio",
    status: "planned",
    description:
      "The engineering environment, including GSpec Studio, matured into a real tool for building on the platform.",
    highlights: ["GSpec Studio", "In-browser spec validation"],
  },
];

export default epics;
