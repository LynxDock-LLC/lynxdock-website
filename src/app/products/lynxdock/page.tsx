import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FeatureCard from "@/components/FeatureCard";
import ScreenshotShowcase, { type Shot } from "@/components/ScreenshotShowcase";
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
    src: "/screenshots/community-connect.png",
    alt: "LynxDock connect screen offering a Quick Call or a persistent self-hosted server",
    label: "LynxDock - Connect",
    caption: "Start a Quick Call, or connect to a persistent community server.",
    width: 1341,
    height: 916,
  },
  {
    src: "/screenshots/server-setup.png",
    alt: "LynxDock Guided Server Setup wizard with server basics, network, and storage settings",
    label: "LynxDock - Guided Server Setup",
    caption: "Generate a real config with safe self-hosting defaults - no terminal required.",
    width: 1124,
    height: 805,
  },
  {
    src: "/screenshots/mission-control.png",
    alt: "LynxDock squadron command view with wing readiness and a live command tree",
    label: "LynxDock - Squadron / Mission Control",
    caption: "Organize communities into wings and squadrons with a live command tree.",
    width: 2330,
    height: 1521,
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

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <ScreenshotShowcase shots={shots} />
      </section>
    </>
  );
}
