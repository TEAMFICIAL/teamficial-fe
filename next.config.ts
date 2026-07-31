import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kr.object.ncloudstorage.com',
        pathname: '**',
      },
    ],
    qualities: [75, 85],
  },
};

export default nextConfig;
