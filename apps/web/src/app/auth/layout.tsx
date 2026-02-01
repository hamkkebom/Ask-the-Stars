import React from 'react';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-yellow-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-purple-500/10 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/videos" className="inline-flex items-center gap-2">
            <span className="text-3xl">⭐</span>
            <span className="text-2xl font-bold text-white">함께봄</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-[#212121] border border-[#3f3f3f] rounded-2xl p-8">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-[#666]">
          <Link href="/videos" className="hover:text-white transition-colors">
            영상 갤러리로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
