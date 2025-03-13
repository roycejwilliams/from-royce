import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // 🔥 THIS is the fix
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "/v0/b/**", // ✅ Correct for Firebase Storage
      },
    ],
  },
};

export default nextConfig;
