import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  allowedDevOrigins: [
    "172.20.10.3",
    "172.20.*.*",
    "172.*.*.*",
    "192.168.*.*",
    "10.*.*.*",
    "*.local",
    "*.lan",
  ],
};

export default nextConfig;
