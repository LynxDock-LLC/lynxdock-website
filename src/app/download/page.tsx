import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import { launch, type DownloadState } from "@/data/launch";

export const metadata: Metadata = {
  title: "Download",
  description:
    "The download center for LynxDock. Desktop builds for Windows, Linux, macOS, and self-hosted servers are in active development - follow the roadmap and GitHub to know the moment they land.",
};

const status = launch.downloadStatus;

// Per-state availability label for the platform cards (presentational).
const STATE_CHIP: Record<DownloadState, string> = {
  "coming-soon": "Coming soon",
  alpha: "Alpha",
  beta: "Beta",
  released: "Available",
};
const chipLabel = STATE_CHIP[status.state];
const isReleased = status.state === "released";

type Platform = {
  name: string;
  icon: "windows" | "linux" | "apple" | "server";
  requirement: string;
};

const platforms: Platform[] = [
  { name: "Windows", icon: "windows", requirement: "Windows 10 / 11, 64-bit" },
  { name: "Linux", icon: "linux", requirement: "Modern 64-bit distribution" },
  { name: "macOS", icon: "apple", requirement: "Apple silicon & Intel" },
  {
    name: "Self-hosted server",
    icon: "server",
    requirement: "Linux host or container",
  },
];

type Release = {
  version: string;
  channel: string;
  status: string;
  notes: string;
};

const releases: Release[] = [
  { version: "Genesis", channel: "Internal", status: "Alpha", notes: "Foundation in progress" },
  { version: "Private Beta", channel: "Beta", status: "Planned", notes: "Invite-only testing" },
  { version: "Public Beta", channel: "Beta", status: "Planned", notes: "Open desktop builds" },
  { version: "Release 1.0", channel: "Stable", status: "Future", notes: "First stable release" },
];

const releasePhilosophy = [
  {
    title: "Stable releases",
    text: "Thoroughly tested builds recommended for everyday use once LynxDock reaches general availability.",
  },
  {
    title: "Preview builds",
    text: "Early access to upcoming features for people who want to help shape LynxDock before stable.",
  },
  {
    title: "Nightly builds",
    text: "Bleeding-edge automated builds for testing the very latest changes - expect rough edges.",
  },
  {
    title: "Security updates",
    text: "Fixes for security issues shipped promptly across supported channels.",
  },
  {
    title: "Long-term support",
    text: "A future LTS track for teams that value stability over the newest features.",
  },
];

const installPhilosophy = [
  { title: "Fast installs", text: "Small, quick downloads that get you running in moments." },
  {
    title: "No unnecessary background services",
    text: "LynxDock runs when you use it - it doesn't quietly camp in the background.",
  },
  { title: "Easy updates", text: "Straightforward, predictable updates with no drama." },
  {
    title: "Portable where practical",
    text: "Portable builds where the platform allows, so you can run without installing.",
  },
  { title: "Privacy first", text: "No telemetry required to use the app. Your data stays yours." },
];

const systemRequirements = [
  { component: "OS", detail: "Windows 10/11, modern Linux, or macOS (finalized near release)" },
  { component: "CPU", detail: "Any modern 64-bit processor" },
  { component: "RAM", detail: "Lightweight - modest memory footprint" },
  { component: "GPU", detail: "Not required; hardware acceleration used when available" },
  { component: "Disk", detail: "A few hundred MB for the app" },
  { component: "Network", detail: "Broadband for calls; LAN supported for self-hosted use" },
];

const faqs = [
  {
    q: "When will downloads be available?",
    a: "LynxDock is in active development. Public downloads open in phases - private beta first, then public beta, then a stable 1.0. Follow the roadmap and GitHub for timing.",
  },
  {
    q: "Will LynxDock be open source?",
    a: "Development happens in the open on the LynxDock GitHub organization. Licensing details for each component will be published alongside the builds.",
  },
  {
    q: "Will there be portable builds?",
    a: "Where a platform allows it, yes - portable builds are part of the installation philosophy so you can run LynxDock without a full install.",
  },
  {
    q: "Will there be Linux packages?",
    a: "Linux is a first-class target. Expect common formats such as AppImage and distribution packages as builds mature.",
  },
  {
    q: "Will there be Docker images?",
    a: "Self-hosted servers are designed to run well in containers, so official images are planned for the server side.",
  },
];

