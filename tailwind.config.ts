import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      // October 2026 redesign tokens (see src/app/globals.css :root). The graphite and signal scales are
      // remapped onto them so the pages kept from the previous design share the same palette.
      colors: {
        bg: "#090e12",
        panel: "#10191f",
        "panel-2": "#142027",
        ink: "#f2f7f9",
        muted: "#a4b2bb",
        accent: "#5ce1df",
        paper: "#edf3ed",
        graphite: {
          950: "#090e12",
          900: "#0c1317",
          850: "#0e161b",
          800: "#10191f",
          700: "#142027",
          600: "#1c2b33",
        },
        signal: {
          cyan: "#5ce1df",
          bright: "#8eebe9",
          blue: "#3b82f6",
          deep: "#1d4ed8",
        },
        line: "#27343c",
      },
      maxWidth: {
        content: "1240px",
      },
      fontFamily: {
        sans: [
          "var(--font-body)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        heading: [
          "var(--font-heading)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "Liberation Mono",
          "monospace",
        ],
      },
      // Quieter than the Genesis glow: the redesign uses fine borders and modest depth.
      boxShadow: {
        glow: "0 0 0 1px rgba(92, 225, 223, 0.10)",
        "glow-lg": "0 18px 48px -28px rgba(0, 0, 0, 0.9)",
        panel:
          "0 1px 0 rgba(255,255,255,0.03) inset, 0 20px 50px -24px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(164,178,187,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(164,178,187,0.04) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(92,225,223,0.07), transparent 70%)",
      },
      backgroundSize: {
        grid: "56px 56px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
        "radar-sweep": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "ping-ring": {
          "0%": { transform: "scale(0.6)", opacity: "0.7" },
          "80%, 100%": { transform: "scale(2.2)", opacity: "0" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
      },
      // Only short one-time entry motion: the looping Genesis animations (pulse, radar sweep, ping, blink)
      // are switched off so no page kept from the previous design pulses.
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        "pulse-soft": "none",
        "radar-sweep": "none",
        "ping-ring": "none",
        blink: "none",
      },
    },
  },
  plugins: [],
};

export default config;
