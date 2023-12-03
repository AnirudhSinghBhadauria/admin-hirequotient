/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "ui.shadcn.com" }],
  },
};

module.exports = nextConfig;
