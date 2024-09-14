/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
  eslint: {
    // Warning: Disabling ESLint checks during production builds. Ensure this is not enabled in production deployments to maintain code quality.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: Suppressing TypeScript errors during production builds. This setting should be avoided in production to ensure type safety.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
