'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  HelpCircle, ChevronDown, ArrowLeft, Search
} from 'lucide-react';
import { EmptyState } from '@/components/common/EmptyState';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // 교육 문의
  { id: '1', category: '교육 문의', question: '수업은 어떤 방식으로 진행되나요?', answer: '모든 수업은 실시간 온라인(Zoom)으로 진행되며, 수업 녹화본은 수강 기간 동안 무제한 복습이 가능합니다.' },
  { id: '2', category: '교육 문의', question: '수강 자격이 있나요?', answer: '기초반은 누구나 수강 가능합니다. 심화반은 기초반 수료자 또는 동등 수준의 경험이 필요합니다.' },
  { id: '3', category: '교육 문의', question: '수업에 필요한 장비가 있나요?', answer: '최소 i5/M1 수준의 노트북과 안정적인 인터넷 연결이 필요합니다. 권장 사양은 수강 전 안내드립니다.' },
  // 결제/환불
  { id: '4', category: '결제/환불', question: '환불 규정은 어떻게 되나요?', answer: '수업 시작 전 전액 환불, 1주차 이내 70%, 2주차 이내 50% 환불됩니다. 3주차 이후에는 환불이 불가합니다.' },
  { id: '5', category: '결제/환불', question: '분할 결제가 가능한가요?', answer: '현재 일시불 결제만 지원하고 있습니다. 카드 무이자 할부는 카드사 정책에 따릅니다.' },
  // 프리랜서 활동
  { id: '6', category: '프리랜서 활동', question: '수료 후 바로 프리랜서 활동이 가능한가요?', answer: '2급 자격증 취득 후 프리랜서 활동이 가능합니다. 플랫폼 내에서 프로젝트 매칭을 지원합니다.' },
  { id: '7', category: '프리랜서 활동', question: '수익은 어떻게 정산되나요?', answer: '프로젝트 완료 후 익월 10일에 1차 정산, 25일에 2차 정산이 진행됩니다.' },
  { id: '8', category: '프리랜서 활동', question: '평균 수익은 얼마인가요?', answer: '활동량에 따라 다르지만, 활발히 활동하는 프리랜서의 경우 월 200-500만원 수익을 올리고 있습니다.' },
  // 기술 지원
  { id: '9', category: '기술 지원', question: '로그인이 안 됩니다.', answer: '비밀번호 찾기를 시도해보세요. 문제가 지속되면 support@hamkkebom.com으로 문의해주세요.' },
  { id: '10', category: '기술 지원', question: '영상 업로드가 안 됩니다.', answer: '파일 크기(최대 2GB), 형식(MP4, MOV)을 확인해주세요. 인터넷 연결도 확인이 필요합니다.' },
];

const categories = ['전체', '교육 문의', '결제/환불', '프리랜서 활동', '기술 지원', '기타 문의'];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchCategory = selectedCategory === '전체' || faq.category === selectedCategory;
    const matchSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/help"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          고객센터로 돌아가기
        </Link>

        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 mb-4">
            <HelpCircle className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">자주 묻는 질문</h1>
          <p className="text-gray-400">궁금한 점을 빠르게 찾아보세요</p>
        </m.div>

        {/* Search */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="질문 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </m.div>

        {/* Categories */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                selectedCategory === category
                  ? "bg-primary text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              )}
            >
              {category}
            </button>
          ))}
        </m.div>

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <m.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <GlassCard className="overflow-hidden">
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold">Q</span>
                    <span className="text-white font-medium">{faq.question}</span>
                  </div>
                  <ChevronDown className={cn(
                    "w-5 h-5 text-gray-400 transition-transform shrink-0",
                    expandedId === faq.id && "rotate-180"
                  )} />
                </button>

                <AnimatePresence>
                  {expandedId === faq.id && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 pb-4">
                        <div className="p-4 rounded-lg bg-white/5 flex gap-3">
                          <span className="text-green-400 font-bold">A</span>
                          <p className="text-gray-300">{faq.answer}</p>
                        </div>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            </m.div>
          ))}

          {filteredFaqs.length === 0 && (
            <EmptyState
              icon={HelpCircle}
              title="검색 결과가 없습니다"
              description={`"${searchQuery}"에 대한 질문을 찾을 수 없습니다.`}
              action={{
                label: "검색 초기화",
                onClick: () => setSearchQuery('')
              }}
              className="py-12"
            />
          )}
        </div>

        {/* Contact CTA */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <GlassCard className="p-8 text-center">
            <h2 className="text-xl font-bold text-white mb-2">
              원하는 답변을 찾지 못하셨나요?
            </h2>
            <p className="text-gray-400 mb-6">
              1:1 문의를 통해 직접 질문해주세요
            </p>
            <Link
              href="/help"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
            >
              문의하기
            </Link>
          </GlassCard>
        </m.div>
      </div>
    </div>
  );
}
