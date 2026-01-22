'use client';

import { m } from 'framer-motion';
import { PortfolioGrid } from '@/components/features/portfolio/PortfolioGrid';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-transparent p-6 space-y-8">
      {/* Header */}
      <m.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-white">내 포트폴리오</h1>
        <p className="text-gray-400">
          작업물을 업로드하고 관리하세요. 등록된 포트폴리오는 클라이언트에게 공개됩니다.
        </p>
      </m.div>

      {/* Main Content */}
      <PortfolioGrid />
    </div>
  );
}

