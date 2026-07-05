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
};

export default nextConfig;
