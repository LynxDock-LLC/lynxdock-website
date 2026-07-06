import Image from "next/image";
import Link from "next/link";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";
import RoadmapTimeline from "@/components/RoadmapTimeline";
import type { RoadmapPhase } from "@/data/roadmap";
import { principles } from "@/data/features";

const GITHUB_ORG = "https://github.com/LynxDock-LLC";

type ProductBlock = {
  name: string;
  tagline: string;
  href: string;
  capabilities: string[];
};

const productBlocks: ProductBlock[] = [
  {
    name: "LynxDock",
    tagline: "The communication platform",
    href: "/products/lynxdock/",
    capabilities: ["Messaging", "Voice", "Video", "Streaming", "Communities"],
  },
  {
    name: "LynxDock Studio",
    tagline: "Your knowledge workspace",
    href: "/products/studio/",
    capabilities: ["Knowledge graph", "Notes", "AI", "Planning", "Genesis"],
  },
  {
    name: "LynxDock Bootstrap",
    tagline: "The automation engine",
    href: "/products/bootstrap/",
    capabilities: [
      "Repository generator",
      "Company generator",
      "GitHub automation",
      "Cloudflare deployment",
      "Developer tools",
    ],
  },
];

type FeatureRow = {
  src: string;
  alt: string;
  chrome: string;
  eyebrow: string;
  title: string;
  body: string;
  width: number;
  height: number;
};

const featureRows: FeatureRow[] = [
  {
    src: "/screenshots/server-setup.webp",
    alt: "LynxDock Guided Server Setup wizard with server basics, network, and storage settings",
    chrome: "LynxDock - Guided Server Setup",
    eyebrow: "Guided Server Setup",
    title: "Launch a server in minutes.",
    body: "A calm first-run wizard generates a real configuration with sensible defaults, a random session secret, and safe self-hosting options. No config files. No terminal. Host your own server and keep every account, message, and file on infrastructure you control.",
    width: 1124,
    height: 805,
  },
  {
    src: "/screenshots/community-connect.webp",
    alt: "LynxDock connect screen offering a Quick Call or a persistent self-hosted server",
    chrome: "LynxDock - Communication",
    eyebrow: "Communication",
    title: "Talk naturally. Share instantly.",
    body: "Voice, chat, and screen sharing that feel fast and familiar. Start a spontaneous peer-to-peer Quick Call, or connect to a persistent community server - the same lightweight client, whether it is two people or two hundred.",
    width: 1341,
    height: 916,
  },
  {
    src: "/screenshots/mission-control.webp",
    alt: "LynxDock squadron command view with wing readiness and a live command tree",
    chrome: "LynxDock - Mission Control",
    eyebrow: "Mission Control",
    title: "Mission Control for communities.",
    body: "A tactical command view for organizing people at scale: a live command tree, wings and squadrons, rosters, objectives, and ready checks. The structure a large group needs, presented as a calm command center rather than clutter.",
    width: 1600,
    height: 1044,
  },
  {
    src: "/screenshots/studio-graph.webp",
    alt: "LynxDock Studio knowledge graph linking documents, sprints, and research",
    chrome: "LynxDock Studio - Knowledge Graph",
    eyebrow: "LynxDock Studio",
    title: "Your second brain.",
    body: "An AI-assisted workspace that links docs, sprints, architecture, and research into one navigable graph. Plan, write, and build with assistance that is grounded in your own context - not a generic chatbot.",
    width: 1600,
    height: 1310,
  },
];

const trustItems = [
  { label: "Privacy first", icon: "shield" },
  { label: "Open standards", icon: "code" },
  { label: "Self hosted", icon: "server" },
  { label: "Cross platform", icon: "layers" },
  { label: "No subscription required", icon: "check" },
];

const platforms = ["Windows", "Linux", "macOS", "Self hosted"];

