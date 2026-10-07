import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import V5Gallery from "@/components/V5Gallery";
import {
  betaDownloads,
  betaDesktopArtifacts,
  betaHostArtifacts,
  betaHasDownloads,
  betaAuthenticode,
  betaSigningPublisher,
  type BetaArtifact,
} from "@/data/betaDownloads";
import { v6Candidate, v6Primary, v6Secondary } from "@/data/v6Candidate";
import { release026, release026Desktop, release026Host, type ReleaseDownload } from "@/data/release026";
import {
  closedBetaBuild,
  closedBetaServer,
  closedBetaHighlights,
  closedBetaResiduals,
  closedBetaChecklist,
  supersededInstallers,
} from "@/data/closedBeta";

// UNLISTED trusted-tester page. noindex/nofollow keeps it out of search; it is
// intentionally absent from src/app/sitemap.ts and from the primary navigation.
// This is an unlisted URL the owner shares by hand — not an access-controlled page.
export const metadata: Metadata = {
  title: "Private Beta",
  description:
    "LynxDock private beta — a trusted-tester build shared directly by the LynxDock owner.",
  robots: { index: false, follow: false },
};

const support = "admin@lynxdock.app";
const github = "https://github.com/LynxDock-LLC";

// Status of the SUPERSEDED 0.1.0 installer round (manifest-driven). It is no longer "the current
// published build" — `closedBetaBuild` is — so the rows say which round they describe.
const statusRows: { label: string; value: string; tone?: "ok" | "pending" }[] = [
  { label: "Build", value: betaDownloads.version, tone: "pending" },
  { label: "Standing", value: `Superseded by ${supersededInstallers.supersededBy}`, tone: "pending" },
  { label: "Channel", value: betaDownloads.channelLabel, tone: "ok" },
  { label: "Platform", value: betaDownloads.platformLabel, tone: "ok" },
  // Driven by public/beta-manifest.json (see betaSigning.mjs) — never hard-coded.
  { label: "Code signing (Authenticode)", value: betaAuthenticode.statusValue, tone: betaAuthenticode.statusTone },
  { label: "Public beta", value: betaDownloads.publicBetaOpen ? "Open" : "Not yet open", tone: "pending" },
];

const expectations: string[] = [
  "This is early testing software — expect rough edges and bugs.",
  "Please don't redistribute the build or post the private link publicly.",
  "Your tester feedback may be used to improve LynxDock.",
];

function ArtifactButton({
  artifact,
  variant,
}: {
  artifact: BetaArtifact;
  variant: "primary" | "secondary";
}) {
  if (artifact.available && artifact.url) {
    return (
      <GlowButton href={artifact.url} external variant={variant}>
        {artifact.installerLabel}
        {artifact.size ? ` · ${artifact.size}` : ""}
      </GlowButton>
    );
  }
  return (
    <span
      aria-disabled="true"
      className="inline-flex cursor-not-allowed items-center justify-center rounded-lg border border-line px-5 py-2.5 text-sm text-[#6f838b]"
      title="This installer is being prepared."
    >
      {artifact.installerLabel} · being prepared
    </span>
  );
}

/**
 * The V5 closed-beta round is superseded by the V6 candidate at the top of this
 * page, so it is shown for identification and rollback only.
 *
 * A beta page must offer exactly ONE generation. The last time this page carried
 * two, a tester followed it and installed the wrong one.
 */
const V5_ROUND_SUPERSEDED = true;

/**
 * The V6 closed beta (v6-candidate.1c, 0.1.0+1261472) is superseded by LynxDock 0.2.6 at the top of this page.
 * Its files stay on the download origin for rollback; this page identifies them but no longer links them, so it
 * offers exactly one generation.
 */
const V6_ROUND_SUPERSEDED = true;

function bytes(n: number) {
  return `${n.toLocaleString("en-US")} bytes`;
}

