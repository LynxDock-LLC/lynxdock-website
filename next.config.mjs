import { browserBuildValues } from "./src/lib/buildEnv.mjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages — outputs to /out
  output: "export",
  // Cloudflare Pages serves static files; Next's image optimizer needs a server, so disable it.
  images: {
    unoptimized: true,
  },
  // Emit clean directory-style URLs (/products/ -> products/index.html)
  trailingSlash: true,
  reactStrictMode: true,
  // The build kind, the form endpoint and the analytics token, inlined at build time. A preview build gets an empty
  // endpoint and token whatever its environment says (src/lib/buildEnv.mjs), so it cannot send or count anything.
  env: browserBuildValues(process.env),
};

export default nextConfig;