const homeRoadmap: RoadmapPhase[] = [
  {
    phase: "2026",
    title: "Genesis",
    description: "The foundation: LynxDock communication, self-hosting, and Mission Control.",
    status: "active",
  },
  {
    phase: "2026",
    title: "LynxDock Studio",
    description: "The AI-assisted knowledge workspace comes online.",
    status: "active",
  },
  {
    phase: "2026",
    title: "Public beta",
    description: "Open desktop builds for Windows, Linux, and macOS.",
    status: "planned",
  },
  {
    phase: "2026",
    title: "Plugins",
    description: "An extension surface so the community can build on LynxDock.",
    status: "planned",
  },
  {
    phase: "2026",
    title: "Marketplace",
    description: "A home for community plugins, themes, and templates.",
    status: "planned",
  },
  {
    phase: "2026",
    title: "Mobile",
    description: "LynxDock on the devices you carry, with the same ownership guarantees.",
    status: "planned",
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

function TrustIcon({ name }: { name: string }) {
  const common = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" />
        </svg>
      );
    case "server":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="7" rx="1.5" />
          <rect x="3" y="13" width="18" height="7" rx="1.5" />
          <path d="M7 7.5h.01M7 16.5h.01" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="M12 3 2 8l10 5 10-5-10-5z" />
          <path d="M2 13l10 5 10-5" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
  }
}

