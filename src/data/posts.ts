export type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  readingTime: string;
  excerpt: string;
  tag: string;
  body: string[]; // paragraphs
};

export const posts: Post[] = [
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
