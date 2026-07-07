import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import EpicRoadmap from "@/components/EpicRoadmap";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import EarlyAccessForm from "@/components/EarlyAccessForm";
import { epics } from "@/data/epics";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "The epic-level roadmap for LynxDock: Foundation and Workspace & Identity are complete, Messaging is in progress, and Networking, Communities, Voice, AI, Plugins, and Studio are planned.",
};

const GITHUB_ORG = "https://github.com/LynxDock-LLC";

const done = epics.filter((e) => e.status === "completed").length;

export default function RoadmapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Where we're headed"
        title="Roadmap"
        description="LynxDock is built in the open and tracked as epics. This is the honest state of the platform — what's done, what's in progress, and what's planned next."
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="mb-10 flex flex-wrap gap-3">
          <span className="rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-3 py-1 text-xs font-medium text-signal-bright">
            {done} of {epics.length} epics complete
          </span>
          <span className="rounded-full border border-signal-blue/40 bg-signal-blue/10 px-3 py-1 text-xs font-medium text-[#93c5fd]">
            Epic 2 · Messaging in progress
          </span>
        </div>

        <EpicRoadmap epics={epics} />

        <GlassPanel glow className="mt-14 p-8 text-center sm:p-10">
          <span className="hud-label">Early access</span>
          <h2 className="mt-3 text-2xl font-semibold text-white">Want in early?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#9fb2ba]">
            Register interest for alpha builds and development updates, or follow the work on GitHub.
          </p>
          <div className="mt-6">
            <EarlyAccessForm />
          </div>
          <div className="mt-4 flex justify-center">
            <GlowButton href={GITHUB_ORG} external variant="ghost">
              Or follow on GitHub
            </GlowButton>
          </div>
        </GlassPanel>
      </section>
    </>
  );
}
