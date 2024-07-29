/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8456/api/:path*", // Proxy to your Node.js backend
      },
    ];
  },
};

export default nextConfig;
