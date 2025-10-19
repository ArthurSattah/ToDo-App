import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // <-- this enables static export
  reactStrictMode: true, // optional but recommended
};

export default nextConfig;