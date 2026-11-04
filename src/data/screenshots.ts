// The real product screenshots the redesign uses, with their provenance. Captions say what each image is: an
// earlier development interface and, where it applies, simulated demonstration data. None of them shows the
// V8 interface or a release that is not yet available.

export type Shot = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Short provenance label shown on or under the image. */
  label: string;
  caption: string;
};

const V5_DEMO =
  "Earlier development interface: V5 closed beta (build 0.1.0+5a53bff), captured 20 September 2026 on a staged demo server. Every member, ship and position is simulated demonstration data.";

export const shots = {
  board: {
    src: "/screenshots/v5/guide/51-live-board-en-route.webp",
    width: 1920,
    height: 1080,
    alt: "The LynxDock tactical board during a simulated convoy operation. An assigned-comms banner offers to join the Command net muted; the board shows staging, objective, transit and extraction zones joined by routes, with escort, transport, scout, medical and recovery units placed along them; a side panel lists objectives with their status; a summary card reads en route, 28 of 32 units ready.",
    label: "Demonstration data · earlier interface",
    caption: V5_DEMO,
  },
  boardPlanning: {
    src: "/screenshots/v5/guide/30-plan-board-staging.webp",
    width: 1920,
    height: 1080,
    alt: "The tactical board in the planning phase: all units gathered in the staging zone, routes drawn to the objective and extraction zones, and every objective still pending.",
    label: "Demonstration data · earlier interface",
    caption: V5_DEMO,
  },
  roster: {
    src: "/screenshots/v5/guide/42-staging-roster.webp",
    width: 1920,
    height: 1080,
    alt: "An operation in staging: the member's own participation (RSVP going, checked in, unit, operational state, location and fuel, ammunition and hull reported by the player), with the roster below grouped by unit and each member's operational status.",
    label: "Demonstration data · earlier interface",
    caption: V5_DEMO,
  },
  preflight: {
    src: "/screenshots/v5/guide/44-staging-preflight.webp",
    width: 1920,
    height: 1080,
    alt: "An operation's preflight check in staging: a go verdict with no blockers, one warning and one suggestion, the sources it checked, and findings such as voice rooms planned on a server with no media service configured. Above it, the member's check-in, operational state and reported fuel, ammunition and hull.",
    label: "Demonstration data · earlier interface",
    caption: V5_DEMO,
  },
  comms: {
    src: "/screenshots/v5/ops-channel.png",
    width: 1600,
    height: 900,
    alt: "An operation text channel with call-sign messages from escort, transport, recovery and medical members, a Join voice control above the messages, and the member list with roles and reported status on the right.",
    label: "Demonstration data · earlier interface",
    caption: V5_DEMO,
  },
  commsNets: {
    src: "/screenshots/v5/guide/41-staging-comms.webp",
    width: 1920,
    height: 1080,
    alt: "The Comms tab of an operation: an operation chat channel and the Staging and Command voice nets, each with who can join, and the start policy that opens staging and prompts assigned members to join at the scheduled time.",
    label: "Demonstration data · earlier interface",
    caption: V5_DEMO,
  },
  myDock: {
    src: "/screenshots/v5/my-dock.png",
    width: 1600,
    height: 900,
    alt: "My Dock, a member's personal view: the active operation with the member's assignment and comms nets, a readiness checklist (assignment and check-in done, ship and comms outstanding), actions waiting on the member, and items that put the operation at risk.",
    label: "Demonstration data · earlier interface",
    caption: V5_DEMO,
  },
  debrief: {
    src: "/screenshots/v5/guide/84-close-debrief.webp",
    width: 1920,
    height: 1080,
    alt: "The debrief of a completed operation: planned versus actual attendance, orders issued and acknowledged, requests resolved, the phase timestamps from published to completed, and the start of the operation timeline with filters.",
    label: "Demonstration data · earlier interface",
    caption: V5_DEMO,
  },
  overlay: {
    src: "/screenshots/v5/overlay-compact.png",
    width: 998,
    height: 162,
    alt: "The compact in-game overlay: the operation name, six open requests, and a numbered row of quick actions such as Start mission, Log progress, On my way and Take it.",
    label: "Demonstration data · earlier interface",
    caption: V5_DEMO,
  },
  overlaySettings: {
    src: "/screenshots/v5/overlay-settings.png",
    width: 1600,
    height: 900,
    alt: "Game overlay settings: how the overlay opens, the interaction binding, quick-action and pointer controls, monitor, position, layout, scale and opacity, and a notice that the game must run windowed or borderless because nothing can draw above exclusive fullscreen.",
    label: "Earlier interface",
    caption:
      "Earlier development interface: V5 closed beta (build 0.1.0+5a53bff), captured 20 September 2026. The settings explain that the overlay is a click-through window and that it needs windowed or borderless mode.",
  },
  hostDashboard: {
    src: "/screenshots/server-host-dashboard.png",
    width: 542,
    height: 589,
    alt: "LynxDock Host's server dashboard before the first start: status, health, mode and relay tiles, a startup checklist, the server's local and network addresses with copy buttons, and Start, Restart and Stop controls.",
    label: "Interface example · July 2026",
    caption:
      "Interface example from an earlier Host development build (July 2026). The current Host's layout differs.",
  },
  hostSetup: {
    src: "/screenshots/server-host-setup.png",
    width: 1089,
    height: 949,
    alt: "LynxDock Host's guided server setup: five steps (purpose, basics, access, relay, start), server basics with invite-only registration, network and storage defaults, and the call and screen-share relay options.",
    label: "Interface example · July 2026",
    caption:
      "Interface example from an earlier Host development build (July 2026). The current Host's layout differs.",
  },
} satisfies Record<string, Shot>;
