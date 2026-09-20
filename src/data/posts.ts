/**
 * Two content types, deliberately kept separate:
 *   devlog  - technical updates from the build
 *   founder - company progress, direction, milestones
 * `tag` is the primary topic shown on the card; `topics` drives filtering.
 * Both new fields are optional so existing posts stay valid untouched.
 */
export type PostKind = "devlog" | "founder";

export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  readingTime: string;
  excerpt: string;
  tag: string;
  kind?: PostKind; // defaults to "devlog"
  topics?: string[];
  featured?: boolean;
  author?: string; // defaults to DEFAULT_AUTHOR
  /**
   * Series name, e.g. "LynxBench Research". Part numbers are DERIVED from
   * publication order (see seriesInfo) rather than stored - hand-numbered parts
   * go stale the moment a post is inserted, reordered, or unpublished.
   */
  series?: string;
  body: string[]; // paragraphs
};

/**
 * Founder Journal entries carry a personal byline; engineering, security,
 * release, architecture, AI, research and LynxBench posts are attributed to the
 * team. Keeps the journal's voice clear without making every technical article
 * read as a personal essay. An explicit `author` on a post always wins.
 */
export const FOUNDER_AUTHOR = "Jared Haga";
export const TEAM_AUTHOR = "The LynxDock Team";

export const postAuthor = (p: Post): string =>
  p.author ?? (postKind(p) === "founder" ? FOUNDER_AUTHOR : TEAM_AUTHOR);

/** Shown in the article footer block. Unknown authors get no role line. */
const AUTHOR_ROLES: Record<string, string> = {
  [FOUNDER_AUTHOR]: "Founder, LynxDock",
  [TEAM_AUTHOR]: "Engineering, LynxDock",
};
export const postAuthorRole = (p: Post): string | null =>
  AUTHOR_ROLES[postAuthor(p)] ?? null;

export const postKind = (p: Post): PostKind => p.kind ?? "devlog";

/* ---------------------------------------------------------------- series -- */

export type SeriesInfo = {
  name: string;
  part: number; // 1-based, oldest first
  total: number;
  /** The next entry chronologically, if one exists. */
  next: Post | null;
};

/** Every post in a series, oldest first - that is the reading order. */
export function seriesPosts(name: string): Post[] {
  return posts
    .filter((p) => p.series === name)
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Every series currently in use, with its length. */
export function allSeries(): { name: string; total: number }[] {
  const counts = new Map<string, number>();
  for (const p of posts) {
    if (p.series) counts.set(p.series, (counts.get(p.series) ?? 0) + 1);
  }
  return [...counts]
    .map(([name, total]) => ({ name, total }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Returns null for a post with no series, and also for a "series" of one -
 * "Part 1 of 1" is noise. The badge appears on its own once a second entry
 * ships, which is the point at which it starts meaning something.
 */
export function seriesInfo(post: Post): SeriesInfo | null {
  if (!post.series) return null;
  const entries = seriesPosts(post.series);
  if (entries.length < 2) return null;
  const idx = entries.findIndex((p) => p.slug === post.slug);
  if (idx === -1) return null;
  return {
    name: post.series,
    part: idx + 1,
    total: entries.length,
    next: entries[idx + 1] ?? null,
  };
}

/** Every topic in use, for filter chips. Primary tag counts as a topic. */
export function allTopics(list: Post[] = posts): string[] {
  const seen = new Set<string>();
  for (const p of list) {
    seen.add(p.tag);
    for (const t of p.topics ?? []) seen.add(t);
  }
  return [...seen].sort();
}

export const postTopics = (p: Post): string[] =>
  [...new Set([p.tag, ...(p.topics ?? [])])];

/**
 * Related articles, ranked by shared topics then recency. Falls back to the
 * newest posts when nothing overlaps, so the section is never empty.
 */
export function relatedPosts(slug: string, limit = 3): Post[] {
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];
  const mine = new Set(postTopics(current));
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: postTopics(p).filter((t) => mine.has(t)).length,
    }))
    .sort(
      (a, b) => b.score - a.score || b.post.date.localeCompare(a.post.date)
    )
    .slice(0, limit)
    .map((x) => x.post);
}

