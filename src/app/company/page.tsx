import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import { principles } from "@/data/features";
import FeatureCard from "@/components/FeatureCard";
import { about } from "@/data/about";

export const metadata: Metadata = {
  title: "Company",
  description:
    "LynxDock LLC builds privacy-first, performance-focused software. Built for People. Not Platforms.",
};

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow={about.eyebrow}
        title={about.title}
        description={about.intro}
      />

      <section className="mx-auto max-w-4xl px-5 py-16">
        <GlassPanel className="p-8 sm:p-10">
          <h2 className="text-xl font-semibold text-white">
            {about.mission.heading}
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#9fb2ba]">
            {about.mission.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <p className="font-medium text-signal-cyan/90">
              {about.mission.motto}
            </p>
          </div>
        </GlassPanel>

        <h2 className="mb-6 mt-14 text-xl font-semibold text-white">
          What we stand for
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </section>
    </>
  );
}
