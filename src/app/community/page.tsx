import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";

export const metadata: Metadata = {
  title: "Community",
  description:
    "LynxDock is built in the open. Follow development on GitHub, watch the roadmap, read the blog, and get early access.",
};

const GITHUB_ORG = "https://github.com/LynxDock-LLC";

const channels = [
  {
    title: "GitHub",
    text: "Star the repositories, watch releases, and open issues or feature requests. Development happens in the open.",
    href: GITHUB_ORG,
    external: true,
    cta: "Open GitHub",
    soon: false,
  },
  {
    title: "Roadmap",
    text: "See exactly what's shipping, what's active, and what's planned across the ecosystem.",
    href: "/roadmap/",
    external: false,
    cta: "View roadmap",
    soon: false,
  },
  {
    title: "Blog",
    text: "Announcements, product notes, and behind-the-scenes thinking from the team.",
    href: "/blog/",
    external: false,
    cta: "Read the blog",
    soon: false,
  },
  {
    title: "Early access",
    text: "Register interest to be first in line as builds open up in phases.",
    href: "/support/#early-access",
    external: false,
    cta: "Request access",
    soon: false,
  },
  {
    title: "Discord",
    text: "A community server to talk directly with the team and other early users is on the way.",
    href: GITHUB_ORG,
    external: true,
    cta: "Coming soon",
    soon: true,
  },
];

export default function CommunityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get involved"
        title="Community"
        description="LynxDock is early and built in the open. The best way to shape it is to follow along, try it, and tell us what your community needs."
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

      <section className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeader
          eyebrow="Ways to follow"
          title="Everywhere LynxDock is being built"
          className="mb-10"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c) => (
            <GlassPanel key={c.title} hover className="flex h-full flex-col p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">{c.title}</h2>
                {c.soon && (
                  <span className="hud-label text-[#7f939b]">Soon</span>
                )}
              </div>
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

        <GlassPanel glow className="mt-12 p-8 sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <span className="hud-label">Built in the open</span>
              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                Watch it come together
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#9fb2ba]">
                We think people deserve to see how their tools are made. Progress,
                decisions, and setbacks happen in public - on the roadmap, in the
                repositories, and on the blog. If you care where your community
                lives, we'd love to build it with you.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-[#c3d0d6]">
              {[
                "Public roadmap with honest status",
                "Open repositories on GitHub",
                "Regular notes and announcements",
                "Early access opening in phases",
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
