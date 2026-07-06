// Generated from GSpec. Do not edit manually.
// Source: gspec/modules/website.yaml (launch)
// Regenerate with: lynxdock-bootstrap  ->  npm run generate

export type LaunchCta = { label: string; href: string };
export type DownloadState = "coming-soon" | "alpha" | "beta" | "released";
export type DownloadStatus = {
  state: DownloadState;
  title: string;
  heading: string;
  message: string;
};
export type EarlyAccess = {
  enabled: boolean;
  title: string;
  description: string;
  buttonLabel: string;
  successMessage: string;
  placeholderEmail: string;
};
export type Launch = {
  primaryCTA: LaunchCta;
  secondaryCTA: LaunchCta;
  githubCTA: LaunchCta;
  documentationCTA: LaunchCta;
  earlyAccessCTA: LaunchCta;
  downloadStatus: DownloadStatus;
  earlyAccess: EarlyAccess;
};

export const launch: Launch = {
  primaryCTA: { label: "Download", href: "/download/" },
  secondaryCTA: { label: "View Roadmap", href: "/roadmap/" },
  githubCTA: { label: "GitHub", href: "https://github.com/LynxDock-LLC" },
  documentationCTA: { label: "Documentation", href: "/docs/" },
  earlyAccessCTA: { label: "Join Early Access", href: "/support/#early-access" },
  downloadStatus: {
    state: "coming-soon",
    title: "Development Preview",
    heading: "Public downloads aren't available yet",
    message: "Public downloads will become available when the first alpha release is published.",
  },
  earlyAccess: {
    enabled: true,
    title: "Join Early Access",
    description: "Receive alpha builds, development updates, and invitations to private testing.",
    buttonLabel: "Request Access",
    successMessage: "Thanks for joining LynxDock Early Access.",
    placeholderEmail: "you@example.com",
  },
};

export default launch;
