import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@catering/types", "@catering/utils", "@catering/authz", "@catering/react-query-builder"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
