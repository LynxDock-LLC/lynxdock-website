import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import DemoCta from "@/components/site/DemoCta";

export const metadata: Metadata = {
  title: "Product direction",
  description:
    "What LynxDock is working on now, what comes next, and what is only being considered. Direction, not dated commitments.",
};

const columns: { id: string; title: string; summary: string; items: { title: string; text: string }[] }[] = [
  {
    id: "now",
    title: "Now",
    summary: "In qualification for the next tester release.",
    items: [
      {
        title: "The next tester release",
        text: "The next tester release is in qualification and is not yet available for distribution. It is the V8 generation (provisionally 0.3.0), and it is checked as one candidate before anything is offered to testers.",
      },
      {
        title: "Cleaner voice behaviour in operations",
        text: "Voice rooms closed when an operation ends, a renamed live voice channel keeping everyone connected, and bans or ended sessions cutting voice reliably. These are in qualification, not released.",
      },
    ],
  },
  {
    id: "next",
    title: "Next",
    summary: "In development, after the next tester release.",
    items: [
      {
        title: "Background push-to-talk",
        text: "Push-to-talk that works while another window has focus. It is separate development work and is not part of the next tester release.",
      },
      {
        title: "Member experience work in V8",
        text: "Saved-community navigation, persistent call controls, per-community preferences, profiles and presence, opt-in game activity, and spoken orders with local Windows narration. Each tester release says which of these it includes.",
      },
    ],
  },
  {
    id: "later",
    title: "Later",
    summary: "Being considered. Not scheduled, and not promised.",
    items: [
      {
        title: "Game connectors",
        text: "Arma and Squad adaptations for briefings, vehicle roles and logistics routes are proposals. Any connector needs its provider's permission, access controls and careful credential handling.",
      },
      {
        title: "A Discord integration",
        text: "Identity linking or communications bridging would need separate approval and engineering. LynxDock is not a self-hosted copy of Discord.",
      },
      {
        title: "Other ways to run it",
        text: "A managed edition, or builds for platforms other than Windows, would each need their own specification first.",
      },
    ],
  },
];

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="Product direction"
        title="What we're working on, and what's further out."
        intro={
          <p>
            Direction, not dated commitments. What a tester can use is always set by an approved release; see{" "}
            <Link href="/releases/" className="text-link">
              release status
            </Link>
            .
          </p>
        }
      />

      <section aria-labelledby="direction-title" className="section">
        <div className="wrap">
          <h2 id="direction-title" className="sr-only">
            Now, next and later
          </h2>
          <div className="grid gap-5 lg:grid-cols-3">
            {columns.map((c) => (
              <section key={c.id} aria-labelledby={`col-${c.id}`} className={c.id === "now" ? "card-teal" : "card"}>
                <h3 id={`col-${c.id}`} className="h-section text-[1.6rem]">
                  {c.title}
                </h3>
                <p className="small mt-1">{c.summary}</p>
                <ul className="mt-6 flex flex-col gap-5">
                  {c.items.map((i) => (
                    <li key={i.title} className="border-t border-line pt-4">
                      <h4 className="text-base font-bold text-ink">{i.title}</h4>
                      <p className="small mt-1.5">{i.text}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <DemoCta />
    </>
  );
}
