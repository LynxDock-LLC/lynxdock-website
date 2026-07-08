// Mirrors the @lynxdock/protocol `SystemStatus` contract (ADR-0015). The website
// is a separate repo, so the types + helpers are duplicated here; the canonical
// source of truth is `status.json`, produced by `pnpm gen:status` in the app
// monorepo and synced into `src/data/status.ts` on release.

export type ComponentHealth = "operational" | "degraded" | "down" | "unknown";

export type ComponentStatus = {
  id: string;
  name: string;
  health: ComponentHealth;
  version: string | null;
  lastRelease: string | null;
  repo: string | null;
  notes: string | null;
};

export type SystemStatus = {
  generatedAt: string;
  overall: ComponentHealth;
  components: ComponentStatus[];
};

export function healthLabel(health: ComponentHealth): string {
  switch (health) {
    case "operational":
      return "Operational";
    case "degraded":
      return "Degraded";
    case "down":
      return "Down";
    default:
      return "Unknown";
  }
}

export function healthColor(health: ComponentHealth): string {
  switch (health) {
    case "operational":
      return "#3fb950";
    case "degraded":
      return "#d29922";
    case "down":
      return "#f85149";
    default:
      return "#8b949e";
  }
}
