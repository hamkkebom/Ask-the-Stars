'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import {
  Send, CheckCircle, ArrowLeft
} from 'lucide-react';

export default function MarketingRequestPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    platform: '',
    followers: '',
    goal: '',
    budget: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-orange-900/20 to-slate-900 py-20">
        <div className="max-w-md mx-auto px-4">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <GlassCard className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">상담 신청 완료!</h2>
              <p className="text-gray-400 mb-6">
                영업일 기준 1-2일 내에<br />담당자가 연락드리겠습니다.
              </p>
              <Link
                href="/marketing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                마케팅 페이지로 돌아가기
              </Link>
            </GlassCard>
          </m.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-orange-900/20 to-slate-900 py-20">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back */}
        <Link
          href="/marketing"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          마케팅으로 돌아가기
        </Link>

        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-white mb-4">마케팅 상담 신청</h1>
          <p className="text-gray-400">무료 마케팅 진단과 맞춤 전략을 받아보세요</p>
        </m.div>

        {/* Form */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <form onSubmit={handleSubmit}>
            <GlassCard className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">이름 *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">연락처 *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50"
                    placeholder="010-0000-0000"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">이메일 *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">주요 플랫폼</label>
                  <select
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50"
                  >
                    <option value="">선택</option>
                    <option value="instagram">인스타그램</option>
                    <option value="youtube">유튜브</option>
                    <option value="tiktok">틱톡</option>
                    <option value="blog">블로그</option>
                    <option value="none">없음</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">현재 팔로워</label>
                  <input
                    type="text"
                    value={formData.followers}
                    onChange={(e) => setFormData({ ...formData, followers: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50"
                    placeholder="예: 500명"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">마케팅 목표 *</label>
                <textarea
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 min-h-[100px]"
                  placeholder="달성하고 싶은 목표를 알려주세요"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">예산 범위</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500/50"
                >
                  <option value="">선택</option>
                  <option value="30">월 30만원 이하</option>
                  <option value="50">월 30-50만원</option>
                  <option value="100">월 50-100만원</option>
                  <option value="100+">월 100만원 이상</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                상담 신청
              </button>
            </GlassCard>
          </form>
        </m.div>
      </div>
    </div>
  );
}

