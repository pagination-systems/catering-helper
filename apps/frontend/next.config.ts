import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Emit .next/standalone (server.js + traced deps) for the Docker runner.
  // Root pinned to the monorepo so the bundle keeps the apps/frontend/ prefix
  // the Dockerfile copies from.
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname, "../../"),
  transpilePackages: ["@catering/types", "@catering/utils", "@catering/authz", "@catering/react-query-builder"],
  images: {
    remotePatterns: [
      // Tenant-provided images (logo / cover / menu) can live on any https host.
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
