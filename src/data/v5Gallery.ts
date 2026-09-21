// V5 closed-beta gallery — authentic application captures (PrintWindow of the app's own windows, no
// desktop, no compositing tricks) taken from the qualified build 0.1.0+5a53bff running against an
// ISOLATED demo server on 2026-09-20. The tactical, roster, requests and debrief shots come from the
// staged run documented step by step in /guides/operations/ (lossless WebP of the 1920×1080 originals,
// which live under /screenshots/v5/guide/full/). Everything on screen is staged demonstration data: the
// organisation ("Vega Reach Consortium"), its 32 members, messages, positions and statuses are
// fictional and were seeded through the product's own RPCs. Nothing is live game telemetry. The
// Verse Catalog contents come from the Star Citizen Wiki API (CC BY-SA 4.0) via the built-in provider.
export interface GalleryShot {
  src: string;
  alt: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  /** Full-width placement (the board and the overlay strips read better wide). */
  wide?: boolean;
}

export const v5GalleryNote =
  "Every screenshot below is the real desktop application, captured from the qualified V5 build against an isolated demo server. The organisation, members, messages and positions are staged demonstration data — nothing here is live game telemetry, and no real community's data appears.";

export const v5Gallery: GalleryShot[] = [
  {
    src: "/screenshots/v5/guide/51-live-board-en-route.webp",
    alt: "Squadron Control tactical board, live in the En route phase: the convoy of five haulers inside the WP2 objective area with a six-fighter escort screen in two rows, scouts ahead near Port Tressler, medical at the casualty LZ, recovery at the debris field, logistics at the staging harbour, colour-coded routes that do not cross, and the objectives panel open",
    title: "The whole operation on one board",
    caption:
      "Operation Halcyon Convoy live, staged on the demo server: staging → transit → objective → extraction laid out left to right, recovery and the casualty LZ below, one colour per wing, five routes with waypoint progress and the summary card (28/32 ready · 1/6 objectives complete · 8 wings). Positions are placed by hand — LynxDock does not read the game.",
    width: 1920,
    height: 1080,
    wide: true,
  },
  {
    src: "/screenshots/v5/guide/61-hold-recovery-zoom.webp",
    alt: "The board zoomed on the recovery area with the Orders panel open: a warning alert about a debris strike, the disabled hauler in the debris field beside the recovery ship, and the issued hold order",
    title: "Alerts and orders beside the picture they describe",
    caption:
      "A debris strike at WP2: the alert card, CARAVAN-2 down in the debris field with SALVOR-1 alongside, Mercy at the LZ, and the hold order in the Orders panel — zoomed with the mouse wheel, as any member would.",
    width: 1920,
    height: 1080,
  },
  {
    src: "/screenshots/v5/guide/52-live-routes-panel.webp",
    alt: "The live tactical board with the Routes panel open: Caravan moving 2/5, Talon moving 2/4, LYNX-1 moving 1/3, SALVOR-1 holding 0/4, MERCY-1 holding 0/4",
    title: "Routes with waypoint progress",
    caption:
      "Supply, escort, recon, search and medical routes, each assigned to a unit or a whole wing, with named waypoints, a status and a per-route progress counter; the contingency routes hold until they are needed.",
    width: 1920,
    height: 1080,
  },
  {
    src: "/screenshots/v5/guide/42-staging-roster.webp",
    alt: "The Operations page while staging: the operation banner, My participation with check-in, operational state, location and fuel/ammo/hull, and the roster grouped by wing with everyone checked in and Operational",
    title: "Operations — participation and readiness",
    caption:
      "Each member's check-in, unit, crew station, ship and resource state, reported from their own client, and the roster grouped by wing with per-member operational status — the source the board, the dock and the overlay all read from.",
    width: 1920,
    height: 1080,
  },
  {
    src: "/screenshots/v5/guide/74-incident-support-requests.webp",
    alt: "The Requests tab: quick-request buttons (Medical, Repair, Rearm, Refuel, Resupply, Recovery, Escort, Under attack, Attacking, Intel) and two support requests — a critical recovery in progress and a high-priority refuel that is open with a Take button",
    title: "Support requests",
    caption:
      "A hauler at 14 % fuel raises a refuel request; the logistics operator sees it beside the recovery already in progress and takes it. The full incident, from request to the logistics ledger, is walked through in the guide.",
    width: 1920,
    height: 1080,
  },
  {
    src: "/screenshots/v5/my-dock.png",
    alt: "My Dock: the active operation card with readiness steps, needs-your-action items, operation-at-risk items and the logistics queue",
    title: "My Dock — what needs you, right now",
    caption:
      "The personal queue: readiness steps for the active operation (assignment, check-in, ship, comms), items that need your action, what puts the operation at risk, and logistics requests waiting on your decision.",
    width: 1600,
    height: 900,
  },
  {
    src: "/screenshots/v5/missions.png",
    alt: "In-game missions list with three active missions showing progress, location, risk, reward, team slots and Join / Complete / Details actions",
    title: "Missions",
    caption:
      "Missions inside the operation — escort, recovery and casualty evacuation — with progress, location, risk, reward and team slots. Every state change here is a guarded, idempotent action.",
    width: 1600,
    height: 900,
  },
  {
    src: "/screenshots/v5/logistics.png",
    alt: "Logistics overview with counters for available, reserved, checked out, active requests, pending approvals, active transfers, low stock, and recent stock activity",
    title: "Logistics",
    caption:
      "Stock by location, requirements for the operation, a resupply request approved and reserved against a carrier, and a transfer in transit — with the audit trail of every adjustment.",
    width: 1600,
    height: 900,
  },
  {
    src: "/screenshots/v5/guide/84-close-debrief.webp",
    alt: "The Debrief tab of the completed operation: planned vs actual counts for confirmations, check-ins, orders, requests, assets and preflight, lifecycle chips with times, and the filterable timeline",
    title: "Debrief, computed from what actually happened",
    caption:
      "After Complete: planned vs actual, the lifecycle with timestamps, and a timeline of every durable event — check-ins, orders and receipts, requests, logistics — filterable by stage, kind, person and unit, with notes, lessons and actions written underneath.",
    width: 1920,
    height: 1080,
  },
  {
    src: "/screenshots/v5/ops-channel.png",
    alt: "The operation's text channel with a staged mission conversation and the member list showing 30 members online with role badges and custom statuses",
    title: "Comms with the command structure visible",
    caption:
      "The mission room for the operation: the staged conversation, the assigned-comms banner, and 30 simulated members online with their roles and statuses in the sidebar.",
    width: 1600,
    height: 900,
  },
  {
    src: "/screenshots/v5/verse-catalog.png",
    alt: "Verse Catalog searching for Gladius: card results for ships, components, paints and weapons with manufacturer and summary, 80 matches, patch 4.10.0-LIVE",
    title: "Verse Catalog",
    caption:
      "Patch-aware reference data — ships, components, commodities, locations, missions — imported into the demo server from the Star Citizen Wiki API (CC BY-SA 4.0): 17,029 entities for patch 4.10.0-LIVE. Every value names the provider it came from; search answers in a few milliseconds.",
    width: 1600,
    height: 900,
  },
  {
    src: "/screenshots/v5/overlay-compact.png",
    alt: "The in-game overlay window in Compact layout: operation name, open request count, primary action and eight numbered quick actions",
    title: "In-game overlay — Compact",
    caption:
      "The second, click-through window: the live operation, open requests, the current primary action and up to eight numbered quick actions, drawn over a windowed or borderless game. Captured from the overlay window itself.",
    width: 998,
    height: 162,
    wide: true,
  },
  {
    src: "/screenshots/v5/overlay-micro.png",
    alt: "The in-game overlay window in Micro layout: a single line with the operation name, open requests and the primary action",
    title: "In-game overlay — Micro",
    caption: "The same overlay in its one-line layout for pilots who want only the primary action in view.",
    width: 998,
    height: 126,
    wide: true,
  },
  {
    src: "/screenshots/v5/overlay-settings.png",
    alt: "Settings → Game overlay: activation sources, the interaction binding, Quick Action and Pointer/Menu controls, monitor, position, layout, scale and opacity",
    title: "Overlay controls",
    caption:
      "How you open it, the interaction binding, the two separate controls (Quick Action fires without taking the mouse; Pointer / Menu hands the cursor over deliberately), per-monitor placement, layout, scale and opacity — and the honest note that exclusive fullscreen cannot show an overlay of this kind.",
    width: 1600,
    height: 900,
  },
];