function PlatformIcon({ name }: { name: Platform["icon"] }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "windows":
      return (
        <svg {...common}>
          <path d="M3 5.5 10.5 4.4v7.1H3zM10.5 12.5v7.1L3 18.5v-6zM12 4.2 21 3v8.5h-9zM12 12.5h9V21l-9-1.3z" />
        </svg>
      );
    case "linux":
      return (
        <svg {...common}>
          <path d="M9 4a3 3 0 0 1 6 0c0 2 1 3 1 6 0 2 2 3 2 6 0 1.5-1 2-2 2-1.5 0-2-1-4-1s-2.5 1-4 1c-1 0-2-.5-2-2 0-3 2-4 2-6 0-3 1-4 1-6z" />
          <path d="M10 8.5h.01M14 8.5h.01" />
        </svg>
      );
    case "apple":
      return (
        <svg {...common}>
          <path d="M15.5 3c.2 1.3-.3 2.4-1 3.2-.8.9-1.9 1.5-3 1.4-.2-1.2.4-2.4 1.1-3.1.8-.9 2-1.5 2.9-1.5z" />
          <path d="M18 16.5c-.6 1.4-1.3 2.8-2.4 3.8-.7.7-1.5.9-2.3.5-.8-.3-1.4-.3-2.2 0-.9.4-1.7.2-2.4-.5-1.9-1.9-3.2-5.5-1.9-8.2.7-1.4 2-2.3 3.4-2.3.9 0 1.6.5 2.3.5.6 0 1.3-.6 2.4-.5 1.2.1 2.2.6 2.9 1.6-1.9 1.3-1.7 4.1.6 5.1z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="7" rx="1.5" />
          <rect x="3" y="13" width="18" height="7" rx="1.5" />
          <path d="M7 7.5h.01M7 16.5h.01" />
        </svg>
      );
  }
}

