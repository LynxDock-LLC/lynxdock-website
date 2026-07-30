import Link from "next/link";
import Image from "next/image";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import SectionHeader from "@/components/SectionHeader";
import FeatureCard from "@/components/FeatureCard";
import EpicRoadmap from "@/components/EpicRoadmap";
import DesktopMockup from "@/components/DesktopMockup";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import LatestUpdates from "@/components/LatestUpdates";
import { epics } from "@/data/epics";
import type { Feature } from "@/data/features";
import { releases } from "@/data/releases";

const heroCtas = [
  { label: "Download Alpha", href: "/download/", variant: "primary" as const, external: false },
  { label: "Roadmap", href: "/roadmap/", variant: "secondary" as const, external: false },
  { label: "GitHub", href: "https://github.com/LynxDock-LLC", variant: "ghost" as const, external: true },
  { label: "Documentation", href: "/docs/", variant: "ghost" as const, external: false },
];

const stack = ["Rust core", "Tauri desktop", "Local-first", "Self-hostable", "Privacy-first", "Lightweight"];

// The desktop application — grounded in what is built today.
const desktopFeatures: Feature[] = [
  { title: "Squadron Control", description: "A live tactical board: units, wings, routes with waypoints, zones, objectives, orders, alerts, replay, and undo — synced to every client.", icon: "layers" },
  { title: "Messaging", description: "Server-synced channels with replies, reactions, rich formatting, search, and an offline outbox that delivers exactly once on reconnect.", icon: "message" },
  { title: "Voice", description: "Voice rooms with mute/deafen, device selection, and screen sharing — presence-aware throughout.", icon: "users" },
  { title: "Settings", description: "A 20-category, searchable settings system — server-persisted per account, privacy-first defaults, Basic and Advanced modes.", icon: "cog" },
  { title: "Genesis UI", description: "LynxDock's own component framework: design tokens, a theme engine, and a Tailwind preset.", icon: "palette" },
  { title: "Rust core", description: "A protocol-first Rust server and Tauri desktop shell; TypeScript types are generated from the Rust protocol so client and server can't drift.", icon: "server" },
  { title: "Server Host", description: "A guided setup wizard, dashboard, admin controls, and readable live logs — self-hosting without config files.", icon: "code" },
  { title: "Tested seriously", description: "Reconnect, offline replay, multi-client convergence, undo, and permissions covered by automated tests and live multi-account verification.", icon: "sparkles" },
  { title: "Studio", description: "GSpec Studio validates a specification entirely in the browser using the shared core.", icon: "cpu" },
];

const principles: Feature[] = [
  { title: "Own your data", description: "Local-first today, self-hostable tomorrow. Your accounts, messages, and files stay with infrastructure you control.", icon: "lock" },
  { title: "Performance matters", description: "A Rust core and a lightweight desktop shell. Fast to launch, calm to use, light on resources.", icon: "bolt" },
  { title: "Open architecture", description: "Spec-driven and generated end to end. Wire types come from Rust; the site comes from the spec.", icon: "layers" },
  { title: "Privacy by default", description: "No ads, no tracking, no telemetry required. Restraint is a feature.", icon: "shield" },
];

