import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import SectionHeader from "@/components/SectionHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import ProductCard from "@/components/ProductCard";
import FeatureCard from "@/components/FeatureCard";
import ScreenshotShowcase, { type Shot } from "@/components/ScreenshotShowcase";
import { products } from "@/data/products";
import { principles } from "@/data/features";

export const metadata: Metadata = {
  title: "Genesis Design System",
  description:
    "A living style guide for the LynxDock Genesis design system - colors, typography, components, and motion rendered from the same tokens the site ships with.",
};

type Swatch = {
  name: string;
  token: string;
  value: string;
  note?: string;
  onDark?: boolean;
};

const foundation: Swatch[] = [
  { name: "Background", token: "--ld-bg", value: "#05090c", note: "Base canvas" },
  { name: "Elevated", token: "--ld-bg-elevated", value: "#080d11" },
  { name: "Panel", token: "--ld-panel", value: "#0d141a" },
  { name: "Panel strong", token: "--ld-panel-strong", value: "#141d25" },
];

const lines: Swatch[] = [
  {
    name: "Border",
    token: "--ld-border",
    value: "rgba(94,242,242,0.14)",
    note: "Hairline",
  },
  {
    name: "Border strong",
    token: "--ld-border-strong",
    value: "rgba(94,242,242,0.35)",
    note: "Hover / focus",
  },
];

const textTones: Swatch[] = [
  { name: "Text", token: "--ld-text", value: "#cdd9de" },
  { name: "Text strong", token: "--ld-text-strong", value: "#ffffff" },
  { name: "Muted", token: "--ld-muted", value: "#9fb2ba" },
  { name: "Muted 2", token: "--ld-muted-2", value: "#7f939b" },
];

const accents: Swatch[] = [
  { name: "Cyan", token: "--ld-cyan", value: "#35e0e0", note: "Primary signal" },
  { name: "Cyan bright", token: "--ld-cyan-bright", value: "#5ef2f2" },
  { name: "Blue", token: "--ld-blue", value: "#3b82f6" },
  { name: "Blue deep", token: "--ld-blue-deep", value: "#1d4ed8" },
];

const status: Swatch[] = [
  { name: "Warning", token: "--ld-warning", value: "#f5b544" },
  { name: "Success", token: "--ld-success", value: "#34d399" },
  { name: "Danger", token: "--ld-danger", value: "#f87171" },
];

