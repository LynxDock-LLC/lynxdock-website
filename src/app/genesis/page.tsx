import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";

export const metadata: Metadata = {
  title: "LynxDock Genesis",
  description:
    "Genesis is the reusable internal foundation behind LynxDock's design system, website, documentation, repository standards, and product launch workflow. A supporting initiative - not a product.",
};

const powers = [
  {
    name: "Website",
    text: "This site is a Genesis output: a static, fast, mission-control-styled Next.js build served on Cloudflare Pages.",
  },
  {
    name: "Design system",
    text: "The colors, typography, spacing, and motion tokens that keep every LynxDock surface coherent.",
  },
  {
    name: "Documentation",
    text: "Shared structure and styling for docs and guides, so knowledge starts organized instead of scattered.",
  },
  {
    name: "Repository standards",
    text: "Consistent repo layout, configuration, and conventions applied the same way across projects.",
  },
  {
    name: "Bootstrap automation",
    text: "The scaffolding rules Bootstrap follows to turn a blank slate into a structured foundation.",
  },
];

export default function GenesisPage() {
  return (
    <>
      <PageHeader
        eyebrow="Part of the ecosystem"
        title="LynxDock Genesis"
        description="Genesis is the reusable foundation behind how LynxDock is designed, documented, and shipped. It is a supporting initiative - not a product you download."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <GlowButton href="/design-system/" variant="primary">
            See the visual reference
          </GlowButton>
          <GlowButton href="/products/lynxdock/" variant="secondary">
            Back to LynxDock
          </GlowButton>
        </div>
      </PageHeader>

      <section className="mx-auto flex max-w-4xl flex-col gap-8 px-5 py-16">
        {/* 1. What is Genesis? */}
        <GlassPanel className="p-8 sm:p-10">
          <h2 className="text-xl font-semibold text-white">What is Genesis?</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#9fb2ba]">
            <p>
              Genesis is the shared foundation the LynxDock ecosystem is built
              on. It is the design system, the website, the documentation
              structure, the repository standards, and the automation workflow
              that turns an idea into a shipped project - packaged as one
              reusable base.
            </p>
            <p>
              Think of it as the groundwork rather than a feature: the calm,
              consistent layer underneath everything with the LynxDock name on
              it.
            </p>
          </div>
        </GlassPanel>

        {/* 2. Why it exists */}
        <GlassPanel className="p-8 sm:p-10">
          <h2 className="text-xl font-semibold text-white">Why it exists</h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#9fb2ba]">
            <p>
              A small, founder-led team cannot afford to reinvent the basics for
              every product. Genesis exists so design, docs, and setup are
              solved once and reused - keeping everything coherent as the
              ecosystem grows, and letting the real effort go into the products
              themselves.
            </p>
            <p>
              It is a direct expression of the LynxDock philosophy: lightweight,
              consistent, and built to stay out of the way.
            </p>
          </div>
        </GlassPanel>

        {/* 3. What it powers */}
        <div>
          <h2 className="mb-6 text-xl font-semibold text-white">
            What it powers
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {powers.map((p) => (
              <GlassPanel key={p.name} className="p-6">
                <h3 className="text-base font-semibold text-white">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
                  {p.text}
                </p>
              </GlassPanel>
            ))}
          </div>
        </div>

        {/* 4. Relationship to LynxDock */}
        <GlassPanel className="p-8 sm:p-10">
          <h2 className="text-xl font-semibold text-white">
            Relationship to LynxDock
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#9fb2ba]">
            <p>
              LynxDock - the lightweight communication app - is the product.
              Genesis serves it. The look, the site you are reading, and the
              docs all come from Genesis so that the app can stay the focus.
            </p>
            <p>
              Genesis is deliberately in the background. If you are here to use
              LynxDock, you never need to think about it.
            </p>
          </div>
        </GlassPanel>

        {/* 5. Relationship to Studio and Bootstrap */}
        <GlassPanel className="p-8 sm:p-10">
          <h2 className="text-xl font-semibold text-white">
            Relationship to Studio and Bootstrap
          </h2>
          <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-[#9fb2ba]">
            <p>
              <span className="font-medium text-signal-cyan/90">
                LynxDock Studio
              </span>{" "}
              is where knowledge and planning live; it draws on the same Genesis
              design language so it feels like part of the same family.
            </p>
            <p>
              <span className="font-medium text-signal-cyan/90">
                LynxDock Bootstrap
              </span>{" "}
              is the automation engine that applies Genesis in practice -
              scaffolding repositories, documentation, and product foundations
              using the standards Genesis defines. In short: Genesis is the
              blueprint, Bootstrap is the machine that builds from it.
            </p>
          </div>
        </GlassPanel>

        {/* 6. Current status */}
        <GlassPanel glow className="p-8 sm:p-10">
          <span className="hud-label">Current status</span>
          <h2 className="mt-3 text-xl font-semibold text-white">
            Internal foundation initiative
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-[#9fb2ba]">
            Genesis is an internal foundation initiative, not a released
            product. It is actively used to build and ship LynxDock today, and
            may be documented more openly over time. For the living visual
            reference, see the{" "}
            <a
              href="/design-system/"
              className="text-signal-bright underline underline-offset-2"
            >
              design system
            </a>
            .
          </p>
        </GlassPanel>
      </section>
    </>
  );
}
