import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/site/PageHero";
import { NextReleaseCard, fmtDate } from "@/components/site/ReleaseBlocks";
import siteStatus from "@/data/siteStatus";
import { v6Candidate } from "@/data/v6Candidate";
import { closedBetaBuild, supersededInstallers } from "@/data/closedBeta";
import { betaDownloads } from "@/data/betaDownloads";

// Public release status. The current state is the next tester release (owner wording, siteStatus.nextRelease);
// below it, only releases that were actually published to testers, by date. Installers and SHA-256 values are in
// the tester hub's archive. (public/releases.json, the release-tools placeholder, is kept but no longer rendered:
// it still describes an unreleased 0.1.0-alpha.)
export const metadata: Metadata = {
  title: "Release status",
  description:
    "Where LynxDock releases stand: the next tester release is in qualification, and earlier published beta rounds are listed by date.",
};

type Row = { date: string | null; name: string; detail: string; standing: string };

export default function ReleasesPage() {
  const s = siteStatus;
  const r026 = s.earlierPublished;
  const rows: Row[] = [
    {
      date: null,
      name: `Next release (provisionally ${s.nextRelease.provisionalVersion})`,
      detail: "The V8 generation.",
      standing: "In qualification · not yet available for distribution",
    },
    {
      date: r026.date,
      name: `LynxDock ${r026.version}`,
      detail: `Signed app and Host installers (${r026.tag}).`,
      standing: "Published · still downloadable from the tester hub archive",
    },
    {
      date: v6Candidate.builtAt.slice(0, 10),
      name: `V6 closed beta (${v6Candidate.candidate})`,
      detail: `Build ${v6Candidate.buildId}, signed.`,
      standing: "Superseded",
    },
    {
      date: closedBetaBuild.qualifiedOn,
      name: "V5 closed beta",
      detail: `Build ${closedBetaBuild.buildId}, portable ZIP.`,
      standing: "Superseded",
    },
    {
      date: betaDownloads.artifacts[0]?.publishedAt.slice(0, 10) ?? null,
      name: `LynxDock ${supersededInstallers.version} installers`,
      detail: `Source ${supersededInstallers.sourceCommit}, signed.`,
      standing: "Superseded",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Release status"
        title="Where LynxDock releases stand."
        intro={
          <p>
            {s.nextRelease.statement} {s.generation.meaning} Earlier published releases, with their checksums, are in
            the{" "}
            <Link href="/beta/#archive" className="text-link">
              tester hub&rsquo;s archive
            </Link>
            .
          </p>
        }
      />

      <section aria-labelledby="now-title" className="section">
        <div className="wrap">
          <h2 id="now-title" className="h-section">
            Now
          </h2>
          <p className="small mt-2">As of {s.asOfLabel}.</p>
          <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start">
            <NextReleaseCard headingLevel={3} idBase="releases-next" />
            <div className="flex flex-col gap-4">
              <div className="card">
                <p className="eyebrow">Earlier release, still published</p>
                <h3 className="h-card mt-2 text-[1.3rem]">LynxDock {r026.version}</h3>
                <p className="small mt-2">
                  Signed installers for the app and Host, published on {fmtDate(r026.date)} for invited testers. It
                  is in the tester hub&rsquo;s dated archive.
                </p>
                <Link href="/beta/#release-0-2-6" className="arrow-link mt-1">
                  The release archive <span aria-hidden="true">→</span>
                </Link>
              </div>
              <div className="card-notice">
                <p className="text-base font-bold text-[#ecd6a8]">{s.pushToTalk.heading}</p>
                <p className="small mt-1.5">{s.pushToTalk.statement}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="history-title" className="section section-band">
        <div className="wrap">
          <h2 id="history-title" className="h-section">
            History
          </h2>
          <p className="body mt-3 max-w-3xl">
            Published rounds stay on record so an install can be identified. Superseded rounds are not offered for
            download.
          </p>
          <div
            tabIndex={0}
            role="region"
            aria-label="Release history table"
            className="mt-6 overflow-x-auto rounded-[var(--radius)] border border-line"
          >
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <caption className="sr-only">LynxDock release history, newest first</caption>
              <thead>
                <tr className="border-b border-line text-[0.8125rem] text-[#8d9da6]">
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Release
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Standing
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.name} className="border-b border-line/70 align-top last:border-b-0">
                    <td className="mono whitespace-nowrap px-4 py-3 text-[0.8125rem] text-muted">
                      {r.date ? <time dateTime={r.date}>{r.date}</time> : "Not yet"}
                    </td>
                    <th scope="row" className="px-4 py-3 font-semibold text-ink">
                      {r.name}
                      <span className="block text-[0.8125rem] font-normal text-muted">{r.detail}</span>
                    </th>
                    <td className="px-4 py-3 text-[#d7e1e5]">{r.standing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section aria-labelledby="process-title" className="section">
        <div className="wrap-narrow">
          <h2 id="process-title" className="h-section">
            How a release becomes available
          </h2>
          <p className="body mt-3">Before a release&rsquo;s installers appear in the tester hub:</p>
          <ol className="num-list body mt-5">
            <li>The exact source is fixed and its automated checks pass.</li>
            <li>The installers are built and signed, and the signed files themselves are tested.</li>
            <li>People test it hands-on, with real listeners for voice.</li>
            <li>
              The files are uploaded, the downloaded bytes are checked against their SHA-256, and only then is the
              page updated.
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
