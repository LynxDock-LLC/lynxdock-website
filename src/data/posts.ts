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
      "Why we're building a privacy-first ecosystem for communication, development, and automation — and what comes next.",
    body: [
      "Most software today is built to capture you. Engagement to optimize, data to harvest, attention to sell. LynxDock takes the opposite stance: software should serve the people who use it.",
      "LynxDock is a lightweight communication platform. Start a spontaneous peer-to-peer call for voice, chat, and screen sharing, or settle into a persistent, self-hosted community with accounts, rooms, history, and admin controls. Either way, your accounts and data stay with the server you choose — not with us.",
      "Self-hosting has a reputation for being painful. We're changing that. The Guided Server Setup wizard generates a real config with sensible defaults, a random session secret, and safe self-hosting options — no config files or terminal commands required.",
      "LynxDock is one part of a larger ecosystem. LynxDock Studio is an AI-assisted development workspace that links docs, sprints, architecture, and research into a single navigable graph. LynxDock Bootstrap is the automation engine that turns a blank slate into a structured foundation in minutes.",
      "We're early, and we're building in the open. Follow the roadmap, star the repositories, and register interest for early access. This is just the beginning.",
    ],
  },
  {
    slug: "the-genesis-of-lynxdock-app",
    title: "The Genesis of lynxdock.app",
    date: "2026-07-04",
    readingTime: "2 min read",
    tag: "Behind the scenes",
    excerpt:
      "How this website came together — a lightweight, static, mission-control design that feels like an extension of the app.",
    body: [
      "The LynxDock website should feel like entering a quiet, high-end command center. Not playful, not corporate, not generic SaaS. Private, powerful, technical, calm, premium — and above all, lightweight.",
      "Under the hood it's a Next.js and TypeScript site styled with Tailwind CSS, exported as fully static files and served on Cloudflare Pages. No runtime server, no database, no heavy client libraries. The whole thing is generated ahead of time for speed.",
      "The design language borrows the vocabulary of the app itself: a dark graphite base, thin cyan hairline borders, translucent glass panels, and subtle glow. The logo is the visual anchor; the product screenshots are the proof.",
      "Everything you see here is intentionally minimal. Short copy, generous space, and just enough motion to feel alive without getting in the way. That restraint is the point — it's the same philosophy that drives the products.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
