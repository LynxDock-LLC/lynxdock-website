import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FeatureCard from "@/components/FeatureCard";
import ScreenshotShowcase, { type Shot } from "@/components/ScreenshotShowcase";
import AudienceGrid, { type Audience } from "@/components/AudienceGrid";
import GlowButton from "@/components/GlowButton";
import { lynxdockFeatures } from "@/data/features";

export const metadata: Metadata = {
  title: "LynxDock",
  description:
    "A lightweight communication platform for voice, chat, and screen sharing - with quick P2P calls and self-hosted, persistent community servers.",
};

const GITHUB_ORG = "https://github.com/LynxDock-LLC";

const shots: Shot[] = [
  {
    src: "/screenshots/community-connect.webp",
    alt: "LynxDock connect screen offering a Quick Call or a persistent self-hosted server",
    label: "LynxDock - Connect",
    caption: "Start a Quick Call, or connect to a persistent community server.",
    width: 1341,
    height: 916,
  },
  {
    src: "/screenshots/server-setup.webp",
    alt: "LynxDock Guided Server Setup wizard with server basics, network, and storage settings",
    label: "LynxDock - Guided Server Setup",
    caption:
      "Generate a real config with safe self-hosting defaults - no terminal required.",
    width: 1124,
    height: 805,
  },
  {
    src: "/screenshots/mission-control.webp",
    alt: "LynxDock squadron command view with wing readiness and a live command tree",
    label: "LynxDock - Squadron / Mission Control",
    caption:
      "Organize communities into wings and squadrons with a live command tree.",
    width: 1600,
    height: 1044,
  },
];

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
      <PageHeader
        eyebrow="Core Product"
        title="LynxDock"
        description="Calls and communities, without the weight. A lightweight platform for voice, chat, and screen sharing - from spontaneous P2P calls to fully self-hosted communities you own."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <GlowButton href={GITHUB_ORG} external variant="primary">
            View on GitHub
          </GlowButton>
          <GlowButton href="/docs/" variant="secondary">
            Read the Docs
          </GlowButton>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {lynxdockFeatures.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </section>

      <AudienceGrid title="Built for the way you connect" items={audiences} />

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <ScreenshotShowcase shots={shots} />
      </section>
    </>
  );
}
