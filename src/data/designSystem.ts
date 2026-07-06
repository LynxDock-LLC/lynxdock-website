// Generated from GSpec. Do not edit manually.
// Source: gspec/modules/design.yaml
// Regenerate with: lynxdock-bootstrap  ->  npm run generate

export const colors = {
  bg: "#05090c",
  bgElevated: "#080d11",
  panel: "#0d141a",
  panelStrong: "#141d25",
  border: "rgba(94, 242, 242, 0.14)",
  borderStrong: "rgba(94, 242, 242, 0.35)",
  text: "#cdd9de",
  textStrong: "#ffffff",
  muted: "#9fb2ba",
  muted2: "#7f939b",
  cyan: "#35e0e0",
  cyanBright: "#5ef2f2",
  blue: "#3b82f6",
  blueDeep: "#1d4ed8",
  warning: "#f5b544",
  success: "#34d399",
  danger: "#f87171",
} as const;

export const typography = {
  fontSans: 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  fontMono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace',
  scale: {
    h1: "3.5rem",
    h2: "2.25rem",
    h3: "1.35rem",
    body: "1rem",
    small: "0.8rem",
  },
  leadingBody: 1.7,
  tracking: {
    tight: "-0.02em",
    hud: "0.22em",
  },
} as const;

export const layout = {
  maxWidth: "72rem",
  sectionY: "4rem",
  gutter: "1.25rem",
  radius: {
    sm: "0.5rem",
    base: "0.75rem",
    lg: "1rem",
    pill: "9999px",
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
} as const;

export const effects = {
  glow: "0 0 24px rgba(53, 224, 224, 0.25)",
  glowLg: "0 0 60px rgba(53, 224, 224, 0.18)",
  shadowPanel: "0 1px 0 rgba(255, 255, 255, 0.04) inset, 0 20px 50px -20px rgba(0, 0, 0, 0.8)",
} as const;

export const motion = {
  durationFast: "0.2s",
  duration: "0.25s",
  durationSlow: "0.6s",
  ease: "cubic-bezier(0.4, 0, 0.2, 1)",
  reducedMotion: "@media (prefers-reduced-motion: reduce)",
} as const;

export const designSystem = {
  name: "LynxDock Genesis",
  motto: "Built for People. Not Platforms.",
  colors,
  typography,
  layout,
  effects,
  motion,
} as const;

export type DesignSystem = typeof designSystem;
export default designSystem;
