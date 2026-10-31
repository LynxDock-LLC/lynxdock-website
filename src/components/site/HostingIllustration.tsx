/**
 * Who connects to what. Members use the desktop app to connect to the community server; the administrator uses
 * LynxDock Host to manage that server. Host is not a hop on the members' connection. Native HTML and inline SVG:
 * three cards in a row on wide screens, stacked with explicit labels and vertical arrows on narrow ones.
 */
function Icon({ kind }: { kind: "members" | "server" | "admin" }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#5ce1df",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };
  if (kind === "members")
    return (
      <svg {...common}>
        <circle cx="8" cy="8" r="3" />
        <circle cx="16.5" cy="9" r="2.5" />
        <path d="M2.5 19c.6-3 2.8-5 5.5-5s4.9 2 5.5 5M13.5 15.2c.9-.8 1.9-1.2 3-1.2 2.3 0 4.1 1.7 4.6 4.5" />
      </svg>
    );
  if (kind === "server")
    return (
      <svg {...common}>
        <rect x="3.5" y="4" width="17" height="6.5" rx="1.5" />
        <rect x="3.5" y="13.5" width="17" height="6.5" rx="1.5" />
        <path d="M7.5 7.25h.01M7.5 16.75h.01M11 7.25h6M11 16.75h6" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 20c.8-3.6 3.4-6 6.5-6s5.7 2.4 6.5 6" />
      <path d="M17.5 4.5l1.2 1.2 2.3-2.3" />
    </svg>
  );
}

function Connector({ label, direction }: { label: string; direction: "right" | "left" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-1 py-3 lg:py-0">
      <span className="text-center text-[0.8125rem] font-semibold leading-snug text-ink">{label}</span>
      {/* Horizontal arrow on wide screens. */}
      <svg viewBox="0 0 120 12" className="hidden h-3 w-full max-w-[120px] lg:block" aria-hidden="true" focusable="false">
        <line x1="4" y1="6" x2="116" y2="6" stroke="#5ce1df" strokeWidth="1.5" strokeDasharray={direction === "left" ? "4 4" : undefined} />
        {direction === "right" ? (
          <path d="M108 1 L116 6 L108 11" fill="none" stroke="#5ce1df" strokeWidth="1.5" />
        ) : (
          <path d="M12 1 L4 6 L12 11" fill="none" stroke="#5ce1df" strokeWidth="1.5" />
        )}
      </svg>
      {/* Vertical arrow on narrow screens: members' arrow points down to the server, Host's points up to it. */}
      <svg viewBox="0 0 12 40" className="h-10 w-3 lg:hidden" aria-hidden="true" focusable="false">
        <line x1="6" y1="2" x2="6" y2="38" stroke="#5ce1df" strokeWidth="1.5" strokeDasharray={direction === "left" ? "4 4" : undefined} />
        {direction === "right" ? (
          <path d="M1 30 L6 38 L11 30" fill="none" stroke="#5ce1df" strokeWidth="1.5" />
        ) : (
          <path d="M1 10 L6 2 L11 10" fill="none" stroke="#5ce1df" strokeWidth="1.5" />
        )}
      </svg>
    </div>
  );
}

export default function HostingIllustration() {
  return (
    <figure aria-labelledby="hosting-figure-caption">
      <div className="grid items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(120px,0.45fr)_minmax(0,1.15fr)_minmax(120px,0.45fr)_minmax(0,1fr)]">
        <div className="card flex flex-col gap-3">
          <Icon kind="members" />
          <p className="eyebrow">Members</p>
          <p className="h-card">The LynxDock app</p>
          <p className="small">
            Everyone in the community installs the Windows desktop app and joins the server with an invitation.
          </p>
        </div>

        <Connector label="Members connect to the server with the app" direction="right" />

        <div className="card-teal flex flex-col gap-3 border-[rgba(92,225,223,0.35)]">
          <Icon kind="server" />
          <p className="eyebrow">Your community server</p>
          <p className="h-card">Runs on infrastructure you control</p>
          <p className="small">
            The application server keeps permissions, operations and records. Voice and screen sharing run on
            their own media services beside it.
          </p>
        </div>

        <Connector label="The administrator manages it with Host" direction="left" />

        <div className="card flex flex-col gap-3">
          <Icon kind="admin" />
          <p className="eyebrow">Administrator</p>
          <p className="h-card">LynxDock Host</p>
          <p className="small">
            A Windows companion for whoever runs the server: setup, start and stop, diagnostics, access and
            backups.
          </p>
        </div>
      </div>
      <figcaption id="hosting-figure-caption" className="caption mt-4">
        Simplified illustration. Members&rsquo; connections go to the community server, not through LynxDock
        Host; Host is the administrator&rsquo;s tool for managing that server.
      </figcaption>
    </figure>
  );
}
