import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import EnquiryForm from "@/components/site/EnquiryForm";
import siteStatus from "@/data/siteStatus";

// For visitors who are NOT invited. There is deliberately no installer on this page: the beta is closed, and
// the installers an invited tester needs are on /beta/ with their checksums and notes.
export const metadata: Metadata = {
  title: "Beta access",
  description:
    "LynxDock is in a closed Windows beta for invited communities. Request access here; there is no public installer.",
};

export default function DownloadPage() {
  const s = siteStatus;
  return (
    <>
      <PageHero
        eyebrow="Beta access"
        title="Request access to the LynxDock beta."
        intro={
          <p>
            LynxDock is in a closed beta on Windows. Communities join by invitation, so there is no public installer
            to download. Tell us about your community below.
          </p>
        }
      />

      <section aria-labelledby="request-title" className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
          <div className="flex flex-col gap-8">
            <div>
              <h2 id="how-title" className="h-section text-[clamp(1.45rem,2.4vw,1.9rem)]">
                How the beta works
              </h2>
              <ol className="num-list body mt-5">
                <li>
                  You request access with the form on this page. {siteStatus.eligibility.statement} You confirm it
                  yourself by ticking a box: LynxDock does not verify age, and nothing in the apps, the installers or
                  community servers checks it.
                </li>
                <li>
                  Testers join a <span className="strong">community server</span> through an invitation from whoever
                  runs it. That can be your own administrator, using{" "}
                  <Link href="/products/lynxdock-host/" className="text-link">
                    LynxDock Host
                  </Link>
                  .
                </li>
                <li>
                  Invited testers get the installers, checksums and first steps from the{" "}
                  <Link href="/beta/" className="text-link">
                    tester hub
                  </Link>
                  .
                </li>
              </ol>
            </div>

            <div className="card-2">
              <h2 className="h-card">Where the beta stands</h2>
              <dl className="kv mt-4">
                <div>
                  <dt>Stage</dt>
                  <dd>
                    {s.stage}, {s.audience.toLowerCase()}
                  </dd>
                </div>
                <div>
                  <dt>Platform</dt>
                  <dd>{s.platform}</dd>
                </div>
                <div>
                  <dt>Who can test</dt>
                  <dd>18 or older (self-declared; not verified)</dd>
                </div>
                <div>
                  <dt>Next tester release</dt>
                  <dd>In qualification; not yet available for distribution</dd>
                </div>
              </dl>
              <p className="small mt-4">
                Before you ask: push-to-talk works only while the LynxDock window has focus, the apps are Windows
                only, and your community runs its own server.{" "}
                <Link href="/beta/#limitations" className="text-link">
                  All known limitations
                </Link>
                .
              </p>
            </div>

            <div className="card-quiet">
              <h2 className="h-card">Already invited?</h2>
              <p className="small mt-2">
                Go to the tester hub for the installers your community uses, their SHA-256 values and the first
                steps.
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link href="/beta/" className="btn btn-secondary btn-sm">
                  Open the tester hub
                </Link>
                <Link href="/docs/getting-started/" className="btn btn-quiet btn-sm">
                  Quickstart <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 id="request-title" className="h-card text-[1.35rem]">
              Request beta access
            </h2>
            <p className="small mt-2">
              This is for communities and testers. For a guided walkthrough, request a demo; for partnerships or
              investment, use{" "}
              <Link href="/company/#contact" className="text-link">
                business enquiries
              </Link>
              .
            </p>
            <div className="mt-5">
              <EnquiryForm kind="beta" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