function ReleaseDownloadRow({ d, published }: { d: ReleaseDownload; published: boolean }) {
  return (
    <div className="rounded-xl border border-line/60 bg-graphite-800/30 px-4 py-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm text-white">{d.label}</span>
        <span className="text-xs text-[#9fb2ba]">
          {bytes(d.sizeBytes)} · {d.signed ? "signed" : "unsigned"}
        </span>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-[#9fb2ba]">{d.note}</p>
      <p className="mt-1 break-all font-mono text-[0.6875rem] leading-relaxed text-[#7f949c]">{d.sha256}</p>
      {published ? (
        <a
          href={d.url}
          data-beta-download=""
          data-filename={d.filename}
          data-sha256={d.sha256}
          data-size={d.sizeBytes}
          className="mt-2 inline-block text-sm text-signal-bright hover:underline"
          rel="noreferrer"
        >
          Download {d.filename}
        </a>
      ) : (
        <p className="mt-2 text-xs text-[#6f838b]">{d.filename} — not uploaded yet</p>
      )}
    </div>
  );
}

/**
 * The current round: LynxDock 0.2.6 — the app and LynxDock Host, as signed .exe and .msi installers only.
 * `data-beta-round="current"` and the per-link data attributes are what the live-download verifier reads.
 */
function CurrentRelease() {
  const r = release026;
  const notes: { title: string; text: string }[] = [
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
  return (
    <div data-beta-round="current" data-beta-version={r.version} data-beta-commit={r.sourceCommit}>
      <GlassPanel glow className="mb-10 border-signal-cyan/25 p-8 sm:p-10">
        <span className="hud-label text-signal-bright">
          {r.published ? "Current build — take this one" : "Current build — qualified, upload pending"}
        </span>
        <h2 className="mt-3 text-2xl font-semibold text-white">LynxDock {r.version}</h2>
        <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
          Built from source commit <span className="text-white">{r.sourceCommit.slice(0, 7)}</span> (tag{" "}
          <span className="text-white">{r.tag}</span>). Every installer is{" "}
          <span className="text-white">code-signed</span> by {r.publisher} with a trusted timestamp. This round has two
          products: the <span className="text-white">LynxDock app</span>, which every tester needs, and{" "}
          <span className="text-white">LynxDock Host</span>, which only the person hosting the community server needs —
          the server and the voice services are inside the Host. There is no portable ZIP and no separate server package
          in this round.
        </p>
        <p className="mt-4 rounded-xl border border-[#c9b58a]/40 bg-graphite-800/40 px-4 py-3 text-sm leading-relaxed text-[#9fb2ba]">
          <span className="text-white">What has and has not been checked.</span> These signed installers passed the
          required pre-release qualification: installing the .exe and the .msi on clean Windows machines, first launch,
          signing in and a restart; upgrading over the previous round&rsquo;s app installers; and installing, upgrading
          and uninstalling the Host on our test PC.{" "}
          <span className="text-white">
            The two-PC rehearsal and the final eight-hour acceptance run have not been carried out yet.
          </span>{" "}
          This is a closed-beta build, not a final release, and it has known, unresolved issues — listed below.
        </p>

        <h3 className="mt-8 text-lg font-semibold text-white">For every tester — the LynxDock app</h3>
        <div className="mt-3 flex flex-col gap-3">
          {release026Desktop.map((d) => (
            <ReleaseDownloadRow key={d.key} d={d} published={r.published} />
          ))}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#9fb2ba]">
          <span className="text-white">Upgrading from the V6 closed beta?</span> Install 0.2.6 over it with the same
          kind of installer you used before (.exe over .exe, .msi over .msi); it replaces the previous app in place and
          keeps your profile and settings. If it asks you to sign in again, use the account you already have.
        </p>

        <h3 className="mt-8 text-lg font-semibold text-white">Only if you host the community server — LynxDock Host</h3>
        <div className="mt-3 flex flex-col gap-3">
          {release026Host.map((d) => (
            <ReleaseDownloadRow key={d.key} d={d} published={r.published} />
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-3 rounded-xl border border-line/60 bg-graphite-800/40 px-4 py-3 text-sm leading-relaxed text-[#9fb2ba]">
          <p>
            <span className="text-white">Quit the old Host before you upgrade.</span> Before installing LynxDock Host{" "}
            {r.version} over LynxDock Host 0.1.0, quit the running Host first (system tray → LynxDock Host → Quit). If
            the installer is started while 0.1.0 is still running, it stops with an error and leaves 0.1.0 and its data
            untouched — quit the Host and run the installer again.
          </p>
          <p>
            <span className="text-white">Ending the Host ends the server it runs.</span> When LynxDock Host ends — tray
            Quit, a crash or End task — the community server and the voice services it started (LiveKit and coturn) stop
            with it, and calls on that server end until the Host is started again. Closing the Host window only hides it
            to the tray; the server keeps running. Processes the Host did not start are not touched.
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-line/60 bg-graphite-800/40 px-4 py-3 text-sm leading-relaxed text-[#9fb2ba]">
          <span className="text-white">Your browser and Windows may ask before running a new build.</span> For a
          newly released file Edge can say it &ldquo;isn&rsquo;t commonly downloaded&rdquo;; with the previous round the
          way through was <span className="text-white">Downloads → More actions → Keep</span>. When you run the
          installer, check its SHA-256 above and that the publisher reads{" "}
          <span className="text-white">LynxDock LLC</span>, then{" "}
          <span className="text-white">More info → Run anyway</span> if Windows warns. If what you see differs, tell us.
        </div>

        <h3 className="mt-8 text-lg font-semibold text-white">Known issues in this build — accepted, not fixed</h3>
        <ul className="mt-4 flex flex-col gap-3">
          {notes.map((n) => (
            <li key={n.title} className="flex items-start gap-3 text-sm leading-relaxed text-[#9fb2ba]">
              <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-signal-cyan" />
              <span>
                <span className="font-medium text-white">{n.title}.</span> {n.text}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-[#7f939b]">
          Signing run {r.signingRunId} · clean-machine qualification run {r.qualificationRunId}. To check a download on
          Windows:{" "}
          <code className="rounded bg-graphite-800/60 px-1.5 py-0.5 text-xs text-[#dbe6ea]">
            Get-FileHash .\FILE -Algorithm SHA256
          </code>
          .
        </p>
      </GlassPanel>
    </div>
  );
}

/**
 * The V6 round. While it was current, every artifact it ships was actionable; since LynxDock 0.2.6 superseded it
 * (V6_ROUND_SUPERSEDED) it is shown for identification and rollback only — no links.
 */
function CandidateRound() {
  const c = v6Candidate;
  const live = c.published && !V6_ROUND_SUPERSEDED;
  return (
    <div data-beta-round={V6_ROUND_SUPERSEDED ? "superseded" : "current"} data-beta-version={c.buildId}>
    <GlassPanel className="mb-10 p-8 sm:p-10">
      <span className={V6_ROUND_SUPERSEDED ? "hud-label text-[#c9b58a]" : "hud-label text-signal-bright"}>
        {V6_ROUND_SUPERSEDED
          ? `Previous round · V6 closed beta — superseded by LynxDock ${release026.version}`
          : c.published
            ? "Current build — take this one"
            : "Current build — qualified, upload pending"}
      </span>
      <h2 className="mt-3 text-2xl font-semibold text-white">LynxDock {c.buildId}</h2>
      {V6_ROUND_SUPERSEDED ? (
        <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
          The V6 closed beta, built from source commit <span className="text-white">{c.sourceCommit.slice(0, 7)}</span>{" "}
          and code-signed by {c.publisher}. It is kept here so an existing install can be identified and rolled back.{" "}
          <span className="text-white">Not downloadable from this page</span> — take {release026.version} above. If you
          need one of these files to roll back, ask the owner for it directly and check it against the SHA-256 below.
        </p>
      ) : (
      <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
        Built from source commit <span className="text-white">{c.sourceCommit.slice(0, 7)}</span> and qualified on clean
        Windows machines in every format it ships: download, install or extract, first launch, joining a server, a
        restart with what you set still in place, uninstall, and an upgrade over the previous published build with its
        data preserved.{" "}
        {c.signed ? (
          <>Every executable is <span className="text-white">code-signed</span> by {c.publisher}.</>
        ) : (
          <>These files are <span className="text-white">not code-signed</span>, so Windows will warn about an unknown
          publisher — verify the SHA-256 below before you run anything.</>
        )}
      </p>
      )}
      {!V6_ROUND_SUPERSEDED && (
      <>
      <p className="mt-4 rounded-xl border border-line/60 bg-graphite-800/40 px-4 py-3 text-sm leading-relaxed text-[#9fb2ba]">
        <span className="text-white">Upgrading from an older build? You will be asked to sign in once.</span> The
        upgrade keeps your files — every one of the 173 files the previous build had left behind was still there
        afterwards, and the server address you had entered survives — but it does not keep you signed in. Sign in again
        with the account you already use; your memberships, your operation and your board are all still there. We
        measured this rather than assuming it, and it is a known one-time cost of crossing generations, not data loss.
      </p>
      <div className="mt-3 rounded-xl border border-line/60 bg-graphite-800/40 px-4 py-3 text-sm leading-relaxed text-[#9fb2ba]">
        <p>
          <span className="text-white">Your browser will hold the download and ask about it.</span>{" "}
          Edge says the file &ldquo;isn&rsquo;t commonly downloaded&rdquo;. Nothing is wrong with it — Edge has the
          whole file already and is waiting for you, but until you answer it looks exactly like a download that failed.
          The path, as far as we were able to follow it on our test machines:
        </p>
        <ol className="mt-3 flex list-decimal flex-col gap-1 pl-5">
          <li>Open the <span className="text-white">Downloads</span> arrow, top right, showing a warning badge.</li>
          <li>
            The row offers only <em>Delete</em> and <span className="text-white">More actions</span> —
            choose <span className="text-white">More actions → Keep</span>.
          </li>
          <li>Edge asks again, in a dialog whose visible buttons are <em>Cancel</em> and <em>Delete</em>.</li>
          <li>
            Open the little arrow <em>on</em> the <em>Delete</em> button. Press the arrow, not the button: pressing{" "}
            <em>Delete</em> discards the file Edge is holding and you start the download again.
          </li>
        </ol>
        <p className="mt-3">
          <span className="text-white">We could not complete that last step</span>, so we cannot tell you what the
          option is called or promise it is offered on your machine — our test machines are centrally managed and that
          may have withheld it. Steps 1 to 3 we watched happen. If step 4 looks different for you, tell us what you
          see and take the portable ZIP in the meantime.
        </p>
        <p className="mt-3">
          That dialog names the publisher, <span className="text-white">LynxDock LLC, Coos Bay, Oregon</span>, read
          from our signature — so the signing is doing its job. What Edge is unsure of is this file&rsquo;s standing
          with its reputation service, which a build released today has had no time to earn. Windows may warn again
          when you open it: check the SHA-256 below first, then{" "}
          <span className="text-white">More info → Run anyway</span>. We watched this on test machines rather than
          guessing, and we cannot promise you will see no prompt — if what you see differs, tell us.
        </p>
      </div>
      </>
      )}
      <div className="mt-6 flex flex-col gap-3">
        {c.downloads.map((d) => (
          <div key={d.key} className="rounded-xl border border-line/60 bg-graphite-800/30 px-4 py-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className="text-sm text-white">{d.label}</span>
              <span className="text-xs text-[#9fb2ba]">
                {bytes(d.sizeBytes)} · {d.signed ? "signed" : "unsigned"}
              </span>
            </div>
            <p className="mt-1 text-xs leading-relaxed text-[#9fb2ba]">{d.note}</p>
            <p className="mt-1 break-all font-mono text-[0.6875rem] leading-relaxed text-[#7f949c]">{d.sha256}</p>
            {live ? (
              <a href={d.url} className="mt-2 inline-block text-sm text-signal-bright hover:underline" rel="noreferrer">
                Download {d.filename}
              </a>
            ) : V6_ROUND_SUPERSEDED ? (
              <p className="mt-2 text-xs text-[#6f838b]">{d.filename} — superseded, identification only</p>
            ) : (
              <p className="mt-2 text-xs text-[#6f838b]">{d.filename} — not uploaded yet</p>
            )}
          </div>
        ))}
      </div>
      {live && v6Primary && (
        <div className="mt-6">
          <GlowButton href={v6Primary.url} external variant="primary">
            Download {v6Primary.label}
          </GlowButton>
        </div>
      )}
      <p className="mt-6 text-xs leading-relaxed text-[#7f939b]">
        Inside the packages:{" "}
        {c.inner.map((i) => `${i.filename} (${bytes(i.sizeBytes)}, ${i.sha256.slice(0, 8)}…${i.sha256.slice(-6)})`).join(" · ")}.
        The portable executable is signed in its own right, so its hash is deliberately not the hash of the copy inside
        the installers.
      </p>
    </GlassPanel>
    </div>
  );
}

function DownloadCard({
  eyebrow,
  heading,
  blurb,
  artifacts,
  identityOnly = false,
}: {
  eyebrow: string;
  heading: string;
  blurb: string;
  artifacts: BetaArtifact[];
  /**
   * A superseded round is IDENTIFIABLE but not DOWNLOADABLE from this page.
   *
   * These installers stayed clickable under a current-build heading long enough
   * for a tester to follow the page and install the wrong generation - the
   * reported "the latest beta from the website doesn't work". Labelling them
   * "superseded" is not enough while the button still works: a beta page must
   * offer exactly ONE generation. The rows below let someone identify what they
   * already have (filename, size, SHA-256) and roll back by asking for the file,
   * without the page handing out the wrong one.
   */
  identityOnly?: boolean;
}) {
  const primary = artifacts.find((a) => a.installerType === "nsis") ?? artifacts[0];
  const secondary = artifacts.filter((a) => a !== primary);
  return (
    <GlassPanel className="flex h-full flex-col p-7">
      <span className="hud-label text-signal-bright">{eyebrow}</span>
      <h3 className="mt-3 text-xl font-semibold text-white">{heading}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">{blurb}</p>
      {identityOnly ? (
        <div className="mt-6 flex flex-col gap-3">
          {artifacts.map((a) => (
            <div key={a.filename} className="rounded-xl border border-line/60 bg-graphite-800/30 px-4 py-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-sm text-white">{a.filename}</span>
                <span className="text-xs text-[#9fb2ba]">
                  {a.size} · {a.signed ? "signed" : "unsigned"}
                </span>
              </div>
              <p className="mt-1 break-all font-mono text-[0.6875rem] leading-relaxed text-[#7f949c]">{a.sha256}</p>
            </div>
          ))}
          <p className="text-sm leading-relaxed text-[#9fb2ba]">
            Not downloadable from this page. If you need one of these to roll back, ask the owner for
            it directly and check it against the hash above.
          </p>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-3">
          {primary && <ArtifactButton artifact={primary} variant="primary" />}
          {secondary.map((a) => (
            <ArtifactButton key={a.filename} artifact={a} variant="secondary" />
          ))}
        </div>
      )}
    </GlassPanel>
  );
}

export default function BetaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Private beta · Trusted tester build"
        title="LynxDock Private Beta"
        description={`You're receiving an early LynxDock build to help test communication, Voice, Tactical Mode, the in-game overlay, the Verse Catalog and self-hosting before the wider beta. The current build is LynxDock ${release026.version} at the top of this page — take that one. Earlier rounds below are for identification and rollback only. Thanks for helping shape it.`}
      />

      <section className="mx-auto max-w-5xl px-5 py-16">
        <CurrentRelease />
        <CandidateRound />

        {/* AN EARLIER ROUND — the V5 closed beta, superseded (V5_ROUND_SUPERSEDED): identification only.
            The one download a tester should take is the current round at the top of the page. */}
        <div data-beta-round={V5_ROUND_SUPERSEDED ? "superseded" : "current"} data-beta-version={closedBetaBuild.buildId}>
        <GlassPanel glow={!V5_ROUND_SUPERSEDED} className="border-signal-cyan/25 p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className={V5_ROUND_SUPERSEDED ? "hud-label text-[#c9b58a]" : "hud-label text-signal-bright"}>
              {V5_ROUND_SUPERSEDED ? "Earlier round · V5 closed beta" : "Current build · V5 closed beta"}
            </span>
            <span className="rounded-full border border-signal-cyan/50 bg-signal-cyan/15 px-2.5 py-0.5 text-xs font-medium text-signal-bright">
              {V5_ROUND_SUPERSEDED ? "Superseded" : closedBetaBuild.published ? "Download this one" : "Qualified · upload pending"}
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Build {closedBetaBuild.buildId} — cleared for closed beta on {closedBetaBuild.qualifiedOn}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#9fb2ba]">
            <span className="text-white">
              {V5_ROUND_SUPERSEDED
                ? "This round is superseded — take the current build at the top of this page."
                : "This is the current trusted-tester build — start here."}
            </span>{" "}
            It adds the
            in-game overlay, the Verse Catalog, canonical quick actions and the local Control Surface Bridge. It is a{" "}
            {closedBetaBuild.platformLabel} <span className="text-white">portable executable in a ZIP — there is no
            installer</span>: you extract it and run it, nothing is written to Program Files. It is{" "}
            <span className="text-white">{closedBetaBuild.signed ? "code-signed" : "not code-signed"}</span>, so
            verify the file before you run it: the SHA-256 below must match exactly.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#9fb2ba]">
            The signed <span className="text-white">{supersededInstallers.version}</span> .exe / .msi installers lower
            down this page are an <span className="text-white">earlier round and are superseded</span> — don&rsquo;t
            install those expecting this build.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["Build", closedBetaBuild.buildId],
              ["Source commit", closedBetaBuild.sourceCommit],
              ["Platform", closedBetaBuild.platformLabel],
              ["Packaging", closedBetaBuild.packaging],
              ["File", `${closedBetaBuild.executable.filename} · ${closedBetaBuild.executable.sizeBytes.toLocaleString("en-US")} bytes`],
              ...(closedBetaBuild.package ? [["Download (ZIP)", `${closedBetaBuild.package.filename} · ${closedBetaBuild.package.sizeBytes.toLocaleString("en-US")} bytes`]] : []),
              ["Code signing (Authenticode)", closedBetaBuild.signed ? "Signed" : "Unsigned — verify the hash"],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 rounded-xl border border-line/60 bg-graphite-800/30 px-4 py-3">
                <span className="text-sm text-[#9fb2ba]">{k}</span>
                <span className="text-right text-xs font-medium text-white">{v}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 break-all font-mono text-xs text-[#7f939b]">
            SHA-256 {closedBetaBuild.executable.sha256}
          </p>
          {closedBetaBuild.package && (
            <p className="mt-2 break-all font-mono text-xs text-[#7f939b]">
              ZIP SHA-256 {closedBetaBuild.package.sha256}
            </p>
          )}
          {closedBetaBuild.supersedes && (
            <p className="mt-3 text-xs leading-relaxed text-[#7f939b]">
              Supersedes {closedBetaBuild.supersedes.buildId} (SHA-256 {closedBetaBuild.supersedes.sha256.slice(0, 8)}…{closedBetaBuild.supersedes.sha256.slice(-6)}).{" "}
              {closedBetaBuild.supersedes.note}
            </p>
          )}
          <div className="mt-6">
            {!V5_ROUND_SUPERSEDED && closedBetaBuild.published && closedBetaBuild.downloadUrl ? (
              <span className="inline-flex flex-wrap items-center gap-3">
                <GlowButton href={closedBetaBuild.downloadUrl} external variant="primary">
                  Download the closed beta
                </GlowButton>
                {closedBetaBuild.checksumsUrl && (
                  <a href={closedBetaBuild.checksumsUrl} className="text-sm text-signal-bright hover:underline" rel="noreferrer">
                    SHA256SUMS.txt
                  </a>
                )}
              </span>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center justify-center rounded-lg border border-line px-5 py-2.5 text-sm text-[#6f838b]"
                title="The package has been qualified but not published yet."
              >
                {V5_ROUND_SUPERSEDED ? "Superseded round · identification only" : "Closed beta · download not yet published"}
              </span>
            )}
          </div>

          <h3 className="mt-10 text-lg font-semibold text-white">Joining as a tester</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
            Extract the ZIP, verify the hash, run the executable, and in the connect bar enter the{" "}
            <span className="text-white">server address</span> and <span className="text-white">invite code</span> the
            owner gave you, then <span className="text-white">Register</span>. Everything in the client — operations,
            the tactical board, requests, logistics, the Verse Catalog — comes from that server; you do not host anything
            yourself. The step-by-step walkthrough of one operation is at{" "}
            <Link href="/guides/operations/" className="text-signal-bright hover:underline">
              Plan, deploy and coordinate an operation
            </Link>
            .
          </p>

          <h3 className="mt-10 text-lg font-semibold text-white">For the person hosting the beta server</h3>
          <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
            The client needs a server of the same generation. A matching server build is packaged beside the client
            (<span className="text-white">{closedBetaServer.packageFilename}</span>) with{" "}
            <span className="text-white">{closedBetaServer.setupNotes}</span>: how to start it, make the first account
            the owner, and enable and import the Star Citizen Wiki catalog (Verse Catalog → Catalog administration →
            Enable → Dry run → Sync now → Promote). Observed on 2026-09-20 with the provider&rsquo;s default patch of
            that day (4.10.0-LIVE): 132 requests in 13–17 minutes, 24,058 provider records fetched, 688 skipped, 286
            rejected, 17,029 entities promoted — later runs will differ as the game patches. The signed 0.1.0 Host
            installer below bundles a pre-V5 server and cannot host this build.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              ["Server build", closedBetaServer.buildId],
              ["File", `${closedBetaServer.executable.filename} · ${closedBetaServer.executable.sizeBytes.toLocaleString("en-US")} bytes`],
            ].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between gap-4 rounded-xl border border-line/60 bg-graphite-800/30 px-4 py-3">
                <span className="text-sm text-[#9fb2ba]">{k}</span>
                <span className="text-right text-xs font-medium text-white">{v}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 break-all font-mono text-xs text-[#7f939b]">SHA-256 {closedBetaServer.executable.sha256}</p>
          {closedBetaServer.package && (
            <p className="mt-2 break-all font-mono text-xs text-[#7f939b]">
              ZIP {closedBetaServer.package.filename} · {closedBetaServer.package.sizeBytes.toLocaleString("en-US")} bytes · SHA-256 {closedBetaServer.package.sha256}
            </p>
          )}
          <div className="mt-4">
            {!V5_ROUND_SUPERSEDED && closedBetaServer.published && closedBetaServer.downloadUrl ? (
              <GlowButton href={closedBetaServer.downloadUrl} external variant="secondary">
                Download the server package
              </GlowButton>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center justify-center rounded-lg border border-line px-5 py-2.5 text-sm text-[#6f838b]"
                title="The server package has been built and verified locally but not published yet."
              >
                {V5_ROUND_SUPERSEDED ? "Superseded round · identification only" : "Server package · download not yet published"}
              </span>
            )}
          </div>

          <h3 className="mt-10 text-lg font-semibold text-white">What is new in this build</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {closedBetaHighlights.map((h) => (
              <div key={h.title} className="rounded-xl border border-line/60 bg-graphite-800/30 p-4">
                <h4 className="text-sm font-semibold text-white">{h.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-[#9fb2ba]">{h.text}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-10 text-lg font-semibold text-white">Known issues carried into this beta</h3>
          <p className="mt-2 text-sm text-[#9fb2ba]">
            These are known and accepted for a trusted-tester round. Where something is unmeasured we say so.
          </p>
          <ul className="mt-4 flex flex-col gap-3">
            {closedBetaResiduals.map((r) => (
              <li key={r.title} className="flex items-start gap-3 text-sm leading-relaxed text-[#9fb2ba]">
                <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-signal-cyan" />
                <span>
                  <span className="font-medium text-white">{r.title}.</span> {r.text}
                </span>
              </li>
            ))}
          </ul>

          <h3 className="mt-10 text-lg font-semibold text-white">What to test in this build</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {closedBetaChecklist.map((c, i) => (
              <div key={c.title} className="flex gap-4 rounded-xl border border-line/60 bg-graphite-800/30 p-4">
                <span
                  aria-hidden
                  className="flex h-7 w-7 flex-none items-center justify-center rounded-full border border-signal-cyan/30 bg-signal-cyan/10 text-xs font-semibold text-signal-bright"
                >
                  {i + 1}
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-white">{c.title}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-[#9fb2ba]">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-[#7f939b]">
            Overlay reports should include <span className="text-white">Settings → Game overlay → Copy diagnostics JSON</span>{" "}
            taken right after the problem, plus the game&rsquo;s display mode and which monitor the game and the overlay were on.
          </p>
        </GlassPanel>
        </div>

        {/* WHAT YOU'LL SEE — authentic captures of this build on a staged demo server (src/data/v5Gallery.ts). */}
        <h2 className="mb-2 mt-16 text-xl font-semibold text-white">What you&rsquo;ll see in this build</h2>
        <p className="mb-6 text-sm leading-relaxed text-[#9fb2ba]">
          Captured from the V5 closed beta (candidate 1, build 0.1.0+5a53bff) on 2026-09-20. Later builds, including{" "}
          {release026.version}, changed parts of the interface, so use these to recognise each surface rather than as an
          exact picture of the current build.
        </p>
        <V5Gallery />

        {/* SUPERSEDED ROUND — the 0.1.0 signed installers (manifest-driven). Kept for rollback and
            for testers who already have them; NEVER presented as the current download again. */}
        <h2 className="mb-2 mt-16 text-xl font-semibold text-white">
          Earlier round · {supersededInstallers.version} signed installers (superseded)
        </h2>
        <GlassPanel className="mb-6 border-[#c9b58a]/40 p-7">
          <span className="hud-label text-[#c9b58a]">Not the current beta</span>
          <p className="mt-3 text-sm leading-relaxed text-[#9fb2ba]">
            These Authenticode-signed <span className="text-white">{supersededInstallers.version}</span> installers
            (source {supersededInstallers.sourceCommit}) were superseded on{" "}
            <span className="text-white">{supersededInstallers.supersededOn}</span> by{" "}
            <span className="text-white">{supersededInstallers.supersededBy}</span>. {supersededInstallers.reason}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-[#9fb2ba]">
            {supersededInstallers.instead} They stay published here so an existing install can be identified and
            rolled back — installing them now will not give you the build this round asks you to test.
          </p>
        </GlassPanel>
        <GlassPanel className="p-8 sm:p-10">
          <span className="hud-label text-[#c9b58a]">Build status · superseded round</span>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {statusRows.map((r) => (
              <div
                key={r.label}
                className="flex items-center justify-between gap-4 rounded-xl border border-line/60 bg-graphite-800/30 px-4 py-3"
              >
                <span className="text-sm text-[#9fb2ba]">{r.label}</span>
                <span
                  className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                    r.tone === "pending"
                      ? "border-line bg-graphite-700/40 text-[#c9b58a]"
                      : "border-signal-blue/50 bg-signal-blue/15 text-[#93c5fd]"
                  }`}
                >
                  {r.value}
                </span>
              </div>
            ))}
          </div>
          {!betaHasDownloads && (
            <p className="mt-6 text-sm leading-relaxed text-[#9fb2ba]">
              The installers for this round are being prepared. If the owner sent you here and the
              buttons below aren&rsquo;t active yet, check back shortly or ask the owner for the
              direct file.
            </p>
          )}
        </GlassPanel>

        {/* DOWNLOADS (superseded round) */}
        <h2 className="mb-6 mt-12 text-xl font-semibold text-white">
          Superseded round ({supersededInstallers.version}) — for identification, not download
        </h2>
        <div className="grid gap-5 lg:grid-cols-2">
          <DownloadCard
            identityOnly
            eyebrow="Superseded · identify and roll back only"
            heading={`LynxDock ${supersededInstallers.version}`}
            blurb="The pre-V5 client installer. It has no in-game overlay, no Verse Catalog, no canonical quick actions and no Control Surface Bridge. Take the current build at the top of this page instead."
            artifacts={betaDesktopArtifacts}
          />
          <DownloadCard
            identityOnly
            eyebrow="Superseded · identify and roll back only"
            heading={`LynxDock Host ${supersededInstallers.version}`}
            blurb="The pre-V5 self-hosting installer. It bundles a pre-V5 server and cannot host the current client build — host the beta with the server package from the current build above."
            artifacts={betaHostArtifacts}
          />
        </div>

        {/* INSTALLATION NOTICE — copy is chosen from manifest truth (betaAuthenticode), never hard-coded. */}
        <GlassPanel className="mt-8 border-signal-cyan/20 p-7">
          <span className="hud-label text-signal-bright">
            Before you install the superseded {supersededInstallers.version} round
          </span>
          <h3 className="mt-3 text-lg font-semibold text-white">{betaAuthenticode.noticeHeading}</h3>
          {betaAuthenticode.signed ? (
            <>
              <p className="mt-3 text-sm leading-relaxed text-[#9fb2ba]">
                These installers carry a Microsoft-issued Authenticode signature from{" "}
                <span className="text-white">{betaSigningPublisher}</span> with a trusted
                timestamp. When Windows asks for permission, the publisher line should read{" "}
                <span className="text-white">{betaSigningPublisher}</span> — if it says
                &ldquo;Unknown publisher&rdquo;, stop and contact the owner, because that is not our
                build. To check yourself: right-click the file → Properties → Digital Signatures.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#7f939b]">
                SmartScreen may still show a &ldquo;Windows protected your PC&rdquo; reputation
                notice on the very first launches of a newly signed app; that is reputation, not a
                signature problem — confirm the publisher name, then choose{" "}
                <span className="text-white">More info → Run anyway</span>. Only run a build you
                received directly from the LynxDock owner. Installing doesn&rsquo;t require
                administrator rights (it&rsquo;s a per-user install).
              </p>
            </>
          ) : (
            <>
              <p className="mt-3 text-sm leading-relaxed text-[#9fb2ba]">
                This trusted-tester build is currently unsigned. Windows SmartScreen may therefore
                show an &ldquo;unknown publisher&rdquo; or &ldquo;Windows protected your PC&rdquo;
                message on first launch. That is expected for a pre-release build delivered directly
                by the owner. When SmartScreen appears you can choose{" "}
                <span className="text-white">More info → Run anyway</span>.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-[#7f939b]">
                Only run a build you received directly from the LynxDock owner. Installing doesn&rsquo;t
                require administrator rights (it&rsquo;s a per-user install). Signed builds are
                published through the same page; when this build is replaced by a signed one, this
                notice changes automatically.
              </p>
            </>
          )}
        </GlassPanel>

        {/* The test checklist lives with the CURRENT build (closedBetaChecklist, above). The old
            generic "Install → Launch → …" list was removed on 2026-09-21: it described the
            superseded installer round and sat under it, which is what steered testers into
            installing the wrong generation. */}

        {/* REPORT A PROBLEM */}
        <h2 className="mb-6 mt-16 text-xl font-semibold text-white">Report a problem</h2>
        <GlassPanel className="p-7">
          <p className="text-sm leading-relaxed text-[#9fb2ba]">
            In the app, open <span className="text-white">Settings → About → Report a problem</span>,
            then click <span className="text-white">Copy version &amp; system info</span> and paste it
            into your report. Send it to{" "}
            <a href={`mailto:${support}`} className="text-signal-bright hover:underline">
              {support}
            </a>{" "}
            or open an issue on{" "}
            <a href={github} target="_blank" rel="noopener noreferrer" className="text-signal-bright hover:underline">
              GitHub
            </a>
            .
          </p>
          <p className="mt-4 text-sm text-[#9fb2ba]">A useful report includes:</p>
          <ul className="mt-2 grid gap-1.5 text-sm text-[#9fb2ba] sm:grid-cols-2">
            {[
              "What you were doing",
              "What you expected",
              "What actually happened",
              "Steps to reproduce",
              "The copied version / system info",
              "A screenshot, if useful",
            ].map((x) => (
              <li key={x} className="flex items-start gap-2">
                <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-signal-cyan" />
                {x}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[#7f939b]">
            We never ask for your password. Host operators can attach a support bundle (Advanced
            page) — it&rsquo;s scrubbed of invite codes, voice secrets, and session tokens before it
            leaves your machine.
          </p>
        </GlassPanel>

        {/* EXPECTATIONS */}
        <GlassPanel className="mt-8 p-7">
          <span className="hud-label">What to expect</span>
          <ul className="mt-4 flex flex-col gap-2 text-sm leading-relaxed text-[#9fb2ba]">
            {expectations.map((x) => (
              <li key={x} className="flex items-start gap-2">
                <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-signal-cyan" />
                {x}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-[#7f939b]">
            See our{" "}
            <Link href="/privacy/" className="text-signal-bright hover:underline">
              Privacy
            </Link>{" "}
            and{" "}
            <Link href="/terms/" className="text-signal-bright hover:underline">
              Terms
            </Link>{" "}
            for the full policy.
          </p>
        </GlassPanel>

        {/* INTEGRITY (details) */}
        <h2 className="mb-6 mt-16 text-xl font-semibold text-white">Integrity &amp; provenance</h2>
        <GlassPanel as="details" className="group p-0">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-4 text-[15px] font-medium text-white [&::-webkit-details-marker]:hidden marker:content-['']">
            File names, sizes, and SHA-256 checksums
            <span aria-hidden className="text-signal-bright transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="px-6 pb-6">
            <p className="mb-4 text-sm leading-relaxed text-[#9fb2ba]">
              This table covers the superseded {supersededInstallers.version} installer round. The current build&rsquo;s
              SHA-256 values are in its card at the top of this page — check a download against that card, never
              against this table, so a hash from an older round is never checked against a newer build. Every published
              installer is hashed by the beta
              pipeline after it&rsquo;s
              built and verified against the exact bytes served from the download origin. To check a download on
              Windows:{" "}
              <code className="rounded bg-graphite-800/60 px-1.5 py-0.5 text-xs text-[#dbe6ea]">
                Get-FileHash .\FILE -Algorithm SHA256
              </code>
              .
            </p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-line/70 text-[#7f939b]">
                    <th scope="col" className="px-3 py-2 font-medium">File</th>
                    <th scope="col" className="px-3 py-2 font-medium">Size</th>
                    <th scope="col" className="px-3 py-2 font-medium">Signed</th>
                    <th scope="col" className="px-3 py-2 font-medium">SHA-256</th>
                  </tr>
                </thead>
                <tbody>
                  {betaDownloads.artifacts.map((a) => (
                    <tr key={a.filename} className="border-b border-line/40 align-top last:border-b-0">
                      <th scope="row" className="px-3 py-2 font-medium text-white">
                        {a.filename}
                      </th>
                      <td className="px-3 py-2 text-[#9fb2ba]">{a.size || "—"}</td>
                      <td className="px-3 py-2 text-[#9fb2ba]">{a.signed ? "Yes" : "No"}</td>
                      <td className="px-3 py-2 font-mono text-xs text-[#7f939b] break-all">
                        {a.sha256 || "pending"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-[#7f939b]">
              Build {betaDownloads.version} · channel {betaDownloads.channelLabel} · Authenticode{" "}
              {betaAuthenticode.tableAuthenticode}
              {betaAuthenticode.signed ? ` (${betaSigningPublisher})` : ""}
              {betaDownloads.artifacts.find((a) => a.sourceCommit)
                ? ` · source ${betaDownloads.artifacts.find((a) => a.sourceCommit)?.sourceCommit}`
                : ""}
              .
            </p>
          </div>
        </GlassPanel>
      </section>
    </>
  );
}
