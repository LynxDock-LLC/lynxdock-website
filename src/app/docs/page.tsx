import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Documentation for LynxDock products — self-hosting guides, product references, and developer resources.",
};

const GITHUB_ORG = "https://github.com/LynxDock-LLC";

const sections = [
  {
    title: "Getting started",
    text: "Install, launch, and host your first LynxDock server with the guided setup wizard.",
  },
  {
    title: "Self-hosting guide",
    text: "Network, storage, relay, and admin configuration for persistent, self-owned servers.",
  },
  {
    title: "LynxDock Studio",
    text: "Organize a connected knowledge graph and work alongside context-aware AI.",
  },
  {
    title: "Bootstrap reference",
    text: "Scaffold repositories, docs, and product foundations with the automation engine.",
  },
];

export default function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Resources"
        title="Documentation"
        description="Guides and references for the LynxDock ecosystem. Full documentation is being written alongside the products — here's what's coming."
      />

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="grid gap-5 sm:grid-cols-2">
          {sections.map((s) => (
            <GlassPanel key={s.title} className="p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-white">{s.title}</h2>
                <span className="hud-label text-[#7f939b]">Soon</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
                {s.text}
              </p>
            </GlassPanel>
          ))}
        </div>

        <GlassPanel className="mt-10 p-8 text-center">
          <p className="text-sm text-[#9fb2ba]">
            Documentation is published as products ship. In the meantime, the
            code and progress live on GitHub.
          </p>
          <div className="mt-5 flex justify-center">
            <GlowButton href={GITHUB_ORG} external variant="secondary">
              Browse the GitHub organization
            </GlowButton>
          </div>
        </GlassPanel>
      </section>
    </>
  );
}
