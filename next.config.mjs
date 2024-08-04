/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.gutenberg.org',
        port: '',
        pathname: '/**/**',
      },
    ],
  },
};

export default nextConfig;
