/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
  images: {
      localPatterns: [
        {
          pathname: '/assets/images/**',
          search: '',
        },
      ],
    },
}
export default nextConfig;

