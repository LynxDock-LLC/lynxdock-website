// A polished mockup of the real V2 desktop app (workspace sidebar + local
// messaging), built with Genesis styling. Grounded in shipped functionality:
// workspace, identity, settings, and local channels/messages.

const sidebarSections = ["Workspace", "Profile", "Settings"];
const channels = [
  { name: "general", unread: 0, active: true },
  { name: "dev", unread: 3, active: false },
  { name: "design", unread: 0, active: false },
];
const messages = [
  { author: "you", time: "2h", body: "Pushed the local messaging slice — edit + search work now.", edited: true },
  { author: "you", time: "1h", body: "Unread counts and day separators are in.", edited: false },
  { author: "you", time: "just now", body: "Next up: reactions and mentions.", edited: false },
];

export default function DesktopMockup() {
  return (
    <div className="relative">
      <div aria-hidden className="pointer-events-none absolute -inset-6 rounded-3xl bg-signal-cyan/5 blur-3xl" />
      <figure className="glass relative overflow-hidden rounded-2xl shadow-panel">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-line/70 bg-graphite-900/70 px-4 py-2.5">
          <span aria-hidden className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-graphite-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-graphite-600" />
            <span className="h-2.5 w-2.5 rounded-full bg-signal-cyan/50" />
          </span>
          <span className="ml-2 hud-label text-[#7f939b]">LynxDock — Desktop</span>
        </div>

        <div className="grid grid-cols-[150px_1fr] bg-graphite-950">
          {/* sidebar */}
          <div className="flex flex-col gap-1 border-r border-line/60 bg-graphite-900/50 p-3">
            <div className="mb-2 flex items-center gap-2">
              <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-lg bg-graphite-700 text-sm">🐆</span>
              <span className="truncate text-xs font-semibold text-white">My Workspace</span>
            </div>
            {sidebarSections.map((s, i) => (
              <span
                key={s}
                className={`rounded-md px-2 py-1 text-[11px] ${i === 0 ? "bg-graphite-800 text-signal-bright" : "text-[#9fb2ba]"}`}
              >
                {s}
              </span>
            ))}
            <span className="mt-3 px-1 text-[9px] uppercase tracking-wider text-[#5c7078]">Channels</span>
            {channels.map((c) => (
              <span
                key={c.name}
                className={`flex items-center justify-between rounded-md px-2 py-1 text-[11px] ${c.active ? "bg-graphite-800 text-signal-bright" : "text-[#9fb2ba]"}`}
              >
                <span># {c.name}</span>
                {c.unread > 0 && (
                  <span className="rounded-full bg-signal-cyan px-1 text-[9px] font-semibold text-graphite-950">{c.unread}</span>
                )}
              </span>
            ))}
          </div>

          {/* channel view */}
          <div className="flex min-h-[280px] flex-col">
            <div className="border-b border-line/60 px-4 py-2.5">
              <span className="hud-label text-signal-bright"># general</span>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <div className="text-center text-[9px] uppercase tracking-wider text-[#5c7078]">Today</div>
              {messages.map((m, i) => (
                <div key={i} className="text-xs">
                  <p className="text-[#cdd9de]">{m.body}</p>
                  <p className="text-[10px] text-[#5c7078]">
                    {m.author} · {m.time}
                    {m.edited ? " · edited" : ""}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 border-t border-line/60 p-3">
              <span className="flex-1 rounded-lg border border-line bg-graphite-900/70 px-3 py-1.5 text-[11px] text-[#5c7078]">
                Message #general
              </span>
              <span className="rounded-lg border border-signal-cyan/40 bg-signal-cyan/15 px-3 py-1.5 text-[11px] text-signal-bright">Send</span>
            </div>
          </div>
        </div>
      </figure>
    </div>
  );
}
