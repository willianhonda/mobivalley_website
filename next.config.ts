import type { NextConfig } from "next";

// Static export for GitHub Pages: `next build` writes the site to out/.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Images are pre-optimized to WebP by scripts/, so no runtime optimizer is needed.
  images: { unoptimized: true },
  poweredByHeader: false,
  // Two root layouts (Portuguese and English) need a global 404 page.
  experimental: { globalNotFound: true },
};

export default nextConfig;
