import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import { principles } from "@/data/features";
import FeatureCard from "@/components/FeatureCard";

export const metadata: Metadata = {
  title: "Company",
  description:
    "LynxDock LLC builds privacy-first, performance-focused software. Built for People. Not Platforms.",
};

export default function CompanyPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="Company"
        description="LynxDock LLC is an independent, founder-led software company building a privacy-first ecosystem for the people who actually use software."
      />

      <section className="mx-auto max-w-4xl px-5 py-16">
        <GlassPanel className="p-8 sm:p-10">
          <h2 className="text-xl font-semibold text-white">Our mission</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#9fb2ba]">
            <p>
              Software should serve the people who use it. Too much of today's
              technology is designed to capture attention, harvest data, and lock
              users in. We think that's backwards.
            </p>
            <p>
              LynxDock builds lightweight, privacy-first tools you can self-host
              and truly own - communication, development, and automation software
              that stays fast, quiet, and respectful of the people using it.
            </p>
            <p className="font-medium text-signal-cyan/90">
              Built for People. Not Platforms.
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
