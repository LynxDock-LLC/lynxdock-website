import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import ArchitectureFlow from "@/components/ArchitectureFlow";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "How LynxDock is built: a spec-driven infrastructure layer feeding a polyglot product monorepo — Rust + TypeScript, generated protocol types, and a shared component framework.",
};

const components = [
  { name: "GSpec", text: "The Genesis Specification: a versioned contract (YAML modules + JSON Schema) that is the single source of truth. Everything else is generated or validated from it." },
  { name: "Bootstrap", text: "The compiler. It parses GSpec, validates every module structurally, builds an in-memory IR, and generates ecosystem artifacts. A Golden-IR contract test guarantees the output never drifts." },
  { name: "Release Tools", text: "A CLI + GitHub Actions that turn a published GitHub Release into a machine-readable releases manifest the website reads." },
  { name: "@lynxdock/shared", text: "Foundational TypeScript: types, constants, helpers, logging, config, and error types every package builds on." },
  { name: "@lynxdock/protocol", text: "The canonical wire contracts. Types are defined once in Rust and generated to TypeScript with ts-rs, so the client and server can never drift apart. CI fails if the generated output is stale." },
  { name: "@lynxdock/gspec", text: "A framework-agnostic parser/validator/IR builder for the specification, with an fs-free core that also runs in the browser and a CLI for the terminal." },
  { name: "@lynxdock/genesis-ui", text: "LynxDock's component framework — design tokens, a runtime theme engine, a Tailwind preset, and a growing set of accessible components shared across every surface." },
  { name: "Desktop", text: "A Tauri application: a Rust core (identity, workspace, and messaging storage) with a React + Genesis UI front-end. Today it ships local workspace, identity, settings, and local messaging." },
  { name: "Studio", text: "The engineering environment, including GSpec Studio — validate a specification entirely in the browser using the fs-free gspec core." },
  { name: "Plugins & AI", text: "A plugin SDK (manifest + capability model) and AI tool contracts — the extension surfaces the platform will grow into." },
];

export default function ArchitecturePage() {
  return (
    <>
      <PageHeader
        eyebrow="How it's built"
        title="Architecture"
        description="LynxDock is spec-driven and polyglot. A versioned specification feeds an infrastructure layer, which in turn supports a single product monorepo spanning Rust and TypeScript."
      />

      <section className="mx-auto max-w-5xl px-5 py-16">
        <ArchitectureFlow />

        <h2 className="mb-6 mt-16 text-xl font-semibold text-white">The pieces</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {components.map((c) => (
            <GlassPanel key={c.name} className="p-6">
              <h3 className="text-base font-semibold text-white">{c.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">{c.text}</p>
            </GlassPanel>
          ))}
        </div>

        <GlassPanel glow className="mt-16 p-8 text-center sm:p-10">
          <span className="hud-label">One source of truth</span>
          <h2 className="mt-3 text-2xl font-semibold text-white">Generated beats hand-written.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[#9fb2ba]">
            Wire types are generated from Rust. Website data is generated from the spec. The pattern is
            the same everywhere: define it once, generate the rest, and let the tests hold the line.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <GlowButton href="/roadmap/" variant="primary">See the roadmap</GlowButton>
            <GlowButton href="https://github.com/LynxDock-LLC" external variant="secondary">GitHub</GlowButton>
          </div>
        </GlassPanel>
      </section>
    </>
  );
}
