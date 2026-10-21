import siteStatus, { formatBytes, type ReleaseRecord } from "@/data/siteStatus";

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export { fmtDate };

/** "Next release in qualification" with a clearly unavailable installer. */
export function NextReleaseCard({ headingLevel = 2, idBase = "next-release" }: { headingLevel?: 2 | 3; idBase?: string }) {
  const n = siteStatus.nextRelease;
  const noteId = `${idBase}-unavailable`;
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="card-teal">
      <div className="flex flex-wrap items-center gap-2">
        <span className="badge badge-warn">
          <span className="dot" aria-hidden="true" />
          In qualification
        </span>
        <span className="badge">Not approved</span>
      </div>
      <H className="h-card mt-4 text-[1.35rem]">{n.heading}</H>
      <p className="body mt-2">{n.statement}</p>
      <dl className="kv mt-5">
        <div>
          <dt>Generation</dt>
          <dd>V8 (a development generation, not a version number)</dd>
        </div>
        <div>
          <dt>Version</dt>
          <dd>Provisionally {n.provisionalVersion}; not final</dd>
        </div>
        <div>
          <dt>Push-to-talk</dt>
          <dd>Foreground-only; background push-to-talk is separate work</dd>
        </div>
      </dl>
      <div className="mt-6">
        <button type="button" className="btn" disabled aria-describedby={noteId}>
          Installer unavailable
        </button>
        <p id={noteId} className="small mt-2">
          There is nothing to download for the next release yet. Installers appear here only once a release is
          approved and published.
        </p>
      </div>
    </div>
  );
}

/** Every limitation in body text, never only as a label. */
export function LimitationsList({ headingLevel = 3 }: { headingLevel?: 3 | 4 }) {
  const H = headingLevel === 3 ? "h3" : "h4";
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {siteStatus.limitations.map((l, i) => (
        <li key={l.title} className={i === 0 ? "card-notice md:col-span-2" : "card-quiet"}>
          <H className={`text-base font-bold ${i === 0 ? "text-[#ecd6a8]" : "text-ink"}`}>{l.title}</H>
          <p className="small mt-1.5">{l.text}</p>
        </li>
      ))}
    </ul>
  );
}

/**
 * One release's identity and its artifacts. Download links appear only for a release whose installers are
 * published on this site and re-verified (`downloadsOnThisSite`).
 */
export function ReleaseArtifacts({ r, caption }: { r: ReleaseRecord; caption: string }) {
  return (
    // A focusable, labelled region so keyboard users can scroll the table sideways on narrow screens.
    <div tabIndex={0} role="region" aria-label={caption} className="overflow-x-auto rounded-[var(--radius)] border border-line">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line text-[0.8125rem] text-[#8d9da6]">
            <th scope="col" className="px-4 py-3 font-semibold">
              Installer
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              Format and size
            </th>
            <th scope="col" className="px-4 py-3 font-semibold">
              SHA-256
            </th>
          </tr>
        </thead>
        <tbody>
          {r.artifacts.map((a) => (
            <tr key={a.filename} className="border-b border-line/70 align-top last:border-b-0">
              <th scope="row" className="px-4 py-3 font-semibold text-ink">
                <span className="block">{a.product === "desktop" ? "LynxDock app" : "LynxDock Host"}</span>
                <span className="mono block break-all text-[0.78rem] font-normal text-muted">{a.filename}</span>
                {r.downloadsOnThisSite && a.url ? (
                  <a
                    href={a.url}
                    data-beta-download=""
                    data-filename={a.filename}
                    data-sha256={a.sha256}
                    data-size={a.sizeBytes}
                    className="text-link mt-1 inline-flex min-h-[40px] items-center text-[0.875rem]"
                    rel="noreferrer"
                  >
                    Download<span className="sr-only"> {a.filename}</span>
                  </a>
                ) : (
                  <span className="mt-1 block text-[0.8125rem] font-normal text-[#8d9da6]">Not downloadable here</span>
                )}
              </th>
              <td className="px-4 py-3 text-muted">
                {a.format === "msi" ? "Windows Installer (.msi)" : "Windows setup (.exe)"}
                <span className="block text-[0.8125rem]">{formatBytes(a.sizeBytes)}</span>
                <span className="block text-[0.8125rem]">{a.signed ? `Signed: ${r.publisher}` : "Unsigned"}</span>
              </td>
              <td className="mono break-all px-4 py-3 text-[0.78rem] leading-relaxed text-[#c3ced3]">{a.sha256}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Compact identity rows for a release record. */
export function ReleaseIdentity({ r }: { r: ReleaseRecord }) {
  return (
    <dl className="kv">
      <div>
        <dt>Version and tag</dt>
        <dd>
          {r.version} <span className="mono text-[0.8125rem] font-normal text-muted">({r.tag})</span>
        </dd>
      </div>
      <div>
        <dt>{r.dateLabel}</dt>
        <dd>{fmtDate(r.date)}</dd>
      </div>
      <div>
        <dt>Source commit</dt>
        <dd className="mono break-all text-[0.8125rem]">{r.sourceCommit}</dd>
      </div>
      <div>
        <dt>Publisher</dt>
        <dd>{r.signed ? `${r.publisher} (Authenticode-signed, timestamped)` : "Unsigned"}</dd>
      </div>
      <div>
        <dt>Downloads on this site</dt>
        <dd>{r.downloadsOnThisSite ? "Yes" : "No"}</dd>
      </div>
      <div>
        <dt>Record</dt>
        <dd className="text-[0.8125rem] font-normal text-muted">{r.provenance}</dd>
      </div>
    </dl>
  );
}
