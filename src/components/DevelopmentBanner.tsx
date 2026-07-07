// Slim, site-wide status strip communicating active V2 development.
export default function DevelopmentBanner() {
  const items = [
    "Version 2",
    "Active development",
    "Infrastructure complete",
    "Desktop application under construction",
  ];
  return (
    <div className="border-b border-line/60 bg-graphite-900/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-3 gap-y-1 px-5 py-2 text-[11px] sm:text-xs">
        <span className="flex items-center gap-2 font-medium text-signal-bright">
          <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-signal-cyan animate-pulse-soft" />
          {items[0]}
        </span>
        {items.slice(1).map((t) => (
          <span key={t} className="flex items-center gap-3 text-[#9fb2ba]">
            <span aria-hidden className="text-[#4a5c64]">·</span>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
