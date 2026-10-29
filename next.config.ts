import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* `npm run build` emits a fully static site to `out/` for any web host. */
  output: "export",
  /* Emit `about/index.html` instead of `about.html`, so plain static servers
     (Apache, Nginx, `python -m http.server`) serve extensionless URLs. */
  trailingSlash: true,
  images: {
    // A static export has no image optimizer, so images are served as-is.
    unoptimized: true,
    // Next 16 requires an explicit allowlist. 60 is used by small gallery
    // thumbnails; 75 is the default for everything else.
    qualities: [60, 75],
  },
  experimental: {
    agentFeedback: true,
  },
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
