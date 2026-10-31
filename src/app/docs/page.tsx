import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "LynxDock documentation: the quickstart for invited testers, the product and Host pages, the technical overview and the engineering background.",
};

const start = [
  {
    href: "/docs/getting-started/",
    title: "Quickstart",
    text: "Install the app, join your community's server with an invitation, and check your voice setup.",
  },
  {
    href: "/beta/",
    title: "Tester hub",
    text: "Installers, SHA-256 values, release notes and known limitations for invited testers.",
  },
  {
    href: "/products/lynxdock-host/",
    title: "Running the server",
    text: "What LynxDock Host does for an administrator, and what stays the administrator's job.",
  },
  {
    href: "/technology/",
    title: "Technology & capabilities",
    text: "The desktop stack, the application server, the separate media service and the system's limits.",
  },
];

const background = [
  {
    href: "/guides/operations/",
    title: "Plan, deploy & coordinate an operation",
    text: "The illustrated V5 walkthrough (September 2026): one convoy operation from draft to debrief.",
  },
  {
    href: "/docs/architecture/",
    title: "Monorepo architecture",
    text: "How the specification, infrastructure and product monorepo fitted together in July 2026.",
  },
  {
    href: "/docs/developers/",
    title: "Developers",
    text: "Packages, Rust crates and the Rust to TypeScript bridge, as documented in July 2026.",
  },
  {
    href: "/docs/bootstrap/",
    title: "Bootstrap basics",
    text: "How GSpec and Bootstrap generate ecosystem artifacts, including parts of this site.",
  },
  {
    href: "/genesis/",
    title: "Genesis",
    text: "The record of the first LynxDock website build and its design system.",
  },
  {
    href: "/products/studio/",
    title: "LynxDock Studio and Bootstrap",
    text: "The company's development tools, kept for attribution and history.",
  },
];

export default function DocsOverview() {
  return (
    <div>
      <p className="eyebrow">Documentation</p>
      <h1 className="h-page mt-3">Find what you need.</h1>
      <p className="lead mt-4 max-w-2xl">
        Start with the quickstart if you have been invited to test. The engineering background below is kept for
        history; each page says which period it describes.
      </p>

      <h2 className="h-card mt-10 text-[1.3rem]">Start here</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2">
        {start.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="card block h-full transition-colors hover:border-[#3a4b55]">
              <span className="h-card block">{c.title}</span>
              <span className="small mt-1.5 block">{c.text}</span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="h-card mt-12 text-[1.3rem]">Engineering background and history</h2>
      <p className="small mt-2 max-w-2xl">
        Implementation detail from earlier stages: Studio, Bootstrap, GSpec and the Genesis design system. Some of it
        describes plans that changed; the current architecture is on the{" "}
        <Link href="/technology/" className="text-link">
          technology page
        </Link>
        .
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {background.map((c) => (
          <li key={c.href}>
            <Link href={c.href} className="card-quiet block h-full transition-colors hover:border-[#3a4b55]">
              <span className="block font-semibold text-ink">{c.title}</span>
              <span className="small mt-1 block">{c.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
