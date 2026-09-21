import type { NextConfig } from "next";
import { basePath } from "./src/lib/paths";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  poweredByHeader: false,
  devIndicators: false,
  agentRules: false,
  images: {
    unoptimized: true,
    qualities: [75, 90],
  },
};

export default nextConfig;
