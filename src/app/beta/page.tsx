import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import {
  LimitationsList,
  NextReleaseCard,
  ReleaseArtifacts,
  ReleaseIdentity,
  fmtDate,
} from "@/components/site/ReleaseBlocks";
import siteStatus, { betaLicence, formatBytes, participationDocument } from "@/data/siteStatus";
import { githubOrg, supportEmail } from "@/data/siteShell";
import { betaDownloads, betaAuthenticode, betaSigningPublisher } from "@/data/betaDownloads";
import { v6Candidate } from "@/data/v6Candidate";
import { closedBetaBuild, closedBetaServer, closedBetaResiduals, supersededInstallers } from "@/data/closedBeta";
import EnquiryForm from "@/components/site/EnquiryForm";
import OwnerField from "@/components/site/OwnerField";
import Unconfirmed from "@/components/site/Unconfirmed";

// The invited-tester hub. noindex/nofollow, absent from the sitemap and from the primary navigation; reached from
// /download/, the quickstart, /releases/ and /support/. It is an unlisted page, not an access-controlled one.
//
// Owner decision, 2026-10-21: the current state is the next tester release, in qualification and not yet available
// for distribution. Releases that were actually published stay in a clearly dated archive; only 0.2.6 keeps its
// live, verified download links there. Nothing unpublished is mentioned.
export const metadata: Metadata = {
  title: "Tester hub",
  description: "Release status, first steps, known limitations and the dated release archive for invited LynxDock beta testers.",
  robots: { index: false, follow: false },
};

/** 0.2.6's own known issues, unchanged from its release notes on this page. */
const notes026: { title: string; text: string }[] = [
  {
    title: "Share screen can stop responding after you stop a share and share again",
    text: "If Share screen stops responding after you stopped a share, leave the voice channel and join again (or restart LynxDock), then report the time it happened.",
  },
  {
    title: "Brief audio dropouts at a listener while others talk",
    text: "If you hear a short dropout while others talk, note the time and report it.",
  },
  {
    title: "Push-to-talk: the first syllable can arrive slightly late or quieter",
    text: "If the first syllable after you press to talk sounds clipped or quiet, note the time and report it. Nothing is transmitted while the key is released.",
  },
  {
    title: "Push-to-talk stops when LynxDock's window loses focus",
    text: "That is deliberate, so a key can never get stuck. In one of our test runs the microphone also closed early while the key was still held, and we have not found why. If transmitting stops while you are still holding the key, note the time and report it.",
  },
];

function ArchiveEntry({
  id,
  date,
  title,
  standing,
  round,
  version,
  open = false,
  children,
}: {
  id?: string;
  date: string;
  title: string;
  standing: string;
  round: "archive-published" | "superseded";
  version: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details id={id} className="faq" data-beta-round={round} data-beta-version={version} open={open}>
      <summary>
        <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
          <time dateTime={date} className="mono text-[0.8125rem] font-normal text-muted">
            {date}
          </time>
          <span>{title}</span>
          <span className="badge w-fit text-[0.75rem] text-muted">{standing}</span>
        </span>
      </summary>
      <div className="flex flex-col gap-5 pb-8">{children}</div>
    </details>
  );
}

