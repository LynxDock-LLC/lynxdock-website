/**
 * The technical architecture as three independent connections from the desktop app:
 *   1. desktop -> Rust application server (application state, typed RPC over WebSocket);
 *   2. desktop -> LiveKit SFU (real-time media);
 *   3. desktop -> coturn -> LiveKit SFU (media via TURN when a relay is needed).
 * Media never passes through the Rust server, and these are participant-to-service connections, not
 * peer-to-peer rooms. Native HTML/CSS with inline SVG arrows; on narrow screens each connection is its own card
 * that names both ends.
 */
type Path = {
  n: number;
  name: string;
  detail: string;
  hops: { title: string; sub: string }[];
};

const PATHS: Path[] = [
  {
    n: 1,
    name: "Application state",
    detail: "Typed RPC over WebSocket: permissions, shared operation state, action revisions and persistent records.",
    hops: [{ title: "Rust application server", sub: "Permissions, operation state, records" }],
  },
  {
    n: 2,
    name: "Real-time media",
    detail: "Voice and screen-share tracks, distributed by the selective forwarding unit.",
    hops: [{ title: "LiveKit SFU", sub: "Voice and screen-share distribution" }],
  },
  {
    n: 3,
    name: "Media via TURN",
    detail: "Used when a direct connection to the media service needs help to get through the network.",
    hops: [
      { title: "coturn (TURN relay)", sub: "Relays the connection" },
      { title: "LiveKit SFU", sub: "Same media service" },
    ],
  },
];

function Arrow({ label }: { label?: string }) {
  return (
    <span className="flex min-w-[44px] flex-1 items-center" aria-hidden="true">
      <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="h-3 w-full" focusable="false">
        <line x1="0" y1="6" x2="94" y2="6" stroke="#5ce1df" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg viewBox="0 0 8 12" className="-ml-px h-3 w-2 flex-none" focusable="false">
        <path d="M0 1 L7 6 L0 11" fill="none" stroke="#5ce1df" strokeWidth="1.5" />
      </svg>
      {label && <span className="sr-only">{label}</span>}
    </span>
  );
}

export default function ArchitectureFigure() {
  return (
    <figure aria-labelledby="architecture-caption">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,2.4fr)] lg:items-center">
        <div className="card-teal flex flex-col gap-2 lg:min-h-[100%] lg:justify-center">
          <p className="eyebrow">On each member&rsquo;s PC</p>
          <p className="h-card">LynxDock desktop app</p>
          <p className="small">Rust and Tauri shell, React and TypeScript interface.</p>
          <p className="small">
            It opens <span className="strong">separate connections</span> to each service.
          </p>
        </div>

        <ol className="flex flex-col gap-3" aria-label="Separate connections from the desktop app">
          {PATHS.map((p) => (
            <li key={p.n} className="card-quiet bg-[rgba(16,25,31,0.6)]">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p className="text-[0.9375rem] font-bold text-ink">
                  <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-accent text-[0.75rem] text-accent">
                    {p.n}
                  </span>
                  {p.name}
                </p>
                <p className="text-[0.8125rem] font-semibold text-muted lg:hidden">
                  Desktop app → {p.hops.map((h) => h.title).join(" → ")}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="hidden flex-none rounded-lg border border-line px-3 py-2 text-[0.8125rem] font-semibold text-ink lg:inline-block">
                  Desktop app
                </span>
                <span className="hidden min-w-[56px] flex-1 lg:flex">
                  <Arrow />
                </span>
                {p.hops.map((h, i) => (
                  <span key={h.title} className="contents">
                    {i > 0 && (
                      <span className="flex min-w-[36px] max-w-[48px] flex-1 lg:max-w-[90px]">
                        <Arrow />
                      </span>
                    )}
                    <span className="flex-1 rounded-lg border border-[rgba(92,225,223,0.35)] bg-panel-2 px-3 py-2 lg:flex-none lg:basis-[13.5rem]">
                      <span className="block text-[0.875rem] font-bold text-ink">{h.title}</span>
                      <span className="block text-[0.78rem] leading-snug text-muted">{h.sub}</span>
                    </span>
                  </span>
                ))}
              </div>
              <p className="small mt-3">{p.detail}</p>
            </li>
          ))}
        </ol>
      </div>
      <figcaption id="architecture-caption" className="caption mt-4">
        Simplified architecture. Client media reaches LiveKit directly or through TURN; these are
        participant-to-service connections, not peer-to-peer rooms. To find a route, the apps also ask the connection
        helpers the server gives them: by default Google&rsquo;s public STUN server, which sees each member&rsquo;s IP
        address.
      </figcaption>
    </figure>
  );
}
