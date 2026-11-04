import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import EnquiryForm from "@/components/site/EnquiryForm";
import { githubOrg, supportEmail } from "@/data/siteShell";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Help for invited LynxDock testers, and the right place for demo requests, beta access and business enquiries.",
};

const SECURITY_ADVISORY = "https://github.com/LynxDock-LLC/lynxdock-website/security/advisories/new";

const entries = [
  {
    title: "Request a demo",
    text: "A walkthrough with demonstration data, for communities, partners and anyone evaluating LynxDock.",
    href: "#request-demo",
    action: "Demo request form",
  },
  {
    title: "Beta access",
    text: "Not invited yet? Ask to join the closed Windows beta.",
    href: "/download/",
    action: "Request beta access",
  },
  {
    title: "Business enquiries",
    text: "Community pilots, partnerships, investment and acquisition.",
    href: "/company/#contact",
    action: "Business enquiry form",
  },
  {
    title: "Help for testers",
    text: "Already testing? Report a problem, or find installers and first steps.",
    href: "#testers",
    action: "Tester support",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Get help, or get in touch."
        intro={<p>Choose the path that fits what you need.</p>}
      />

      <section aria-labelledby="paths-title" className="section-tight">
        <div className="wrap">
          <h2 id="paths-title" className="sr-only">
            Ways to get in touch
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {entries.map((e) => (
              <li key={e.title} className="card flex flex-col">
                <h3 className="h-card">{e.title}</h3>
                <p className="small mt-2 flex-1">{e.text}</p>
                {e.href.startsWith("#") ? (
                  <a href={e.href} className="arrow-link mt-3 text-[0.9375rem]">
                    {e.action} <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <Link href={e.href} className="arrow-link mt-3 text-[0.9375rem]">
                    {e.action} <span aria-hidden="true">→</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="testers" aria-labelledby="testers-title" className="section">
        <div className="wrap grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="eyebrow">For invited testers</p>
            <h2 id="testers-title" className="h-section mt-3">
              Report a problem
            </h2>
            <ol className="num-list body mt-5">
              <li>
                In the app, open <span className="strong">Settings → About → Report a problem</span>.
              </li>
              <li>
                Choose <span className="strong">Copy version &amp; system info</span> and paste it into your report.
              </li>
              <li>
                Say what you were doing, what you expected, what happened and when, and how to make it happen
                again.
              </li>
              <li>
                Send it to{" "}
                <a href={`mailto:${supportEmail}`} className="text-link">
                  {supportEmail}
                </a>{" "}
                or open an issue on{" "}
                <a href={githubOrg} target="_blank" rel="noopener noreferrer" className="text-link">
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </li>
            </ol>
            <p className="small mt-4">We never ask for your password.</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="card-2">
              <h3 className="h-card">Installers and first steps</h3>
              <p className="small mt-2">
                The{" "}
                <Link href="/beta/" className="text-link">
                  tester hub
                </Link>{" "}
                has the installers your community uses, their SHA-256 values, known limitations and the{" "}
                <Link href="/docs/getting-started/" className="text-link">
                  quickstart
                </Link>
                .
              </p>
            </div>
            <div className="card-2">
              <h3 className="h-card">Security issues</h3>
              <p className="small mt-2">
                Please report a suspected vulnerability privately through a{" "}
                <a href={SECURITY_ADVISORY} target="_blank" rel="noopener noreferrer" className="text-link">
                  GitHub security advisory<span className="sr-only"> (opens in a new tab)</span>
                </a>
                , not in a public issue.
              </p>
            </div>
            <div className="card-2">
              <h3 className="h-card">Follow development</h3>
              <p className="small mt-2">
                <Link href="/blog/" className="text-link">
                  Updates
                </Link>
                ,{" "}
                <Link href="/roadmap/" className="text-link">
                  product direction
                </Link>{" "}
                and{" "}
                <Link href="/releases/" className="text-link">
                  release status
                </Link>
                , or the{" "}
                <a href="/rss.xml" className="text-link">
                  RSS feed
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="request-demo" aria-labelledby="demo-title" className="section section-band">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <p className="eyebrow">Request a demo</p>
            <h2 id="demo-title" className="h-section mt-3">
              See LynxDock with your community in mind.
            </h2>
            <p className="body mt-4">
              We&rsquo;ll walk you through the workspace with demonstration data, and talk through what running your
              own server involves.
            </p>
          </div>
          <div className="card">
            <EnquiryForm kind="demo" />
          </div>
        </div>
      </section>
    </>
  );
}