function ShotFrame({ row }: { row: FeatureRow }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-3xl bg-signal-cyan/5 blur-3xl"
      />
      <figure className="glass group relative overflow-hidden rounded-2xl shadow-panel transition-all duration-300 hover:border-signal-cyan/30 hover:shadow-[0_0_60px_-20px_rgba(53,224,224,0.4)]">
        <div className="flex items-center gap-2 border-b border-line/70 bg-graphite-900/70 px-4 py-2.5">
          <span aria-hidden className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-graphite-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-graphite-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal-cyan/50" />
          </span>
          <span className="ml-2 hud-label text-[#7f939b]">{row.chrome}</span>
        </div>
        <div className="relative bg-graphite-950">
          <Image
            src={row.src}
            alt={row.alt}
            width={row.width}
            height={row.height}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="h-auto w-full"
          />
        </div>
      </figure>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@keyframes ld-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}.ld-float{animation:ld-float 6s ease-in-out infinite}",
        }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-hud-grid mask-fade-b opacity-60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-radial-fade"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-8%] h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-signal-cyan/10 blur-[130px]"
        />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-20 pt-20 text-center sm:pt-28">
          <div className="ld-float animate-fade-up">
            <Image
              src="/logo/lynxdock-icon.png"
              alt="LynxDock logo"
              width={520}
              height={545}
              priority
              className="mx-auto h-24 w-auto drop-shadow-[0_0_45px_rgba(53,224,224,0.45)] sm:h-28"
            />
          </div>

          <h1 className="mt-10 text-4xl font-semibold tracking-tight text-white animate-fade-up sm:text-6xl md:text-7xl">
            Communication. Collaboration. Command.
            <span className="mt-2 block text-gradient">All in one place.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#9fb2ba] animate-fade-up sm:text-lg">
            LynxDock combines secure messaging, voice, screen sharing, server
            hosting, knowledge management, and AI-assisted workflows into one
            privacy-first platform.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 animate-fade-up sm:flex-row">
            <GlowButton href="/download/" variant="primary">
              Download
            </GlowButton>
            <GlowButton href={GITHUB_ORG} external variant="secondary">
              View on GitHub
            </GlowButton>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2.5 animate-fade-up">
            {platforms.map((p) => (
              <li
                key={p}
                className="rounded-full border border-line bg-graphite-800/40 px-3.5 py-1.5 text-xs text-[#9fb2ba]"
              >
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* TRUST BAR */}
      <Section className="pb-8 pt-2">
        <GlassPanel className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 px-6 py-5">
          {trustItems.map((t) => (
            <span
              key={t.label}
              className="flex items-center gap-2 text-sm text-[#9fb2ba]"
            >
              <span aria-hidden className="text-signal-bright">
                <TrustIcon name={t.icon} />
              </span>
              {t.label}
            </span>
          ))}
        </GlassPanel>
      </Section>

      {/* PRODUCTS */}
      <Section id="products" className="py-16 sm:py-24">
        <SectionHeader
          align="center"
          eyebrow="One ecosystem"
          title="Three products. One philosophy."
          description="Built for people, not platforms - communication, knowledge, and automation that share a single design language."
          className="mb-12"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {productBlocks.map((p) => (
            <GlassPanel
              key={p.name}
              as="article"
              hover
              className="flex h-full flex-col p-7"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">{p.name}</h3>
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-signal-cyan/70 shadow-glow"
                />
              </div>
              <p className="mt-1 text-sm font-medium text-signal-cyan/90">
                {p.tagline}
              </p>
              <ul className="mt-5 flex flex-col gap-2.5">
                {p.capabilities.map((c) => (
                  <li
                    key={c}
                    className="flex items-center gap-2.5 text-sm text-[#c3d0d6]"
                  >
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 flex-none rounded-full bg-signal-cyan/60"
                    />
                    {c}
                  </li>
                ))}
              </ul>
              <Link
                href={p.href}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-signal-bright transition-all hover:gap-2.5"
              >
                Learn more
                <span aria-hidden>&rarr;</span>
              </Link>
            </GlassPanel>
          ))}
        </div>
      </Section>

      {/* FEATURE ROWS - alternating */}
      <Section className="flex flex-col gap-20 py-8 sm:gap-28 sm:py-12">
        {featureRows.map((row, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={row.src}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
            >
              <div className={reversed ? "lg:order-2" : ""}>
                <ShotFrame row={row} />
              </div>
              <div className={reversed ? "lg:order-1" : ""}>
                <span className="hud-label flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full bg-signal-cyan shadow-glow"
                  />
                  {row.eyebrow}
                </span>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
                  {row.title}
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-[#9fb2ba] sm:text-base">
                  {row.body}
                </p>
              </div>
            </div>
          );
        })}
      </Section>

      {/* PRINCIPLES */}
      <Section className="py-16 sm:py-24">
        <SectionHeader
          align="center"
          eyebrow="What we stand for"
          title="Principles, not features."
          description="The constraints we design everything around - the reason LynxDock feels different to use."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.slice(0, 6).map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </Section>

      {/* DESIGN SYSTEM PREVIEW */}
      <Section className="py-16 sm:py-20">
        <GlassPanel className="relative overflow-hidden p-8 sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-hud-grid opacity-30"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="hud-label">Genesis Design System</span>
              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                One system behind every pixel.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#9fb2ba]">
                Colors, typography, spacing, and motion all flow from a single
                source of truth. The same tokens power the products and this
                site - so everything stays coherent as we grow.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {["--ld-bg", "--ld-panel-strong", "--ld-cyan", "--ld-cyan-bright", "--ld-blue"].map(
                  (tk) => (
                    <span
                      key={tk}
                      aria-hidden
                      className="h-7 w-7 rounded-lg border border-line"
                      style={{ backgroundColor: `var(${tk})` }}
                    />
                  )
                )}
              </div>
              <div className="mt-7">
                <GlowButton href="/design-system/" variant="primary">
                  Explore the Design System &rarr;
                </GlowButton>
              </div>
            </div>
          </div>
        </GlassPanel>
      </Section>

      {/* ROADMAP */}
      <Section className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="2026"
            title="The road ahead"
            description="LynxDock is early and building in the open. Here is the honest sequence of what is active and what is next."
          />
          <RoadmapTimeline phases={homeRoadmap} />
        </div>
      </Section>

      {/* CTA */}
      <Section className="pb-24 pt-8">
        <GlassPanel glow className="relative overflow-hidden p-10 text-center sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-signal-cyan/10 blur-[100px]"
          />
          <div className="relative mx-auto flex max-w-xl flex-col items-center">
            <span className="hud-label">Get started</span>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
              Ready to build differently?
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#9fb2ba]">
              Download LynxDock, follow along on GitHub, and help shape a
              privacy-first platform that is truly yours.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <GlowButton href="/download/" variant="primary">
                Download
              </GlowButton>
              <GlowButton href={GITHUB_ORG} external variant="secondary">
                GitHub
              </GlowButton>
              <span
                aria-disabled="true"
                title="Coming soon"
                className="inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-lg border border-transparent px-5 py-2.5 text-sm font-medium tracking-tight text-[#5b6f77]"
              >
                Discord (Coming Soon)
              </span>
            </div>
          </div>
        </GlassPanel>
      </Section>
    </>
  );
}
