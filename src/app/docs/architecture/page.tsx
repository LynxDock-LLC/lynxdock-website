import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Architecture",
  description: "How LynxDock is built: spec-driven infrastructure feeding a polyglot product monorepo.",
};

export default function DocsArchitecture() {
  return (
    <div>
      <span className="hud-label">Reference</span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Architecture</h1>
      <div className="doc-prose mt-6">
        <p>
          LynxDock is spec-driven and polyglot. A versioned specification feeds an
          infrastructure layer, which in turn supports a single product monorepo spanning
          Rust and TypeScript. For a visual overview, see the{" "}
          <Link href="/architecture/">architecture page</Link>.
        </p>

        <h2 id="infrastructure">Infrastructure</h2>
        <p>
          <strong>GSpec</strong> is the Genesis Specification - a versioned contract in YAML
          plus JSON Schema that is the single source of truth. <strong>Bootstrap</strong> is
          the compiler that parses it, validates every module, builds an in-memory IR, and
          generates artifacts; a Golden-IR contract test guarantees that output never drifts.
          <strong> Release Tools</strong> turn a published GitHub Release into a machine-readable
          manifest, and this <strong>website</strong> is a static export that consumes generated data.
        </p>

        <h2 id="monorepo">Product monorepo</h2>
        <p>
          Version 2 lives in one monorepo. <strong>@lynxdock/shared</strong> holds foundational
          types and utilities. <strong>@lynxdock/protocol</strong> defines the wire contracts;
          the types are authored once in Rust and generated to TypeScript with ts-rs, so the
          client and a future server cannot drift apart. <strong>@lynxdock/genesis-ui</strong> is
          the component framework. The <strong>desktop</strong> app (Tauri) and <strong>Studio</strong>{" "}
          are the surfaces; <strong>plugins</strong> and <strong>ai</strong> are the extension points.
        </p>

        <h2 id="principles">Why it's built this way</h2>
        <p>
          The pattern is the same everywhere: define something once, generate the rest, and let
          tests hold the line. Generated beats hand-written. That discipline is what lets a solo
          team move quickly without the pieces falling out of sync.
        </p>
      </div>
    </div>
  );
}
