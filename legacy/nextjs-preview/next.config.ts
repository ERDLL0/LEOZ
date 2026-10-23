import type { NextConfig } from 'next';

if (process.env.VERCEL_ENV === 'production' || process.env.LEOZ_RELEASE === 'production') {
  throw new Error('Leoz production release is blocked. Run npm run check:release and resolve the outstanding approvals and launch review.');
}

const config: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  images: { formats: ['image/avif', 'image/webp'] },
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }];
  },
};

export default config;
