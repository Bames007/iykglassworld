import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    // Serve modern formats first for sharper glass imagery
    formats: ["image/avif", "image/webp"],
    // Cache optimized variants aggressively — Unsplash URLs are immutable
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Match the responsive breakpoints used by `sizes="100vw"` on the hero
    deviceSizes: [360, 640, 768, 1024, 1280, 1536, 1920, 2560],
  },

  // Silence the Next.js telemetry ping in production deploys
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  // Enforce strict production safety
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
