import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@robscholey/shell-kit'],
};

export default nextConfig;
