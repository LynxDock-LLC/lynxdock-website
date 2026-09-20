// V5 closed-beta gallery — authentic application captures (PrintWindow of the app's own windows, no
// desktop, no compositing tricks) taken from the qualified build 0.1.0+5a53bff running against an
// ISOLATED demo server on 2026-09-20. Everything on screen is staged demonstration data: the
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
    src: "/screenshots/v5/tactical-board.png",
    alt: "Squadron Control tactical board showing a staged convoy-escort operation: seven wings of hand-placed units, rally, staging, area-of-operations, danger, extraction and casualty zones, five routes, live alerts and the objective summary",
    title: "The whole operation on one board",
    caption:
      "Operation Halcyon Convoy, staged on the demo server: 32 units across seven wings (command, escort, transport, scouts, medical, recovery, logistics), six zones, five colour-coded routes with waypoint progress, two live alerts and the objective rollup (25/32 ready · 1 down · 2/7 objectives complete). Positions are placed by hand — LynxDock does not read the game.",
    width: 1600,
    height: 900,
    wide: true,
  },
  {
    src: "/screenshots/v5/tactical-orders.png",
    alt: "The same tactical board with the Orders panel open, listing three issued orders beside the live picture",
    title: "Orders beside the picture they describe",
    caption:
      "Orders are issued from the board and land next to the units they concern — here the convoy hold, the escort screen and the casualty pickup — each with its receipt state.",
    width: 1600,
    height: 900,
  },
  {
    src: "/screenshots/v5/tactical-routes.png",
    alt: "The tactical board with the Routes panel open, showing five routes with kind, status and waypoint progress",
    title: "Routes with waypoint progress",
    caption:
      "Supply, escort, recon, search and medical routes, each assigned to a unit or a whole wing, with named waypoints and a per-route progress counter.",
    width: 1600,
    height: 900,
  },
  {
    src: "/screenshots/v5/operations-roster.png",
    alt: "The Operations page for the live operation: my participation panel (RSVP, check-in, unit, operational state, ship, fuel/ammo/hull) and the roster grouped by wing with status badges",
    title: "Operations — participation and readiness",
    caption:
      "Each member's RSVP, check-in, unit, crew station, ship and resource state, and the roster grouped by wing with per-member operational status — the source the board, the dock and the overlay all read from.",
    width: 1600,
    height: 900,
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
