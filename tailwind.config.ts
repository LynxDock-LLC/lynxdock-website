import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Mission-control graphite base
        graphite: {
          950: "#05090c",
          900: "#080d11",
          850: "#0a1015",
          800: "#0d141a",
          700: "#141d25",
          600: "#1c2732",
        },
        // Neon cyan / blue signal accents
        signal: {
          cyan: "#35e0e0",
          bright: "#5ef2f2",
          blue: "#3b82f6",
          deep: "#1d4ed8",
        },
        line: "rgba(94, 242, 242, 0.14)",
      },
      fontFamily: {
        sans: [
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
      boxShadow: {
        glow: "0 0 24px rgba(53, 224, 224, 0.25)",
        "glow-lg": "0 0 60px rgba(53, 224, 224, 0.18)",
        panel: "0 1px 0 rgba(255,255,255,0.04) inset, 0 20px 50px -20px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(rgba(94,242,242,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(94,242,242,0.05) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(53,224,224,0.10), transparent 70%)",
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
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-soft": "pulse-soft 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
