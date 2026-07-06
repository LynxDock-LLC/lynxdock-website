// Generated from GSpec. Do not edit manually.
// Source: gspec/modules/releases.yaml
// Regenerate with: lynxdock-bootstrap  ->  npm run generate

export type ReleaseChannel = "nightly" | "alpha" | "beta" | "stable";

export type CurrentRelease = {
  version: string;
  channel: ReleaseChannel;
  released: boolean;
  releaseDate: string | null;
  notesUrl: string;
  docsUrl: string;
  githubUrl: string;
};

export type ChannelInfo = { id: ReleaseChannel; label: string; description: string };
export type PlatformInfo = { id: string; label: string };
export type Download = {
  platform: string;
  filename: string;
  url: string;
  sha256: string;
  size: string;
  available: boolean;
};
export type ReleaseHistoryEntry = {
  version: string;
  channel: string;
  releaseDate: string | null;
  notesUrl: string;
};

export type Releases = {
  current: CurrentRelease;
  channels: ChannelInfo[];
  platforms: PlatformInfo[];
  downloads: Download[];
  history: ReleaseHistoryEntry[];
};

export const releases: Releases = {
  current: {
    version: "0.1.0-alpha",
    channel: "alpha",
    released: false,
    releaseDate: null,
    notesUrl: "",
    docsUrl: "/docs/",
    githubUrl: "https://github.com/LynxDock-LLC",
  },
  channels: [
  { id: "nightly", label: "Nightly", description: "Bleeding-edge automated builds - expect rough edges." },
  { id: "alpha", label: "Alpha", description: "Early builds for testing core features." },
  { id: "beta", label: "Beta", description: "Feature-complete builds nearing stable." },
  { id: "stable", label: "Stable", description: "Thoroughly tested production builds." },
  ],
  platforms: [
  { id: "windows", label: "Windows" },
  { id: "linux", label: "Linux" },
  { id: "macos", label: "macOS" },
  { id: "server", label: "Self-hosted server" },
  ],
  downloads: [
  { platform: "windows", filename: "LynxDockSetup.exe", url: "", sha256: "", size: "", available: false },
  { platform: "linux", filename: "LynxDock.AppImage", url: "", sha256: "", size: "", available: false },
  { platform: "macos", filename: "LynxDock.dmg", url: "", sha256: "", size: "", available: false },
  { platform: "server", filename: "lynxdock-server.tar.gz", url: "", sha256: "", size: "", available: false },
  ],
  history: [],
};

export default releases;
