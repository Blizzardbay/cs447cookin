/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/assets/images/**",
        search: "",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.vercel.com",
        port: "",
        pathname: "/image/upload/**",
      }
    ],
  },
};
export default nextConfig;
