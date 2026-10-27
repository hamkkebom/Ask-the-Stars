import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/layout/brand-logo';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-primary/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-secondary/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <BrandLogo size="lg" />
        </div>

        {/* Card */}
        <div className="bg-card border border-white/10 rounded-2xl p-8">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <Link href="/videos" className="hover:text-white transition-colors">
            영상 갤러리로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
