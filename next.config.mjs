/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all HTTPS domains
      },
    ],
  },
};

export default nextConfig;
