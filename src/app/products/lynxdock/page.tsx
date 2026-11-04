import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/site/PageHero";
import Tabs from "@/components/site/Tabs";
import Shot from "@/components/site/Shot";
import Faq from "@/components/site/Faq";
import DemoCta from "@/components/site/DemoCta";
import RouteLine from "@/components/site/RouteLine";
import { shots } from "@/data/screenshots";
import { demoLink } from "@/data/siteShell";
import siteStatus from "@/data/siteStatus";

export const metadata: Metadata = {
  title: "The LynxDock app",
  description:
    "A Windows desktop workspace for text channels, voice, screen sharing and operations: rosters, assignments, a shared tactical board, logistics and the record of what happened.",
};

const tour = [
  {
    id: "communications",
    label: "Communications",
    shot: shots.comms,
    title: "Text, voice and screen sharing, beside the work",
    points: [
      "Text channels with formatting, attachments and history, and presence for everyone in the community.",
      "Voice channels and operation voice nets, with screen sharing in the same call.",
      "Communications follow team assignments: a member is told which net their unit uses and can join it muted.",
      "Roles decide who can read, post and speak where.",
    ],
  },
  {
    id: "operations",
    label: "Operations",
    shot: shots.board,
    title: "A shared tactical picture",
    points: [
      "Units, wings, objectives, routes, waypoints and zones on one board the whole operation sees.",
      "Phases, orders and alerts, with readiness that members report themselves.",
      "Logistics in context: stock by location, reservations and transfers, and requests for refuel, repair, medical, recovery and escort support.",
      "Board snapshots and replay keep the plan available for review.",
    ],
  },
  {
    id: "my-dock",
    label: "My Dock",
    shot: shots.myDock,
    title: "Each member's own view",
    points: [
      "The member's active operation, assignment and comms in one place.",
      "What needs their action now, such as confirming a ship or acknowledging an order.",
      "What puts the operation at risk: open requests, unacknowledged orders and logistics shortages.",
    ],
  },
  {
    id: "readiness",
    label: "Readiness",
    shot: shots.preflight,
    title: "Know who and what is ready",
    points: [
      "Members check in and report their operational state, location and resources.",
      "A preflight check lists blockers, warnings and suggestions before an operation goes live, and says which sources it used.",
      "Readiness is what members report. LynxDock does not read it from the game.",
    ],
  },
];

