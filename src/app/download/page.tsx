import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Desktop builds of LynxDock for Windows, Linux, and macOS are on the way. Request early access to be first in line.",
};

const platforms = [
  { name: "Windows", note: "Windows 10 / 11" },
  { name: "Linux", note: "AppImage / deb" },
  { name: "macOS", note: "Apple silicon & Intel" },
];

const GITHUB_ORG = "https://github.com/LynxDock-LLC";

export default function DownloadPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get LynxDock"
        title="Download"
        description="LynxDock is a lightweight desktop app. Builds for Windows, Linux, and macOS are on the way - early access is opening in phases."
      />

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="grid gap-5 sm:grid-cols-3">
          {platforms.map((p) => (
            <GlassPanel key={p.name} className="flex flex-col items-center p-8 text-center">
              <span className="hud-label text-[#7f939b]">Coming soon</span>
              <h2 className="mt-3 text-lg font-semibold text-white">{p.name}</h2>
              <p className="mt-1 text-sm text-[#9fb2ba]">{p.note}</p>
              <span className="mt-5 inline-flex cursor-not-allowed items-center rounded-lg border border-line px-4 py-2 text-sm text-[#6f838b]">
                Not yet available
              </span>
            </GlassPanel>
          ))}
        </div>

        <GlassPanel glow className="mt-10 p-8 text-center sm:p-10">
          <span className="hud-label">Be first in line</span>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Get notified when builds drop
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#9fb2ba]">
            Request early access, or follow development on GitHub to know the
            moment downloads are live.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <GlowButton href="/support/#early-access" variant="primary">
              Request Early Access
            </GlowButton>
            <GlowButton href={GITHUB_ORG} external variant="secondary">
              Follow on GitHub
            </GlowButton>
          </div>
        </GlassPanel>
      </section>
    </>
  );
}
