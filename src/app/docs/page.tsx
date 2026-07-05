import type { Metadata } from "next";
import Link from "next/link";
import GlassPanel from "@/components/GlassPanel";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Documentation for the LynxDock ecosystem - quickstart, self-hosting, and guides.",
};

const cards = [
  {
    href: "/docs/getting-started/",
    title: "Quickstart",
    text: "Launch LynxDock and start your first call or server in a couple of minutes.",
  },
  {
    href: "/docs/self-hosting/",
    title: "Self-hosting a server",
    text: "Use the Guided Setup wizard to run a persistent server you fully own.",
  },
  {
    href: "/docs/communities/",
    title: "Calls & communities",
    text: "Quick Calls, persistent servers, channels, and squadron mission control.",
  },
];

export default function DocsOverview() {
  return (
    <div>
      <span className="hud-label">Documentation</span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Overview
      </h1>
      <div className="doc-prose mt-5">
        <p>
          Welcome to the LynxDock documentation. LynxDock is a lightweight,
          privacy-first communication platform: start a quick peer-to-peer call,
          or self-host a persistent community server that you and your members
          fully own.
        </p>
        <p>
          These guides are growing alongside the products. Start with the
          quickstart, then dig into self-hosting and communities.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="block">
            <GlassPanel hover className="h-full p-5">
              <h2 className="text-base font-semibold text-white">{c.title}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[#9fb2ba]">
                {c.text}
              </p>
            </GlassPanel>
          </Link>
        ))}
      </div>
    </div>
  );
}
