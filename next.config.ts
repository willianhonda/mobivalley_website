import type { NextConfig } from "next";

// Static export for GitHub Pages: `next build` writes the site to out/.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  // Images are pre-optimized to WebP by scripts/, so no runtime optimizer is needed.
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
