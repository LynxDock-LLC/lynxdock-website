import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FeatureCard from "@/components/FeatureCard";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import type { Feature } from "@/data/features";

export const metadata: Metadata = {
  title: "LynxDock Bootstrap",
  description:
    "An automation engine that scaffolds repositories, documentation, and product foundations - turning a blank slate into a structured project in minutes.",
};

const features: Feature[] = [
  {
    title: "Repository scaffolding",
    description:
      "Generate clean, consistent repositories with sensible structure and configuration from the start.",
    icon: "server",
  },
  {
    title: "Documentation foundations",
    description:
      "Bootstrap READMEs, guides, and knowledge bases so projects start documented, not empty.",
    icon: "layers",
  },
  {
    title: "Product foundations",
    description:
      "Templates and automation that turn an idea into a structured, ready-to-build product foundation.",
    icon: "cpu",
  },
  {
    title: "One-command genesis",
    description:
      "Go from a blank slate to a working foundation in minutes - the engine that started this very website.",
    icon: "bolt",
  },
];

const steps = [
  {
    n: "01",
    title: "Describe",
    text: "Point Bootstrap at a goal - a product, a site, a service.",
  },
  {
    n: "02",
    title: "Generate",
    text: "It scaffolds the repository, docs, and product foundation automatically.",
  },
  {
    n: "03",
    title: "Build",
    text: "You start from a structured, documented foundation instead of a blank page.",
  },
];

export default function BootstrapPage() {
  return (
    <>
      <PageHeader
        eyebrow="In Development"
        title="LynxDock Bootstrap"
        description="The automation engine for product foundations. Bootstrap creates repositories, documentation, and product scaffolding automatically - so building starts from structure, not a blank page."
      >
        <GlowButton href="/roadmap/" variant="primary">
          Track on the Roadmap
        </GlowButton>
      </PageHeader>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="mb-12 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <GlassPanel key={s.n} className="p-6">
              <span className="hud-label">{s.n}</span>
              <h3 className="mt-3 text-base font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
                {s.text}
              </p>
            </GlassPanel>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </section>
    </>
  );
}
