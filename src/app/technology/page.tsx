import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import ArchitectureFigure from "@/components/site/ArchitectureFigure";
import DemoCta from "@/components/site/DemoCta";
import RouteLine from "@/components/site/RouteLine";

export const metadata: Metadata = {
  title: "Technology & capabilities",
  description:
    "How LynxDock is built: a Rust and Tauri desktop app, a Rust application server, and LiveKit with coturn for voice and screen sharing, on separate connections. What the system does, and where its limits are.",
};

const stack: [string, string][] = [
  ["Desktop shell", "Rust / Tauri"],
  ["Interface", "React / TypeScript / Genesis UI"],
  ["Application server", "Rust"],
  ["Shared contracts", "Generated Rust → TypeScript types"],
  ["Voice & screen sharing", "LiveKit SFU / coturn relay"],
];

const capabilities = [
  {
    title: "A shared tactical picture",
    text: "Units, wings, objectives, routes and waypoints, with orders, alerts and reported readiness in one operation.",
  },
  {
    title: "Logistics with context",
    text: "Stock by location, reservations and transfers, plus requests for refuel, repair, medical, recovery and escort support.",
  },
  {
    title: "Connected communications",
    text: "Text channels, voice, screen sharing and presence, with communications associated with team assignments.",
  },
  {
    title: "Role-aware communities",
    text: "Role-based access, member profiles and per-community preferences, alongside a personal view of assignments and outstanding actions.",
  },
  {
    title: "An in-game companion",
    text: "A click-through overlay for supported windowed or borderless setups, using a separate window without game injection or memory reading.",
  },
  {
    title: "A record to learn from",
    text: "Operation timelines, acknowledgments, board snapshots and replay keep the plan and reported outcomes available for review.",
  },
];

const hosting = [
  {
    title: "Application & records",
    text: "Provide the server, storage, backups, updates and community administration.",
  },
  {
    title: "Voice & connectivity",
    text: "Plan for media capacity, bandwidth, service credentials and network reachability. A relay adds connectivity, not free bandwidth.",
  },
  {
    title: "Resource requirements",
    text: "CPU, memory, GPU use and capacity depend on the build and workload. No fixed usage figures or user-count guarantees are claimed here.",
  },
];

const expectations = [
  {
    title: "Plans and reports, not game telemetry.",
    text: "Players supply operational information. LynxDock does not automatically move game inventory or verify that an objective was completed.",
  },
  {
    title: "Integrations have their own scope.",
    text: "Star Citizen is the current product context. Arma, Squad and Discord connectors are proposals, not shipped integrations.",
  },
  {
    title: "A development generation, not a release number.",
    text: "V8 describes product development. Windows compatibility and available features belong to the approved package. Current release-line push-to-talk requires app focus; background input is separate development, unless newer approved release evidence changes that status.",
  },
];

function StackTable() {
  return (
    <div className="card p-0">
      <table className="w-full border-collapse text-left">
        <caption className="px-5 pb-1 pt-5 text-left font-heading text-base font-bold text-ink">The stack</caption>
        <tbody>
          {stack.map(([k, v]) => (
            <tr key={k} className="border-t border-line first:border-t-0">
              <th scope="row" className="w-[44%] px-5 py-3 align-top text-[0.875rem] font-semibold text-muted">
                {k}
              </th>
              <td className="px-5 py-3 align-top text-[0.9375rem] font-semibold text-ink">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        eyebrow="Technology & capabilities"
        title="The engineering behind the teamwork."
        intro={
          <p>
            A desktop workspace for communications and operations, built around services your community can run
            and records it can control.
          </p>
        }
        aside={<StackTable />}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href="#architecture" className="btn btn-primary">
            See the architecture
          </a>
          <Link href="/products/lynxdock/" className="btn btn-secondary">
            Explore the product
          </Link>
        </div>
        <p className="small mt-5">V8 development overview · Release availability is build-specific.</p>
      </PageHero>

      <section id="architecture" aria-labelledby="architecture-title" className="section">
        <div className="wrap">
          <div className="max-w-3xl">
            <p className="eyebrow">Architecture</p>
            <h2 id="architecture-title" className="h-section mt-3">
              One workspace. Two connection paths.
            </h2>
            <p className="lead mt-4">
              Application state and real-time media use separate services. Voice does not pass through the Rust
              application server.
            </p>
          </div>
          <div className="mt-10">
            <ArchitectureFigure />
          </div>
          <div className="card-2 mt-8 max-w-3xl">
            <h3 className="h-card">Shared contracts</h3>
            <p className="small mt-2">
              Client types are generated from Rust definitions. Automated checks catch stale generated output and
              help keep the two sides aligned.
            </p>
          </div>
        </div>
      </section>

      <RouteLine variant="a" />

      <section id="capabilities" aria-labelledby="capabilities-title" className="section">
        <div className="wrap">
          <div className="max-w-3xl">
            <p className="eyebrow">Capabilities</p>
            <h2 id="capabilities-title" className="h-section mt-3">
              What the system brings together.
            </h2>
            <p className="lead mt-4">
              Capabilities described in the V8 development record. Each tester release has its own qualification
              and supported configuration.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <li key={c.title} className="card">
                <h3 className="h-card">{c.title}</h3>
                <p className="small mt-2">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="hosting" aria-labelledby="hosting-model-title" className="section section-band">
        <div className="wrap">
          <div className="max-w-3xl">
            <p className="eyebrow">Hosting</p>
            <h2 id="hosting-model-title" className="h-section mt-3">
              Control, with a clear operating model.
            </h2>
            <p className="lead mt-4">
              LynxDock Host helps with setup, access, diagnostics and recovery. The administrator remains
              responsible for running the services.
            </p>
          </div>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {hosting.map((h) => (
              <li key={h.title} className="card">
                <h3 className="h-card">{h.title}</h3>
                <p className="small mt-2">{h.text}</p>
              </li>
            ))}
          </ul>
          <Link href="/products/lynxdock-host/" className="arrow-link mt-5">
            More about LynxDock Host <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <section id="expectations" aria-labelledby="expectations-title" className="section">
        <div className="wrap">
          <div className="card-teal p-7 sm:p-10">
            <p className="eyebrow">Expectations</p>
            <h2 id="expectations-title" className="h-section mt-3 text-[clamp(1.5rem,2.6vw,2rem)]">
              What to expect, plainly.
            </h2>
            <ul className="mt-6 grid gap-6 lg:grid-cols-3">
              {expectations.map((e) => (
                <li key={e.title}>
                  <h3 className="h-card">{e.title}</h3>
                  <p className="small mt-2">{e.text}</p>
                </li>
              ))}
            </ul>
            <Link href="/beta/#limitations" className="arrow-link mt-6">
              Known limitations of the beta <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      <DemoCta
        title="See the system in action"
        text="A walkthrough with demonstration data, and time for questions about architecture, hosting and fit."
      />
    </>
  );
}
