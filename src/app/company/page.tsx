import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import EnquiryForm from "@/components/site/EnquiryForm";
import RouteLine from "@/components/site/RouteLine";
import { companyInfo } from "@/data/companyInfo";

export const metadata: Metadata = {
  title: "Company",
  description:
    "LynxDock LLC is an independent, founder-led software company building a desktop workspace that helps communities organise as teams without giving up control.",
};

const principles = [
  {
    title: "Context",
    line: "Keep the work together.",
    text: "Conversation, people, plans and follow-through belong in one place, so nobody has to piece the picture together from scattered apps.",
  },
  {
    title: "Control",
    line: "Respect community ownership.",
    text: "A community's server, members and records stay on infrastructure it controls. We build tools for the people running it, not a platform that runs them.",
  },
  {
    title: "Clarity",
    line: "Show what is real.",
    text: "We say what a build does and does not do, label demonstration data, and keep release status honest, including what is still being tested.",
  },
];

export default function CompanyPage() {
  return (
    <>
      <PageHero
        eyebrow="Company"
        title="Helping groups of people work as organised teams."
        intro={
          <p>
            Organised communities need conversation, staffing, plans, logistics and follow-through in one place.
            That work usually ends up scattered across chat channels, spreadsheets and people&rsquo;s memory.{" "}
            {companyInfo.name} builds the desktop workspace that keeps it together, on infrastructure the community
            controls.
          </p>
        }
      />

      <section aria-labelledby="founder-title" className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start">
          <div className="card flex items-center gap-5">
            <span
              aria-hidden="true"
              className="flex h-20 w-20 flex-none items-center justify-center rounded-full border border-[rgba(92,225,223,0.45)] bg-panel-2 font-heading text-2xl font-bold text-accent"
            >
              JH
            </span>
            <div>
              <h2 id="founder-title" className="h-card text-[1.3rem]">
                Jared Haga
              </h2>
              <p className="small mt-1">Founder · LynxDock</p>
            </div>
          </div>
          <div>
            <p className="body">
              {companyInfo.name} is an independent, founder-led software company. The founder sets what the
              product should do, decides when a build is good enough for testers, and signs off every release.
            </p>
            <p className="body mt-4">
              Development is AI-assisted: coding assistants help with implementation, debugging and review, inside
              scoped work items with saved handoffs and repeated checks. Generated contracts, type checks,
              automated tests and clean builds keep the pieces consistent. A signed candidate is not
              automatically a release.
            </p>
          </div>
        </div>
      </section>

      <RouteLine variant="a" />

      <section aria-labelledby="mission-title" className="section">
        <div className="wrap">
          <div className="paper px-6 py-12 sm:px-12 sm:py-16">
            <h2 id="mission-title" className="font-heading text-sm font-bold uppercase tracking-[0.12em] text-[#1f5a57]">
              Our mission
            </h2>
            <p className="mt-5 max-w-4xl font-heading text-[clamp(1.6rem,3.4vw,2.6rem)] font-bold leading-[1.18] tracking-[-0.02em]">
              Make it easier for a group of people to become an organised team, without giving up control of their
              community.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="section">
        <div className="wrap">
          <p className="eyebrow">Principles</p>
          <h2 id="principles-title" className="h-section mt-3">
            Three things we hold to.
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title} className="card">
                <h3 className="h-card text-[1.3rem]">{p.title}</h3>
                <p className="mt-1 font-semibold text-accent">{p.line}</p>
                <p className="small mt-3">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="section section-band">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <p className="eyebrow">Business enquiries</p>
            <h2 id="contact-title" className="h-section mt-3">
              Pilots, partnerships, investment or acquisition.
            </h2>
            <p className="body mt-4">
              One path for every business conversation: a community pilot, a partnership, investment or an
              acquisition enquiry. Tell us a little about what you have in mind.
            </p>
            <ul className="tick-list small mt-6">
              <li>
                Want to see the product first?{" "}
                <a href="/support/#request-demo" data-demo-open="" className="text-link">
                  Request a demo
                </a>
                .
              </li>
              <li>
                Joining as a tester?{" "}
                <Link href="/download/" className="text-link">
                  Request beta access
                </Link>
                .
              </li>
              <li>
                Already testing and need help?{" "}
                <Link href="/support/" className="text-link">
                  Support
                </Link>
                .
              </li>
            </ul>
          </div>
          <div className="card">
            <EnquiryForm kind="business" />
          </div>
        </div>
      </section>
    </>
  );
}
