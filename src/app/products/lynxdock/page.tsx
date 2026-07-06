import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FeatureCard from "@/components/FeatureCard";
import ScreenshotShowcase from "@/components/ScreenshotShowcase";
import AudienceGrid, { type Audience } from "@/components/AudienceGrid";
import GlowButton from "@/components/GlowButton";
import { productDetails } from "@/data/productDetails";

export const metadata: Metadata = {
  title: "LynxDock",
  description:
    "A lightweight communication platform for voice, chat, and screen sharing - with quick P2P calls and self-hosted, persistent community servers.",
};

const d = productDetails.lynxdock;

const audiences: Audience[] = [
  {
    title: "Creators",
    text: "Host a private community for your audience without handing it to a platform that owns your reach.",
  },
  {
    title: "Gamers",
    text: "Spin up a quick call for a session, or run a persistent squadron server with roles and voice channels.",
  },
  {
    title: "Developers",
    text: "Self-host a lightweight, no-nonsense comms server for your team, with data that stays on your infrastructure.",
  },
  {
    title: "Communities",
    text: "Give members a calm home with accounts, history, and admin controls - owned by you, not rented.",
  },
];

export default function LynxDockPage() {
  return (
    <>
      <PageHeader eyebrow={d.stage} title={d.name} description={d.intro}>
        <div className="flex flex-col gap-3 sm:flex-row">
          {d.ctas.map((c) => (
            <GlowButton key={c.label} href={c.href} external={c.external} variant={c.variant}>
              {c.label}
            </GlowButton>
          ))}
        </div>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {d.features.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </section>

      <AudienceGrid title="Built for the way you connect" items={audiences} />

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <ScreenshotShowcase shots={d.screenshots} />
      </section>
    </>
  );
}
