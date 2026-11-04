import localFont from "next/font/local";

// Self-hosted, so pages make no third-party font request (the site's font policy). Latin subsets of the variable
// fonts from @fontsource-variable 5.3.0, under the SIL Open Font License (src/fonts/LICENSE-*.txt).
export const manrope = localFont({
  src: "../fonts/manrope-latin-wght.woff2",
  weight: "200 800",
  style: "normal",
  display: "swap",
  variable: "--font-heading",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});

export const dmSans = localFont({
  src: "../fonts/dm-sans-latin-wght.woff2",
  weight: "100 1000",
  style: "normal",
  display: "swap",
  variable: "--font-body",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
});
