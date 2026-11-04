import Link from "next/link";
import HeroCallouts, { type Callout } from "@/components/site/HeroCallouts";
import Tabs from "@/components/site/Tabs";
import Shot from "@/components/site/Shot";
import RouteLine from "@/components/site/RouteLine";
import HostingIllustration from "@/components/site/HostingIllustration";
import TechFoundation from "@/components/site/TechFoundation";
import DemoCta from "@/components/site/DemoCta";
import { shots } from "@/data/screenshots";
import { demoLink } from "@/data/siteShell";
import siteStatus from "@/data/siteStatus";

const callouts: Callout[] = [
  {
    title: "Assigned comms",
    text: "Each member is told which voice net their assignment uses and can join it muted in one step, so nobody has to ask where to be.",
    x: 61.5,
    y: 10,
  },
  {
    title: "One shared board",
    text: "Units, wings, zones, routes and waypoints on a board the whole operation sees, with the current phase and how many units report ready.",
    x: 46,
    y: 47,
  },
  {
    title: "Objectives and progress",
    text: "Objectives are grouped by unit with their status (complete, active or pending), so leaders can see what is left at a glance.",
    x: 84.5,
    y: 57,
  },
];

const pillars = [
  {
    title: "Stay connected.",
    sub: "Text, voice and shared context.",
    text: "Channels, voice nets and screen sharing sit beside the work they are about.",
    href: "/products/lynxdock/#tour",
    link: "The product tour",
  },
  {
    title: "Coordinate the operation.",
    sub: "Rosters, assignments, routes, orders and review.",
    text: "One record carries an operation from the first draft to the debrief.",
    href: "/#how-it-works",
    link: "How it works",
  },
  {
    title: "Run your own space.",
    sub: "Community server and Host administrator companion.",
    text: "Your community's server runs where you choose, and Host helps the person who looks after it.",
    href: "/products/lynxdock-host/",
    link: "LynxDock Host",
  },
];

const steps = [
  {
    id: "plan",
    label: "Plan",
    shot: shots.boardPlanning,
    title: "Plan the operation",
    text: "Draft objectives, routes, waypoints and zones on a shared board, decide the phases, and place the units that will carry them out.",
  },
  {
    id: "organise",
    label: "Organise",
    shot: shots.roster,
    title: "Organise the people",
    text: "Members RSVP, check in and report their unit, status, location and readiness. Leaders see the roster grouped by unit, and who is ready.",
  },
  {
    id: "coordinate",
    label: "Coordinate",
    shot: shots.comms,
    title: "Coordinate as it happens",
    text: "Operation channels and voice nets follow the assignments. Orders, alerts and support requests stay attached to the operation they belong to.",
  },
  {
    id: "debrief",
    label: "Debrief",
    shot: shots.debrief,
    title: "Debrief and learn",
    text: "Compare the plan with what members reported: attendance, orders and acknowledgments, resolved requests and the operation's timeline.",
  },
];

