import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import MissionControlShowcase from "@/components/MissionControlShowcase";
import SectionHeader from "@/components/SectionHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import SystemStatusBoard from "@/components/SystemStatusBoard";
import { systemStatus } from "@/data/status";

export const metadata: Metadata = {
  title: "Mission Control",
  description:
    "LynxDock Mission Control is a tactical operations center for communities - a live command tree, wings, objectives, orders, ready checks, and roster readiness.",
};

const views = [
  {
    role: "Commander view",
    text: "The full picture: wing readiness, the command tree, objectives, and the operations feed - everything you need to run an op from one dashboard.",
  },
  {
    role: "Wing leader view",
    text: "Focus on your wing. Assign members, issue orders, and track readiness for the units reporting to you.",
  },
  {
    role: "Pilot / member view",
    text: "Know exactly where you belong: your assignment, your orders, active objectives, and when you're needed.",
  },
];

const capabilities = [
  {
    title: "Live command tree",
    text: "See who reports to whom and how the whole group is organized, updating in real time.",
  },
  {
    title: "Wings & squadrons",
    text: "Group members into structured units with readiness visible at a glance.",
  },
  {
    title: "Objectives",
    text: "Set active objectives with priority and status, tracked across the operation.",
  },
  {
    title: "Orders",
    text: "Issue and receive orders down the command tree so intent reaches everyone.",
  },
  {
    title: "Ready checks",
    text: "Call a readiness check and see who's ready, assigned, and available instantly.",
  },
  {
    title: "Live tracking",
    text: "Follow activity as it happens through the operations feed and status indicators.",
  },
];

export default function MissionControlPage() {
  return (
    <>
      <PageHeader
        eyebrow="LynxDock - Core capability"
        title="Mission Control"
        description="A tactical operations center built into your community. Organize people into wings, run a live command tree, set objectives, issue orders, and call ready checks - so a large group moves like a small one."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <GlowButton href="/support/#early-access" variant="primary">
            Request Early Access
          </GlowButton>
          <GlowButton href="/products/lynxdock/" variant="secondary">
            About LynxDock
          </GlowButton>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <MissionControlShowcase priority />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-8">
        <SectionHeader
          eyebrow="One operation, three perspectives"
          title="A view for every role"
          className="mb-10"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {views.map((v) => (
            <GlassPanel key={v.role} hover className="flex h-full flex-col p-6">
              <span className="hud-label text-signal-cyan">{v.role}</span>
              <p className="mt-3 text-sm leading-relaxed text-[#9fb2ba]">
                {v.text}
              </p>
            </GlassPanel>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeader
          eyebrow="Everything in the operations center"
          title="Built to coordinate people at scale"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <GlassPanel key={c.title} hover className="flex h-full flex-col p-6">
              <h3 className="text-base font-semibold text-white">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
                {c.text}
              </p>
            </GlassPanel>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-4">
        <SectionHeader
          eyebrow="One source of truth"
          title="System status"
          className="mb-4"
        />
        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-[#9fb2ba]">
          Not a mockup - this board is generated straight from the LynxDock repositories,
          reporting the live health and versions of the server, desktop app, protocol, and website.
        </p>
        <SystemStatusBoard status={systemStatus} />
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24">
        <GlassPanel glow className="p-10 text-center sm:p-14">
          <span className="hud-label">Made for organized communities</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
            If your group briefs, assigns, and moves together - this is your tool
          </h2>
          <div className="mt-8 flex justify-center">
            <GlowButton href="/support/#early-access" variant="primary">
              Request Early Access
            </GlowButton>
          </div>
        </GlassPanel>
      </section>
    </>
  );
}