function HashRows({ rows }: { rows: { name: string; detail: string; sha256: string }[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {rows.map((r) => (
        <li key={r.name} className="card-quiet py-3">
          <p className="text-[0.875rem] font-semibold text-ink">
            <span className="mono break-all">{r.name}</span> <span className="font-normal text-muted">· {r.detail}</span>
          </p>
          <p className="mono mt-1 break-all text-[0.78rem] text-[#c3ced3]">{r.sha256}</p>
        </li>
      ))}
    </ul>
  );
}

// The approved licence text, or an [OWNER] marker until counsel and the owner have approved it (betaLicence.textUrl).
function LicenceTextLink() {
  return betaLicence.textUrl ? (
    <a href={betaLicence.textUrl} className="text-link">
      read the licence text
    </a>
  ) : (
    <OwnerField>link to the approved licence text, once counsel and the owner have approved it</OwnerField>
  );
}

// The document that sets the beta participation requirements, or an [OWNER] marker until counsel names it
// (participationDocument; licence draft r5 field PARTICIPATION_DOCUMENT).
function ParticipationDocumentLink() {
  const d = participationDocument;
  if (d.title && d.url) {
    return (
      <a href={d.url} className="text-link">
        {d.title}
      </a>
    );
  }
  if (d.title) return <>{d.title}</>;
  return <OwnerField>the document that sets the beta participation requirements, and its link: counsel&rsquo;s choice</OwnerField>;
}

export default function BetaPage() {
  const s = siteStatus;
  const r026 = s.earlierPublished;

  return (
    <>
      <PageHero
        eyebrow="Tester hub · for invited testers"
        title="LynxDock beta: tester hub"
        intro={
          <p>
            Release status, first steps and known limitations for people already invited to a LynxDock test
            community. Not invited yet?{" "}
            <Link href="/download/" className="text-link">
              Request beta access
            </Link>
            .
          </p>
        }
      >
        <nav aria-label="On this page">
          <ul className="flex flex-wrap gap-2">
            {[
              ["#status", "Release status"],
              ["#requirements", "Beta requirements"],
              ["#which", "App or Host"],
              ["#first-connection", "First connection"],
              ["#limitations", "Known limitations"],
              ["#report", "Report a problem"],
              ["#archive", "Release archive"],
            ].map(([href, label]) => (
              <li key={href}>
                <a href={href} className="btn btn-secondary btn-sm">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* RELEASE STATUS: the current state is the next release, not yet available */}
      <section id="status" aria-labelledby="status-title" className="section" data-beta-round="next">
        <div className="wrap">
          <h2 id="status-title" className="h-section">
            Release status
          </h2>
          <p className="small mt-2">As of {s.asOfLabel}.</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
            <NextReleaseCard headingLevel={3} idBase="beta-next" />
            <div className="card-quiet">
              <h3 className="h-card">Earlier releases</h3>
              <p className="small mt-2">
                Releases that were published to testers are kept in the dated{" "}
                <a href="#archive" className="text-link">
                  release archive
                </a>{" "}
                below, with their SHA-256 values, so an install can be identified. The most recent,{" "}
                LynxDock {r026.version} ({fmtDate(r026.date)}), still has its verified download links there. Ask the
                person running your server which release your community uses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BETA REQUIREMENTS: for everyone in the beta (owner decision 2026-10-26). Operators can send people here.
          Age is self-declared and never verified; nothing in the apps, installers or servers checks it. */}
      <section id="requirements" aria-labelledby="requirements-title" className="section section-band">
        <div className="wrap">
          <div className="max-w-3xl">
            <h2 id="requirements-title" className="h-section">
              Beta requirements
            </h2>
            <p className="lead mt-3">
              These apply to everyone taking part in the LynxDock beta. A community&rsquo;s administrator may send
              you here before inviting you.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="card">
              <h3 className="h-card">What the beta is</h3>
              <p className="small mt-2">
                A closed test of pre-release software. Expect rough edges and bugs, and report what you find. Please
                don&rsquo;t redistribute builds or post links to them publicly. Feedback you send may be used to
                improve LynxDock.
              </p>
            </div>
            <div id="eligibility" className="card-notice">
              <h3 className="text-lg font-bold text-[#ecd6a8]">{s.eligibility.heading}</h3>
              <p className="small mt-2">
                {s.eligibility.statement} {s.eligibility.scope} {s.eligibility.selfDeclaration}
              </p>
            </div>
            <div id="licence" className="card">
              <h3 className="h-card">The beta licence and the participation requirements</h3>
              <p className="small mt-2">
                The next release&rsquo;s app and Host are used under the {betaLicence.name} ({betaLicence.id}), which
                you accept in the installer and when the app or Host first starts: <LicenceTextLink />.
              </p>
              <p className="small mt-2">
                Members who join with the older 0.2.6 app don&rsquo;t accept that licence. They acknowledge the beta
                participation requirements instead, set out in <ParticipationDocumentLink />. That acknowledgement covers
                taking part in the beta only: it does not license, replace or change the terms of the 0.2.6 app.
              </p>
            </div>
            <div className="card">
              <h3 className="h-card">How you confirm</h3>
              <ul className="tick-list small mt-2">
                <li>{s.eligibility.routes.site}</li>
                <li>{s.eligibility.routes.nextRelease}</li>
                <li>{s.eligibility.routes.olderApp}</li>
              </ul>
            </div>
          </div>

          {/* OLDER-APP ACKNOWLEDGEMENT. Licence draft r5 sections 12, 13 and 17: members on the older 0.2.6 app
              acknowledge the beta participation requirements (including 18+) here, before the operator invites them.
              They do not accept the licence, and the acknowledgement does not change the terms of their app. No
              licence text is quoted. Where a submission ends up is marked UNCONFIRMED until there is evidence. */}
          <div id="confirm" className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div>
              <h3 className="h-card text-[1.3rem]">
                Joining with the older 0.2.6 app? Acknowledge the requirements here before you are invited
              </h3>
              <p className="body mt-3">
                During the move to the next release, the 0.2.6 app can still connect to a community server, but it
                shows no licence screen. If you will join with it, you acknowledge the beta participation requirements
                here instead. Your acknowledgement covers taking part in the beta only: it does not license, replace or
                change the terms of your 0.2.6 app.
              </p>
              <ol className="num-list body mt-5">
                <li>
                  <span className="strong">Who:</span> everyone who will join a beta community with the 0.2.6 app,
                  however you were invited: directly by a community&rsquo;s administrator, or after requesting access on
                  this site.
                </li>
                <li>
                  <span className="strong">When:</span> before the administrator invites you. They may send you here
                  first.
                </li>
                <li>
                  <span className="strong">Read:</span> the beta requirements on this page and the document that sets
                  them: <ParticipationDocumentLink />.
                </li>
                <li>
                  <span className="strong">Acknowledge:</span> tick the box declaring that you are 18 or older, an
                  affirmative self-declaration that LynxDock does not independently verify, and the box acknowledging
                  the participation requirements. The form sends both, with your name, email address and community, to
                  the site&rsquo;s form service, Formspree.
                </li>
                <li>
                  <span className="strong">Then:</span> tell the administrator who is inviting you that you have
                  acknowledged them. The form sends nothing to your community&rsquo;s server or its administrator.{" "}
                  <Unconfirmed>that acknowledgements sent through the form service reach the LynxDock team</Unconfirmed>
                </li>
              </ol>
              <p className="small mt-5">
                <span className="strong">If you run a community server:</span> before you invite a member who will use
                the 0.2.6 app, send them to this section and wait until they tell you they have acknowledged the
                requirements. The requirement applies to you as well: the next release&rsquo;s Host asks you to accept
                the beta licence, ticking the 18+ declaration, before it starts services, and your acceptance covers
                only you, never a member.
              </p>
              <p className="small mt-3">
                <span className="strong">On the next release instead:</span> members who install the next release,
                once it is available, don&rsquo;t use this form. Its installer and the app ask them to accept the beta
                licence, ticking the same 18+ declaration, before the app signs in. The app won&rsquo;t record the
                acceptance without the declaration, and keeps that record on their own device.
              </p>
            </div>
            <div className="card">
              <EnquiryForm kind="acknowledgement" />
            </div>
          </div>
        </div>
      </section>

      {/* APP OR HOST */}
      <section id="which" aria-labelledby="which-title" className="section-tight">
        <div className="wrap">
          <h2 id="which-title" className="h-section">
            Which one do you need?
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="card">
              <p className="eyebrow">Every tester</p>
              <h3 className="h-card mt-2">The LynxDock app</h3>
              <p className="small mt-2">
                The desktop app members use for text, voice, screen sharing and operations. This is all most
                testers install.
              </p>
            </div>
            <div className="card">
              <p className="eyebrow">Only the server&rsquo;s administrator</p>
              <h3 className="h-card mt-2">LynxDock Host</h3>
              <p className="small mt-2">
                For the person who runs the community server. The Host installer includes the server, and Host sets
                up the voice services when the administrator turns voice on. Members do not install it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FIRST CONNECTION */}
      <section id="first-connection" aria-labelledby="first-title" className="section section-band">
        <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-start">
          <div>
            <h2 id="first-title" className="h-section">
              Your first connection
            </h2>
            <ol className="num-list body mt-6">
              <li>
                Ask the person who runs your community&rsquo;s server which release it uses, then install the
                matching LynxDock app. Check the file&rsquo;s SHA-256 against the{" "}
                <a href="#archive" className="text-link">
                  release archive
                </a>{" "}
                before you run it.
              </li>
              <li>
                Get the <span className="strong">server address</span> and an{" "}
                <span className="strong">invite code</span> from the same person.
              </li>
              <li>Open LynxDock, enter the address and the invite code, and create your account.</li>
              <li>
                Check your microphone and speaker in the voice controls, and set a push-to-talk key in Settings if
                your community uses push-to-talk.
              </li>
              <li>Join a voice channel and check that someone can hear you before an operation starts.</li>
            </ol>
            <Link href="/docs/getting-started/" className="arrow-link mt-4">
              The full quickstart <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="card-notice">
            <h3 className="text-base font-bold text-[#ecd6a8]">{s.pushToTalk.heading}</h3>
            <p className="small mt-2">{s.pushToTalk.statement}</p>
            <p className="small mt-2">{s.pushToTalk.qualifier}</p>
          </div>
        </div>
      </section>

      {/* KNOWN LIMITATIONS */}
      <section id="limitations" aria-labelledby="limitations-title" className="section">
        <div className="wrap">
          <h2 id="limitations-title" className="h-section">
            Known limitations
          </h2>
          <p className="body mt-3 max-w-3xl">
            These apply to the beta as a whole. Each release in the archive also lists its own known issues.
          </p>
          <div className="mt-6">
            <LimitationsList />
          </div>
        </div>
      </section>

      {/* REPORT A PROBLEM */}
      <section id="report" aria-labelledby="report-title" className="section-tight">
        <div className="wrap">
          <div className="card grid gap-6 lg:grid-cols-2">
            <div>
              <h2 id="report-title" className="h-section text-[clamp(1.4rem,2.4vw,1.8rem)]">
                Report a problem
              </h2>
              <p className="body mt-3">
                In the app, open <span className="strong">Settings → About → Report a problem</span>, choose{" "}
                <span className="strong">Copy version &amp; system info</span>, and paste it into your report.
                Send it to{" "}
                <a href={`mailto:${supportEmail}`} className="text-link">
                  {supportEmail}
                </a>{" "}
                or open an issue on{" "}
                <a href={githubOrg} target="_blank" rel="noopener noreferrer" className="text-link">
                  GitHub<span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </p>
              <p className="small mt-3">
                We never ask for your password. Administrators can attach a support bundle from Host; it is scrubbed
                of invite codes, voice secrets and session tokens before it leaves the machine.
              </p>
            </div>
            <div>
              <p className="small strong">A useful report includes</p>
              <ul className="tick-list small mt-3">
                <li>What you were doing, and what you expected</li>
                <li>What actually happened, with the time</li>
                <li>Steps to reproduce it</li>
                <li>The copied version and system info</li>
                <li>A screenshot, if it helps</li>
              </ul>
              <p className="small mt-4">
                Please don&rsquo;t redistribute builds or post this page&rsquo;s link publicly. See{" "}
                <Link href="/privacy/" className="text-link">
                  Privacy
                </Link>{" "}
                and{" "}
                <Link href="/terms/" className="text-link">
                  Terms
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RELEASE ARCHIVE: dated, newest first. Only 0.2.6 still has download links. */}
      <section id="archive" aria-labelledby="archive-title" className="section section-band">
        <div className="wrap">
          <h2 id="archive-title" className="h-section">
            Release archive
          </h2>
          <p className="body mt-3 max-w-3xl">
            Releases that were published to testers, newest first. None of them is the next release.{" "}
            {r026.version} keeps its verified download links; the older rounds are listed for identification only,
            so ask the person running your server if you need one of their files.
          </p>
          <div className="mt-6 border-b border-line">
            <ArchiveEntry
              id="release-0-2-6"
              date={r026.date}
              title={`LynxDock ${r026.version} (${r026.tag})`}
              standing="Earlier release · still downloadable"
              round="archive-published"
              version={r026.version}
              open
            >
              <p className="body max-w-3xl">
                {r026.summary} Published here on {fmtDate(r026.date)}.
              </p>
              {/* Unchanged from this release's original card: what its qualification did and did not cover. */}
              <p className="card-notice small max-w-3xl">
                <span className="strong text-[#ecd6a8]">What has and has not been checked.</span> These signed
                installers passed the required pre-release qualification: installing the .exe and the .msi on clean
                Windows machines, first launch, signing in and a restart; upgrading over the previous round&rsquo;s
                app installers; and installing, upgrading and uninstalling the Host on our test PC.{" "}
                <span className="strong">
                  The two-PC rehearsal and the final eight-hour acceptance run have not been carried out yet.
                </span>{" "}
                This is a closed-beta build, not a final release, and it has known, unresolved issues, listed below.
              </p>
              <div className="grid gap-6">
                <ReleaseArtifacts r={r026} caption={`LynxDock ${r026.version} installers`} />
                <ReleaseIdentity r={r026} />
              </div>
              <p className="small">
                To check a download on Windows, run{" "}
                <code className="mono rounded border border-line bg-[#0c1317] px-1.5 py-0.5 text-[0.8125rem] text-ink">
                  Get-FileHash .\FILE -Algorithm SHA256
                </code>{" "}
                and compare it with the value above. When Windows asks, the publisher must read{" "}
                <span className="strong">{r026.publisher}</span>.
              </p>
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="card-2">
                  <h3 className="h-card">Compatibility</h3>
                  <ul className="tick-list small mt-3">
                    <li>
                      64-bit Windows. This release&rsquo;s record does not state a minimum Windows version, so if you
                      test on Windows 10, say so in your reports. The .exe installs per user without administrator
                      rights; the .msi is for machine-wide or managed installs.
                    </li>
                    <li>Ask the person running your server which release it uses, and install the matching app.</li>
                    <li>
                      Edge may say a new file &ldquo;isn&rsquo;t commonly downloaded&rdquo;; the way through is
                      Downloads → More actions → Keep. If Windows warns when you run it, check the SHA-256 and the
                      publisher, then choose More info → Run anyway.
                    </li>
                  </ul>
                </div>
                <div className="card-2">
                  <h3 className="h-card">Upgrading and rolling back</h3>
                  <ul className="tick-list small mt-3">
                    <li>
                      Install over the previous app with the same kind of installer you used before (.exe over .exe,
                      .msi over .msi). Your profile and settings are kept; if it asks you to sign in again, use the
                      account you already have.
                    </li>
                    <li>
                      Administrators: quit the running Host first (system tray → LynxDock Host → Quit). If the
                      installer starts while the old Host is still running, it stops with an error and leaves the old
                      Host and its data untouched.
                    </li>
                    <li>
                      Ending the Host (tray Quit, a crash or End task) stops the community server and the voice
                      services it started. Closing the Host window only hides it to the tray.
                    </li>
                    <li>
                      To roll back, ask the person running your server for the earlier installer and check it against
                      this archive.
                    </li>
                  </ul>
                </div>
              </div>
              <h3 className="h-card">Known issues in {r026.version}</h3>
              <ul className="grid gap-3 md:grid-cols-2">
                {notes026.map((n) => (
                  <li key={n.title} className="card-quiet">
                    <p className="text-[0.9375rem] font-bold text-ink">{n.title}.</p>
                    <p className="small mt-1">{n.text}</p>
                  </li>
                ))}
              </ul>
            </ArchiveEntry>

            <ArchiveEntry
              date={v6Candidate.builtAt.slice(0, 10)}
              title={`V6 closed beta · ${v6Candidate.candidate} (${v6Candidate.buildId})`}
              standing="Superseded · identification only"
              round="superseded"
              version={v6Candidate.buildId}
            >
              <p className="small">
                Built from source commit <span className="mono">{v6Candidate.sourceCommit.slice(0, 7)}</span> and
                signed by {v6Candidate.publisher}. Superseded by LynxDock {r026.version}.
              </p>
              <HashRows
                rows={[
                  ...v6Candidate.downloads.map((d) => ({
                    name: d.filename,
                    detail: `${formatBytes(d.sizeBytes)} · ${d.signed ? "signed" : "unsigned package"}`,
                    sha256: d.sha256,
                  })),
                  ...v6Candidate.inner.map((i) => ({
                    name: `${i.filename} (inside the packages)`,
                    detail: `${formatBytes(i.sizeBytes)} · ${i.signed ? "signed" : "unsigned"}`,
                    sha256: i.sha256,
                  })),
                ]}
              />
            </ArchiveEntry>

            <ArchiveEntry
              date={closedBetaBuild.qualifiedOn}
              title={`V5 closed beta (${closedBetaBuild.buildId})`}
              standing="Superseded · identification only"
              round="superseded"
              version={closedBetaBuild.buildId}
            >
              <p className="small">
                A portable executable in a ZIP with no installer, {closedBetaBuild.signed ? "signed" : "not code-signed"},
                for {closedBetaBuild.platformLabel}; its server was a separate package. These ZIP-era details are kept
                for the record and do not apply to later releases.
              </p>
              <HashRows
                rows={[
                  ...(closedBetaBuild.package
                    ? [
                        {
                          name: closedBetaBuild.package.filename,
                          detail: formatBytes(closedBetaBuild.package.sizeBytes),
                          sha256: closedBetaBuild.package.sha256,
                        },
                      ]
                    : []),
                  {
                    name: `${closedBetaBuild.executable.filename} (inside the ZIP)`,
                    detail: formatBytes(closedBetaBuild.executable.sizeBytes),
                    sha256: closedBetaBuild.executable.sha256,
                  },
                  {
                    name: closedBetaServer.package.filename,
                    detail: `server package · ${formatBytes(closedBetaServer.package.sizeBytes)}`,
                    sha256: closedBetaServer.package.sha256,
                  },
                  {
                    name: `${closedBetaServer.executable.filename} (inside the server ZIP)`,
                    detail: formatBytes(closedBetaServer.executable.sizeBytes),
                    sha256: closedBetaServer.executable.sha256,
                  },
                ]}
              />
              <p className="small strong">Known issues carried into that round</p>
              <ul className="tick-list small">
                {closedBetaResiduals.map((x) => (
                  <li key={x.title}>
                    <span className="strong">{x.title}.</span> {x.text}
                  </li>
                ))}
              </ul>
            </ArchiveEntry>

            <ArchiveEntry
              date={betaDownloads.artifacts[0]?.publishedAt.slice(0, 10) ?? ""}
              title={`LynxDock ${supersededInstallers.version} installers (${supersededInstallers.sourceCommit})`}
              standing="Superseded · identification only"
              round="superseded"
              version={betaDownloads.version}
            >
              <p className="small">
                {supersededInstallers.reason} Superseded on {supersededInstallers.supersededOn}. Code signing
                (Authenticode, from the round&rsquo;s manifest): {betaAuthenticode.statusValue}
                {betaAuthenticode.signed ? `; Windows should show the publisher ${betaSigningPublisher}` : ""}.
              </p>
              <HashRows
                rows={betaDownloads.artifacts.map((a) => ({
                  name: a.filename,
                  detail: `${a.size} · ${a.signed ? "signed" : "unsigned"}`,
                  sha256: a.sha256.toUpperCase(),
                }))}
              />
            </ArchiveEntry>
          </div>
        </div>
      </section>
    </>
  );
}