/** Newest posts first - used by the homepage Latest Updates widget. */
export function latestPosts(limit = 3): Post[] {
  return [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

export const posts: Post[] = [
  {
    slug: "v5-overlay-catalog-actions-closed-beta",
    title: "V5: an in-game overlay, a Verse Catalog, and one honest action system — cleared for closed beta",
    date: "2026-09-20",
    readingTime: "8 min read",
    tag: "Release",
    topics: ["Milestone", "Engineering", "Squadron"],
    featured: true,
    excerpt:
      "The V5 line puts an operations layer on top of comms and the tactical board: a patch-aware Star Citizen reference catalog, a single server-derived quick-action system with strict revisions and durable idempotency, a paired local bridge for control surfaces, and a low-overhead Windows overlay that stays click-through while the game keeps your keyboard and mouse. On 2026-09-20 the frozen build 0.1.0+5a53bff was cleared for a trusted-tester closed beta — with its residuals written down, not hidden. Here is what shipped, what was measured, and what we are deliberately not claiming.",
    body: [
      "LynxDock is lightweight communication for communities that want control — and for Star Citizen organizations, control means the moment of the operation itself: the medic request, the rearm call, the 'arrived' press while your hands are on the flight controls. V5 is the line of work that takes the quick actions out of the chat window and puts them where the pilot is, without touching the game. This post is the closure record in plain language: what is in the build, how it was qualified, and the list of things we know are not perfect.",

      "Start with the rule that shaped everything: the overlay is not allowed to touch the game. No process injection, no DirectX or DLL hooks, no reading of game memory, no synthetic input, nothing an anti-cheat could reasonably object to. The overlay is an ordinary transparent, always-on-top window that is click-through and non-focusable while passive, so Star Citizen keeps the keyboard and mouse. Activation uses Windows Raw Input in observation-only mode — LynxDock sees which control you pressed and never blocks or alters it on the way to the game, which is why the settings page tells you plainly to pick a key or spare mouse button the game does not use. Escape is reserved: it always means 'give input back', from every state, and it cannot be bound to anything else.",

      "Two controls, two jobs. A Quick Action control fires your current primary action with no focus hand-off and no cursor. A Pointer / Menu control deliberately takes the mouse so you can click the deck; keys 1–8 press it in the order shown. They are separate on purpose — one physical control has one meaning, so its behaviour never depends on state the pilot cannot see while flying. Micro mode is one line; Compact shows status and the deck. Per-monitor and per-game profiles remember position, size, scale, opacity and mode, a Move overlay mode lets you drag the card exactly where you want it, and placement, moves and restarts were qualified at 100 % and 150 % display scaling.",

      "Underneath the overlay is the part that matters more: one canonical action system. Every quick action — order receipts, participation, requests, mission progress, logistics adjustments, deliveries mapped onto the transfer lifecycle — is derived on the server from canonical state, your role, the current revision and the surface asking. Surfaces never decide what is legal. Every mutation carries an expected revision and an idempotency key, so a repeated press or a retry after a dropped connection is replayed rather than applied twice, and a stale press is refused with a readable reason (out of date, conflict, not allowed) instead of silently overwriting newer state. The idempotency records are durable and crash-consistent. The overlay, the main app and any paired device go through exactly the same path; nothing on the overlay can bypass a permission or a confirmation.",

      "The overlay talks to the app over a local Control Surface Bridge — the one door future devices will use too. It binds to 127.0.0.1 only, every client authenticates, pairing uses a six-digit one-time code that expires in two minutes, credentials are stored as digests, scopes are least-privilege and enforced per action, per-device rate limits and an Origin allowlist apply, and revoking a device disconnects it immediately. A Connected devices page shows the bridge state and every paired device with its scopes, state and last-seen time. The typed SDK and its security model are documented so a third party can build a safe read-only surface.",

      "The Verse Catalog is the reference half of the operations layer: a patch-aware catalog of ships, vehicles, locations, commodities, missions and related entities, deliberately separate from live operational truth so reference data can never overwrite what is actually happening in an operation. It has full-text search with facets, a dense table, per-field provenance, a compare view, patch-to-patch diffs and a coverage dashboard that shows counts rather than claiming 'all data'. Unknown values stay unknown — a missing SCU renders as unknown, never as zero, and cargo-grid fit is never inferred from headline SCU. Catalog pickers sit inside the surfaces that need them. One honest caveat: in this beta the catalog is manual-import only. The Star Citizen Wiki provider is implemented but ships disabled, because at qualification time no full provider run had been performed, and we do not describe coverage we have not measured.",

      "How it was qualified. The candidate is a single frozen executable — commit 5a53bff, build 0.1.0+5a53bff — built in a clean clone with the web assets embedded (no dev server) and clean-checkout verified with 989 Rust tests plus the desktop suite. It was then driven on the live rig against Star Citizen in borderless mode: the game kept keyboard and mouse while the overlay was passive, a deck press reached the server, a click on dead space passed through and restored the game to the foreground, a live request action from the overlay succeeded, second-monitor placement and restart held, and the focus counters matched an external sampler with the foreground-restoration failure counter at zero throughout. Along the way the campaign closed a run of findings the hard way — a fresh-process window that briefly came up without its passive style, a destroyed-prior-window recovery, a second-monitor placement bug — each with a root cause, a bounded fix and a re-qualification, not a hope.",

      "What we are not claiming. Every requirement in the V5 pack was classified — 454 rows, zero unclassified — and only 76 are marked shipped: implemented, tested and measured live with no contradicting finding. Sixty-five more are foundation: built and tested, with their named live measurement still owed (most of them the catalog rows waiting on that full Wiki run). Tactical and Radar overlay modes, mobile, Stream Deck, GameGlass, Steam Deck and end-to-end encryption are later waves and are not in this cut. Exclusive fullscreen is not supported, because Windows draws nothing over it. And one residual stays open by name: when the window under the overlay vanishes during a hand-off, Windows can briefly re-activate the passive overlay; a watchdog yields within a fraction of a second and click-through is preserved, but whether a key pressed inside that moment reaches the game could not be measured despite repeated controlled attempts. The disposition records it as unmeasured — not as absent — and it is the first thing we are asking testers to watch for.",

      "So the closed beta is exactly that: a frozen, hashed, unsigned portable build handed directly to a small number of trusted testers, with its known issues written down next to the download rather than discovered afterwards. Public downloads stay closed until a signed build and the wider beta. The whole platform remains what it set out to be — chat, voice, a tactical board and now the operations layer, in one deployable unit, on hardware your community owns.",

      "What it looks like. The home page now carries a gallery of this exact build running a staged convoy-escort operation on an isolated demo server: a fictional organisation of 32 simulated members, seeded through the product's own RPCs, on the tactical board, in Operations, My Dock, Missions, Logistics, comms, the Verse Catalog and the overlay. The catalog in those captures was populated by a full Star Citizen Wiki provider run against that demo server — 132 requests, 17,029 entities for patch 4.10.0-LIVE, CC BY-SA 4.0 — which is why we can now show it; the provider still ships disabled in the beta build itself. Every capture is the application's own window, and nothing in it is live game telemetry.",
    ],
  },
  {
    slug: "squadron-control-operations-layer",
    title: "Squadron Control grows an operations layer",
    date: "2026-07-29",
    readingTime: "7 min read",
    tag: "Engineering",
    topics: ["Milestone", "Engineering", "Squadron"],
    featured: true,
    excerpt:
      "In one focused stretch, the tactical board went from an empty section of the new client to a full operations platform: units, wings, orders, alerts, zones, formations, snapshots, mission templates, undo, a permanent audit log with time-travel replay - and then an operations layer on top: multi-waypoint routes you can edit like vector paths, advance in real time, and command from a live roll-up. Here's what we built and the architecture that made it fast to build.",
    body: [
      "Squadron Control is the reason LynxDock exists: a tactical operations center in the same app as your comms, not a chat sidebar with a whiteboard bolted on. The V2 rebuild finally gave it the foundation it deserved - a protocol-first Rust server, a typed event stream, and a client that reconciles to server truth - and once that spine existed, the features came fast. This post covers the stretch that took the board from empty to operational.",

      "The spine first. Every tactical entity - units, wings, objectives, orders, alerts, zones, connections, sketch strokes, routes - lives in the Rust protocol crate as a typed, versioned object with a server-authoritative revision. The TypeScript client types are generated from Rust, so the two sides cannot drift. Mutations are RPCs that persist, then broadcast on the board's own event stream; every client applies the same reducer, so duplicates are idempotent and stale updates lose by revision. When a client detects a gap in the sequence, it resyncs from a snapshot. That one pattern - persist, broadcast, reduce, resync - is behind everything below.",

      "Then the operational surface. Units carry roles and readiness states; wings group them with color and a live readiness roll-up. Objectives, C2 orders with an issued-to-acked-to-done lifecycle, and categorized alerts cover the command loop. Zones paint the map; formations and a zero-dependency command-tree auto-layout arrange it. Ephemeral signals - pings, unit callouts, commander broadcasts - flash across every connected client without ever touching the database. A situation card summarizes the whole operation at a glance.",

      "History became a first-class feature. Every mutation lands in a permanent per-board audit log, which bought us three things at once: sequence numbers that survive server restarts, named snapshots you can save and restore (restores flow through the normal event stream, so live clients converge without a special path), and time-travel replay - a scrubber that reconstructs the exact board state at any point in its history, read-only, with a one-click return to live. Mission templates fell out of the same machinery: stamp any snapshot into a fresh board with new identities and remapped references.",

      "Undo was the hardest correctness problem. Server-side inverse mutations: every operation records its inverse group as it executes, so undoing a unit deletion restores not just the unit but the command edges and wing memberships that were cascaded away with it - as one keystroke. Redo swaps stacks symmetrically. It took a prefix-routed application engine and careful revision bumping to make every restore win last-writer-wins on every client, and it's covered by round-trip tests on both sides of the wire.",

      "Then we changed what the lines mean. Connector edges were graph theory; operations think in movement. The operations layer replaces relationship lines with routes: first-class mission objects with unlimited waypoints, per-kind military styling and direction animation, and vector-style editing - drag a waypoint, click a segment to insert one, split, fork, merge, reverse. Squads advance waypoint by waypoint; completed legs go green, the current waypoint pulses, and a commander panel rolls up every route's progress without anyone asking over voice. All of it undoable, all of it in the audit log, all of it replayable.",

      "One interaction framework drives it all. Every object on the canvas answers to a single action registry, surfaced three ways - right-click context menu, radial pie menu, and a command palette - with hotkeys and undo coming from the same source of truth, so the surfaces can't drift apart. A capability-based permission model evaluates authority on the server and mirrors it client-side for instant feedback, returning readable denials instead of silent failures.",

      "None of this is a demo path. It went through the same discipline as the networking layer before it: workspace-wide test gates, multi-client live verification with deliberate wreck-and-restore passes, a stress harness for large boards, and a written record of what was verified and when. The board that appears in the screenshots on this site is staged demo data - but the synchronization underneath it is the real thing, watched working.",

      "LynxDock is in active development. Squadron Control's operations layer is the current frontier - telemetry-driven live unit positions and multi-altitude route planning are speced next - and the whole platform remains what it set out to be: one process, one database file, on hardware your organization owns.",
    ],
  },
  {
    slug: "settings-system-and-platform-polish",
    title: "A settings system built like a platform, and a week of polish",
    date: "2026-07-29",
    readingTime: "5 min read",
    tag: "Engineering",
    topics: ["Engineering", "Design"],
    excerpt:
      "Settings grew from four toggles into a 20-category, searchable system with Basic and Advanced modes - where every setting the platform will ever expose is declared, and the ones whose subsystems haven't shipped are shown honestly as planned instead of faked. Plus: replies, custom status, readable errors, and an accessibility and performance pass across the client.",
    body: [
      "A setting that does nothing is worse than no setting, so when we expanded the settings system we made a rule: the interface may only show two kinds of control - ones that are wired to a real, server-persisted value that takes effect live, and ones that are visibly disabled and labeled with the subsystem that will ship them. Nothing in between. The result is a declarative registry of twenty categories, from Appearance and Chat through Voice, Tactical, Privacy, Security, and Developer, where the platform's roadmap is literally readable inside the settings screen.",

      "The wired set is already substantial: accent color applied live across the whole interface, text size and density scaling, high contrast and reduced motion, message display controls (timestamps and their format, avatars, grouping), composer behavior (Enter versus Ctrl+Enter, spell check), typing-indicator privacy that stops both showing and sending, unread badges, desktop notifications with do-not-disturb and midnight-wrapping quiet hours - where mentions can be allowed to pierce - and tactical board preferences. Everything persists per account on your own server, not in a browser's local storage.",

      "Search treats settings as the unit, not pages: typing 'microphone' jumps to Voice and highlights every matching row, including the planned ones. Basic mode keeps the surface to what most people actually touch; Advanced mode reveals all of it. The design didn't change - it's the same calm interface, with an engine under it.",

      "Messaging and presence moved too. Replies reference the original message rather than copying it, resolve their previews live, degrade gracefully when the original is deleted, and survive being composed offline. Custom status - an emoji and a short line - broadcasts to everyone, survives reconnects, and is normalized server-side. And a single shared error path now turns backend failures into readable sentences instead of cryptic banners.",

      "The same stretch included a deliberate hardening pass: an audit across dead code, render performance, accessibility, and state management. Focus rings and pressed states were fixed where they'd been lost, modal overlays gained dialog semantics, member-list and message-view re-render churn was removed, and the findings were written up as internal bug, performance, and release-readiness reports that steer what comes next. Craft is release-blocking here, not optional.",

      "All of it is in active development, in the open, with the same standard as always: a capability gets claimed when someone has watched it be true.",
    ],
  },
  {
    slug: "nsf-sbir-project-pitch",
    title: "LynxDock applies for NSF research funding",
    date: "2026-07-29",
    readingTime: "2 min read",
    tag: "Founder Update",
    kind: "founder",
    topics: ["Milestone", "Company"],
    excerpt:
      "We've submitted a Project Pitch to America's Seed Fund (NSF SBIR) to fund research into the hard problems under LynxDock: real-time state synchronization, large multi-party voice, and self-healing operability on affordable self-hosted hardware.",
    body: [
      "In July 2026, LynxDock LLC submitted its first research proposal to the National Science Foundation's SBIR program - America's Seed Fund. The pitch targets the problems that make a platform like LynxDock genuinely hard: keeping real-time operational state consistent across many clients, scaling multi-party voice, and making a self-hosted system self-healing enough that a gaming organization can run it on hardware they already own, without an ops team.",

      "Those aren't marketing problems; they're the engineering problems we work on every day, and the ones this site's dev logs document. The proposal formalizes that research direction. We'll share what we can about the process as it unfolds.",

      "LynxDock remains what it has been from the first commit: privacy-first, self-hosted, built for the organizations that need permanence. Built for people. Not platforms.",
    ],
  },
  {
    slug: "stress-testing-the-networking-layer",
    title: "Internal Alpha: stress-testing LynxDock's networking layer",
    date: "2026-07-21",
    readingTime: "6 min read",
    tag: "Release",
    topics: ["Milestone", "Engineering"],
    featured: true,
    excerpt:
      "Our version 2.2 networking stack was built and unit-tested, but no one had watched it work end to end. So we ran a live verification pass across three simultaneous clients - server restarts, offline queueing, reconnection, and a concurrency stress test - then hardened the one real defect it surfaced before tagging the release. Here is what we tested, what held, and what we fixed.",
    body: [
      "A networking stack that passes its unit tests but has never been watched working end to end is a hypothesis, not a feature. Before starting on voice and video, we wanted to know that the messaging layer underneath them behaves correctly not just in the happy path, but under concurrency, failure, and recovery - the conditions that usually don't surface a bug until it's in someone's real conversation. This is a write-up of that verification pass: the tests, the results, and the defect we found and fixed before shipping.",

      "The setup. One server and three clients signed in as three different users, each also connected from a second window so every account was live on two devices at once. That arrangement lets a single machine exercise most of the distributed behavior that matters - cross-client delivery, cross-device state sync, and concurrent writes to the same channel. Each test case maps to a method the server actually implements, so nothing here is theoretical.",

      "Server restart, mid-conversation. With messages in flight we killed the server process outright. Every client detected the drop within a couple of seconds and moved to a reconnecting state rather than erroring. When we restarted the server, all three clients re-established their sessions on their own in about six seconds, with no re-login. A reaction added just before the outage was still there afterward, and unread counts survived the restart intact, because read state is persisted to disk rather than held only in server memory.",

      "The offline queue. While the server was down, we kept composing. Instead of failing, outgoing messages collected in a local outbox under a 'waiting to send' indicator. On reconnect, the queue drained automatically - and this is the part that matters - the messages arrived at the other clients in order and exactly once. No duplicates from an over-eager retry, no gaps from a dropped send. An outbox that double-delivers on reconnect is a classic distributed-systems failure, and it's the specific thing we were watching for.",

      "Cross-device read state. With the same account open on two devices, we opened an unread channel on one and watched the unread badge clear on the other without touching it. Server-backed read state is a feature nearly every chat product claims and comparatively few verify across devices under observation. Ours now has a passing test with a date on it.",

      "Simultaneous sends. Then we stopped being gentle. Three clients each fired a burst of twenty messages into the same channel at once - sixty concurrent writes. Every accepted message received a unique id, and all three clients converged on a single global ordering that matched to the character: no duplicates, no gaps, no lost events, and no disagreement between clients about what happened or in what order. Total-order consistency under concurrent writes is the hard part of a real-time chat system, and it held.",

      "The defect, and the fix. A stress test earns its keep by breaking something, and this one did: very long messages were handled inconsistently. The client and server disagreed on how to count length - one measured UTF-16 code units, the other Unicode code points, so an emoji-heavy message could be counted two different ways - and on one path a message over the limit could clear the composer and vanish without an error, which reads to the user as silent data loss. We fixed it before publishing this post. There is now a single documented length limit enforced identically on client and server, counted the same way on both; a live character counter; an explicit over-limit message; and a hard guarantee that the composer never clears your text unless the server has actually accepted the message. We added tests at the limit, one under, and one over, on both the client and the server, and re-ran the full three-client check until it came back clean.",

      "What's still open, in the open. A few smaller gaps came out of the same pass and are on the board rather than hidden: during a network outage the client currently blanks its cached view until reconnect - everything returns, but a local-first app should keep showing history while offline - message editing exists on the server without a UI yet, and there are a couple of cosmetic rough edges. Two cases were deferred rather than failed: the containerized self-host parity run, and the voice smoke test, which needs human ears and gates the next release tag.",

      "Why we work this way. A month ago our own roadmap described intent and filed it under status; we've since made a rule that a capability only gets a checkmark when someone has watched it be true. Version 2.2 is now tagged with that standard met - networking verified end to end, stress-tested, and hardened against the one real failure the stress test found. That is what starts the internal alpha: not a claim that it works, but a dated record that it does, and an honest list of what's next.",
    ],
  },
  {
    slug: "when-your-own-roadmap-is-wrong",
    title: "Our roadmap was wrong. The code proved it.",
    date: "2026-07-21",
    readingTime: "5 min read",
    tag: "Founder Update",
    kind: "founder",
    topics: ["Engineering", "Architecture"],
    excerpt:
      "Our public roadmap said networking and voice hadn't started yet. The repository contained working, tested implementations of both. We nearly corrected the wrong side - deleting real shipped work from the record because an official-looking document said it didn't exist. Here's the rule we adopted instead.",
    body: [
      "Our system status board runs on a rule we care about: degrade honestly. If it cannot reach a source, it reports unknown rather than inventing a healthy-looking green. This week we held our own planning documents to that standard, and they failed it.",
      "The roadmap said networking was 'design accepted, implementation next'. It listed authentication, presence, the offline queue and self-hosting as planned work. Meanwhile the repository contained an authentication crate, a presence crate, an offline outbox with its own test suite, a migration system with backup and restore, and a compose file for self-hosting. Voice and screen sharing were listed as not started - they had shipped across five phases, hardening included.",
      "The documents were not lying. They were written once and never re-measured, while the work kept moving underneath them.",
      "What makes this worth writing about is how nearly we corrected the wrong side. Our website described features the roadmap said did not exist. The obvious reading is that the marketing site was overclaiming, and 'fix the site to match the roadmap' would have looked like diligence. It would have quietly deleted a large amount of genuinely shipped work from the public record - and it would have been justified by an official-looking document.",
      "So the rule we settled on is simple: when a document and the code disagree, the code wins. A roadmap describes intent at the time of writing. It does not update itself, and age alone gives it no authority.",
      "The roadmap now reflects what is actually built. We also added a marker for work that exists and is tested but has not yet been exercised end-to-end, because fixing a document that overstated its confidence by overstating ours would have missed the entire point.",
    ],
  },
  {
    slug: "lynxbench-repair-knowledge-graph",
    title: "Repair knowledge dies with the people who hold it",
    date: "2026-07-19",
    readingTime: "6 min read",
    tag: "LynxBench",
    kind: "founder",
    topics: ["LynxBench", "Architecture", "AI"],
    series: "LynxBench Research",
    excerpt:
      "Almost everything known about repairing a given board lives in a few people's heads and a scattering of forum posts. When they go, it's gone. LynxBench is our attempt at the opposite: a hardware knowledge graph, evidence-based diagnostics, PCB mapping, and a troubleshooting process that actually repeats.",
    body: [
      "Almost everything known about repairing a given piece of hardware lives in three places: a handful of people's heads, a scattering of forum posts written by someone who solved it once at 2am, and nowhere. When the technician retires or the forum goes offline, that knowledge is simply gone. Every subsequent person rediscovers it from scratch, badly.",
      "LynxBench is our attempt at the opposite. It is a hardware diagnostics and repair-knowledge effort running alongside the communication platform, and the goal is genuinely ambitious: build the most comprehensive structured repair knowledge repository we can, in a form that both people and machines can reason over.",
      "**The problem with how repair knowledge is stored today.** A service manual tells you the official procedure. A forum thread tells you what worked for one person on one unit. Neither tells you *why*, and neither connects to anything else. There is no structure that says this component depends on that rail, that this symptom has four plausible causes ranked by likelihood, or that this measurement rules out three of them. Without that structure you cannot reason - you can only pattern-match, which is exactly the skill that lives in someone's head and dies with them.",
      "**What we're building instead.** At the centre is a hardware knowledge graph: components, subsystems, the relationships between them, and how failures propagate along those relationships. On top of that sits structured troubleshooting - decision paths where each step is a measurement that meaningfully narrows the space, rather than a checklist someone follows to the end and then guesses anyway.",
      "Underneath is the physical layer: PCB mapping and component identification. A surprising amount of this starts as hand-drawn board maps - someone tracing a real board, marking what connects to what. Those get digitised and turned into structured records, which is what lets the graph reason about a physical object instead of an abstraction. It is slow, unglamorous work, and it is the foundation everything else rests on.",
      "**Evidence is the discipline.** Every verification produces a structured evidence record: what was tested, what was observed, and whether it confirmed or contradicted the expectation - including attempts that captured nothing useful. That last part matters more than it sounds. Recording failed captures is what separates a knowledge base from a highlight reel, and it is the difference between something you can trust and something that merely sounds authoritative. A claim about hardware behaviour with no capture behind it is an opinion, and opinions do not belong in a repair record.",
      "**Where AI fits.** Not as an oracle. We use AI-assisted research pipelines to do the part that is genuinely mechanical: reading large volumes of scattered documentation, extracting candidate relationships, and proposing structure for a human to confirm or reject. The architecture deliberately separates observation from reasoning - one layer records what actually happened on the bench without interpreting it, another reasons over those observations against the graph. Keeping them apart means a wrong conclusion never contaminates the underlying record, and you can re-reason over the same capture later and get a better answer as the graph improves.",
      "**Documentation standards are the product.** Twelve architecture decisions are recorded so far, because a repository like this is only as durable as its conventions. If two people record the same observation in two different shapes, the graph degrades into a filing cabinet. Deciding early how things are written down is not bureaucracy - it is the thing that makes the knowledge compounding rather than merely accumulating.",
      "**What another engineer can take from this.** If you are building any kind of knowledge system, the transferable parts are these: separate raw observation from interpretation so you can revise conclusions without losing data; record negative results, because a knowledge base that only contains successes cannot be trusted; and settle your documentation conventions before volume arrives, not after.",
      "We are keeping specific findings, interface details and protocol parameters private for now. The methodology is the part worth sharing - and the part we would want to read.",
    ],
  },
  {
    slug: "preventing-silent-corruption-ai-assisted-codebase",
    title: "The failure your code review cannot catch",
    date: "2026-07-13",
    readingTime: "5 min read",
    tag: "AI",
    kind: "devlog",
    topics: ["AI", "Engineering"],
    excerpt:
      "Our tooling reported changes to files nobody had touched. The cause wasn't a bad AI suggestion - it was an environment quietly serving truncated files, so every tool downstream measured the wrong thing. Review can't catch that, because review reads the same corrupted input. Here's the process we built instead.",
    body: [
      "Most discussion of AI-assisted development focuses on output quality: is the suggestion correct, is the code idiomatic, does it compile. Those failures are visible, and visible failures get caught in review.",
      "The failures worth engineering against are the invisible ones - where the tooling reports something confidently false and every downstream decision inherits the error. We hit one of those, and the process we built in response is the part worth sharing.",
      "**The failure mode.** A mounted filesystem served files shorter than they actually were, truncated mid-token. Every tool reading through that mount saw the short version with no indication anything was wrong. Version control then compared the truncated content against the real repository and reported modifications that did not exist. Staging those would have committed the truncation - deleting working code nobody had touched, in a diff that looked completely reasonable to a reviewer.",
      "That is the shape of the dangerous class: not a wrong answer, but a wrong *measurement* that produces a plausible wrong answer. No amount of careful review catches it, because review operates on the same corrupted input.",
      "**Make the rule executable, not written.** Our first instinct was to document the hazard. That instinct is wrong. A warning in a document is a warning someone skips at 1am, and the person most likely to skip it is the one moving fastest. So the rule became a program: a preflight check that runs before any session touches version control, verifies the environment, and **fails closed**. It takes about two seconds, has no dependencies, and carries its own test suite - because an unverified safety check is decoration.",
      "The design principle: if a rule matters, it should be impossible to proceed without satisfying it. Anything less is a suggestion.",
      "**Treat every handoff as a hypothesis.** The second half is cultural. When work spans many sessions - human or AI - each one inherits a summary of what came before, and those summaries are where errors calcify. On a single day, three inherited claims collapsed the moment anyone measured them: a file count that was wrong, a set of tests reported as deleted that were entirely present, and a batch of errors described as outstanding that had already been fixed.",
      "The middle case is the instructive one. It began as a measurement error, got written into prose, and from there acquired the authority of a fact - propagating through two handoffs unchallenged. Prose is remarkably good at laundering uncertainty into confidence. A number in a sentence reads as established; the same number in a tool output reads as a reading you might want to re-take.",
      "So the standing instruction is to re-derive state from the repository at the start of every session rather than trusting the summary, however authoritative it reads. State is cheap to measure and expensive to assume.",
      "**What another engineer can take from this.** Three things generalise. First, distinguish failures your review process can catch from ones it structurally cannot, and spend your engineering effort on the second category. Second, encode critical rules as programs that fail closed, because documentation degrades into folklore. Third, in any workflow with handoffs, build in a re-measurement step - the cost of verifying inherited state is far lower than the cost of one confident, wrong inheritance reaching production.",
    ],
  },
  {
    slug: "a-file-extension-is-not-a-fact",
    title: "We stopped trusting filenames",
    date: "2026-07-12",
    readingTime: "3 min read",
    tag: "Security",
    kind: "devlog",
    topics: ["Security", "Engineering"],
    excerpt:
      "Rename an executable to holiday.png and most systems will happily treat it as a picture. LynxDock now reads the file's actual content signature and refuses anything whose bytes disagree with its claimed type - enforced at the storage layer, with a test that proves it says no.",
    body: [
      "The simplest way to get something unpleasant into a chat application is to rename it. An executable becomes holiday.png, the interface shows a picture icon, and everything downstream that trusts the extension is now confidently working with a lie.",
      "LynxDock now checks the file instead of the filename. Every attachment is read at the front, and its leading bytes - its signature, or magic number - are compared against the type it claims to be. All eight permitted types carry a real signature check.",
      "Where that check lives matters as much as the check itself. It runs inside the storage call rather than in the interface, so no alternative code path can reach the disk without passing it. If the bytes and the claimed type disagree, the write is refused with a plain error rather than quietly accepted.",
      "The part we would point at in review is not the feature, it is the negative test. We take a genuine image, rename a binary to sit beside it wearing the same extension, and assert that the second one is rejected. A security control without a test proving it says no is a hope, not a control.",
      "This is deliberately narrow. It is not malware scanning and it does not make arbitrary files safe. It removes one specific lie - the claim a filename makes about what it contains - which is the lie this particular door was open to.",
    ],
  },
  {
    slug: "voice-and-screen-sharing-end-to-end",
    title: "Voice and screen sharing, end to end",
    date: "2026-07-11",
    readingTime: "5 min read",
    tag: "Engineering",
    excerpt:
      "Real-time audio and screen sharing are done, delivered in five phases - from the call roster all the way through connection-quality indicators.",
    body: [
      "Voice is the feature most likely to feel broken. It fails in ways text never does: a device that will not switch, a browser that silently blocks audio, a network that drops one person and not the others. So we built it in five deliberate phases rather than one push, and the last of those has now landed.",
      "The first phase was the control plane - who is in the call, who is muted, who is sharing. That state travels over the same WebSocket connection the app already maintains, and it is kept deliberately separate from the media itself. Knowing who is in a room should never depend on the audio pipeline being healthy.",
      "Then the media plane. We settled on an SFU rather than mesh, so a call with six people does not ask every laptop to encode five outbound streams. The server mints short-lived, room-scoped access tokens along with relay credentials, which means clients never hold long-lived secrets and calls still connect from behind restrictive networks.",
      "Phase three made it real on the desktop: publishing your microphone, hearing everyone else, an active-speaker ring so you can see who is talking, deafen, and proper input and output device pickers. We also handled the browser autoplay problem explicitly - if audio is blocked, the app tells you and offers a single click to unblock, instead of appearing to work while you hear nothing.",
      "Phase four added screen sharing on the same foundation, with a multi-tile viewer so more than one person can share at a time. Phase five was hardening, which is the part that usually gets skipped: media connection state is surfaced in the UI, failures are classified into real causes with a retry path, and each participant carries a small connection-quality indicator so a bad call is diagnosable instead of mysterious.",
      "That closes Epic 5, and it arrived ahead of its position in the original roadmap order. File transfer runs over the same media plane and is the next thing up.",
    ],
  },
  {
    slug: "mission-control-one-honest-view",
    title: "Mission Control: one honest view of the system",
    date: "2026-07-10",
    readingTime: "5 min read",
    tag: "Milestone",
    excerpt:
      "A shared status contract, a hub every module reports into, and an event timeline - so the state of the system is observable instead of guessed at.",
    body: [
      "At some point a project stops being one program. We now have a desktop app, a server, a Studio surface, a website, and a layer of tooling around all of it. Past that point there is a question nobody can answer quickly: is everything actually fine, and what just happened?",
      "We started with the boring part - a status contract. Every component describes its health in exactly one shape, and the overall state is a worst-wins roll-up, so one degraded piece cannot be averaged away into a comfortable green. That status is generated into a single artifact which both the desktop app and this website read. One source, no drift between what we tell ourselves and what we tell you.",
      "On top of that sits the hub. Modules report metrics and entities, and those are aggregated into a single state. It works in two tiers with an identical shape: a generated static snapshot, and a live feed over the WebSocket hub. The static tier means the board is never blank; the live tier means it is current when a server is actually running.",
      "The live feed is where it gets useful. The server reports its open connections, active voice rooms and participant counts, and host CPU and memory. Commander reports squadrons and operations, and those can be created directly from the desktop app. An event bus retains recent history and replays it into a live timeline, so you can see the last several dozen things that happened rather than only the current instant.",
      "The design rule we kept coming back to is that it should degrade honestly. If a source is not connected, the board says so plainly rather than inventing a healthy-looking number. That is why you may currently see components reporting as unknown - the generator has not been re-run against real release data yet. We would rather show an honest unknown than a false green.",
      "Dashboards, an integration layer, and a view of the AI workforce are designed and queued next.",
    ],
  },
  {
    slug: "session-observability-in-studio",
    title: "Watching the work: session observability in Studio",
    date: "2026-07-09",
    readingTime: "4 min read",
    tag: "Engineering",
    excerpt:
      "Development sessions used to disappear into chat history. Now they report into the same hub as the server and the desktop app.",
    body: [
      "A lot of LynxDock is built with AI assistance, across many sessions. The recurring problem was not the work itself - it was that the work evaporated. Decisions, dead ends, and what changed all vanished into scrollback, and every new session started by reconstructing context from scratch.",
      "So we built a collector. It tracks reported sessions in a short-lived store, de-duplicates them with a clear precedence rule when the same session is seen twice, and assembles the result into a module snapshot in the same shape every other part of the system uses.",
      "It runs behind a small localhost HTTP service with two endpoints - one to report a session, one to read the snapshot - verified end to end. Alongside it there is a reference reporter for wiring up your own tooling, a deliberately conservative process-scan fallback for when nothing reports itself, and a one-shot snapshot command suitable for a scheduled job.",
      "The output flows into the same hub file Mission Control already reads. That is the part that matters: development activity becomes a first-class module sitting next to the server and the desktop app, rather than a separate dashboard nobody opens. There are reference adapters too, including a local model runner and a generic subprocess wrapper, plus a health adapter that pulls in the state of an external repository.",
      "The whole collector has zero runtime dependencies and is covered by its own test suite. It is a small piece of infrastructure, but it turns a stream of disposable sessions into something with a memory.",
    ],
  },
  {
    slug: "version-2-comes-to-life",
    title: "Version 2 comes to life: messaging, voice, and sync",
    date: "2026-07-08",
    readingTime: "5 min read",
    tag: "Milestone",
    excerpt:
      "The local-first foundation is now a connected app. In the last few days LynxDock gained networked messaging, offline sync, real-time voice and screen sharing, and instant full-text search.",
    body: [
      "A few days ago the desktop app was deliberately local-only - a solid foundation with workspace, identity, settings, and a full messaging client that kept everything on your machine. That foundation is now coming online. Here is what landed.",
      "Messaging went networked. Read state is server-backed and syncs live across devices, so opening a channel on one machine clears the unread badge on another. Messages carry real display names resolved over the wire, and desktop notifications are mention-aware, with the unread count shown in the window title.",
      "The app now holds up on a bad connection. An offline outbox queues messages while you are disconnected, de-duplicates them, and drains automatically on reconnect - with a small 'N queued' indicator so you always know where things stand. Losing Wi-Fi mid-sentence no longer loses the sentence.",
      "Voice and screen sharing are real. We settled the call architecture on an SFU (LiveKit) with a clean two-plane split between control and media, then built the media plane itself: joining audio, device selection, deafen, and screen share, with hardening along the way. It is the start of Epic 5, arriving earlier than the roadmap promised.",
      "Search got fast. Message search is backed by SQLite's FTS5 full-text index, with a safe fallback, and you can scope a search to one channel or all of them and filter to messages that carry attachments.",
      "Underneath, reliability improved in ways you will never see: a versioned migration framework with automatic backup and restore means upgrades never lose data, and the server gained backup / export / import maintenance commands. A new System Status board surfaces live health inside the app's mission-control view.",
      "All of this is still pre-release - we are at 0.1.0-alpha and building in the open. But the shape of the product is now visible: private by default, local-first, and increasingly connected on your terms. Follow along on the roadmap and on GitHub.",
    ],
  },
  {
    slug: "infrastructure-complete",
    title: "Infrastructure complete: what Version 2 changes",
    date: "2026-07-06",
    readingTime: "4 min read",
    tag: "Milestone",
    excerpt:
      "The groundwork is done. GSpec, the Bootstrap compiler, release tooling, and CI are in place - and a real product monorepo now exists.",
    body: [
      "For the last stretch we haven't been building features - we've been building the machine that builds LynxDock. That phase is now complete, and it changes what we can do next.",
      "The infrastructure layer is finished: GSpec (a versioned specification), the Bootstrap compiler that turns it into artifacts, release tooling that produces signed manifests, and CI that holds the line. A Golden-IR contract test guarantees the compiler's output never drifts.",
      "On top of that we've stood up a single product monorepo. It spans TypeScript and Rust: shared libraries, a protocol package whose wire types are generated from Rust to TypeScript, our own component framework (Genesis UI), a Tauri desktop app, a Studio surface, a plugin SDK, and AI tool contracts.",
      "The desktop app already runs a local workspace, identity, and settings, plus a local-only chat client. It isn't networked yet - that's deliberate. We're building the product from the inside out, so each layer is solid before the next depends on it.",
      "Version 2 is where LynxDock stops being infrastructure and starts being an application. This site now reflects that reality.",
    ],
  },
  {
    slug: "why-rust",
    title: "Why we chose Rust",
    date: "2026-07-06",
    readingTime: "4 min read",
    tag: "Engineering",
    excerpt:
      "Privacy and performance aren't slogans - they're architectural choices. Here's why the LynxDock core is written in Rust.",
    body: [
      "A communication app lives or dies on trust and responsiveness. It handles your messages, your identity, and one day your calls. We wanted a core that is fast, predictable, and hard to get wrong - so the core of LynxDock is written in Rust.",
      "Rust gives us memory safety without a garbage collector, which means a small, calm resource footprint and no surprise pauses. It's a good fit for a desktop app that should feel instant and stay light, even on modest hardware.",
      "The desktop app is built on Tauri: a Rust core with a web front-end. Storage, identity, workspace, and messaging all live in Rust, exposed to the UI through a handful of typed commands. The server, when it arrives, will be Rust too.",
      "Rust also anchors our protocol. The wire types are defined once in Rust and generated into TypeScript, so the client and a future server can never quietly drift apart. CI fails if the generated types are out of date.",
      "None of this is visible in the UI - and that's the point. The right foundation is the one you never have to think about.",
    ],
  },
  {
    slug: "genesis-ui",
    title: "Genesis UI: building our own component framework",
    date: "2026-07-05",
    readingTime: "4 min read",
    tag: "Engineering",
    topics: ["Engineering", "Architecture"],
    excerpt:
      "One design language across the website, the desktop app, and Studio - powered by tokens, a theme engine, and a Tailwind preset.",
    body: [
      "Every LynxDock surface should feel like the same product. To make that true without copy-pasting styles, we extracted our design system into its own package: Genesis UI.",
      "At its base are design tokens - color, type, spacing, motion - expressed as CSS variables and mirrored in TypeScript. Components read the tokens; they never hard-code a value. That single indirection is what makes theming possible.",
      "On top of the tokens sits a runtime theme engine. Switching between dark and light (or following the system preference) is a matter of setting one attribute on the page; a reduced-motion mode collapses animation for people who prefer less movement. The desktop app already uses this to apply your settings live.",
      "Genesis UI is framework-agnostic where it counts: links and images are injected, so the same components work in Next.js on the website and in a plain Vite app on the desktop. A Tailwind preset carries the palette so utility classes line up everywhere.",
      "It's early - the component set is still growing toward a full 'FluentUI for LynxDock' - but the foundation is in place, and this website is styled with the same language the app uses.",
    ],
  },
  {
    slug: "building-a-privacy-first-platform",
    title: "Building a privacy-first platform",
    date: "2026-07-04",
    readingTime: "4 min read",
    tag: "Founder Update",
    kind: "founder",
    topics: ["Founder Update", "Architecture"],
    excerpt:
      "Privacy isn't a setting you toggle at the end. It's the constraint that shapes the architecture from the first commit.",
    body: [
      "It's easy to say 'privacy-first.' It's harder to build a system where privacy is the path of least resistance. That's the bar we hold ourselves to.",
      "Concretely: the desktop app stores your workspace, identity, and messages on your own machine. Telemetry is off by default, and the app tells you so with a visible status indicator - not buried in a settings page. There's no account to create just to open the app.",
      "The architecture reinforces the promise. Because state is local-first, there's simply nothing to harvest by default. When networking arrives, it will be something you opt into - a server you run or choose to join - not a cloud you're silently enrolled in.",
      "Privacy also shapes what we don't build: no engagement loops, no dark patterns, no notifications engineered to pull you back. Restraint is a feature.",
      "The goal is software whose incentives are aligned with the person using it. Built for people, not platforms - starting with where your data lives.",
    ],
  },
  {
    slug: "why-self-hosting-matters",
    title: "Why self-hosting matters",
    date: "2026-07-03",
    readingTime: "3 min read",
    tag: "Founder Update",
    kind: "founder",
    excerpt:
      "The communities people rely on shouldn't be one policy change away from disappearing. Self-hosting is how you keep control.",
    body: [
      "The tools people use to talk and organize have consolidated onto a handful of platforms. That's convenient - until a policy changes, a price rises, or a service shuts down, and a community discovers it never really owned its own space.",
      "Self-hosting is the antidote: run the server yourself, and the accounts, history, and files belong to you. LynxDock is being built so that a self-hosted server is a first-class target, not an afterthought.",
      "Historically self-hosting meant config files, secrets, and terminal commands - enough friction that most people never tried. Our aim is to make standing up a server approachable, with sensible defaults and a guided path, so ownership doesn't require a sysadmin.",
      "Networking and servers are on the roadmap (Epic 3 and Epic 4). We're building the local experience first so that when the server lands, it's syncing something that already works - not the other way around.",
      "The long view: a lightweight, self-hostable communication tool shouldn't be a luxury. It should be the default for anyone who cares where their data lives.",
    ],
  },
  {
    slug: "the-road-ahead",
    title: "The road ahead: our epic roadmap",
    date: "2026-07-02",
    readingTime: "3 min read",
    tag: "Founder Update",
    kind: "founder",
    excerpt:
      "We've moved from milestones to epics. Here's the honest sequence from a local app to a full communication platform.",
    body: [
      "As the codebase grew, tracking work as a long list of numbered milestones stopped making sense. We now plan in epics - larger arcs that map to the product's core value.",
      "Epic 0 (Foundation) and Epic 1 (Workspace & Identity) are complete. Epic 2 (Local Messaging) is in progress: channels and messages you can compose, edit, delete, and search, all stored locally.",
      "From there: Epic 3 brings networking - a WebSocket transport, a handshake, authentication, and a self-hostable server. Epic 4 adds communities and servers; Epic 5 adds voice and screen sharing over WebRTC. Epics 6-8 cover AI, plugins, and Studio.",
      "We're deliberately building local-first. Each epic stands on solid ground before the next depends on it, which keeps the product honest and the foundation clean.",
      "You can follow the whole sequence on the roadmap, and watch it happen in the open on GitHub.",
    ],
  },
  {
    slug: "introducing-lynxdock",
    title: "Introducing LynxDock",
    date: "2026-07-04",
    readingTime: "3 min read",
    tag: "Founder Update",
    kind: "founder",
    excerpt:
      "Why we're building a privacy-first ecosystem for communication, development, and automation - and what comes next.",
    body: [
      "Most software today is built to capture you. Engagement to optimize, data to harvest, attention to sell. LynxDock takes the opposite stance: software should serve the people who use it.",
      "LynxDock is a lightweight communication platform. Start a spontaneous peer-to-peer call for voice, chat, and screen sharing, or settle into a persistent, self-hosted community with accounts, rooms, history, and admin controls. Either way, your accounts and data stay with the server you choose - not with us.",
      "Self-hosting has a reputation for being painful. We're changing that. The Guided Server Setup wizard generates a real config with sensible defaults, a random session secret, and safe self-hosting options - no config files or terminal commands required.",
      "LynxDock is one part of a larger ecosystem. LynxDock Studio is an AI-assisted development workspace that links docs, sprints, architecture, and research into a single navigable graph. LynxDock Bootstrap is the automation engine that turns a blank slate into a structured foundation in minutes.",
      "We're early, and we're building in the open. Follow the roadmap, star the repositories, and register interest for early access. This is just the beginning.",
    ],
  },
  {
    slug: "why-privacy-first",
    title: "Why privacy-first, and why now",
    date: "2026-07-03",
    readingTime: "4 min read",
    tag: "Founder Update",
    kind: "founder",
    excerpt:
      "Privacy isn't a feature we bolt on at the end. It's the constraint we design everything around from the start.",
    body: [
      "Every product makes a choice about who it serves. When a platform is free and the numbers only go up, someone is usually paying with their attention and their data. We wanted to build the other kind of software - the kind you can trust because its incentives are aligned with yours.",
      "Privacy-first means a few concrete things at LynxDock. We don't run advertising. We don't sell data. We don't track you across the web. And when you self-host, your community's messages, accounts, and files live on infrastructure you control - not ours.",
      "It also shapes what we don't build. No engagement-maximizing dark patterns. No notifications engineered to pull you back in. No hidden data flows. Restraint is a feature: the calmest software is often the software that respects your time.",
      "Why now? Because the tools people rely on to talk, build, and organize have quietly consolidated onto a handful of platforms, each with its own incentives. A lightweight, self-hostable alternative shouldn't be a luxury. We think it should be the default for anyone who cares where their data lives.",
      "That's the bet behind everything we ship: built for people, not platforms. If that resonates, follow along - we're building it in the open.",
    ],
  },
  {
    slug: "self-hosting-without-the-headache",
    title: "Self-hosting without the headache",
    date: "2026-07-02",
    readingTime: "4 min read",
    tag: "Engineering",
    excerpt:
      "Running your own server used to mean config files and terminal commands. The Guided Setup wizard makes it a few clicks.",
    body: [
      "Self-hosting has always come with a tax: editing config files, generating secrets, opening ports, and hoping you didn't miss a step. That friction is why most people never try it - even when they'd rather own their data.",
      "LynxDock's Guided Server Setup is designed to remove that tax. It's a calm, first-run wizard that walks you through five short steps: choose a purpose, set the basics, pick your access rules, configure the call relay, and start the server. No config files. No terminal.",
      "Under the hood it generates a real configuration - a SQLite database, local uploads, a randomly generated session secret, and safe self-hosting defaults. You can save a draft at any point and come back later; nothing is committed until you choose to generate and launch.",
      "When you're ready, you set a port (8080 by default), pick a data folder, and choose whether registration is invite-only, open, or closed. For calls and screen sharing, the basic STUN-only mode works for most setups, with the option to add a TURN relay for tougher networks.",
      "The result is a server that belongs to you and your community, spun up in minutes. For the full walkthrough, see the Self-hosting guide in the docs.",
    ],
  },
  {
    slug: "the-genesis-of-lynxdock-app",
    title: "The Genesis of lynxdock.app",
    date: "2026-07-04",
    readingTime: "2 min read",
    tag: "Engineering",
    topics: ["Engineering", "Architecture"],
    excerpt:
      "How this website came together - a lightweight, static, mission-control design that feels like an extension of the app.",
    body: [
      "The LynxDock website should feel like entering a quiet, high-end command center. Not playful, not corporate, not generic SaaS. Private, powerful, technical, calm, premium - and above all, lightweight.",
      "Under the hood it's a Next.js and TypeScript site styled with Tailwind CSS, exported as fully static files and served on Cloudflare Pages. No runtime server, no database, no heavy client libraries. The whole thing is generated ahead of time for speed.",
      "The design language borrows the vocabulary of the app itself: a dark graphite base, thin cyan hairline borders, translucent glass panels, and subtle glow. The logo is the visual anchor; the product screenshots are the proof.",
      "Everything you see here is intentionally minimal. Short copy, generous space, and just enough motion to feel alive without getting in the way. That restraint is the point - it's the same philosophy that drives the products.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