function SwatchGrid({ items }: { items: Swatch[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((s) => (
        <div
          key={s.token}
          className="overflow-hidden rounded-xl border border-line bg-graphite-900/40"
        >
          <div
            className="h-16 w-full border-b border-line/60"
            style={{ backgroundColor: `var(${s.token})` }}
          />
          <div className="px-3 py-2.5">
            <p className="text-sm font-medium text-white">{s.name}</p>
            <p className="mt-0.5 font-mono text-[11px] text-[#7f939b]">
              {s.token}
            </p>
            <p className="font-mono text-[11px] text-[#9fb2ba]">{s.value}</p>
            {s.note && (
              <p className="mt-1 text-[11px] text-[#7f939b]">{s.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

const typeScale = [
  { label: "H1 / 3.5rem", cls: "text-5xl font-semibold tracking-tight text-white", sample: "Command your community" },
  { label: "H2 / 2.25rem", cls: "text-4xl font-semibold tracking-tight text-white", sample: "Structure when you need it" },
  { label: "H3 / 1.35rem", cls: "text-xl font-semibold text-white", sample: "Live command tree" },
  { label: "Body / 1rem", cls: "text-base leading-relaxed text-[#9fb2ba]", sample: "The communication platform with a tactical operations center - private, lightweight, and yours." },
  { label: "Small / 0.8rem", cls: "text-xs text-[#7f939b]", sample: "Supporting caption and metadata text." },
];

const shot: Shot = {
  src: "/screenshots/mission-control.webp",
  alt: "LynxDock squadron command view with wing readiness and a live command tree",
  label: "LynxDock - Mission Control",
  caption: "The screenshot frame: window chrome, glass border, and a caption rail.",
  width: 1600,
  height: 1044,
};

function Block({
  n,
  eyebrow,
  title,
  description,
  children,
}: {
  n: string;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={eyebrow.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
      className="scroll-mt-24 border-t border-line/50 py-14 first:border-t-0"
    >
      <div className="flex items-baseline gap-3">
        <span className="hud-label text-[#5b6f77]">{n}</span>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <PageHeader
        eyebrow="Genesis Design System"
        title="Style guide"
        description="A living reference for the LynxDock look and feel. Every element below is rendered from the same tokens and components the site ships with - so what you see here is what you get everywhere else."
      />

      <div className="mx-auto max-w-6xl px-5 pb-20">
        {/* 1. Color Tokens */}
        <Block
          n="01"
          eyebrow="Color Tokens"
          title="Color"
          description="The graphite base, cyan signal, and status hues. Swatches read straight from the --ld-* CSS variables."
        >
          <div className="flex flex-col gap-8">
            <div>
              <h3 className="mb-3 text-sm font-medium text-[#c3d0d6]">Foundation</h3>
              <SwatchGrid items={foundation} />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium text-[#c3d0d6]">Lines</h3>
              <SwatchGrid items={lines} />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium text-[#c3d0d6]">Text</h3>
              <SwatchGrid items={textTones} />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium text-[#c3d0d6]">Accent</h3>
              <SwatchGrid items={accents} />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium text-[#c3d0d6]">Status</h3>
              <SwatchGrid items={status} />
            </div>
          </div>
        </Block>

        {/* 2. Typography */}
        <Block
          n="02"
          eyebrow="Typography"
          title="Type scale"
          description="A single sans stack with tight tracking on headings, plus the HUD label and monospace treatments."
        >
          <GlassPanel className="flex flex-col gap-6 p-8">
            {typeScale.map((t) => (
              <div
                key={t.label}
                className="flex flex-col gap-2 border-b border-line/40 pb-6 last:border-b-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-8"
              >
                <span className="w-40 flex-none font-mono text-[11px] uppercase tracking-widest text-[#7f939b]">
                  {t.label}
                </span>
                <p className={t.cls}>{t.sample}</p>
              </div>
            ))}
            <div className="flex flex-col gap-2 border-t border-line/40 pt-6 sm:flex-row sm:items-baseline sm:gap-8">
              <span className="w-40 flex-none font-mono text-[11px] uppercase tracking-widest text-[#7f939b]">
                HUD label
              </span>
              <span className="hud-label">Mission Control</span>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-8">
              <span className="w-40 flex-none font-mono text-[11px] uppercase tracking-widest text-[#7f939b]">
                Gradient
              </span>
              <p className="text-2xl font-medium text-gradient">
                Built for People. Not Platforms.
              </p>
            </div>
          </GlassPanel>
        </Block>

        {/* 3. Buttons */}
        <Block
          n="03"
          eyebrow="Buttons"
          title="Buttons"
          description="Three variants: primary (glow), secondary (outline), and ghost. Each has a visible focus ring for keyboard users."
        >
          <GlassPanel className="flex flex-wrap items-center gap-4 p-8">
            <GlowButton href="/design-system/" variant="primary">
              Primary
            </GlowButton>
            <GlowButton href="/design-system/" variant="secondary">
              Secondary
            </GlowButton>
            <GlowButton href="/design-system/" variant="ghost">
              Ghost
            </GlowButton>
          </GlassPanel>
        </Block>

        {/* 4. Glass Panels */}
        <Block
          n="04"
          eyebrow="Glass Panels"
          title="Glass panels"
          description="Translucent surfaces with a hairline border and blur. Optional hover lift and glow variants."
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <GlassPanel className="p-6">
              <span className="hud-label">Default</span>
              <p className="mt-3 text-sm leading-relaxed text-[#9fb2ba]">
                Static surface for grouping content. Hairline border, subtle
                inner gradient.
              </p>
            </GlassPanel>
            <GlassPanel hover className="p-6">
              <span className="hud-label">Hover</span>
              <p className="mt-3 text-sm leading-relaxed text-[#9fb2ba]">
                Adds a border brighten and soft glow on hover. Use for
                interactive cards.
              </p>
            </GlassPanel>
            <GlassPanel glow className="p-6">
              <span className="hud-label">Glow</span>
              <p className="mt-3 text-sm leading-relaxed text-[#9fb2ba]">
                Carries a standing shadow-glow for emphasis - reserved for hero
                and CTA surfaces.
              </p>
            </GlassPanel>
          </div>
        </Block>

        {/* 5. Product Cards */}
        <Block
          n="05"
          eyebrow="Product Cards"
          title="Product cards"
          description="The ecosystem card: stage label, status dot, name, tagline, summary, and an animated link."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Block>

        {/* 6. Feature Cards */}
        <Block
          n="06"
          eyebrow="Feature Cards"
          title="Feature cards"
          description="Icon tile, title, and a short description - used for principles and product feature grids."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {principles.slice(0, 6).map((f) => (
              <FeatureCard key={f.title} feature={f} />
            ))}
          </div>
        </Block>

        {/* 7. Screenshot Frames */}
        <Block
          n="07"
          eyebrow="Screenshot Frames"
          title="Screenshot frames"
          description="Product shots sit in a windowed glass frame with a chrome bar and caption rail."
        >
          <ScreenshotShowcase shots={[shot]} />
        </Block>

        {/* 8. Motion Samples */}
        <Block
          n="08"
          eyebrow="Motion Samples"
          title="Motion"
          description="Subtle, tactical motion only. Every animation below is disabled automatically under prefers-reduced-motion."
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <GlassPanel className="flex flex-col items-center gap-4 p-8">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-signal-cyan/60 animate-ping-ring" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-signal-cyan" />
              </span>
              <span className="hud-label text-[#7f939b]">ping-ring</span>
            </GlassPanel>
            <GlassPanel className="flex flex-col items-center gap-4 p-8">
              <span className="inline-block h-3 w-3 rounded-full bg-signal-cyan animate-pulse-soft" />
              <span className="hud-label text-[#7f939b]">pulse-soft</span>
            </GlassPanel>
            <GlassPanel className="flex flex-col items-center gap-4 p-8">
              <span
                className="inline-block h-3 w-3 rounded-full animate-blink"
                style={{ backgroundColor: "var(--ld-success)" }}
              />
              <span className="hud-label text-[#7f939b]">blink</span>
            </GlassPanel>
            <GlassPanel className="relative flex flex-col items-center gap-4 overflow-hidden p-8">
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-signal-cyan/25">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full animate-radar-sweep"
                  style={{
                    background:
                      "conic-gradient(from 0deg, rgba(53,224,224,0.35), transparent 40%)",
                  }}
                />
                <span className="h-1.5 w-1.5 rounded-full bg-signal-cyan" />
              </span>
              <span className="hud-label text-[#7f939b]">radar-sweep</span>
            </GlassPanel>
            <GlassPanel className="flex flex-col items-center gap-4 p-8">
              <span className="animate-fade-up text-sm text-white">
                Fades up on mount
              </span>
              <span className="hud-label text-[#7f939b]">fade-up</span>
            </GlassPanel>
          </div>
        </Block>

        {/* 9. Accessibility Notes */}
        <Block
          n="09"
          eyebrow="Accessibility Notes"
          title="Accessibility"
          description="The rules that keep Genesis usable for everyone, not just visually striking."
        >
          <GlassPanel className="p-8">
            <div className="doc-prose">
              <ul>
                <li>
                  <strong>Contrast.</strong> Body text uses{" "}
                  <code>--ld-text</code> on <code>--ld-bg</code> and strong text
                  uses <code>--ld-text-strong</code> to clear WCAG AA for normal
                  and large text.
                </li>
                <li>
                  <strong>Focus.</strong> A visible 2px{" "}
                  <code>--ld-cyan-bright</code> focus ring is applied globally
                  via <code>:focus-visible</code>; never remove it.
                </li>
                <li>
                  <strong>Motion.</strong> All motion respects{" "}
                  <code>prefers-reduced-motion</code> - animations and smooth
                  scrolling collapse to near-instant.
                </li>
                <li>
                  <strong>Decoration.</strong> Purely decorative elements (grid
                  glow, radar sweeps, status dots) are marked{" "}
                  <code>aria-hidden</code> so screen readers skip them.
                </li>
                <li>
                  <strong>Semantics &amp; hit targets.</strong> Real headings and
                  landmarks carry structure, and interactive controls stay large
                  enough to tap comfortably.
                </li>
              </ul>
              <p>
                Full spec: <code>docs/GENESIS-DESIGN-SYSTEM.md</code>. Tokens
                live in <code>src/styles/tokens.css</code> and{" "}
                <code>src/data/designSystem.ts</code>.
              </p>
            </div>
          </GlassPanel>
        </Block>
      </div>
    </>
  );
}
