import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@catering/types', '@catering/utils', '@catering/authz'],
};

export default nextConfig;
