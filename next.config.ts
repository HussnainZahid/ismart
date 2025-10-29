import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The 'images' object is crucial for external URLs
  images: {
    // remotePatterns must contain the hostnames of all external images used by next/image
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // **This is the host causing the current error (and previous product errors)**
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org', // Required for Wikimedia-hosted brand logos (Apple, Samsung, etc.)
      },
      {
        protocol: 'https',
        hostname: 'static.garmincdn.com', // Required for other mock logos
      },
      {
        protocol: 'https',
        hostname: 'assets.bose.com', // Required for other mock logos
      },
      {
        protocol: 'https',
        hostname: 'www.sageappliances.com', // Required for other mock logos
      },
      // You may need to add more hostnames if you change or add new external image links.
    ],
  },
  /* config options here */
};

export default nextConfig;