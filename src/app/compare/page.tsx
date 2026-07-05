import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import GlassPanel from "@/components/GlassPanel";
import GlowButton from "@/components/GlowButton";

export const metadata: Metadata = {
  title: "LynxDock vs Discord",
  description:
    "How LynxDock compares to Discord for organized communities: self-hosting, data ownership, and a built-in tactical operations center.",
};

type Cell = boolean | string;
type Row = { feature: string; lynxdock: Cell; discord: Cell };

const rows: Row[] = [
  { feature: "Self-hostable", lynxdock: true, discord: false },
  { feature: "You host and own the server", lynxdock: true, discord: false },
  { feature: "Your data stays on your infrastructure", lynxdock: "Your servers", discord: "Their servers" },
  { feature: "Mission Control (command tree, wings, objectives)", lynxdock: true, discord: false },
  { feature: "Ready checks & orders", lynxdock: true, discord: false },
  { feature: "Quick calls without an account", lynxdock: true, discord: false },
  { feature: "Voice, chat & screen sharing", lynxdock: true, discord: true },
  { feature: "Open, built in the open", lynxdock: true, discord: false },
  { feature: "No advertising", lynxdock: true, discord: true },
  { feature: "Lightweight by design", lynxdock: true, discord: "Varies" },
];

function Mark({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-signal-bright">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <span className="sr-only">Yes</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[#6f838b]">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
        <span className="sr-only">No</span>
      </span>
    );
  }
  return <span className="text-sm text-[#9fb2ba]">{value}</span>;
}

export default function ComparePage() {
  return (
    <>
      <PageHeader
        eyebrow="Comparison"
        title="LynxDock vs Discord"
        description="Discord is great for casual chat. LynxDock is built for communities that organize, brief, and move together - and that want to own their own space."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <GlowButton href="/mission-control/" variant="primary">
            See Mission Control
          </GlowButton>
          <GlowButton href="/products/lynxdock/" variant="secondary">
            About LynxDock
          </GlowButton>
        </div>
      </PageHeader>

      <section className="mx-auto max-w-4xl px-5 py-16">
        {/* Desktop / tablet table */}
        <GlassPanel className="hidden overflow-hidden p-0 sm:block">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-line/70 bg-graphite-900/60">
                <th className="px-5 py-4 text-sm font-semibold text-white">
                  Capability
                </th>
                <th className="px-5 py-4 text-center text-sm font-semibold text-signal-cyan">
                  LynxDock
                </th>
                <th className="px-5 py-4 text-center text-sm font-semibold text-[#9fb2ba]">
                  Discord
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.feature}
                  className={i % 2 ? "bg-graphite-900/20" : ""}
                >
                  <td className="px-5 py-3.5 text-sm text-[#c3d0d6]">
                    {r.feature}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span className="inline-flex justify-center">
                      <Mark value={r.lynxdock} />
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span className="inline-flex justify-center">
                      <Mark value={r.discord} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassPanel>

        {/* Mobile stacked */}
        <div className="flex flex-col gap-4 sm:hidden">
          {rows.map((r) => (
            <GlassPanel key={r.feature} className="p-4">
              <p className="text-sm font-medium text-white">{r.feature}</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg border border-signal-cyan/20 bg-signal-cyan/5 px-3 py-2">
                  <p className="hud-label text-signal-cyan">LynxDock</p>
                  <div className="mt-1">
                    <Mark value={r.lynxdock} />
                  </div>
                </div>
                <div className="rounded-lg border border-line px-3 py-2">
                  <p className="hud-label text-[#8da3ad]">Discord</p>
                  <div className="mt-1">
                    <Mark value={r.discord} />
                  </div>
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-[#6f838b]">
          Comparison reflects LynxDock&rsquo;s design goals as it is built in the
          open; capabilities are evolving. Discord is a trademark of its
          respective owner and is referenced here for comparison only. Not
          affiliated with or endorsed by Discord.
        </p>

        <GlassPanel glow className="mt-10 p-8 text-center sm:p-10">
          <span className="hud-label">The difference</span>
          <h2 className="mx-auto mt-3 max-w-xl text-2xl font-semibold text-white">
            Structure and ownership, not just another chat app
          </h2>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <GlowButton href="/support/#early-access" variant="primary">
              Request Early Access
            </GlowButton>
            <GlowButton href="/vision/" variant="secondary">
              Read the Vision
            </GlowButton>
          </div>
        </GlassPanel>
      </section>
    </>
  );
}
