import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";

export const metadata: Metadata = {
  title: "Community",
  description:
    "The public hub for LynxDock: discuss the app, report bugs, request features, share Squadron operations, and publish themes and plugins.",
};

const GITHUB_ORG = "https://github.com/LynxDock-LLC";
const FORUM_URL = "https://community.lynxdock.app";

const areas = [
  {
    title: "Squadron Operations",
    text: "Share mission plans, briefings, objectives, maps, and after-action reports. The community Operation Library.",
  },
  {
    title: "Feature Requests",
    text: "Propose ideas and vote on what matters. Requests connect directly to the public roadmap.",
  },
  {
    title: "Bug Reports",
    text: "A friendly front door for problems. Confirmed bugs are routed to GitHub, the canonical tracker.",
  },
  {
    title: "Themes & Skins",
    text: "Publish and discover LynxDock skins, icon packs, profile themes, and Mission Control visual packs.",
  },
  {
    title: "Plugins",
    text: "Share plugins, scripts, integrations, and automation tools built on LynxDock.",
  },
  {
    title: "Development Updates",
    text: "Follow the build: weekly what-shipped, what-broke, what-changed, what's-next dev logs.",
  },
  {
    title: "Mission Control & Self-Hosting",
    text: "Tips and help for command trees, wings, ready checks, and running your own server.",
  },
  {
    title: "Showcase",
    text: "Show off your community, servers, and setups built with LynxDock.",
  },
];

const followNow = [
  { title: "GitHub", text: "Star the repos, watch releases, open issues.", href: GITHUB_ORG, external: true, cta: "Open GitHub" },
  { title: "Roadmap", text: "See what's shipping and what's next.", href: "/roadmap/", external: false, cta: "View roadmap" },
  { title: "Blog", text: "Announcements and notes from the team.", href: "/blog/", external: false, cta: "Read the blog" },
];

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="The hub"
        title="Community"
        description="The public home for the LynxDock ecosystem - discuss the app, report bugs, request features, share Squadron operations, and publish themes and plugins. Built in the open, owned by the people who use it."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <GlowButton href={GITHUB_ORG} external variant="primary">
            Star on GitHub
          </GlowButton>
          <GlowButton href="/roadmap/" variant="secondary">
            View Roadmap
          </GlowButton>
        </div>
      </PageHeader>

      {/* Forum launching soon */}
      <section className="mx-auto max-w-6xl px-5 pt-16">
        <GlassPanel glow className="relative overflow-hidden p-8 text-center sm:p-12">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-signal-cyan/10 blur-[100px]"
          />
          <div className="relative">
            <span className="hud-label">Forum - launching soon</span>
            <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-white sm:text-3xl">
              community.lynxdock.app
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] leading-relaxed text-[#9fb2ba]">
              The full community forum - operations, feature voting, themes,
              plugins, and dev logs - is on its way. Until it opens, follow along
              and get involved on GitHub and the roadmap.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <GlowButton href="/support/#early-access" variant="primary">
                Request Early Access
              </GlowButton>
              <GlowButton href={GITHUB_ORG} external variant="secondary">
                Follow on GitHub
              </GlowButton>
            </div>
          </div>
        </GlassPanel>
      </section>

      {/* What you'll find */}
      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeader
          eyebrow="What you'll find"
          title="One hub for the whole ecosystem"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((a) => (
            <GlassPanel key={a.title} hover className="flex h-full flex-col p-6">
              <h3 className="text-base font-semibold text-white">{a.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
                {a.text}
              </p>
            </GlassPanel>
          ))}
        </div>
      </section>

      {/* Follow now */}
      <section className="mx-auto max-w-6xl px-5 pb-16">
        <SectionHeader
          eyebrow="Follow now"
          title="Get involved today"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-3">
          {followNow.map((c) => (
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

        <GlassPanel className="mt-12 p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <span className="hud-label">Built in the open</span>
              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                Shape it with us
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#9fb2ba]">
                Progress, decisions, and setbacks happen in public - on the
                roadmap, in the repositories, and on the blog. If you care where
                your community lives, we'd love to build it with you.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-[#c3d0d6]">
              {[
                "Public roadmap with honest status",
                "Open repositories on GitHub",
                "Weekly development updates",
                "A forum built for organized communities",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-signal-cyan/70 shadow-glow"
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </GlassPanel>
      </section>
    </>
  );
}
