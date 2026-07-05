import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bootstrap basics",
  description:
    "How LynxDock Bootstrap scaffolds repositories, documentation, and product foundations automatically.",
};

export default function BootstrapDoc() {
  return (
    <div>
      <span className="hud-label">Guides</span>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        Bootstrap basics
      </h1>

      <div className="doc-prose mt-6">
        <p>
          LynxDock Bootstrap is the automation engine that turns a blank slate
          into a structured project. Instead of starting from an empty folder, you
          start from a repository, documentation, and a product foundation that
          are already in place.
        </p>

        <h2 id="how-it-works">How it works</h2>
        <p>Bootstrap follows three simple stages:</p>
        <ol>
          <li>
            <strong>Describe</strong> - point Bootstrap at a goal: a product, a
            site, or a service.
          </li>
          <li>
            <strong>Generate</strong> - it scaffolds the repository, docs, and
            product foundation automatically.
          </li>
          <li>
            <strong>Build</strong> - you continue from a structured, documented
            starting point instead of a blank page.
          </li>
        </ol>

        <h2 id="what-it-creates">What it creates</h2>
        <ul>
          <li>
            <strong>Repository scaffolding</strong> - a clean, consistent project
            structure with sensible configuration from the start.
          </li>
          <li>
            <strong>Documentation foundations</strong> - starter READMEs, guides,
            and knowledge bases so a project begins documented, not empty.
          </li>
          <li>
            <strong>Product foundations</strong> - templates and automation that
            shape an idea into something ready to build on.
          </li>
        </ul>

        <h2 id="why">Why it matters</h2>
        <p>
          Most projects lose their first hours to setup: structure, config, and
          the documentation nobody wants to write. Bootstrap removes that tax so
          the interesting work starts sooner. It is, in fact, the engine that
          created this very website.
        </p>

        <p>
          Bootstrap is in active development. Track progress on the{" "}
          <Link href="/roadmap/">roadmap</Link>, or read more on the{" "}
          <Link href="/products/bootstrap/">product page</Link>.
        </p>
      </div>
    </div>
  );
}
