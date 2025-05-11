import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  poweredByHeader: false, // Remove X-Powered-By header for security
  reactStrictMode: true,
  images: {
    domains: ['calqulation.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true, // Enable gzip compression for better performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  // Add redirects for common variations of URLs
  async redirects() {
    return [
      {
        source: '/emi-calculator',
        destination: '/tool/emi-calculator',
        permanent: true,
      },
      {
        source: '/calculators/emi',
        destination: '/tool/emi-calculator',
        permanent: true,
      },
      {
        source: '/loan-calculator',
        destination: '/tool/emi-calculator',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
