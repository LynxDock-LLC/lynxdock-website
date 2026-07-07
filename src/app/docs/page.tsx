import type { Metadata } from "next";
import Link from "next/link";
import GlassPanel from "@/components/GlassPanel";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Documentation for LynxDock - the privacy-first, Rust-powered communication platform. Architecture, developer setup, and guides.",
};

const cards = [
  { href: "/docs/getting-started/", title: "Quickstart", text: "What the alpha desktop app does today and how to try it." },
  { href: "/docs/architecture/", title: "Architecture", text: "How the spec, infrastructure, and product monorepo fit together." },
  { href: "/docs/developers/", title: "Developers", text: "The monorepo, the packages, and how the Rust ↔ TypeScript bridge works." },
  { href: "/docs/self-hosting/", title: "Self-hosting", text: "Where self-hosting is headed (Epic 3+) and the philosophy behind it." },
];

export default function DocsOverview() {
  return (
    <div>
      <span className="hud-label">Documentation</span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Overview</h1>
      <div className="doc-prose mt-5">
        <p>
          LynxDock is a privacy-first, Rust-powered communication platform in active
          Version 2 development. The infrastructure layer is complete, and a desktop
          application is under construction: today it runs a local workspace, identity,
          settings, and a local-only chat client.
        </p>
        <p>
          These guides track the real state of the project. Start with the quickstart,
          then dig into the architecture and the developer setup. The full plan lives on
          the <Link href="/roadmap/">roadmap</Link>.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="block">
            <GlassPanel hover className="h-full p-5">
              <h2 className="text-base font-semibold text-white">{c.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[#9fb2ba]">{c.text}</p>
            </GlassPanel>
          </Link>
        ))}
      </div>
    </div>
  );
}
