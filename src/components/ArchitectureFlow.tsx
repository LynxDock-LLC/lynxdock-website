type Node = { label: string; note: string; done?: boolean };

function Flow({ title, nodes }: { title: string; nodes: Node[] }) {
  return (
    <div>
      <span className="hud-label text-[#7f939b]">{title}</span>
      <ol className="mt-4 flex flex-col gap-2">
        {nodes.map((n, i) => (
          <li key={n.label} className="flex flex-col items-center gap-2">
            <div className="glass w-full rounded-xl px-4 py-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-white">{n.label}</span>
                {n.done && (
                  <span className="rounded-full border border-signal-cyan/40 bg-signal-cyan/10 px-2 py-0.5 text-[10px] font-medium text-signal-bright">
                    shipped
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs leading-relaxed text-[#9fb2ba]">{n.note}</p>
            </div>
            {i < nodes.length - 1 && (
              <span aria-hidden className="text-signal-cyan/60">↓</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

const infra: Node[] = [
  { label: "GSpec", note: "The Genesis Specification — one versioned source of truth in YAML + JSON Schema.", done: true },
  { label: "Bootstrap", note: "The compiler: parse → validate → IR → generate ecosystem artifacts.", done: true },
  { label: "Release Tools", note: "Turns a GitHub release into a signed releases manifest.", done: true },
  { label: "Website", note: "This static site, consuming generated data.", done: true },
];

const monorepo: Node[] = [
  { label: "shared", note: "Base types, helpers, logging, config, errors.", done: true },
  { label: "protocol", note: "Canonical wire types, generated Rust ↔ TypeScript via ts-rs.", done: true },
  { label: "genesis-ui", note: "The component framework: tokens, theme engine, Tailwind preset.", done: true },
  { label: "desktop", note: "Tauri app: workspace, identity, settings, local messaging.", done: true },
  { label: "studio", note: "GSpec Studio — in-browser spec validation.", done: true },
  { label: "plugins", note: "Plugin SDK: manifest + capability model.", done: true },
  { label: "ai", note: "Agent & tool contracts.", done: true },
];

export default function ArchitectureFlow() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <Flow title="Infrastructure (V1)" nodes={infra} />
      <Flow title="Product monorepo (V2)" nodes={monorepo} />
    </div>
  );
}