export default function ProductPage() {
  return (
    <>
      <PageHero
        eyebrow="The LynxDock app"
        title="One desktop workspace for the whole community."
        intro={
          <p>
            Text channels, voice and screen sharing sit beside the operations your community runs: rosters,
            assignments, a shared board, logistics and a record of what happened. Members use the app;
            whoever runs the community&rsquo;s server uses{" "}
            <Link href="/products/lynxdock-host/" className="text-link">
              LynxDock Host
            </Link>
            .
          </p>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={demoLink.href} data-demo-open="" className="btn btn-primary">
            Request a demo
          </a>
          <Link href="/technology/" className="btn btn-secondary">
            How it&rsquo;s built
          </Link>
        </div>
        <p className="small mt-5">
          {siteStatus.stage} · {siteStatus.platform} · Push-to-talk is foreground-only (
          <Link href="/beta/#limitations" className="text-link">
            known limitations
          </Link>
          ).
        </p>
      </PageHero>

      {/* PRODUCT TOUR: the one gallery on the site */}
      <section id="tour" aria-labelledby="tour-title" className="section">
        <div className="wrap">
          <div className="max-w-3xl">
            <p className="eyebrow">Product tour</p>
            <h2 id="tour-title" className="h-section mt-3">
              Four views of one workspace.
            </h2>
            <p className="lead mt-4">
              Real screens from an earlier development build, with simulated demonstration data. The current
              generation refines them.
            </p>
          </div>
          <div className="mt-8">
            <Tabs
              label="Product tour"
              idBase="tour"
              staticHeadings={false}
              items={tour.map((t) => ({
                id: t.id,
                label: t.label,
                panel: (
                  <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:items-start">
                    <div>
                      <h3 className="h-card text-[1.35rem]">{t.title}</h3>
                      <ul className="tick-list body mt-4">
                        {t.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    </div>
                    <Shot shot={t.shot} sizes="(min-width: 1024px) 760px, 100vw" />
                  </div>
                ),
              }))}
            />
          </div>
        </div>
      </section>

      <RouteLine variant="b" />

      {/* OVERLAY */}
      <section id="overlay" aria-labelledby="overlay-title" className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-start">
          <div>
            <p className="eyebrow">In-game companion</p>
            <h2 id="overlay-title" className="h-section mt-3">
              The overlay: your operation, without leaving the game.
            </h2>
            <p className="body mt-4">
              A small click-through window shows the operation, open requests and numbered quick actions while
              you play. It is a separate window: nothing is injected into the game and no game memory is read.
            </p>
            <ul className="tick-list body mt-5">
              <li>
                <span className="strong">Supported setups:</span> games running windowed or borderless. Windows
                draws nothing above a game in exclusive fullscreen, so there the overlay stays hidden.
              </li>
              <li>
                <span className="strong">A companion interface:</span> it shows what members and leaders enter in
                LynxDock. It does not read game telemetry.
              </li>
              <li>
                <span className="strong">Not blanket compatibility:</span> whether it suits a given game and
                display mode depends on the build and the setup.
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-6">
            <figure>
              <div className="shot relative bg-[#0b1216] p-3 sm:p-5">
                <Image
                  src={shots.overlay.src}
                  width={shots.overlay.width}
                  height={shots.overlay.height}
                  alt={shots.overlay.alt}
                  sizes="(min-width: 1024px) 640px, 100vw"
                  loading="lazy"
                  className="rounded-md"
                />
              </div>
              <figcaption className="caption">
                The compact overlay, shown at its actual proportions. {shots.overlay.caption}
              </figcaption>
            </figure>
            <Shot shot={shots.overlaySettings} sizes="(min-width: 1024px) 640px, 100vw" />
          </div>
        </div>
      </section>

      {/* TECHNOLOGY LINK */}
      <section aria-labelledby="tech-link-title" className="section-tight">
        <div className="wrap">
          <Link
            href="/technology/"
            className="card-teal group flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <span className="eyebrow">Technology &amp; capabilities</span>
              <span id="tech-link-title" className="h-card mt-2 block text-[1.35rem]">
                The engineering behind the teamwork
              </span>
              <span className="small mt-2 block">
                The desktop stack, the application server, the separate media service, and what the system does
                and does not do.
              </span>
            </span>
            <span className="arrow-link group-hover:underline">
              Read the technical overview <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="section">
        <div className="wrap-narrow">
          <h2 id="faq-title" className="h-section">
            Questions people ask
          </h2>
          <div className="mt-6">
            <Faq
              items={[
                {
                  q: "Who owns the server and the data?",
                  a: (
                    <p>
                      Your community does. The application server and its records run on infrastructure you
                      control, along with the voice and screen-sharing services. LynxDock Host helps the
                      administrator set it up and look after it; running it, backing it up and keeping it updated
                      stay the administrator&rsquo;s job.{" "}
                      <Link href="/products/lynxdock-host/" className="text-link">
                        More about Host
                      </Link>
                      .
                    </p>
                  ),
                },
                {
                  q: "Which games does LynxDock work with?",
                  a: (
                    <p>
                      Star Citizen organisations are the current product context: fleet and convoy planning,
                      ship and crew commitments, logistics and recovery. LynxDock has no game connectors: players
                      enter what is happening, and nothing is read from the game. Arma, Squad and Discord
                      connectors are proposals, not shipped integrations.
                    </p>
                  ),
                },
                {
                  q: "How do I join the beta?",
                  a: (
                    <p>
                      The beta is closed and by invitation. Request access on the{" "}
                      <Link href="/download/" className="text-link">
                        beta access page
                      </Link>
                      . If your community has already invited you, the{" "}
                      <Link href="/beta/" className="text-link">
                        tester hub
                      </Link>{" "}
                      has the installers and first steps.
                    </p>
                  ),
                },
                {
                  q: "Does push-to-talk work while I'm in a game?",
                  a: (
                    <>
                      <p>{siteStatus.pushToTalk.statement}</p>
                      <p className="mt-3">{siteStatus.pushToTalk.qualifier}</p>
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      <DemoCta />
    </>
  );
}