export default function DownloadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Download center"
        title="Download LynxDock"
        description="Everything you need to get started with LynxDock. Choose your platform below."
      />

      <section className="mx-auto max-w-5xl px-5 py-16">
        {/* CURRENT STATUS */}
        <GlassPanel glow className="p-8 sm:p-10">
          <span className="hud-label flex items-center gap-2 text-signal-bright">
            <span aria-hidden>🚧</span> {status.title}
          </span>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            {status.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#9fb2ba]">
            {status.message}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <GlowButton href={launch.secondaryCTA.href} variant="primary">
              {launch.secondaryCTA.label}
            </GlowButton>
            <GlowButton href={launch.githubCTA.href} external variant="secondary">
              {launch.githubCTA.label}
            </GlowButton>
          </div>
        </GlassPanel>

        {/* PLATFORMS */}
        <h2 className="mb-6 mt-16 text-xl font-semibold text-white">Platforms</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {platforms.map((p) => (
            <GlassPanel key={p.name} className="flex h-full flex-col p-6">
              <div
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-signal-cyan/25 bg-signal-cyan/10 text-signal-bright"
              >
                <PlatformIcon name={p.icon} />
              </div>
              <h3 className="mt-4 text-base font-semibold text-white">
                {p.name}
              </h3>
              <span className="mt-1 w-fit rounded-full border border-line bg-graphite-800/40 px-2.5 py-0.5 text-[11px] font-medium text-[#9fb2ba]">
                {chipLabel}
              </span>
              <p className="mt-3 flex-1 text-xs leading-relaxed text-[#7f939b]">
                {p.requirement}
              </p>
              {isReleased ? (
                <GlowButton href={launch.primaryCTA.href} variant="primary" className="mt-5">
                  {launch.primaryCTA.label}
                </GlowButton>
              ) : (
                <span
                  aria-disabled="true"
                  className="mt-5 inline-flex cursor-not-allowed items-center justify-center rounded-lg border border-line px-4 py-2 text-sm text-[#6f838b]"
                >
                  Not yet available
                </span>
              )}
            </GlassPanel>
          ))}
        </div>

        {/* FUTURE RELEASES */}
        <h2 className="mb-6 mt-16 text-xl font-semibold text-white">
          Future releases
        </h2>
        <GlassPanel className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <caption className="sr-only">
                Planned LynxDock releases and their status
              </caption>
              <thead>
                <tr className="border-b border-line/70 text-[#7f939b]">
                  <th scope="col" className="px-5 py-3 font-medium">Version</th>
                  <th scope="col" className="px-5 py-3 font-medium">Channel</th>
                  <th scope="col" className="px-5 py-3 font-medium">Status</th>
                  <th scope="col" className="px-5 py-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {releases.map((r) => (
                  <tr key={r.version} className="border-b border-line/40 last:border-b-0">
                    <th scope="row" className="px-5 py-3 font-medium text-white">
                      {r.version}
                    </th>
                    <td className="px-5 py-3 text-[#c3d0d6]">{r.channel}</td>
                    <td className="px-5 py-3 text-[#c3d0d6]">{r.status}</td>
                    <td className="px-5 py-3 text-[#9fb2ba]">{r.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>

        {/* RELEASE PHILOSOPHY */}
        <h2 className="mb-6 mt-16 text-xl font-semibold text-white">
          Release philosophy
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {releasePhilosophy.map((r) => (
            <GlassPanel key={r.title} className="p-6">
              <h3 className="text-base font-semibold text-white">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
                {r.text}
              </p>
            </GlassPanel>
          ))}
        </div>

        {/* INSTALLATION PHILOSOPHY */}
        <h2 className="mb-6 mt-16 text-xl font-semibold text-white">
          Installation philosophy
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {installPhilosophy.map((r) => (
            <GlassPanel key={r.title} className="p-6">
              <h3 className="text-base font-semibold text-white">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
                {r.text}
              </p>
            </GlassPanel>
          ))}
        </div>

        {/* SYSTEM REQUIREMENTS */}
        <h2 className="mb-6 mt-16 text-xl font-semibold text-white">
          System requirements
        </h2>
        <p className="mb-4 max-w-2xl text-sm leading-relaxed text-[#7f939b]">
          Intentionally generic for now - exact requirements will be finalized
          closer to the first public build.
        </p>
        <GlassPanel className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <caption className="sr-only">
                Preliminary LynxDock system requirements
              </caption>
              <thead>
                <tr className="border-b border-line/70 text-[#7f939b]">
                  <th scope="col" className="px-5 py-3 font-medium">Component</th>
                  <th scope="col" className="px-5 py-3 font-medium">Requirement</th>
                </tr>
              </thead>
              <tbody>
                {systemRequirements.map((s) => (
                  <tr key={s.component} className="border-b border-line/40 last:border-b-0">
                    <th scope="row" className="px-5 py-3 font-medium text-white">
                      {s.component}
                    </th>
                    <td className="px-5 py-3 text-[#9fb2ba]">{s.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassPanel>

        {/* FAQ */}
        <h2 className="mb-6 mt-16 text-xl font-semibold text-white">
          Frequently asked questions
        </h2>
        <div className="flex flex-col gap-3">
          {faqs.map((f) => (
            <GlassPanel key={f.q} as="details" className="group p-0">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-[15px] font-medium text-white [&::-webkit-details-marker]:hidden marker:content-['']">
                {f.q}
                <span
                  aria-hidden
                  className="text-signal-bright transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-5 text-sm leading-relaxed text-[#9fb2ba]">
                {f.a}
              </p>
            </GlassPanel>
          ))}
        </div>

        {/* BOTTOM CTA */}
        <GlassPanel glow className="mt-16 p-10 text-center sm:p-14">
          <div className="mx-auto flex max-w-xl flex-col items-center">
            <span className="hud-label">Get involved</span>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
              Interested in testing?
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#9fb2ba]">
              Follow development, watch the roadmap, and register interest so
              you&rsquo;re first in line when builds open up.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
              <GlowButton href={launch.githubCTA.href} external variant="primary">
                {launch.githubCTA.label}
              </GlowButton>
              <GlowButton href={launch.secondaryCTA.href} variant="secondary">
                {launch.secondaryCTA.label}
              </GlowButton>
              <GlowButton href={launch.earlyAccessCTA.href} variant="ghost">
                {launch.earlyAccessCTA.label}
              </GlowButton>
            </div>
          </div>
        </GlassPanel>
      </section>
    </>
  );
}