export default function HomePage() {
  const s = siteStatus;
  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_15%_0%,rgba(92,225,223,0.1),transparent_65%)]"
        />
        <div className="wrap relative pb-10 pt-12 sm:pt-16 lg:pt-20">
          <div className="enter max-w-[52rem]">
            <p className="eyebrow">Built for communities that play together.</p>
            <h1 id="hero-title" className="h-display mt-4">
              Voice, chat and operations. Your server.
            </h1>
            <p className="lead mt-6 max-w-2xl">
              Keep the conversation and the plan in one place. LynxDock brings your community together in a
              desktop workspace, on a server you control.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={demoLink.href} data-demo-open="" className="btn btn-primary">
                Request a demo
              </a>
              <Link href="/products/lynxdock/" className="btn btn-secondary">
                Explore the product
              </Link>
            </div>
            <p className="small mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="badge badge-accent">
                <span className="dot" aria-hidden="true" />
                Windows {s.stage.toLowerCase()}
              </span>
              <span>
                For invited testers. {s.nextRelease.statement}{" "}
                <Link href="/download/" className="text-link">
                  Request beta access
                </Link>
              </span>
            </p>
          </div>
          <div className="enter-delay mt-12">
            <HeroCallouts shot={shots.board} callouts={callouts} />
          </div>
        </div>
      </section>

      <RouteLine variant="a" className="my-2" />

      {/* THREE PILLARS */}
      <section aria-labelledby="pillars-title" className="section">
        <div className="wrap">
          <h2 id="pillars-title" className="sr-only">
            What LynxDock brings together
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.title} className="card flex flex-col">
                <h3 className="h-card text-[1.3rem]">{p.title}</h3>
                <p className="mt-1 font-semibold text-accent">{p.sub}</p>
                <p className="small mt-3 flex-1">{p.text}</p>
                <Link href={p.href} className="arrow-link mt-3 text-[0.9375rem]">
                  {p.link} <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* OPERATION WALKTHROUGH */}
      <section id="how-it-works" aria-labelledby="how-title" className="section section-band">
        <div className="wrap">
          <div className="max-w-3xl">
            <p className="eyebrow">How it works</p>
            <h2 id="how-title" className="h-section mt-3">
              From the first plan to the debrief, in one place.
            </h2>
            <p className="lead mt-4">
              Follow one operation through four steps. Choose a step to see it in the app.
            </p>
          </div>
          <div className="mt-8">
            <Tabs
              label="Operation walkthrough"
              idBase="walkthrough"
              staticHeadings={false}
              items={steps.map((st, i) => ({
                id: st.id,
                label: `${i + 1}. ${st.label}`,
                panel: (
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] lg:items-start">
                    <div>
                      <h3 className="h-card text-[1.35rem]">{st.title}</h3>
                      <p className="body mt-3">{st.text}</p>
                    </div>
                    <Shot shot={st.shot} sizes="(min-width: 1024px) 760px, 100vw" />
                  </div>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      {/* HOSTING ILLUSTRATION */}
      <section aria-labelledby="hosting-title" className="section">
        <div className="wrap">
          <div className="max-w-3xl">
            <p className="eyebrow">Hosting</p>
            <h2 id="hosting-title" className="h-section mt-3">
              Members use the app. The administrator uses Host.
            </h2>
            <p className="lead mt-4">
              Your community&rsquo;s server is yours to run. Members connect to it with the LynxDock app; whoever
              looks after it manages it with LynxDock Host.
            </p>
          </div>
          <div className="mt-10">
            <HostingIllustration />
          </div>
          <Link href="/products/lynxdock-host/" className="arrow-link mt-4">
            What running a server involves <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <RouteLine variant="b" />

      <TechFoundation />

      {/* BETA STATUS */}
      <section aria-labelledby="beta-status-title" className="section section-band">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div>
              <p className="eyebrow">Beta status</p>
              <h2 id="beta-status-title" className="h-section mt-3">
                A closed beta, on Windows, by invitation.
              </h2>
              <p className="body mt-4">
                LynxDock is tested by invited communities that run their own servers.{" "}
                {s.nextRelease.statement}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link href="/download/" className="btn btn-secondary">
                  Request beta access
                </Link>
                <Link href="/releases/" className="btn btn-quiet">
                  Release status <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <dl className="kv">
              <div>
                <dt>Current stage</dt>
                <dd>
                  {s.stage}, {s.audience.toLowerCase()}
                </dd>
              </div>
              <div>
                <dt>Platform</dt>
                <dd>{s.platform}</dd>
              </div>
              <div>
                <dt>Hosting</dt>
                <dd>Run by each community, on infrastructure it controls</dd>
              </div>
              <div>
                <dt>Next approved tester release</dt>
                <dd>In qualification; not yet available for distribution</dd>
              </div>
              <div>
                <dt>Push-to-talk</dt>
                <dd>Foreground-only: the LynxDock window must have focus</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <DemoCta />
    </>
  );
}
