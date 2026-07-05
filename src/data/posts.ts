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
