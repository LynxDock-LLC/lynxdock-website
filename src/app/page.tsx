import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import FeatureCard from "@/components/FeatureCard";
import ScreenshotShowcase, { type Shot } from "@/components/ScreenshotShowcase";
import RoadmapTimeline from "@/components/RoadmapTimeline";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import { products } from "@/data/products";
import { principles } from "@/data/features";
import { roadmap } from "@/data/roadmap";

const GITHUB_ORG = "https://github.com/LynxDock-LLC";

const shots: Shot[] = [
  {
    src: "/screenshots/mission-control.png",
    alt: "LynxDock squadron view showing a mission-active commander dashboard with wing readiness, a command tree, and a live member roster",
    label: "LynxDock · Squadron / Mission Control",
    caption:
      "Mission control — organize people into wings and squadrons with a live command tree.",
    width: 2330,
    height: 1521,
  },
  {
    src: "/screenshots/server-setup.png",
    alt: "LynxDock Guided Server Setup wizard for creating a local server without touching config files",
    label: "LynxDock · Guided Server Setup",
    caption: "Self-host in minutes with a calm, guided setup wizard.",
    width: 1124,
    height: 805,
  },
  {
    src: "/screenshots/community-connect.png",
    alt: "LynxDock connect screen offering a Quick Call or a persistent self-hosted server",
    label: "LynxDock · Connect",
    caption: "Talk now, or settle into a persistent community server.",
    width: 1341,
    height: 916,
  },
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
  return (
    <>
      <Hero />

      {/* 2. Product screenshot showcase */}
      <Section className="py-16 sm:py-20">
        <SectionHeader
          align="center"
          eyebrow="Proof, not promises"
          title="An interface that feels like a command center"
          description="Dark, quiet, and precise. LynxDock is designed to get out of your way — so hosting, calling, and organizing feel calm instead of chaotic."
          className="mb-10"
        />
        <ScreenshotShowcase shots={shots} />
      </Section>

      {/* 3. Product ecosystem */}
      <Section id="products" className="py-16 sm:py-20">
        <SectionHeader
          eyebrow="The ecosystem"
          title="Three products. One philosophy."
          description="Everything LynxDock builds shares a single design language and a single principle — software that serves the people using it."
          className="mb-10"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </Section>

      {/* 4. Why LynxDock exists */}
      <Section className="py-16 sm:py-20">
        <GlassPanel className="relative overflow-hidden p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-hud-grid opacity-40"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div>
              <span className="hud-label">Why we exist</span>
              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                Most platforms are built to capture you.
                <br />
                <span className="text-gradient">LynxDock is built to serve you.</span>
              </h2>
            </div>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#9fb2ba]">
              <p>
                The modern software stack treats people as metrics — engagement
                to optimize, data to harvest, attention to sell. LynxDock takes
                the opposite stance.
              </p>
              <p>
                We build privacy-first, performance-focused tools that you can
                self-host and truly own. No surveillance, no lock-in, no
                platform tax. Just fast, quiet software for creators, gamers,
                developers, and communities.
              </p>
              <p className="font-medium text-signal-cyan/90">
                Built for People. Not Platforms.
              </p>
            </div>
          </div>
        </GlassPanel>
      </Section>

      {/* 5. Core principles */}
      <Section className="py-16 sm:py-20">
        <SectionHeader
          eyebrow="Core principles"
          title="What every LynxDock product stands for"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </Section>

      {/* 6. Roadmap */}
      <Section className="py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="Where we're headed"
            title="The road to a complete ecosystem"
            description="LynxDock is early and founder-led. Here's the honest state of what's shipping, what's active, and what's next."
          />
          <RoadmapTimeline phases={roadmap} />
        </div>
        <div className="mt-10">
          <GlowButton href="/roadmap/" variant="secondary">
            See the full roadmap
          </GlowButton>
        </div>
      </Section>

      {/* 7. Call to action */}
      <Section className="pb-24 pt-8">
        <GlassPanel glow className="relative overflow-hidden p-10 text-center sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-signal-cyan/10 blur-[100px]"
          />
          <div className="relative mx-auto flex max-w-xl flex-col items-center">
            <span className="hud-label">Get involved</span>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Follow the build
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#9fb2ba]">
              LynxDock is being built in the open. Watch the roadmap, explore the
              code, or register interest for early access.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <GlowButton href={GITHUB_ORG} external variant="primary">
                Star on GitHub
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
