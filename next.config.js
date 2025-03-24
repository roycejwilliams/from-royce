const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', 
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
    serverActions: {}
  }
};

module.exports = nextConfig;

