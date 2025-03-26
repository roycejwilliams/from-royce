const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '.next',

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**",
      },
    ],
  },

  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },

  experimental: {
    serverActions: {},
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5001/from-royce/us-central1/nextApp/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
