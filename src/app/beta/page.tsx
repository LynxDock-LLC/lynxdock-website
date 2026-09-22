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

function DownloadCard({
  eyebrow,
  heading,
  blurb,
  artifacts,
}: {
  eyebrow: string;
  heading: string;
  blurb: string;
  artifacts: BetaArtifact[];
}) {
  const primary = artifacts.find((a) => a.installerType === "nsis") ?? artifacts[0];
  const secondary = artifacts.filter((a) => a !== primary);
  return (
    <GlassPanel className="flex h-full flex-col p-7">
      <span className="hud-label text-signal-bright">{eyebrow}</span>
      <h3 className="mt-3 text-xl font-semibold text-white">{heading}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">{blurb}</p>
      <div className="mt-6 flex flex-col gap-3">
        {primary && <ArtifactButton artifact={primary} variant="primary" />}
        {secondary.map((a) => (
          <ArtifactButton key={a.filename} artifact={a} variant="secondary" />
        ))}
      </div>
    </GlassPanel>
  );
}

export default function BetaPage() {
  return (
    <>
      <PageHeader
        eyebrow="Private beta · Trusted tester build"
        title="LynxDock Private Beta"
        description="You're receiving an early LynxDock build to help test communication, Voice, Tactical Mode, the in-game overlay, the Verse Catalog and self-hosting before the wider beta. The current build is the V5 closed beta at the top of this page — take that one. Thanks for helping shape it."
      />

      <section className="mx-auto max-w-5xl px-5 py-16">
        {/* THE CURRENT BUILD — the qualified V5 closed beta. This is the ONE download a tester
            should take. The older 0.1.0 signed installers are further down, clearly superseded. */}
        <GlassPanel glow className="border-signal-cyan/25 p-8 sm:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="hud-label text-signal-bright">Current build · V5 closed beta</span>
            <span className="rounded-full border border-signal-cyan/50 bg-signal-cyan/15 px-2.5 py-0.5 text-xs font-medium text-signal-bright">
              {closedBetaBuild.published ? "Download this one" : "Qualified · upload pending"}
            </span>
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Build {closedBetaBuild.buildId} — cleared for closed beta on {closedBetaBuild.qualifiedOn}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#9fb2ba]">
            <span className="text-white">This is the current trusted-tester build — start here.</span> It adds the
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
            {closedBetaBuild.published && closedBetaBuild.downloadUrl ? (
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
                Closed beta · download not yet published
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
            {closedBetaServer.published && closedBetaServer.downloadUrl ? (
              <GlowButton href={closedBetaServer.downloadUrl} external variant="secondary">
                Download the server package
              </GlowButton>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center justify-center rounded-lg border border-line px-5 py-2.5 text-sm text-[#6f838b]"
                title="The server package has been built and verified locally but not published yet."
              >
                Server package · download not yet published
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

        {/* WHAT YOU'LL SEE — authentic captures of this build on a staged demo server (src/data/v5Gallery.ts). */}
        <h2 className="mb-2 mt-16 text-xl font-semibold text-white">What you&rsquo;ll see in this build</h2>
        <p className="mb-6 text-sm leading-relaxed text-[#9fb2ba]">
          Captured from candidate 1 (build 0.1.0+5a53bff) on 2026-09-20; the current candidate {closedBetaBuild.buildId} differs only by the
          member-facing catalog attribution line, which these captures predate. Use them to recognise each surface in the checklist above.
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
          Superseded downloads ({supersededInstallers.version})
        </h2>
        <div className="grid gap-5 lg:grid-cols-2">
          <DownloadCard
            eyebrow="Superseded · rollback only"
            heading={`LynxDock ${supersededInstallers.version}`}
            blurb="The pre-V5 client installer. It has no in-game overlay, no Verse Catalog, no canonical quick actions and no Control Surface Bridge. Use the current closed-beta ZIP at the top of this page instead."
            artifacts={betaDesktopArtifacts}
          />
          <DownloadCard
            eyebrow="Superseded · rollback only"
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
              hashes are in its card at the top of this page, and{" "}
              <a href={closedBetaBuild.checksumsUrl} className="text-signal-bright hover:underline" rel="noreferrer">
                SHA256SUMS.txt
              </a>{" "}
              is served beside its download. Every published installer is hashed by the beta pipeline after it&rsquo;s
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
