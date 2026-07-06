import Image from "next/image";
import Link from "next/link";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";
import RoadmapTimeline from "@/components/RoadmapTimeline";
import { roadmap } from "@/data/roadmap";
import { lynxdockFeatures, type Feature } from "@/data/features";
import { launch } from "@/data/launch";

const trustItems = [
  { label: "Voice", icon: "voice" },
  { label: "Chat", icon: "chat" },
  { label: "Screen sharing", icon: "screen" },
  { label: "Self hosted", icon: "server" },
  { label: "Low resource", icon: "light" },
];

// Principles written through the lens of the communication app.
const principles: Feature[] = [
  {
    title: "Own your server",
    description:
      "Self-host LynxDock and keep accounts, rooms, history, and files on infrastructure you control.",
    icon: "server",
  },
  {
    title: "Keep your data",
    description:
      "No surveillance, no ads, no selling your data. What happens on your server stays on your server.",
    icon: "lock",
  },
  {
    title: "Stay lightweight",
    description:
      "Fast to launch and light on resources - LynxDock stays calm and quick, even on modest hardware.",
    icon: "bolt",
  },
  {
    title: "Built for gaming & communities",
    description:
      "From a quick squad call to a full community with roles, channels, and mission control.",
    icon: "users",
  },
  {
    title: "No unnecessary bloat",
    description:
      "Just the tools a community needs to talk and coordinate - no feature creep, no clutter.",
    icon: "layers",
  },
  {
    title: "Fair access",
    description:
      "No paywalls on the essentials. The core communication experience is for everyone.",
    icon: "shield",
  },
];

// Secondary ecosystem links - present, but not the homepage narrative.
const ecosystem = [
  {
    name: "LynxDock Studio",
    text: "An AI-assisted knowledge workspace for people who build.",
    href: "/products/studio/",
  },
  {
    name: "LynxDock Genesis",
    text: "The reusable foundation behind our design, docs, and workflow.",
    href: "/genesis/",
  },
  {
    name: "LynxDock Bootstrap",
    text: "The automation engine that scaffolds new projects fast.",
    href: "/products/bootstrap/",
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
    chrome: "LynxDock - Chat & Connect",
    eyebrow: "Chat & voice",
    title: "Talk naturally. Share instantly.",
    body: "Voice, text chat, and screen sharing that feel fast and familiar. Start a spontaneous peer-to-peer Quick Call, or connect to a persistent community server - the same lightweight client, whether it is two people or two hundred.",
    width: 1341,
    height: 916,
  },
  {
    src: "/screenshots/mission-control.webp",
    alt: "LynxDock squadron command view with wing readiness and a live command tree",
    chrome: "LynxDock - Mission Control",
    eyebrow: "Mission Control",
    title: "Coordinate communities at scale.",
    body: "When a group gets big, LynxDock gives it a tactical command view: a live command tree, wings and squadrons, rosters, objectives, and ready checks. The structure a large community needs, presented as a calm command center rather than clutter.",
    width: 1600,
    height: 1044,
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
    case "voice":
      return (
        <svg {...common}>
          <rect x="9" y="3" width="6" height="11" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 5h16v11H8l-4 3V5z" />
        </svg>
      );
    case "screen":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="12" rx="1.5" />
          <path d="M8 20h8M12 16v4" />
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
    default:
      return (
        <svg {...common}>
          <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
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

      {/* HERO - LynxDock the app */}
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

          <span className="hud-label mt-8 flex items-center gap-2 animate-fade-up">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-signal-cyan animate-pulse-soft"
            />
            The lightweight communication app
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white animate-fade-up sm:text-5xl md:text-6xl">
            Lightweight communication for communities that want control.
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#9fb2ba] animate-fade-up sm:text-lg">
            LynxDock brings voice, chat, screen sharing, server hosting, and
            community tools together in a privacy-first app built to stay out of
            your way.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 animate-fade-up sm:flex-row">
            <GlowButton href={launch.primaryCTA.href} variant="primary">
              {launch.primaryCTA.label}
            </GlowButton>
            <GlowButton href={launch.secondaryCTA.href} variant="secondary">
              {launch.secondaryCTA.label}
            </GlowButton>
            <GlowButton href={launch.githubCTA.href} external variant="ghost">
              {launch.githubCTA.label}
            </GlowButton>
          </div>
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

      {/* WHAT LYNXDOCK IS - app feature grid */}
      <Section className="py-16 sm:py-20">
        <SectionHeader
          align="center"
          eyebrow="The app"
          title="One lightweight app for the whole community."
          description="From a spontaneous call to a fully self-hosted community - LynxDock does the communication, without the weight."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {lynxdockFeatures.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </Section>

      {/* FEATURE ROWS - alternating screenshots */}
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

      {/* PRINCIPLES - through the comms-app lens */}
      <Section className="py-16 sm:py-24">
        <SectionHeader
          align="center"
          eyebrow="What we stand for"
          title="Communication you actually own."
          description="The constraints we design LynxDock around - the reason it feels different to run."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </Section>

      {/* ROADMAP */}
      <Section className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="The road to launch"
            title="Building toward the app"
            description="LynxDock is early and building in the open. Here is the honest sequence from foundation to a public communication app."
          />
          <RoadmapTimeline phases={roadmap} />
        </div>
      </Section>

      {/* ECOSYSTEM - secondary, lower on the page */}
      <Section className="py-12">
        <div className="mb-6 flex items-center gap-3">
          <span className="hud-label text-[#7f939b]">Also building</span>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[#7f939b]">
          LynxDock is the flagship. These are the other parts of the ecosystem -
          each with its own page.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {ecosystem.map((e) => (
            <Link key={e.href} href={e.href} className="block">
              <GlassPanel hover className="flex h-full flex-col p-5">
                <h3 className="text-sm font-semibold text-white">{e.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#9fb2ba]">
                  {e.text}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-signal-bright">
                  Learn more <span aria-hidden>&rarr;</span>
                </span>
              </GlassPanel>
            </Link>
          ))}
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
              Run communication you actually own.
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#9fb2ba]">
              Desktop builds for Windows, Linux, and macOS are on the way. Follow
              the roadmap and the GitHub org to be first in line.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <GlowButton href={launch.primaryCTA.href} variant="primary">
                {launch.primaryCTA.label}
              </GlowButton>
              <GlowButton href={launch.secondaryCTA.href} variant="secondary">
                {launch.secondaryCTA.label}
              </GlowButton>
              <GlowButton href={launch.githubCTA.href} external variant="ghost">
                {launch.githubCTA.label}
              </GlowButton>
            </div>
          </div>
        </GlassPanel>
      </Section>
    </>
  );
}
