import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import EarlyAccessForm from "@/components/EarlyAccessForm";
import { launch } from "@/data/launch";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with LynxDock, report issues, or request early access to LynxDock products.",
};

const ea = launch.earlyAccess;

export default function SupportPage() {
  return (
    <>
      <PageHeader
        eyebrow="Help &amp; contact"
        title="Support"
        description="LynxDock is early and built in the open. Here's how to get help, report issues, and stay in the loop."
      />

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          <GlassPanel className="p-6">
            <h2 className="text-base font-semibold text-white">
              Report an issue
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
              Found a bug or have a feature request? Open an issue on the
              GitHub organization.
            </p>
            <div className="mt-4">
              <GlowButton href={launch.githubCTA.href} external variant="secondary">
                {launch.githubCTA.label}
              </GlowButton>
            </div>
          </GlassPanel>

          <GlassPanel className="p-6">
            <h2 className="text-base font-semibold text-white">
              Follow development
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
              Watch the roadmap and star the repositories to follow progress
              across the ecosystem.
            </p>
            <div className="mt-4">
              <GlowButton href={launch.githubCTA.href} external variant="secondary">
                {launch.githubCTA.label}
              </GlowButton>
            </div>
          </GlassPanel>
        </div>

        <GlassPanel
          id="early-access"
          glow
          className="mt-8 scroll-mt-24 p-8 text-center sm:p-10"
        >
          <span className="hud-label">Early access</span>
          <h2 className="mt-3 text-2xl font-semibold text-white">{ea.title}</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#9fb2ba]">
            {ea.description}
          </p>
          <div className="mt-6">
            <EarlyAccessForm />
          </div>
          <div className="mt-4 flex justify-center">
            <GlowButton href={launch.githubCTA.href} external variant="ghost">
              {launch.githubCTA.label}
            </GlowButton>
          </div>
        </GlassPanel>
      </section>
    </>
  );
}
