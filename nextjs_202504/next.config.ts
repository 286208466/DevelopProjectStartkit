import type { NextConfig } from "next";

import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  distDir: "build",
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'www.test.com',
    //   },
    // ],
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      // '/': { page: '/' },
      // '/about': { page: '/about' },
      // '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
    };
  },
};

export default withNextIntl(nextConfig);
