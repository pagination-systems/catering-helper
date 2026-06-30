import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
