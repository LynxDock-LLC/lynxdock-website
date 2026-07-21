// Epic-level roadmap for LynxDock V2. Hand-maintained on the website.
// Mirrors docs/EPICS.md in the product monorepo.
//
// NOTE (2026-07-13): this file is AHEAD of docs/EPICS.md, and that was verified
// against the CODE, not the docs. docs/EPICS.md, docs/VERSIONS.md and the
// monorepo CHANGELOG are all STALE — they understate what has shipped:
//   Epic 3 (Networking): crates/auth + crates/presence exist (EPICS.md lists
//     both as planned); outbox.ts (+test) implements the offline queue;
//     server-connection.ts resolves display names and calls markRead over the
//     wire; crates/migrate has backup/restore; messaging has export/import and
//     FTS5; docker-compose.yml + docs/SELF-HOSTING.md exist.
//   Epic 5 (Voice): all five phases shipped, incl. hardening.
//   Epic 9 (Mission Control): ADR-0015..0020, absent from EPICS.md entirely.
// Do NOT "correct" this file down to match EPICS.md. Fix EPICS.md instead.

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
    status: "completed",
    description:
      "Real-time voice and screen sharing over an SFU (LiveKit), with a clean two-plane split between control and media — delivered across five phases, hardening included.",
    highlights: [
      "Control plane: call roster with join / leave / mute / screen-share state broadcast live",
      "Room-scoped access tokens and TURN credentials issued server-side",
      "Audio media: microphone publish, remote audio, active-speaker ring, deafen",
      "Input and output device pickers, with autoplay unblocking handled",
      "Screen sharing: publish, subscribe, and a multi-tile viewer",
      "Hardening: connection state, classified errors with retry, per-participant quality dots",
    ],
    future: "File transfer over the same media plane is next (Version 2.3).",
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
  {
    n: "Epic 9",
    title: "Mission Control & Observability",
    status: "in-progress",
    description:
      "One honest view of the whole system: a shared status contract, a live hub every module reports into, and an event timeline — so health, activity and progress are observable rather than guessed at.",
    highlights: [
      "System status contract with a worst-wins health roll-up, generated to a single artifact",
      "Mission Control hub: modules, metrics and entities aggregated into one state",
      "Live server feed over the WebSocket hub — connections, active voice rooms, host CPU/RAM",
      "Commander reporting: squadrons and operations, created from the desktop app",
      "Event bus and timeline: retained event history replayed into a live activity log",
      "Studio session observer: development sessions reported into the same hub",
    ],
    future:
      "Dashboards, an integration layer, and AI Workforce views are designed and next.",
  },
];

export default epics;
