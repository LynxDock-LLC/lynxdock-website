import Image from "next/image";
import type { Shot as ShotData } from "@/data/screenshots";

/** A real screenshot with explicit dimensions, an honest label and a caption. Lazy unless `priority`. */
export default function Shot({
  shot,
  priority = false,
  sizes = "(min-width: 1240px) 1100px, 100vw",
  caption = true,
  className = "",
}: {
  shot: ShotData;
  priority?: boolean;
  sizes?: string;
  caption?: boolean | string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div className="shot relative">
        <Image
          src={shot.src}
          width={shot.width}
          height={shot.height}
          alt={shot.alt}
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
        <span className="label-chip absolute left-3 top-3">{shot.label}</span>
      </div>
      {caption !== false && (
        <figcaption className="caption">{typeof caption === "string" ? caption : shot.caption}</figcaption>
      )}
    </figure>
  );
}
