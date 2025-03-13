import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true, // 在构建过程中忽略 ESLint 错误
    },
    target: "server",
    output: "standalone",
    env: {
        API_HOST_URL: process.env.API_HOST_URL
    }
};

export default nextConfig;
