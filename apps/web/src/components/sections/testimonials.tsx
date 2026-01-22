'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "김민수",
    role: "마케팅 팀장",
    company: "스타트업 A사",
    content: "한깨봄과 함께한 AI 마케팅 캠페인으로 광고 비용은 40% 절감하고, 전환율은 2배 이상 올랐습니다. 데이터 기반의 정확한 타겟팅이 차별화된 성과를 만들었습니다.",
    rating: 5,
    result: "전환율 200% 증가"
  },
  {
    id: 2,
    name: "이지현",
    role: "대표이사",
    company: "뷰티 브랜드 B사",
    content: "AI 영상 제작 서비스로 제품 홍보 영상을 빠르게 만들 수 있었습니다. 기존 대비 제작 시간은 70% 단축되었고, 품질은 오히려 더 좋아졌어요.",
    rating: 5,
    result: "제작 시간 70% 단축"
  },
  {
    id: 3,
    name: "박정훈",
    role: "인사담당자",
    company: "IT 기업 C사",
    content: "직원들의 AI 활용 역량을 높이기 위해 교육을 의뢰했는데, 실무 중심의 커리큘럼으로 바로 업무에 적용할 수 있었습니다. 교육 만족도가 95%를 넘었어요.",
    rating: 5,
    result: "교육 만족도 95%"
  },
  {
    id: 4,
    name: "최수연",
    role: "콘텐츠 디렉터",
    company: "미디어 D사",
    content: "매달 대량의 영상 콘텐츠가 필요한데, 한깨봄 덕분에 안정적으로 고품질 콘텐츠를 공급받고 있습니다. 장기 파트너로 계속 함께하고 싶어요.",
    rating: 5,
    result: "월 50편 콘텐츠 제작"
  }
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-24 bg-slate-950/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-widest text-primary uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            고객들의 생생한 후기
          </h2>
          <p className="text-slate-400 mt-4 text-lg">
            실제 프로젝트를 함께한 고객사의 이야기입니다
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900 rounded-3xl p-10 md:p-14 shadow-2xl border border-white/5"
            >
               <Quote className="w-12 h-12 text-primary/20 mb-6" aria-hidden="true" />

              <p className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-8">
                "{testimonials[current].content}"
              </p>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black text-xl shadow-lg shadow-primary/20">
                    {testimonials[current].name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-lg text-white">{testimonials[current].name}</div>
                    <div className="text-slate-400 text-sm">
                      {testimonials[current].role} · {testimonials[current].company}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex gap-1">
                    {[...Array(testimonials[current].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-full text-sm">
                    {testimonials[current].result}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all hover:scale-110 active:scale-95"
              aria-label="이전 후기 보기"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === current ? 'bg-primary w-8' : 'bg-slate-800'
                  }`}
                  aria-label={`${idx + 1}번째 후기로 이동`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border-2 border-white/10 flex items-center justify-center hover:border-primary hover:text-primary transition-all hover:scale-110 active:scale-95"
              aria-label="다음 후기 보기"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
