import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    output: 'export', // Enables static HTML export
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
