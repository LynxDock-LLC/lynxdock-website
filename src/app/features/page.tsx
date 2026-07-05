import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";

export const metadata: Metadata = {
  title: "Future Features",
  description:
    "A directional look at what's being explored across LynxDock, Mission Control, Studio, and Bootstrap.",
};

type Status = "in-progress" | "planned" | "exploring";

const statusStyle: Record<Status, string> = {
  "in-progress": "border-signal-blue/50 bg-signal-blue/15 text-[#93c5fd]",
  planned: "border-signal-cyan/40 bg-signal-cyan/10 text-signal-bright",
  exploring: "border-line bg-graphite-700/40 text-[#9fb2ba]",
};

const statusLabel: Record<Status, string> = {
  "in-progress": "In progress",
  planned: "Planned",
  exploring: "Exploring",
};

type Item = { title: string; text: string; status: Status };
type Group = { area: string; items: Item[] };

const groups: Group[] = [
  {
    area: "Mission Control",
    items: [
      {
        title: "Tactical map view",
        text: "A live map with unit positions and movement layered on top of the command tree.",
        status: "planned",
      },
      {
        title: "Mission planning & timeline",
        text: "Plan phases and objectives ahead of time, then run them against a live mission clock.",
        status: "planned",
      },
      {
        title: "Briefing & after-action rooms",
        text: "Dedicated spaces to brief before an operation and review what happened after.",
        status: "exploring",
      },
      {
        title: "Mobile companion",
        text: "Check readiness, receive orders, and respond to ready checks from your phone.",
        status: "exploring",
      },
    ],
  },
  {
    area: "LynxDock core",
    items: [
      {
        title: "Native mobile apps",
        text: "iOS and Android clients so members can stay connected away from the desktop.",
        status: "planned",
      },
      {
        title: "Streams & richer voice",
        text: "Higher-quality audio, noise suppression, and community streaming.",
        status: "exploring",
      },
      {
        title: "Custom themes & skins",
        text: "Make your server yours - customizable, retro-inspired interface skins.",
        status: "exploring",
      },
      {
        title: "Bots & integrations",
        text: "An extension surface so communities can automate and connect their own tools.",
        status: "exploring",
      },
    ],
  },
  {
    area: "Studio",
    items: [
      {
        title: "Deeper AI assistance",
        text: "Context-aware help grounded in your project's own knowledge graph.",
        status: "in-progress",
      },
      {
        title: "Templates & publishing",
        text: "Reusable structures and one-step publishing for docs and knowledge bases.",
        status: "planned",
      },
    ],
  },
  {
    area: "Bootstrap",
    items: [
      {
        title: "One-command genesis",
        text: "Go from a single prompt to a complete, structured project foundation.",
        status: "in-progress",
      },
      {
        title: "Foundation templates",
        text: "A growing library of starting points for common products and services.",
        status: "planned",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="What's coming"
        title="Future Features"
        description="A directional look at where LynxDock is headed. These are ideas in active exploration and development - not commitments or ship dates. For the phase-level plan, see the roadmap."
      >
        <GlowButton href="/roadmap/" variant="secondary">
          View the Roadmap
        </GlowButton>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-col gap-14">
          {groups.map((group) => (
            <div key={group.area}>
              <SectionHeader eyebrow="Coming to" title={group.area} className="mb-6" />
              <div className="grid gap-5 sm:grid-cols-2">
                {group.items.map((item) => (
                  <GlassPanel key={item.title} hover className="flex h-full flex-col p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <span
                        className={`whitespace-nowrap rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyle[item.status]}`}
                      >
                        {statusLabel[item.status]}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
                      {item.text}
                    </p>
                  </GlassPanel>
                ))}
              </div>
            </div>
          ))}
        </div>

        <GlassPanel glow className="mt-14 p-8 text-center sm:p-10">
          <span className="hud-label">Help shape it</span>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Tell us what your community needs
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#9fb2ba]">
            The roadmap is shaped by the people who use LynxDock. Request early
            access or open an issue with what would make it indispensable for you.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <GlowButton href="/support/#early-access" variant="primary">
              Request Early Access
            </GlowButton>
            <GlowButton href="/community/" variant="secondary">
              Join the Community
            </GlowButton>
          </div>
        </GlassPanel>
      </section>
    </>
  );
}
