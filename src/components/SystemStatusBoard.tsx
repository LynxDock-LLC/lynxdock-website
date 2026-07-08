import GlassPanel from "./GlassPanel";
import { healthColor, healthLabel, type SystemStatus } from "@/lib/status";

/** Renders the shared SystemStatus contract (ADR-0015): one source of truth for
 *  each component's health + shipped version. */
export default function SystemStatusBoard({ status }: { status: SystemStatus }) {
  return (
    <GlassPanel className="p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">System status</h3>
        <span className="inline-flex items-center gap-2 text-sm text-[#9fb2ba]">
          <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: healthColor(status.overall) }} />
          {healthLabel(status.overall)}
        </span>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {status.components.map((c) => (
          <li key={c.id} className="flex items-start gap-3 rounded-xl border border-line/60 p-4">
            <span aria-hidden className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: healthColor(c.health) }} />
            <div className="min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="font-medium text-white">{c.name}</span>
                {c.version && <span className="text-xs text-[#7f939b]">v{c.version}</span>}
              </div>
              <div className="text-xs text-[#9fb2ba]">{healthLabel(c.health)}</div>
              {c.notes && <div className="mt-1 text-xs text-[#7f939b]">{c.notes}</div>}
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-[#7f939b]">
        Generated {new Date(status.generatedAt).toISOString().slice(0, 10)} · one source of truth (ADR-0015)
      </p>
    </GlassPanel>
  );
}
