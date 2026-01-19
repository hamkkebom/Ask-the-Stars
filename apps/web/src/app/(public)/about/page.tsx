'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Video, BarChart3, GraduationCap, CheckCircle2 } from 'lucide-react';
import { ClientLogos } from '@/components/sections/client-logos';
import { Testimonials } from '@/components/sections/testimonials';

const services = [
  {
    icon: Video,
    title: "AI 영상 제작 대행",
    description: "최신 AI 기술을 활용한 고품질 영상 제작. 기획부터 편집까지 원스톱 서비스를 제공합니다.",
    color: "from-purple-500 to-violet-600",
    image: "/images/about/ai-video-production.png",
    benefits: ["제작 시간 70% 단축", "비용 50% 절감", "무제한 수정"]
  },
  {
    icon: BarChart3,
    title: "AI 마케팅 대행",
    description: "데이터 기반 AI 마케팅 전략 수립. 타겟 분석부터 성과 최적화까지 맞춤형 솔루션을 제공합니다.",
    color: "from-cyan-500 to-blue-600",
    image: "/images/about/ai-marketing.png",
    benefits: ["전환율 200% 향상", "광고비 40% 절감", "24시간 자동화"]
  },
  {
    icon: GraduationCap,
    title: "AI 교육",
    description: "실무 중심의 AI 활용 교육 프로그램. 누구나 쉽게 AI를 비즈니스에 적용할 수 있도록 지원합니다.",
    color: "from-emerald-500 to-green-600",
    image: "/images/about/ai-education.png",
    benefits: ["현업 전문가 강의", "실습 중심 커리큘럼", "수료증 발급"]
  }
];

const stats = [
  { value: "500+", label: "프로젝트 완료" },
  { value: "98%", label: "고객 만족도" },
  { value: "50+", label: "전문 인력" },
  { value: "24/7", label: "고객 지원" }
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section - 회사소개 메인 */}
      <section className="relative h-[70vh] w-full overflow-hidden flex items-center justify-start px-8 md:px-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/hero-bg.png"
            alt="한깨봄 오피스"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl text-white pt-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-bold tracking-widest text-[#FF3366] uppercase mb-4"
          >
            AI Innovation Partner
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-bold leading-tight mb-6"
          >
            AI로 비즈니스를<br />
            <span className="text-[#FF3366]">혁신하는 파트너</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed"
          >
            한깨봄은 AI 영상제작, AI 마케팅, AI 교육을 통해<br className="hidden md:block"/>
            고객의 성공적인 비즈니스 성장을 지원합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <Link
              href="/about/contact"
              className="px-8 py-3 bg-[#FF3366] text-white font-bold rounded-full hover:bg-[#FF1A4D] transition-colors flex items-center gap-2"
            >
              문의하기 <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about/vision"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors"
            >
              비전 보기
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 md:px-20 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest text-[#FF3366] uppercase">
              서비스 소개
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              AI로 비즈니스를 <span className="text-[#FF3366]">10배</span> 빠르게
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              한깨봄은 최첨단 AI 기술을 활용하여 영상 제작, 마케팅, 교육 분야에서<br className="hidden md:block" />
              고객의 성공을 위한 맞춤형 솔루션을 제공합니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.color} opacity-60`} />
                  <div className="absolute bottom-4 left-4">
                    <service.icon className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>

                  {/* Benefits */}
                  <ul className="space-y-2 mb-6">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/about/contact"
                    className="inline-flex items-center gap-2 text-[#FF3366] font-semibold hover:gap-4 transition-all"
                  >
                    무료 상담 신청 <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black text-white">
        <div className="max-w-[1400px] mx-auto px-6 md:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#FF3366] to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 mt-2 text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <ClientLogos />

      {/* Testimonials */}
      <Testimonials />

      {/* Team Section */}
      <section className="py-24 px-6 md:px-20 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-sm font-bold tracking-widest text-[#FF3366] uppercase">
                전문가 팀
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
                열정적인 전문가 그룹
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                한깨봄은 AI, 영상 제작, 마케팅 분야의 전문가들이 모여 만든 팀입니다.
                각 분야 최고의 실력을 갖춘 멤버들이 고객의 성공을 위해 함께합니다.
              </p>
              <ul className="space-y-4">
                {[
                  "AI 기술 전문가 & 데이터 사이언티스트",
                  "영상 기획/제작/편집 전문가",
                  "디지털 마케팅 & 브랜딩 전문가",
                  "교육 콘텐츠 개발 전문가"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#FF3366]" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="/images/about/team.png"
                alt="한깨봄 팀"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 md:px-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/about/office.png"
            alt="한깨봄 오피스"
            fill
            className="object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50" />
        </div>
        <div className="relative z-10 max-w-[800px] mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl text-white/80 mb-4">
              무료 상담을 통해 맞춤형 솔루션을 확인해보세요.
            </p>
            <p className="text-lg text-[#FF3366] font-semibold mb-10">
              ✨ 첫 프로젝트 20% 할인 진행 중
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about/contact"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#FF3366] text-white font-bold rounded-full hover:bg-[#FF1A4D] transition-colors text-lg"
              >
                무료 상담 신청 <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:02-1234-5678"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition-colors text-lg"
              >
                📞 02-1234-5678
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
