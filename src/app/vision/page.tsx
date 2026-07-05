import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "Why LynxDock exists: software that serves the people who use it, gives communities real tools, and lets you own your own space.",
};

const beliefs = [
  {
    title: "Communities deserve better tools",
    text: "The groups doing the most organized, ambitious things online are stuck with tools built for casual chat. Structure shouldn't be a hack you bolt on - it should be built in.",
  },
  {
    title: "You should own your space",
    text: "Your members, your history, and your data should belong to you. Self-hosting means your community lives on infrastructure you control, not a platform that can change the rules.",
  },
  {
    title: "Software should be calm",
    text: "No dark patterns, no engagement traps, no noise. The best tools get out of the way and respect your attention and your time.",
  },
  {
    title: "One coherent ecosystem",
    text: "LynxDock, Studio, and Bootstrap share one philosophy. Communication, building, and automation that all feel like they belong together.",
  },
];

export default function VisionPage() {
  return (
    <>
      <PageHeader
        eyebrow="Why we exist"
        title="Vision"
        description="Built for People. Not Platforms. That isn't a slogan we picked - it's the constraint we design everything around."
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <GlassPanel className="p-8 sm:p-10">
          <div className="doc-prose">
            <p>
              Most software is built to capture you. Free products where the
              numbers only go up are usually paid for with your attention and your
              data. We wanted to build the other kind - the kind you can trust
              because its incentives are aligned with yours.
            </p>
            <p>
              LynxDock started from a frustration: the tools communities rely on
              to talk, organize, and move together weren&rsquo;t built for that.
              Channels sprawl. Coordination lives in people&rsquo;s heads. And
              none of it is truly yours. Mission Control is our answer - a
              tactical operations center that gives a community real structure
              without the clutter.
            </p>
            <p>
              Around that sits a small ecosystem with the same values. Studio for
              building with connected knowledge. Bootstrap for turning ideas into
              foundations. All privacy-first, all lightweight, all yours.
            </p>
          </div>
        </GlassPanel>

        <h2 className="mb-6 mt-14 text-xl font-semibold text-white">
          What we believe
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {beliefs.map((b) => (
            <GlassPanel key={b.title} hover className="p-6">
              <h3 className="text-base font-semibold text-white">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
                {b.text}
              </p>
            </GlassPanel>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <GlowButton href="/mission-control/" variant="primary">
            See Mission Control
          </GlowButton>
        </div>
      </section>
    </>
  );
}
