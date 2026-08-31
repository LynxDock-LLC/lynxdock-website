// Epic-level roadmap for LynxDock V2. Hand-maintained on the website.
// Mirrors docs/EPICS.md in the product monorepo.
//
// NOTE (2026-08-30): this file is AHEAD of docs/EPICS.md, and that was verified
// against the CODE and the dated closeout reports, not the stale docs. The
// authoritative current-state source is the monorepo's docs/NEXT-STEPS.md plus
// docs/reports/* (Host V1 parity, Owner Experience P1-P9, Voice/TURN acceptance
// #6, security hardening, ADR-0027 tactical S1-S7, Authenticode integration).
// Do NOT "correct" this file down to match the older EPICS.md/VERSIONS.md/
// CHANGELOG — fix those instead.
//
// Reconciled 2026-08-30 to reflect what actually shipped over the August work:
//   Networking is COMPLETE; Communities/Servers/Roles is IN PROGRESS (server-wide
//   roles + first-class channels landed; friends/DMs still to come); Voice is
//   COMPLETE incl. self-hosted TURN proven end-to-end in real CI; Tactical
//   Operations and the Server Host owner app are COMPLETE; Release & Distribution
//   is IN PROGRESS (CI installers + signed component supply chain shipped;
//   Authenticode signing integrated, owner Azure provisioning pending).

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
    future: "Now synced over the network in Epic 3.",
  },
  {
    n: "Epic 3",
    title: "Networking",
    status: "completed",
    description:
      "Messaging made real-time over a self-hostable server: a WebSocket hub, live sync, and resilience on flaky connections.",
    highlights: [
      "WebSocket hub transport + RPC, Argon2 auth, presence",
      "Server-backed read state with live cross-device sync",
      "Offline outbox: queues while disconnected, drains on reconnect",
      "Self-hostable Rust server with schema migrations, backup, export & import",
      "Network posture: invite-gated registration, per-IP auth rate limits",
    ],
    future: "Hardened to the beta bar by the 2026-08 security pass (attachment-path fix, RPC rate limiting, supply-chain gate).",
  },
  {
    n: "Epic 4",
    title: "Communities, Servers & Roles",
    status: "in-progress",
    description:
      "Persistent self-hosted communities with a real permission model: server-wide roles, first-class channels, and owner-managed membership.",
    highlights: [
      "Server-wide roles: named, colored, ordered, with capability tokens (forward-extensible; unknown tokens round-trip)",
      "Multiple roles per member; a protected Owner that always keeps administrator",
      "First-class channels + categories — text, voice, and tactical kinds",
      "Member administration + role assignment, capability-gated in the client",
      "Invite-gated membership; the server is the single authority (client never trusted)",
    ],
    future: "Friends, direct messages, and cross-server presence are next.",
  },
  {
    n: "Epic 5",
    title: "Voice & Screen Sharing",
    status: "completed",
    description:
      "Real-time voice and screen sharing over a self-hosted SFU (LiveKit), with a clean two-plane split between control and media — and NAT traversal that actually works, proven end to end.",
    highlights: [
      "Control plane: live call roster with join / leave / mute / deafen / screen-share state",
      "Audio media, active-speaker ring, input/output device pickers, autoplay unblocking",
      "Screen sharing: publish, subscribe, multi-tile viewer",
      "Self-hosted TURN (LynxDock-built coturn) with room-scoped, time-limited credentials",
      "Real RFC 5766 relay allocation proven in CI; unauthenticated allocation denied (no open relay)",
    ],
    future: "File transfer over the same media plane is planned.",
  },
  {
    n: "Epic 6",
    title: "Tactical Operations",
    status: "completed",
    description:
      "Squadron Control — a live tactical operations board in the same app as your comms. A shared operating picture that stays consistent across every connected member.",
    highlights: [
      "Command tree, wings, unit nodes, zones, routes with waypoints, objectives, orders, alerts",
      "Owned layered sketches, tactical graphics, on-board measurements, and temporary marks",
      "Per-viewer visibility with label/color editing; working → Mission promotion",
      "Commander archive/fade with a replay-visible record; Mission Log + after-action review",
      "Real-time convergence across clients, verified end to end (ADR-0027, closed at Sprint 7)",
    ],
  },
  {
    n: "Epic 7",
    title: "Server Host",
    status: "completed",
    description:
      "A dedicated owner application that makes self-hosting approachable — create and run a real LynxDock server without config files or the terminal.",
    highlights: [
      "Overview command center: health verdict, readiness score, one-click fixes",
      "Members, roles, channels, and a server profile (icon, banner, rules, landing channel, join preview)",
      "Invites, online backups & recovery points, connectivity, and diagnostics",
      "Make Reachable with round-trip proof; honest network posture (double-NAT / CGNAT / manual)",
      "Voice/TURN control with verified component acquisition; live health, lifecycle, and recovery",
    ],
    future: "V1 Server Host parity reached; owner UI/UX acceptance passed (2026-08).",
  },
  {
    n: "Epic 8",
    title: "Release & Distribution",
    status: "in-progress",
    description:
      "Getting trustworthy builds onto machines: CI installers, a verified component supply chain, and Windows code signing.",
    highlights: [
      "CI-built Windows installers (MSI + NSIS) for the desktop app and the Server Host",
      "ed25519-signed component manifest + verify-before-execute; public component origin",
      "Windows Authenticode via Azure Artifact Signing wired into CI (fail-closed, gated)",
    ],
    future: "Owner Azure provisioning enables the first signed release; an auto-updater follows.",
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
      "Event bus and timeline: retained event history replayed into a live activity log",
    ],
    future:
      "Dashboards, an integration layer, and AI Workforce views are designed and next.",
  },
  {
    n: "Epic 10",
    title: "AI & Automation",
    status: "planned",
    description:
      "Agents and tools wired into the workspace, built on the @lynxdock/ai tool contracts.",
    highlights: ["Tool contracts", "Workspace-aware agents"],
  },
  {
    n: "Epic 11",
    title: "Plugins",
    status: "planned",
    description:
      "Third-party extensibility via the @lynxdock/plugins SDK — a capability model and plugin host.",
    highlights: ["Plugin SDK & manifest", "Capability model"],
    future: "The point at which the packages begin publishing to a registry.",
  },
  {
    n: "Epic 12",
    title: "Studio",
    status: "planned",
    description:
      "The engineering environment, including GSpec Studio, matured into a real tool for building on the platform.",
    highlights: ["GSpec Studio", "In-browser spec validation"],
  },
];

export default epics;
