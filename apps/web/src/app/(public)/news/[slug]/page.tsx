'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { ArrowLeft, Calendar, Share2, Tag } from 'lucide-react';
import { use } from 'react';

export default function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  // Mock article data
  const article = {
    title: '2026년 AI 영상 제작 트렌드 전망',
    date: '2026-01-20',
    category: '트렌드',
    author: '함께봄 편집팀',
    content: `
# AI 영상 제작, 2026년 어디로 가는가

2025년은 AI 영상 제작 시장의 폭발적인 성장이 있었던 해였습니다.
2026년에는 어떤 변화가 예상될까요?

## 1. 실시간 AI 편집의 대중화

AI 기술의 발전으로 실시간 영상 편집이 더욱 쉬워질 것으로 예상됩니다.
복잡한 편집 과정 없이도 고품질의 영상을 빠르게 제작할 수 있게 됩니다.

## 2. 개인화된 콘텐츠 생성

시청자 맞춤형 콘텐츠 생성 기술이 발전하여 같은 영상도 시청자에 따라
다르게 표현되는 하이퍼 개인화가 가능해질 전망입니다.

## 3. 음성 합성 기술의 혁신

더욱 자연스러운 AI 음성 합성 기술로 나레이션과 더빙의 퀄리티가
실제 성우 수준에 근접할 것으로 보입니다.

## 4. 프리랜서 시장의 확대

AI 도구의 접근성이 높아지면서 누구나 영상 제작 프리랜서로
활동할 수 있는 기회가 더욱 넓어질 것입니다.

---

함께봄은 이러한 트렌드를 선도하며, AI 영상 제작 교육과
프리랜서 생태계 구축에 앞장서고 있습니다.
    `,
    relatedArticles: [
      { slug: 'education-1st-session', title: '1기 교육 설명회 성황리 마감' },
      { slug: 'new-service-launch', title: 'AI 스튜디오 신규 서비스 런칭' },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900 py-20">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          뉴스룸으로 돌아가기
        </Link>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Header */}
          <div className="mb-8">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-400 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {article.date}
              </span>
              <span>{article.author}</span>
            </div>
          </div>

          {/* Content */}
          <GlassCard className="p-8 mb-8">
            <div className="prose prose-invert prose-lg max-w-none">
              {article.content.split('\n').map((line, i) => {
                if (line.startsWith('# ')) {
                  return <h1 key={i} className="text-2xl font-bold text-white mb-4">{line.slice(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                  return <h2 key={i} className="text-xl font-bold text-white mt-8 mb-4">{line.slice(3)}</h2>;
                }
                if (line.startsWith('---')) {
                  return <hr key={i} className="border-white/10 my-8" />;
                }
                if (line.trim()) {
                  return <p key={i} className="text-gray-300 mb-4 leading-relaxed">{line}</p>;
                }
                return null;
              })}
            </div>
          </GlassCard>

          {/* Share */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="text-gray-400">공유하기</span>
            <button className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Related */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">관련 기사</h3>
            <div className="space-y-3">
              {article.relatedArticles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/news/${item.slug}`}
                  className="block p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-gray-300 hover:text-primary"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </GlassCard>
        </motion.article>
      </div>
    </div>
  );
}
