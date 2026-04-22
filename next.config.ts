import type { NextConfig } from 'next';

const SHELL_ORIGIN = process.env.NEXT_PUBLIC_SHELL_ORIGIN ?? 'http://localhost:3000';

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ['@robscholey/shell-kit'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Sub-app lives inside the shell iframe — only that origin may frame it.
          {
            key: 'Content-Security-Policy',
            value: `frame-ancestors 'self' ${SHELL_ORIGIN}`,
          },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

export default nextConfig;
