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
    status: "in-progress",
    description:
      "The first real chat client — local only, no networking yet. Workspace → Channel → Message.",
    highlights: [
      "Channels and messages persisted per-workspace",
      "Compose, edit, delete, and search",
      "Unread counts, previews, day separators, relative timestamps",
    ],
    future: "Reactions, mentions, and local attachments before networking lands.",
  },
  {
    n: "Epic 3",
    title: "Networking",
    status: "planned",
    description:
      "Turn local messaging real-time: a WebSocket transport, protocol handshake, authentication, and a self-hostable server.",
    highlights: ["WebSocket transport", "Protocol handshake + auth", "Local server (Rust / axum)"],
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
    status: "planned",
    description:
      "Real-time voice and screen sharing over WebRTC, coordinated by an SFU. Signaling contracts are already stubbed in the protocol.",
    highlights: ["WebRTC voice", "Screen sharing", "SFU coordination"],
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
