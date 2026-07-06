import type { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import FeatureCard from "@/components/FeatureCard";
import AudienceGrid, { type Audience } from "@/components/AudienceGrid";
import GlowButton from "@/components/GlowButton";
import { productDetails } from "@/data/productDetails";

export const metadata: Metadata = {
  title: "LynxDock Studio",
  description:
    "An AI-assisted development workspace that links docs, sprints, architecture, and research into one navigable knowledge graph.",
};

const d = productDetails.studio;
const shot = d.screenshots[0];

const audiences: Audience[] = [
  {
    title: "Solo builders",
    text: "Keep every decision, note, and doc connected so your project stays legible as it grows.",
  },
  {
    title: "Small teams",
    text: "Share one living knowledge base across engineering, design, and research - no more scattered wikis.",
  },
  {
    title: "Open-source maintainers",
    text: "Give contributors a navigable map of architecture and decisions instead of tribal knowledge.",
  },
  {
    title: "Researchers",
    text: "Link ideas, sources, and findings into a graph you can actually traverse and reason over.",
  },
];

export default function StudioPage() {
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
        <figure className="glass mb-12 overflow-hidden rounded-2xl shadow-panel">
          <div className="flex items-center gap-2 border-b border-line/70 bg-graphite-900/70 px-4 py-2.5">
            <span aria-hidden className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-graphite-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-graphite-600" />
              <span className="h-2.5 w-2.5 rounded-full bg-signal-cyan/50" />
            </span>
            <span className="ml-2 hud-label text-[#7f939b]">{shot.label}</span>
          </div>
          <Image
            src={shot.src}
            alt={shot.alt}
            width={shot.width}
            height={shot.height}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="h-auto w-full"
          />
          <figcaption className="border-t border-line/60 px-4 py-3 text-sm text-[#9fb2ba]">
            {shot.caption}
          </figcaption>
        </figure>

        <div className="grid gap-5 sm:grid-cols-2">
          {d.features.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </section>

      <AudienceGrid title="For everyone who builds with knowledge" items={audiences} />
    </>
  );
}
