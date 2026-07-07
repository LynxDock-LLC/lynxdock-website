import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developers",
  description: "The LynxDock monorepo, its packages, and the Rust ↔ TypeScript protocol bridge.",
};

export default function DocsDevelopers() {
  return (
    <div>
      <span className="hud-label">Reference</span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Developers</h1>
      <div className="doc-prose mt-6">
        <p>
          LynxDock V2 is a single product monorepo: a pnpm + Turborepo workspace for TypeScript
          alongside a Cargo workspace for Rust. Internal packages are linked with{" "}
          <code>workspace:*</code>; nothing publishes yet.
        </p>

        <h2 id="packages">Packages</h2>
        <ul>
          <li><strong>@lynxdock/shared</strong> - types, constants, helpers, logging, config, errors.</li>
          <li><strong>@lynxdock/protocol</strong> - wire contracts, generated from Rust via ts-rs.</li>
          <li><strong>@lynxdock/gspec</strong> - spec parser/validator/IR with an fs-free core and a CLI.</li>
          <li><strong>@lynxdock/genesis-ui</strong> - tokens, theme engine, Tailwind preset, components.</li>
          <li><strong>@lynxdock/plugins</strong> and <strong>@lynxdock/ai</strong> - the extension surfaces.</li>
        </ul>

        <h2 id="crates">Rust crates</h2>
        <p>
          The Rust side holds the canonical protocol types plus storage crates for identity,
          workspace, and messaging, and the Tauri desktop core. Wire types live in the protocol
          crate and are regenerated with <code>pnpm gen:protocol</code>; CI fails if the checked-in
          TypeScript is stale.
        </p>

        <h2 id="workflow">Workflow</h2>
        <p>
          The standard gate is <code>pnpm build</code>, <code>pnpm test</code>, and{" "}
          <code>pnpm lint</code> for the JavaScript side, and <code>cargo build</code> /{" "}
          <code>cargo test</code> for Rust. A permanent Golden-IR test keeps the spec compiler
          honest. Development happens in the open on the{" "}
          <a href="https://github.com/LynxDock-LLC" target="_blank" rel="noopener noreferrer">LynxDock GitHub organization</a>.
        </p>

        <p>
          New to the project? Start with the <Link href="/docs/architecture/">architecture</Link>{" "}
          overview, then follow the <Link href="/roadmap/">roadmap</Link>.
        </p>
      </div>
    </div>
  );
}
