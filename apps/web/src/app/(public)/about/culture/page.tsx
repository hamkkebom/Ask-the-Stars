'use client';

import React, { useState } from 'react';
import { m } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Coffee, Heart, Palette, Clock, Gift, Laptop, Users, Sparkles, MessageSquare, Zap, Sprout, ArrowRight, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

const cultureValues = [
  {
    icon: MessageSquare,
    title: "수평적 소통",
    subtitle: "Flat Communication",
    description: "직급이 아닌 아이디어로 소통합니다. 모든 구성원이 자유롭게 의견을 나누고 토론하는 문화입니다.",
    color: "from-blue-600 to-indigo-700"
  },
  {
    icon: Zap,
    title: "빠른 실행",
    subtitle: "Fast Execution",
    description: "완벽한 계획보다 빠른 실행을 중시합니다. 시도하고, 배우고, 개선하는 것이 우리의 방식입니다.",
    color: "from-amber-500 to-orange-600"
  },
  {
    icon: Sprout,
    title: "함께 성장",
    subtitle: "Grow Together",
    description: "개인의 성장이 팀의 성장이고, 팀의 성장이 회사의 성장입니다. 모두가 함께 발전합니다.",
    color: "from-emerald-500 to-green-600"
  }
];

const benefits = [
  {
    icon: Clock,
    title: "유연 근무제",
    shortDesc: "자율 출퇴근",
    fullDesc: "자율 출퇴근제와 주 2회 재택근무를 통해 일과 삶의 균형을 지원합니다. 코어타임(10시~16시)만 지켜주세요.",
  },
  {
    icon: Laptop,
    title: "장비 지원",
    shortDesc: "최신 맥북",
    fullDesc: "MacBook Pro, 32인치 모니터, 인체공학 의자 등 최고의 장비를 제한 없이 제공합니다.",
  },
  {
    icon: Users,
    title: "교육 지원",
    shortDesc: "컨퍼런스 & 도서",
    fullDesc: "연간 200만원 교육비 지원. 컨퍼런스 참가, 도서 구매, 온라인 강의 등 자기계발을 적극 지원합니다.",
  },
  {
    icon: Gift,
    title: "휴가 제도",
    shortDesc: "자율 휴가",
    fullDesc: "연차 제한 없는 자율 휴가제. 리프레시 휴가 5일과 생일 반차도 별도로 제공됩니다.",
  },
  {
    icon: Heart,
    title: "건강 지원",
    shortDesc: "헬스 & 검진",
    fullDesc: "월 10만원 헬스비 지원, 연 1회 종합검진, 심리상담 프로그램을 제공합니다.",
  },
  {
    icon: Palette,
    title: "복지 포인트",
    shortDesc: "연 100만원",
    fullDesc: "연간 100만원 복지 포인트 지급. 여행, 문화생활, 자기계발 등 자유롭게 사용 가능합니다.",
  }
];

const galleryImages = [
  { src: "/images/about/team.png", title: "팀 미팅", desc: "매주 월요일 전체 미팅" },
  { src: "/images/about/office.png", title: "오피스 라운지", desc: "편안한 휴식 공간" },
];

export default function CulturePage() {
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [hoveredBenefit, setHoveredBenefit] = useState<string | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-20 bg-slate-900 border-b border-white/5 text-white">
        <div className="max-w-[1000px] mx-auto text-center">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              Our Culture
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
              한깨봄의 문화
            </h1>
            <p className="text-xl text-white/70">
              함께 성장하고, 함께 혁신합니다
            </p>
          </m.div>
        </div>
      </section>

      {/* Culture Values - 3 Column with Icons */}
      <section className="py-24 px-6 md:px-20 bg-background border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              Core Culture
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
              우리가 일하는 방식
            </h2>
          </m.div>

          <div className="grid md:grid-cols-3 gap-8">
            {cultureValues.map((value, idx) => (
              <m.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                whileHover={{ y: -10 }}
                className={`relative bg-gradient-to-br ${value.color} rounded-3xl p-10 text-white overflow-hidden group`}
              >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 transition-transform duration-500" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16" />

                <div className="relative z-10">
                  <m.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </m.div>
                  <h3 className="text-2xl font-bold mb-2">{value.title}</h3>
                  <p className="text-sm text-white/60 mb-4">{value.subtitle}</p>
                  <p className="text-white/90 leading-relaxed">{value.description}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid - Flip Cards */}
      <section className="py-24 px-6 md:px-20 bg-background/50 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              Benefits
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
              복리후생
            </h2>
            <p className="text-slate-400 mt-4">카드를 호버하면 상세 내용을 확인할 수 있습니다</p>
          </m.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, idx) => (
              <m.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onHoverStart={() => setHoveredBenefit(benefit.title)}
                onHoverEnd={() => setHoveredBenefit(null)}
                className="relative h-[200px] perspective-1000"
              >
                <m.div
                  animate={{
                    rotateY: hoveredBenefit === benefit.title ? 180 : 0
                  }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 bg-slate-900 border border-white/5 rounded-2xl p-8 shadow-lg flex flex-col items-center justify-center text-center backface-hidden"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                      <benefit.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-white">{benefit.title}</h3>
                    <p className="text-slate-400">{benefit.shortDesc}</p>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 bg-primary rounded-2xl p-8 flex flex-col justify-center text-primary-foreground"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-primary-foreground/90 text-sm leading-relaxed font-medium">{benefit.fullDesc}</p>
                  </div>
                </m.div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office Gallery */}
      <section className="py-24 px-6 md:px-20 bg-background border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              Office Life
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
              오피스 라이프
            </h2>
          </m.div>

          {/* Gallery with Navigation */}
          <div className="relative">
            <div className="grid md:grid-cols-2 gap-8">
              {galleryImages.map((image, idx) => (
                <m.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={image.src}
                      alt={image.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform">
                      <h3 className="text-2xl font-bold text-white">{image.title}</h3>
                      <p className="text-white/80">{image.desc}</p>
                    </div>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="relative py-24 px-6 md:px-20 overflow-hidden bg-primary text-primary-foreground font-bold">
        {/* Animated Background */}
        <m.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-20"
        />
        <m.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-20"
        />

        <div className="relative z-10 max-w-[800px] mx-auto text-center text-white">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <m.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <Heart className="w-16 h-16 mx-auto mb-6" />
            </m.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              함께할 동료를 찾습니다
            </h2>
            <p className="text-xl text-white/80 mb-10">
              AI 기술로 세상을 바꾸는 여정에 함께하고 싶다면,<br className="hidden md:block" />
              지금 바로 지원해주세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@hamkkebom.com"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white text-primary font-black rounded-full hover:bg-slate-100 transition-colors text-lg"
              >
                <FileText className="w-5 h-5" />
                채용 공고 보기
              </a>
              <Link
                href="/about/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors text-lg"
              >
                인재풀 등록
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </>
  );
}
