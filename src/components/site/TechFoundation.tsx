import Link from "next/link";
import siteStatus from "@/data/siteStatus";

const CARDS = [
  {
    n: "01",
    area: "The desktop",
    title: "Rust + Tauri",
    text: "A Rust desktop shell uses the system WebView for a React and TypeScript interface.",
  },
  {
    n: "02",
    area: "The community",
    title: "Your application server",
    text: "A Rust service manages permissions, operation state and records on infrastructure your community controls.",
  },
  {
    n: "03",
    area: "The media",
    title: "Voice + screen sharing",
    text: "LiveKit carries real-time media; coturn provides a relay where direct connectivity needs help.",
  },
];

/** The homepage's technical-foundation section (replaces the old repeated Host pitch). */
export default function TechFoundation() {
  return (
    <section aria-labelledby="foundation-title" className="section">
      <div className="wrap">
        <div className="max-w-3xl">
          <p className="eyebrow">The technical foundation</p>
          <h2 id="foundation-title" className="h-section mt-3">
            Built for teamwork. Engineered for control.
          </h2>
          <p className="lead mt-4">
            A native desktop shell, a dedicated application server and a separate media service. Each has a clear
            job.
          </p>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {CARDS.map((c) => (
            <li key={c.n} className="card flex flex-col gap-3">
              <p className="text-[0.8125rem] font-semibold text-muted">
                <span className="mono text-accent">{c.n}</span> / {c.area}
              </p>
              <h3 className="h-card text-[1.25rem]">{c.title}</h3>
              <p className="small">{c.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="small">
            {siteStatus.generation.name} is the current development generation. Tester availability is tied to an
            approved build.
          </p>
          <Link href="/technology/" className="arrow-link">
            Explore the technical capabilities <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
