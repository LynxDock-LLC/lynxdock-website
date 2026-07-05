import Hero from "@/components/Hero";
import MissionControlShowcase from "@/components/MissionControlShowcase";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";
import RoadmapTimeline from "@/components/RoadmapTimeline";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import { getProduct } from "@/data/products";
import { principles } from "@/data/features";
import { roadmap } from "@/data/roadmap";

const GITHUB_ORG = "https://github.com/LynxDock-LLC";

const mcFeatures = [
  "Live command tree",
  "Wings & squadrons",
  "Objectives & orders",
  "Ready checks",
  "Roster & readiness",
  "Operations feed",
];

const communities = [
  "Star Citizen",
  "Arma",
  "DCS",
  "Foxhole",
  "Squad",
  "Elite Dangerous",
  "EVE Online",
  "Helldivers",
  "FiveM",
  "MSFS",
  "Home labs",
  "LAN parties",
  "Dev studios",
];

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 ${className}`}>
      {children}
    </section>
  );
}

export default function Home() {
  const studio = getProduct("studio");
  const bootstrap = getProduct("bootstrap");

  return (
    <>
      <Hero />

      {/* 1. Mission Control - the hero experience */}
      <Section className="py-16 sm:py-20">
        <SectionHeader
          align="center"
          eyebrow="Mission Control"
          title="Command your community like an operation"
          description="Discord gives you channels. LynxDock gives you a tactical operations center - wings, a live command tree, objectives, orders, and ready checks - so a hundred people move as one."
          className="mb-10"
        />
        <MissionControlShowcase priority />
        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
          {mcFeatures.map((f) => (
            <span
              key={f}
              className="rounded-full border border-line bg-graphite-800/40 px-3 py-1 text-xs text-[#9fb2ba]"
            >
              {f}
            </span>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <GlowButton href="/mission-control/" variant="primary">
            Explore Mission Control
          </GlowButton>
        </div>
      </Section>

      {/* 2. Why Discord isn't enough */}
      <Section className="py-16 sm:py-20">
        <GlassPanel className="relative overflow-hidden p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-hud-grid opacity-40"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <span className="hud-label">The problem</span>
              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                Discord wasn&rsquo;t built for organized communities.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#9fb2ba]">
                A wall of channels. Nobody knows where to be. Voice rooms
                overflow, roles sprawl, and when it matters most, coordination
                falls apart. And none of it is yours - your members, your
                history, and your data live on someone else&rsquo;s platform.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-[#c3d0d6]">
              {[
                "Channel chaos instead of clear structure",
                "No sense of who is ready or assigned",
                "Coordination lives in people's heads, not the tool",
                "Your community and its data aren't yours to keep",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1 flex h-4 w-4 flex-none items-center justify-center rounded-full border border-red-400/40 text-[10px] text-red-300"
                  >
                    x
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </GlassPanel>
      </Section>

      {/* 3. How LynxDock is different */}
      <Section className="py-16 sm:py-20">
        <SectionHeader
          eyebrow="The answer"
          title="Structure when you need it. Calm when you don't."
          description="LynxDock scales from a two-person call to a full operation without switching tools - and everything can be self-hosted and owned by you."
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.slice(0, 6).map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </Section>

      {/* 4. Named communities */}
      <Section className="py-16 sm:py-20">
        <GlassPanel glow className="relative overflow-hidden p-8 text-center sm:p-12">
          <span className="hud-label">Perfect for</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
            The communities that actually run operations
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#9fb2ba]">
            If your group briefs, assigns, and moves together, LynxDock was built
            for you.
          </p>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5">
            {communities.map((c) => (
              <span
                key={c}
                className="rounded-full border border-signal-cyan/25 bg-signal-cyan/5 px-3.5 py-1.5 text-sm text-[#c3d0d6]"
              >
                {c}
              </span>
            ))}
          </div>
        </GlassPanel>
      </Section>

      {/* 5. Products - LynxDock flagship + ecosystem */}
      <Section id="products" className="py-16 sm:py-20">
        <SectionHeader
          eyebrow="The flagship"
          title="LynxDock"
          description="Calls and communities, without the weight - from a spontaneous P2P call to a fully self-hosted operation you own."
          className="mb-8"
        />
        <GlassPanel hover className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center">
          <div className="flex-1">
            <p className="text-sm font-medium text-signal-cyan/90">
              Calls, channels & Mission Control
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-[#9fb2ba]">
              Quick peer-to-peer calls for voice, chat, and screen sharing.
              Persistent, self-hosted servers with accounts, history, and admin
              controls. And a tactical command view for organizing people at any
              scale.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <GlowButton href="/products/lynxdock/" variant="primary">
                Explore LynxDock
              </GlowButton>
              <GlowButton href="/mission-control/" variant="secondary">
                See Mission Control
              </GlowButton>
            </div>
          </div>
        </GlassPanel>

        <div className="mt-12">
          <SectionHeader
            eyebrow="Also part of the ecosystem"
            title="Studio & Bootstrap"
            description="The same philosophy, applied to building. Optional companions to the flagship."
            className="mb-6"
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {[studio, bootstrap].map((p) =>
              p ? (
                <GlassPanel key={p.slug} as="article" hover className="flex h-full flex-col p-6">
                  <span className="hud-label">{p.stage}</span>
                  <h3 className="mt-3 text-lg font-semibold text-white">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-signal-cyan/90">
                    {p.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#9fb2ba]">
                    {p.summary}
                  </p>
                  <GlowButton href={p.href} variant="ghost" className="mt-5 self-start">
                    Learn more
                  </GlowButton>
                </GlassPanel>
              ) : null
            )}
          </div>
        </div>
      </Section>

      {/* 6. Roadmap */}
      <Section className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="Where we're headed"
            title="Built in the open"
            description="LynxDock is early and founder-led. Here's the honest state of what's active and what's next."
          />
          <RoadmapTimeline phases={roadmap} />
        </div>
      </Section>

      {/* 7. Community */}
      <Section className="py-16 sm:py-20">
        <SectionHeader
          align="center"
          eyebrow="Community"
          title="Follow the build"
          description="LynxDock is being built in the open. Watch the roadmap, explore the code, and read along."
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { title: "GitHub", text: "Star the repos and follow development.", href: GITHUB_ORG, external: true, cta: "Open GitHub" },
            { title: "Roadmap", text: "See what's shipping and what's next.", href: "/roadmap/", external: false, cta: "View roadmap" },
            { title: "Blog", text: "Notes and announcements from the team.", href: "/blog/", external: false, cta: "Read the blog" },
          ].map((c) => (
            <GlassPanel key={c.title} hover className="flex h-full flex-col p-6">
              <h3 className="text-base font-semibold text-white">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#9fb2ba]">
                {c.text}
              </p>
              <GlowButton
                href={c.href}
                external={c.external}
                variant="ghost"
                className="mt-4 self-start"
              >
                {c.cta}
              </GlowButton>
            </GlassPanel>
          ))}
        </div>
      </Section>

      {/* 8. Download CTA */}
      <Section className="pb-24 pt-8">
        <GlassPanel glow className="relative overflow-hidden p-10 text-center sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-signal-cyan/10 blur-[100px]"
          />
          <div className="relative mx-auto flex max-w-xl flex-col items-center">
            <span className="hud-label">Get LynxDock</span>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Downloads are coming
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#9fb2ba]">
              Desktop builds for Windows, Linux, and macOS are on the way. Grab
              early access and be first in line.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <GlowButton href="/download/" variant="primary">
                Downloads
              </GlowButton>
              <GlowButton href="/support/#early-access" variant="secondary">
                Request Early Access
              </GlowButton>
            </div>
          </div>
        </GlassPanel>
      </Section>
    </>
  );
}
