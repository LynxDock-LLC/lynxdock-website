import Image from "next/image";

export type Shot = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  width: number;
  height: number;
};

function WindowChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-line/70 bg-graphite-900/70 px-4 py-2.5">
      <span aria-hidden className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-graphite-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-graphite-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-signal-cyan/50" />
      </span>
      <span className="ml-2 hud-label text-[#7f939b]">{label}</span>
    </div>
  );
}

function Frame({ shot, priority = false }: { shot: Shot; priority?: boolean }) {
  return (
    <figure className="glass group overflow-hidden rounded-2xl shadow-panel transition-all duration-300 hover:border-signal-cyan/30 hover:shadow-[0_0_60px_-20px_rgba(53,224,224,0.4)]">
      <WindowChrome label={shot.label} />
      <div className="relative bg-graphite-950">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          priority={priority}
          sizes="(max-width: 768px) 100vw, 60vw"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="border-t border-line/60 px-4 py-3 text-sm text-[#9fb2ba]">
        {shot.caption}
      </figcaption>
    </figure>
  );
}

export default function ScreenshotShowcase({ shots }: { shots: Shot[] }) {
  const [primary, ...rest] = shots;
  return (
    <div className="flex flex-col gap-6">
      {primary && (
        <div className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-3xl bg-signal-cyan/5 blur-3xl"
          />
          <div className="relative">
            <Frame shot={primary} priority />
          </div>
        </div>
      )}
      {rest.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((shot) => (
            <Frame key={shot.src} shot={shot} />
          ))}
        </div>
      )}
    </div>
  );
}
