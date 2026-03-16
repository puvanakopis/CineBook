import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.wallsnapy.com",
      },
    ],
  },
};

export default nextConfig;