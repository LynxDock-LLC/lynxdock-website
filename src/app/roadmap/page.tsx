import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import RoadmapTimeline from "@/components/RoadmapTimeline";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import { roadmap } from "@/data/roadmap";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "The honest, founder-led roadmap for LynxDock, LynxDock Studio, and LynxDock Bootstrap.",
};

const GITHUB_ORG = "https://github.com/LynxDock-LLC";

export default function RoadmapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Where we're headed"
        title="Roadmap"
        description="LynxDock is early and built in the open. This is the honest state of the ecosystem — what's active, and what's planned next."
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <RoadmapTimeline phases={roadmap} />

        <GlassPanel glow className="mt-14 p-8 text-center sm:p-10">
          <span className="hud-label">Early access</span>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Want in early?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#9fb2ba]">
            Follow development on GitHub or register interest for early access to
            LynxDock products.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <GlowButton href={GITHUB_ORG} external variant="primary">
              Follow on GitHub
            </GlowButton>
            <GlowButton href="/support/#early-access" variant="secondary">
              Request Early Access
            </GlowButton>
          </div>
        </GlassPanel>
      </section>
    </>
  );
}
