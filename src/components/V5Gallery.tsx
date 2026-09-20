import Image from "next/image";
import GlassPanel from "@/components/GlassPanel";
import { v5Gallery, v5GalleryNote, type GalleryShot } from "@/data/v5Gallery";

/**
 * V5 closed-beta screenshot gallery. Same Genesis components as the rest of the site
 * (GlassPanel + next/image + the muted caption line used by the tactical shots on the home page);
 * no new dependencies, no lightbox. Wide shots (the board, the overlay strips) take the full width,
 * everything else pairs up on desktop and stacks on mobile.
 */
function Shot({ shot }: { shot: GalleryShot }) {
  return (
    <GlassPanel className="overflow-hidden p-2 sm:p-3">
      <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} className="w-full rounded-lg" />
      <h3 className="px-2 pt-3 text-sm font-semibold text-white">{shot.title}</h3>
      <p className="px-2 pb-2 pt-1 text-xs leading-relaxed text-[#7d919a]">{shot.caption}</p>
    </GlassPanel>
  );
}

export default function V5Gallery({ shots = v5Gallery, note = true }: { shots?: GalleryShot[]; note?: boolean }) {
  // Preserve order; wide shots break the two-column flow.
  const groups: GalleryShot[][] = [];
  for (const shot of shots) {
    const last = groups[groups.length - 1];
    if (shot.wide || !last || last[0]?.wide || last.length === 2) groups.push([shot]);
    else last.push(shot);
  }
  return (
    <div className="flex flex-col gap-6">
      {note && (
        <p className="max-w-3xl text-sm leading-relaxed text-[#9fb2ba]">
          <span className="hud-label mr-2 text-signal-bright">Staged demonstration</span>
          {v5GalleryNote}
        </p>
      )}
      {groups.map((g) =>
        g.length === 1 ? (
          <Shot key={g[0]!.src} shot={g[0]!} />
        ) : (
          <div key={g[0]!.src} className="grid gap-6 lg:grid-cols-2">
            {g.map((s) => (
              <Shot key={s.src} shot={s} />
            ))}
          </div>
        ),
      )}
    </div>
  );
}
