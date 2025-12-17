import type { NextConfig } from "next";

const strapiBaseUrl = process.env.STRAPI_BASE_URL || 'http://localhost:1337';
const strapiUrl = new URL(strapiBaseUrl);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
