import type { RoadmapPhase } from "@/data/roadmap";

const statusStyles: Record<RoadmapPhase["status"], string> = {
  shipped: "border-signal-cyan/50 bg-signal-cyan/15 text-signal-bright",
  active: "border-signal-blue/50 bg-signal-blue/15 text-[#93c5fd]",
  planned: "border-line bg-graphite-700/40 text-[#9fb2ba]",
};

const statusLabel: Record<RoadmapPhase["status"], string> = {
  shipped: "Shipped",
  active: "In Progress",
  planned: "Planned",
};

export default function RoadmapTimeline({
  phases,
}: {
  phases: RoadmapPhase[];
}) {
  return (
    <ol className="relative flex flex-col gap-8">
      <span
        aria-hidden
        className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-signal-cyan/40 via-line to-transparent"
      />
      {phases.map((phase) => (
        <li key={phase.phase} className="relative pl-9">
          <span
            aria-hidden
            className={`absolute left-0 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
              phase.status === "planned"
                ? "border-graphite-600 bg-graphite-800"
                : "border-signal-cyan bg-signal-cyan/30 shadow-glow"
            }`}
          />
          <div className="flex flex-wrap items-center gap-3">
            <span className="hud-label text-[#7f939b]">{phase.phase}</span>
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusStyles[phase.status]}`}
            >
              {statusLabel[phase.status]}
            </span>
          </div>
          <h3 className="mt-2 text-base font-semibold text-white">
            {phase.title}
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-[#9fb2ba]">
            {phase.description}
          </p>
          {phase.items && phase.items.length > 0 && (
            <ul className="mt-3 flex flex-col gap-1.5">
              {phase.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-[#8da3ad]"
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-1 w-1 flex-none rounded-full bg-signal-cyan/60"
                  />
                  {item}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  );
}
