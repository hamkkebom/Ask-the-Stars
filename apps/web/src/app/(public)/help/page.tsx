'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  HelpCircle, MessageSquare, Phone, Mail,
  FileText, ChevronRight, Search, Clock
} from 'lucide-react';

const quickLinks = [
  { href: '/help/faq', icon: HelpCircle, title: 'FAQ', description: '자주 묻는 질문', color: 'text-blue-400' },
  { href: '/terms', icon: FileText, title: '이용약관', description: '서비스 이용 약관', color: 'text-green-400' },
  { href: '/privacy', icon: FileText, title: '개인정보처리방침', description: '개인정보 보호 정책', color: 'text-purple-400' },
];

const categories = [
  { name: '교육 문의', count: 12, icon: '📚' },
  { name: '결제/환불', count: 8, icon: '💳' },
  { name: '프리랜서 활동', count: 15, icon: '⭐' },
  { name: '기술 지원', count: 10, icon: '🔧' },
  { name: '기타 문의', count: 5, icon: '❓' },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/20 mb-6">
              <HelpCircle className="w-8 h-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">무엇을 도와드릴까요?</h1>
            <p className="text-xl text-gray-400 mb-8">
              궁금한 점을 검색하거나 문의해 주세요
            </p>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="검색어를 입력하세요..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </m.div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Links */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              <h2 className="text-lg font-semibold text-white mb-4">빠른 링크</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                {quickLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <GlassCard className="p-5 h-full hover:bg-white/10 transition-colors group">
                      <div className={cn("w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3", link.color)}>
                        <link.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-medium text-white group-hover:text-primary transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-sm text-gray-500">{link.description}</p>
                    </GlassCard>
                  </Link>
                ))}
              </div>

              {/* FAQ Categories */}
              <h2 className="text-lg font-semibold text-white mb-4">자주 묻는 질문 카테고리</h2>
              <GlassCard className="p-6">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <Link
                      key={category.name}
                      href={`/help/faq?category=${encodeURIComponent(category.name)}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <span className="text-white group-hover:text-primary transition-colors">
                          {category.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <span className="text-sm">{category.count}개 질문</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </GlassCard>
            </m.div>

            {/* Contact */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-lg font-semibold text-white">직접 문의하기</h2>

              <GlassCard className="p-6">
                <h3 className="font-medium text-white mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  1:1 문의
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  운영팀에게 직접 문의하세요. 평균 응답시간은 24시간 이내입니다.
                </p>
                <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-opacity">
                  문의하기
                </button>
              </GlassCard>

              <GlassCard className="p-6">
                <h3 className="font-medium text-white mb-4">연락처</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>02-1234-5678</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>support@hamkkebom.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>평일 10:00-18:00 (주말/공휴일 휴무)</span>
                  </div>
                </div>
              </GlassCard>
            </m.div>
          </div>
        </div>
      </section>
    </div>
  );
}

