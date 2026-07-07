import type { Epic, EpicStatus } from "@/data/epics";

const statusStyles: Record<EpicStatus, string> = {
  completed: "border-signal-cyan/50 bg-signal-cyan/15 text-signal-bright",
  "in-progress": "border-signal-blue/50 bg-signal-blue/15 text-[#93c5fd]",
  planned: "border-line bg-graphite-700/40 text-[#9fb2ba]",
};

const statusLabel: Record<EpicStatus, string> = {
  completed: "Completed",
  "in-progress": "In Progress",
  planned: "Planned",
};

export default function EpicRoadmap({ epics }: { epics: Epic[] }) {
  return (
    <ol className="relative flex flex-col gap-6">
      <span
        aria-hidden
        className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-signal-cyan/40 via-line to-transparent"
      />
      {epics.map((epic) => (
        <li key={epic.n} className="relative pl-9">
          <span
            aria-hidden
            className={`absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
              epic.status === "planned"
                ? "border-graphite-600 bg-graphite-800"
                : "border-signal-cyan bg-signal-cyan/30 shadow-glow"
            }`}
          />
          <div className="flex flex-wrap items-center gap-3">
            <span className="hud-label text-[#7f939b]">{epic.n}</span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[epic.status]}`}
            >
              {statusLabel[epic.status]}
            </span>
          </div>
          <h3 className="mt-2 text-base font-semibold text-white">{epic.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-[#9fb2ba]">{epic.description}</p>
          {epic.highlights.length > 0 && (
            <ul className="mt-3 flex flex-col gap-1.5">
              {epic.highlights.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-[#8da3ad]">
                  <span aria-hidden className="mt-1.5 h-1 w-1 flex-none rounded-full bg-signal-cyan/60" />
                  {item}
                </li>
              ))}
            </ul>
          )}
          {epic.future && (
            <p className="mt-3 text-xs leading-relaxed text-[#7f939b]">
              <span className="text-[#9fb2ba]">Next: </span>
              {epic.future}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
