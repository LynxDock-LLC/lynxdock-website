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
    slug: "when-your-own-roadmap-is-wrong",
    title: "Our roadmap was wrong. The code proved it.",
    date: "2026-07-21",
    readingTime: "5 min read",
    tag: "Founder Update",
    kind: "founder",
    topics: ["Engineering", "Architecture"],
    featured: true,
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
    tag: "Progress",
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
    tag: "Design",
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
    tag: "Perspective",
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
    tag: "Perspective",
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
    tag: "Roadmap",
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
    tag: "Announcement",
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
    tag: "Perspective",
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
    tag: "Guide",
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
    tag: "Behind the scenes",
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
