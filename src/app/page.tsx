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
  { title: "Workspace", description: "The local container everything hangs off: name, icon, and its own scoped storage.", icon: "layers" },
  { title: "Identity", description: "A local profile with display name and accent color, validated on the Rust side.", icon: "users" },
  { title: "Messaging", description: "Local channels and messages: compose, edit, delete, search, unread counts, and previews.", icon: "message" },
  { title: "Settings", description: "Theme, reduced motion, and telemetry — applied live, privacy-first by default.", icon: "cog" },
  { title: "Genesis UI", description: "LynxDock's own component framework: design tokens, a theme engine, and a Tailwind preset.", icon: "palette" },
  { title: "Rust backend", description: "A Tauri core with typed commands and on-disk storage for identity, workspace, and messages.", icon: "server" },
  { title: "Plugin system", description: "A plugin SDK with a manifest and capability model — the future extension surface.", icon: "code" },
  { title: "AI contracts", description: "Agent and tool contracts, ready to wire into the workspace as the platform grows.", icon: "sparkles" },
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
            Privacy-first communication built for the next generation.
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#9fb2ba] animate-fade-up sm:text-lg">
            LynxDock is a Rust-powered desktop application for communities that want control — local-first,
            self-hostable, and built on an open architecture. Privacy and performance are the defaults, not add-ons.
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
              Workspace, identity, settings, and local messaging.
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-[#9fb2ba]">
              The alpha desktop app already runs a local workspace with your profile and settings, a live theme
              engine, and a local-only chat client: channels and messages you can compose, edit, delete, and search —
              all persisted on your machine. Networking, voice, and communities come next, on the roadmap below.
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
