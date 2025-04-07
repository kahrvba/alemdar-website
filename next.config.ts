import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fkkljqx9mgwrdpy8.public.blob.vercel-storage.com',
        pathname: '/**',  // This allows all paths under this domain
      }
    ],
  },
};

export default nextConfig;
