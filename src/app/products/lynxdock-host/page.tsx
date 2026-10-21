import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import Shot from "@/components/site/Shot";
import HostingIllustration from "@/components/site/HostingIllustration";
import DemoCta from "@/components/site/DemoCta";
import { shots } from "@/data/screenshots";
import { demoLink } from "@/data/siteShell";

export const metadata: Metadata = {
  title: "LynxDock Host",
  description:
    "LynxDock Host is the Windows companion for the person who runs a community's LynxDock server: guided setup, start and stop, diagnostics, readiness, access and backups.",
};

const helps = [
  {
    title: "Guided setup",
    text: "A step-by-step first run: the server's purpose, its name and administrator, who may register, the call and screen-share relay, then save and start.",
  },
  {
    title: "Start, stop and restart",
    text: "One place to run the server and the voice services Host set up, and to restart them after a change.",
  },
  {
    title: "Diagnostics",
    text: "Health checks, live logs, the addresses to share, and connection help for the network problems home hosting runs into.",
  },
  {
    title: "Readiness",
    text: "A startup checklist that says what is configured and what still needs attention before members join.",
  },
  {
    title: "Access",
    text: "Invitations, member and role administration, and registration that can stay invite-only.",
  },
  {
    title: "Backups",
    text: "Backup and recovery surfaces for the server's data, so the administrator has a way back after a problem.",
  },
];

const stays = [
  "Keeping the PC or server running, and deciding how it is exposed to the internet",
  "Service credentials, including the voice service's keys",
  "Installing updates, and testing a restore now and then",
  "Capacity: bandwidth and hardware for the community's voice and screen sharing",
  "Moderation and who is given access",
];

export default function HostPage() {
  return (
    <>
      <PageHero
        eyebrow="LynxDock Host"
        title="Run your community's server, with a companion that helps."
        intro={
          <p>
            Host is the Windows app for whoever looks after the community server. Members never need it: they
            use the{" "}
            <Link href="/products/lynxdock/" className="text-link">
              LynxDock app
            </Link>{" "}
            and connect to the server directly.
          </p>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={demoLink.href} data-demo-open="" className="btn btn-primary">
            Request a demo
          </a>
          <Link href="/technology/#hosting" className="btn btn-secondary">
            The operating model
          </Link>
        </div>
      </PageHero>

      <section aria-labelledby="roles-title" className="section">
        <div className="wrap">
          <div className="max-w-3xl">
            <p className="eyebrow">Two roles, two apps</p>
            <h2 id="roles-title" className="h-section mt-3">
              Members use App. Administrators use Host.
            </h2>
          </div>
          <div className="mt-10">
            <HostingIllustration />
          </div>
        </div>
      </section>

      <section aria-labelledby="helps-title" className="section section-band">
        <div className="wrap">
          <div className="max-w-3xl">
            <p className="eyebrow">What Host helps with</p>
            <h2 id="helps-title" className="h-section mt-3">
              The routine parts of running a server, in one place.
            </h2>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {helps.map((h) => (
              <li key={h.title} className="card">
                <h3 className="h-card">{h.title}</h3>
                <p className="small mt-2">{h.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:items-start">
            <Shot shot={shots.hostSetup} sizes="(min-width: 1024px) 720px, 100vw" />
            <Shot shot={shots.hostDashboard} sizes="(min-width: 1024px) 420px, 100vw" />
          </div>
        </div>
      </section>

      <section aria-labelledby="stays-title" className="section">
        <div className="wrap grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="eyebrow">What stays with the administrator</p>
            <h2 id="stays-title" className="h-section mt-3">
              Host helps. It doesn&rsquo;t take over the job.
            </h2>
            <p className="body mt-4">
              Running a community server is still administration. Host makes the routine steps clearer; the
              person running the server remains responsible for it.
            </p>
            <ul className="tick-list body mt-5">
              {stays.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div className="card-2">
            <h3 className="h-card">Platform</h3>
            <p className="small mt-2">
              LynxDock Host is a Windows (x64) app in this beta, and it runs the community server on the same PC.
              That Windows requirement belongs to Host. The application server it manages is a separate Rust
              service, which this beta packages inside Host along with the voice services.
            </p>
            <h3 className="h-card mt-6">For invited administrators</h3>
            <p className="small mt-2">
              Installers, checksums and first steps are in the{" "}
              <Link href="/beta/" className="text-link">
                tester hub
              </Link>
              . How the server, voice and relay fit together is on the{" "}
              <Link href="/technology/#architecture" className="text-link">
                technology page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <DemoCta
        title="Thinking about running LynxDock for your community?"
        text="We can walk you through setup and what the administrator's role involves, using demonstration data."
      />
    </>
  );
}