const ecosystem = [
  { name: "Architecture", text: "How the spec, infrastructure, and product monorepo fit together.", href: "/architecture/" },
  { name: "LynxDock Studio", text: "GSpec Studio and the engineering environment.", href: "/products/studio/" },
  { name: "LynxDock Genesis", text: "The design system and component framework behind everything.", href: "/genesis/" },
];

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 ${className}`}>
      {children}
    </section>
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
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-hud-grid mask-fade-b opacity-60" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-radial-fade" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[-8%] h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-signal-cyan/10 blur-[130px]" />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-20 pt-20 text-center sm:pt-28">
          <div className="ld-float animate-fade-up">
            <Image src="/logo/lynxdock-icon.png" alt="LynxDock logo" width={520} height={545} priority className="mx-auto h-24 w-auto drop-shadow-[0_0_45px_rgba(53,224,224,0.45)] sm:h-28" />
          </div>

          <span className="hud-label mt-8 flex items-center gap-2 animate-fade-up">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-signal-cyan animate-pulse-soft" />
            Version 2 · Active development
          </span>

          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white animate-fade-up sm:text-5xl md:text-6xl">
            Your comms. Your ops. Your server.
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#9fb2ba] animate-fade-up sm:text-lg">
            LynxDock is a self-hosted communication and tactical operations platform for gaming organizations —
            chat, voice, and a live tactical command board in one deployable unit, running on hardware your
            community owns.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 animate-fade-up">
            {heroCtas.map((c) => (
              <GlowButton key={c.label} href={c.href} external={c.external} variant={c.variant}>
                {c.label}
              </GlowButton>
            ))}
          </div>
        </div>
      </section>

      {/* STACK BAR */}
      <Section className="pb-8 pt-2">
        <GlassPanel className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-5">
          {stack.map((t) => (
            <span key={t} className="flex items-center gap-2 text-sm text-[#9fb2ba]">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-signal-cyan/70" />
              {t}
            </span>
          ))}
        </GlassPanel>
      </Section>

      {/* OPERATIONS — the flagship, paired with real product imagery */}
      <Section className="py-16 sm:py-24">
        <SectionHeader
          align="center"
          eyebrow="Squadron Control"
          title="A live tactical operations center."
          description="Zones, unit nodes, routes, objectives, orders, and readiness — synchronized in real time across every connected member. Fleet admirals run the op from the board; wings see orders as they're issued."
          className="mb-10"
        />
        <GlassPanel glow className="overflow-hidden p-2 sm:p-3">
          <Image
            src="/screenshots/tactical-operations-board.png"
            alt="LynxDock Squadron Control — live tactical operations board with units, routes, zones, and orders"
            width={1920}
            height={1080}
            className="w-full rounded-lg"
          />
        </GlassPanel>

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <GlassPanel className="overflow-hidden p-2 sm:p-3">
            <Image
              src="/screenshots/op-briefing-channel.png"
              alt="LynxDock operation briefing channel with voice and presence"
              width={1600}
              height={1000}
              className="w-full rounded-lg"
            />
          </GlassPanel>
          <div>
            <span className="hud-label flex items-center gap-2">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-signal-cyan shadow-glow" />
              Comms built for operations
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Briefings, wing channels, and comms discipline.
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-[#9fb2ba]">
              Channels, multi-party voice, and presence with your command structure visible at a glance — in the
              same app as the tactical board.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <span className="hud-label flex items-center gap-2">
            <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-signal-cyan shadow-glow" />
            Self-hosting without the pain
          </span>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            One process. One file. Your hardware.
          </h3>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#9fb2ba]">
            A calm first-run wizard creates your server without config files or terminal commands. Dashboard, admin
            controls, readable live logs, and plain-language connection help — for local testing, LAN parties, or
            friends over the internet.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              ["/screenshots/server-host-setup.png", "Server Host guided setup wizard"],
              ["/screenshots/server-host-dashboard.png", "Server Host dashboard"],
              ["/screenshots/server-host-admin.png", "Server Host admin controls"],
              ["/screenshots/server-host-logs.png", "Server Host live logs"],
            ].map(([src, alt]) => (
              <GlassPanel key={src} className="overflow-hidden p-2">
                <Image src={src!} alt={alt!} width={1400} height={900} className="w-full rounded-lg" />
              </GlassPanel>
            ))}
          </div>
        </div>
      </Section>

      {/* DESKTOP APPLICATION */}
      <Section className="py-16 sm:py-24">
        <SectionHeader
          align="center"
          eyebrow="The desktop application"
          title="A real application, under active construction."
          description="Infrastructure is complete and the desktop app is taking shape. Here's what runs today — and the framework the rest is built on."
          className="mb-12"
        />
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <DesktopMockup />
          <div>
            <span className="hud-label flex items-center gap-2">
              <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-signal-cyan shadow-glow" />
              Working today
            </span>
            <h3 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Chat, voice, presence, and a live tactical board.
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-[#9fb2ba]">
              The desktop app now runs against a real self-hosted server: synced channels with replies and search,
              multi-party voice, live presence with custom status, and Squadron Control — a tactical operations
              board with routes, orders, and replay, consistent across every connected member. All of it is in
              active development and verified end to end as it lands.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <GlowButton href="/download/" variant="primary">Download Alpha</GlowButton>
              <GlowButton href="/architecture/" variant="secondary">See the architecture</GlowButton>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {desktopFeatures.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </Section>

      {/* PRINCIPLES */}
      <Section className="py-16 sm:py-24">
        <SectionHeader
          align="center"
          eyebrow="What we stand for"
          title="Communication you actually own."
          description="The constraints we design LynxDock around — the reason it feels different to run."
          className="mb-12"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </Section>

      {/* ARCHITECTURE TEASER */}
      <Section className="py-16 sm:py-20">
        <SectionHeader
          eyebrow="How it's built"
          title="Spec-driven, polyglot, generated end to end."
          description="A versioned specification feeds the infrastructure layer, which supports one product monorepo spanning Rust and TypeScript."
          className="mb-10"
        />
        <ArchitectureFlow />
        <div className="mt-8">
          <GlowButton href="/architecture/" variant="secondary">Read the architecture</GlowButton>
        </div>
      </Section>

      {/* ROADMAP - EPICS */}
      <Section className="py-16 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="The roadmap"
            title="From foundation to a full platform"
            description="LynxDock is built in the open, tracked as epics. Foundation and identity are done; messaging is in progress; the rest is planned."
          />
          <EpicRoadmap epics={epics} />
        </div>
      </Section>

      {/* ECOSYSTEM */}
      <Section className="py-12">
        <div className="mb-6 flex items-center gap-3">
          <span className="hud-label text-[#7f939b]">Explore more</span>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {ecosystem.map((e) => (
            <Link key={e.href} href={e.href} className="block">
              <GlassPanel hover className="flex h-full flex-col p-5">
                <h3 className="text-sm font-semibold text-white">{e.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-[#9fb2ba]">{e.text}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-signal-bright">
                  Learn more <span aria-hidden>&rarr;</span>
                </span>
              </GlassPanel>
            </Link>
          ))}
        </div>
      </Section>

      {/* Latest journal entries - self-updating from posts.ts */}
      <LatestUpdates />

      {/* CTA */}
      <Section className="pb-24 pt-8">
        <GlassPanel glow className="relative overflow-hidden p-10 text-center sm:p-16">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-signal-cyan/10 blur-[100px]" />
          <div className="relative mx-auto flex max-w-xl flex-col items-center">
            <span className="hud-label">Get started</span>
            <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Follow along as LynxDock takes shape.</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#9fb2ba]">
              The alpha desktop app is in active development (internal build {releases.current.version}). Grab it,
              watch the roadmap, and follow the work on GitHub.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <GlowButton href="/download/" variant="primary">Download Alpha</GlowButton>
              <GlowButton href="/roadmap/" variant="secondary">Roadmap</GlowButton>
              <GlowButton href="https://github.com/LynxDock-LLC" external variant="ghost">GitHub</GlowButton>
            </div>
          </div>
        </GlassPanel>
      </Section>
    </>
  );
}
