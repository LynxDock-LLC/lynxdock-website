import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FeatureCard from "@/components/FeatureCard";
import GlassPanel from "@/components/GlassPanel";
import AudienceGrid, { type Audience } from "@/components/AudienceGrid";
import GlowButton from "@/components/GlowButton";
import { productDetails } from "@/data/productDetails";

export const metadata: Metadata = {
  title: "LynxDock Bootstrap",
  description:
    "An automation engine that scaffolds repositories, documentation, and product foundations - turning a blank slate into a structured project in minutes.",
};

const d = productDetails.bootstrap;

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

const audiences: Audience[] = [
  {
    title: "Founders",
    text: "Turn an idea into a real, structured project foundation in minutes instead of days of setup.",
  },
  {
    title: "Developers",
    text: "Skip the boilerplate. Start every project with consistent structure, config, and docs in place.",
  },
  {
    title: "Teams",
    text: "Standardize how new repositories and docs are created so everything starts the same, clean way.",
  },
  {
    title: "Tinkerers",
    text: "Go from zero to a working scaffold fast, so you spend your time building - not configuring.",
  },
];

export default function BootstrapPage() {
  return (
    <>
      <PageHeader eyebrow={d.stage} title={d.name} description={d.intro}>
        <div className="flex flex-col gap-3 sm:flex-row">
          {d.ctas.map((c) => (
            <GlowButton key={c.label} href={c.href} external={c.external} variant={c.variant}>
              {c.label}
            </GlowButton>
          ))}
        </div>
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
          {d.features.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </section>

      <AudienceGrid title="From blank slate to foundation" items={audiences} />
    </>
  );
}
