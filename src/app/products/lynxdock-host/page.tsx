import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import FeatureCard from "@/components/FeatureCard";
import ScreenshotShowcase from "@/components/ScreenshotShowcase";
import AudienceGrid, { type Audience } from "@/components/AudienceGrid";
import GlowButton from "@/components/GlowButton";
import { productDetails } from "@/data/productDetails";

export const metadata: Metadata = {
  title: "LynxDock Host",
  description:
    "The server owner's console for LynxDock - guided setup and an owner console to run a self-hosted community: members, roles, channels, invites, backups, connectivity, and voice, without config files or the terminal.",
};

const d = productDetails["lynxdock-host"];

const audiences: Audience[] = [
  {
    title: "Community owners",
    text: "Run your own LynxDock server from one place - members, roles, and channels - without touching a config file or the terminal.",
  },
  {
    title: "Squadron leaders",
    text: "Stand up a persistent server for your group, gate it with invites, and keep it healthy with an at-a-glance readiness score.",
  },
  {
    title: "Home & LAN hosts",
    text: "Check reachability with a real round-trip proof, and get honest, plain-language help for double-NAT and CGNAT situations.",
  },
  {
    title: "Operators",
    text: "Online backups and recovery points, connectivity and diagnostics, and managed voice/TURN - the boring parts, made calm.",
  },
];

export default function LynxDockHostPage() {
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
        <div className="grid gap-5 sm:grid-cols-2">
          {d.features.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </section>

      <AudienceGrid title="Built for the people who run the server" items={audiences} />

      {d.screenshots.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-20">
          <ScreenshotShowcase shots={d.screenshots} />
        </section>
      )}
    </>
  );
}
