import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";
import { releases } from "@/data/releases";
import { releaseManifest } from "@/lib/releaseManifest";

export const metadata: Metadata = {
  title: "Releases",
  description:
    "LynxDock release history - the current build, release channels, and past versions.",
};

const current = releaseManifest.current;
const githubUrl = current.githubUrl || releases.current.githubUrl;
const docsUrl = current.docsUrl || releases.current.docsUrl;

function formatDate(iso: string | null): string {
  if (!iso) return "Unreleased";
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ReleasesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Releases"
        title="Release history"
        description="The current LynxDock build, the channels we ship on, and past versions as they land."
      />

      <section className="mx-auto max-w-4xl px-5 py-16">
        {/* CURRENT RELEASE */}
        <GlassPanel glow className="p-8 sm:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="hud-label text-signal-bright">Current</span>
            <span className="rounded-full border border-signal-cyan/25 bg-signal-cyan/5 px-2.5 py-0.5 text-xs font-medium text-[#c3d0d6]">
              {current.channel}
            </span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                current.released
                  ? "border-signal-cyan/50 bg-signal-cyan/15 text-signal-bright"
                  : "border-line bg-graphite-800/40 text-[#9fb2ba]"
              }`}
            >
              {current.released ? "Released" : "In development"}
            </span>
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            LynxDock {current.version}
          </h2>
          <p className="mt-2 text-sm text-[#9fb2ba]">
            {current.released
              ? `Released ${formatDate(current.releaseDate)}`
              : "Not yet released - follow along as the first build takes shape."}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <GlowButton href="/download/" variant="primary">
              Download
            </GlowButton>
            <GlowButton href={githubUrl} external variant="secondary">
              GitHub
            </GlowButton>
            <GlowButton href={docsUrl} variant="ghost">
              Documentation
            </GlowButton>
          </div>
        </GlassPanel>

        {/* CHANNELS */}
        <h2 className="mb-6 mt-16 text-xl font-semibold text-white">Channels</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {releases.channels.map((c) => (
            <GlassPanel key={c.id} className="p-6">
              <div className="flex items-center gap-3">
                <h3 className="text-base font-semibold text-white">{c.label}</h3>
                {c.id === current.channel && (
                  <span className="rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-signal-bright">
                    Current
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#9fb2ba]">
                {c.description}
              </p>
            </GlassPanel>
          ))}
        </div>

        {/* HISTORY */}
        <h2 className="mb-6 mt-16 text-xl font-semibold text-white">
          Past releases
        </h2>
        {releases.history.length === 0 ? (
          <GlassPanel className="p-8 text-center">
            <p className="text-sm leading-relaxed text-[#9fb2ba]">
              No public releases yet. Release notes will appear here as builds
              ship.
            </p>
          </GlassPanel>
        ) : (
          <GlassPanel className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[520px] text-left text-sm">
                <caption className="sr-only">Past LynxDock releases</caption>
                <thead>
                  <tr className="border-b border-line/70 text-[#7f939b]">
                    <th scope="col" className="px-5 py-3 font-medium">Version</th>
                    <th scope="col" className="px-5 py-3 font-medium">Channel</th>
                    <th scope="col" className="px-5 py-3 font-medium">Date</th>
                    <th scope="col" className="px-5 py-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {releases.history.map((h) => (
                    <tr key={h.version} className="border-b border-line/40 last:border-b-0">
                      <th scope="row" className="px-5 py-3 font-medium text-white">
                        {h.version}
                      </th>
                      <td className="px-5 py-3 text-[#c3d0d6]">{h.channel}</td>
                      <td className="px-5 py-3 text-[#9fb2ba]">{formatDate(h.releaseDate)}</td>
                      <td className="px-5 py-3">
                        {h.notesUrl ? (
                          <a
                            href={h.notesUrl}
                            className="text-signal-bright hover:underline"
                          >
                            Release notes
                          </a>
                        ) : (
                          <span className="text-[#6f838b]">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassPanel>
        )}
      </section>
    </>
  );
}
