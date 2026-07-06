import Image from "next/image";

// A framed, "alive" presentation of the Mission Control screen with subtle
// tactical overlays. Motion is decorative and disabled under reduced-motion
// (handled globally in globals.css).
export default function MissionControlShowcase({
  priority = false,
}: {
  priority?: boolean;
}) {
  return (
    <figure className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-3xl bg-signal-cyan/5 blur-3xl"
      />
      <div className="glass relative overflow-hidden rounded-2xl shadow-panel">
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-line/70 bg-graphite-900/70 px-4 py-2.5">
          <span aria-hidden className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-graphite-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-graphite-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal-cyan/50" />
          </span>
          <span className="hud-label flex items-center gap-2 text-[#7f939b]">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-blink"
            />
            Mission Active
          </span>
          <span className="ml-auto flex items-center gap-1.5 rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-0.5">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-signal-bright animate-pulse-soft"
            />
            <span className="hud-label text-signal-bright">Live</span>
          </span>
        </div>

        {/* screenshot */}
        <div className="relative bg-graphite-950">
          <Image
            src="/screenshots/mission-control.webp"
            alt="LynxDock Mission Control: a commander dashboard with wing readiness, a live command tree, and a member roster"
            width={1600}
            height={1044}
            priority={priority}
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="h-auto w-full"
          />

          {/* tactical overlays */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {/* radar sweep, bottom-right */}
            <div className="absolute bottom-4 right-4 h-24 w-24 overflow-hidden rounded-full border border-signal-cyan/20">
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(53,224,224,0.10),transparent_70%)]" />
              <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 origin-top-left animate-radar-sweep bg-[conic-gradient(from_0deg,rgba(94,242,242,0.35),transparent_35%)]" />
            </div>
            {/* pinging voice-activity markers */}
            <span className="absolute left-[18%] top-[36%]">
              <span className="absolute inline-flex h-3 w-3 animate-ping-ring rounded-full bg-signal-cyan/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal-bright" />
            </span>
            <span className="absolute left-[62%] top-[28%]">
              <span className="absolute inline-flex h-3 w-3 animate-ping-ring rounded-full bg-emerald-400/50" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
            </span>
            {/* corner HUD ticks */}
            <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-signal-cyan/30" />
            <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-signal-cyan/30" />
            <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-signal-cyan/30" />
          </div>
        </div>

        <figcaption className="border-t border-line/60 px-4 py-3 text-sm text-[#9fb2ba]">
          Mission Control - organize people into wings and squadrons with a live
          command tree, objectives, orders, and ready checks.
        </figcaption>
      </div>
    </figure>
  );
}
