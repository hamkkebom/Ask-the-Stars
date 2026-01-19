/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ask-the-stars/ui', '@ask-the-stars/types', '@ask-the-stars/utils'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.r2.dev', // Cloudflare R2
      },
      {
        protocol: 'https',
        hostname: '*.cloudflarestream.com', // Cloudflare Stream
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co', // Supabase Storage
      },

      {
        protocol: 'https',
        hostname: 'api.dicebear.com', // Avatars
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Unsplash Images
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig;
