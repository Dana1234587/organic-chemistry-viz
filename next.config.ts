import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    // Fix for @opentelemetry/exporter-jaeger missing module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        '@opentelemetry/exporter-jaeger': false,
      };
    }
    return config;
  },
};

export default nextConfig;
