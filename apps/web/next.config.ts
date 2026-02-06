import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@ask-the-stars/ui',
    '@ask-the-stars/types',
    '@ask-the-stars/utils',
  ],
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
        hostname: 'videodelivery.net', // Cloudflare Stream Signed URLs
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
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      'date-fns',
      '@radix-ui/react-icons',
      'socket.io-client',
    ],
    // React 19 최적화 (플러그인 설치 필요)
    // reactCompiler: true,
    // 번들 최적화 (critters 모듈 필요)
    // optimizeCss: true,
  },
  serverExternalPackages: ['@supabase/supabase-js'],
};

export default nextConfig;
