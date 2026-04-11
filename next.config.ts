import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lastfm.freetls.fastly.net',
        port: '',
        pathname: '/i/u/**', 
      },
      // iTunes / Apple Music artwork CDN (covers is1-ssl, is2-ssl, etc.)
      {
        protocol: 'https',
        hostname: '**.mzstatic.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
