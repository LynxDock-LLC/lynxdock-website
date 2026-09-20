import Image from "next/image";

/**
 * A captioned screenshot for the illustrated guides. The inline image is a lossless WebP of the
 * untouched application capture; "Open full size" points at the original PNG so the reader can
 * inspect it at native resolution. `detail` renders a 1:1 crop of an original narrower, with a
 * thin frame, so it reads as a close-up of the figure above it rather than a new screen.
 */
export type GuideFigureProps = {
  src: string;
  /** Original PNG for full-size viewing; defaults to the same path with a .png extension under full/. */
  full?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  detail?: boolean;
  /** Who is looking at this screen (rendered as a small chip in the caption). */
  viewer?: string;
  id?: string;
};

export default function GuideFigure({ src, full, alt, caption, width, height, detail = false, viewer, id }: GuideFigureProps) {
  const fullHref = full ?? src.replace(/\/([^/]+)\.webp$/, "/full/$1.png");
  return (
    <figure id={id} className={`my-6 ${detail ? "mx-auto max-w-2xl" : ""}`}>
      <a
        href={fullHref}
        target="_blank"
        rel="noopener"
        className={`block overflow-hidden rounded-xl border ${detail ? "border-signal-cyan/25" : "border-line"} bg-graphite-900/60`}
        aria-label={`Open full size: ${alt}`}
      >
        <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" sizes="(min-width: 1024px) 800px, 100vw" />
      </a>
      <figcaption className="mt-2 flex flex-col gap-1 px-1 text-xs leading-relaxed text-[#7d919a] sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <span>
          {viewer && <span className="hud-label mr-2 text-[0.62rem] text-signal-bright">{viewer}</span>}
          {caption}
        </span>
        <a href={fullHref} target="_blank" rel="noopener" className="shrink-0 whitespace-nowrap text-signal-bright underline underline-offset-2">
          Open full size ↗
        </a>
      </figcaption>
    </figure>
  );
}
