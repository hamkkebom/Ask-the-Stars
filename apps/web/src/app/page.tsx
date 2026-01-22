'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import {
  ArrowRight, Star, Video, Megaphone, GraduationCap,
  Users, Briefcase, Award, Sparkles
} from 'lucide-react';
import { MainHeader } from '@/components/layout/main-header';
import { MainFooter } from '@/components/layout/main-footer';

const stats = [
  { label: '프로젝트', value: '1,200+', icon: <Briefcase className="w-5 h-5" aria-hidden="true" /> },
  { label: '프리랜서', value: '150+', icon: <Users className="w-5 h-5" aria-hidden="true" /> },
  { label: '만족도', value: '98%', icon: <Award className="w-5 h-5" aria-hidden="true" /> },
];

const services = [
  {
    title: 'Studio',
    subtitle: 'AI 영상 제작',
    description: 'AI 기반 영상 제작 스튜디오. 빠르고 퀄리티 높은 결과물.',
    icon: <Video className="w-8 h-8" />,
    href: '/studio',
    gradient: 'from-blue-600 to-blue-400',
  },
  {
    title: 'Marketing',
    subtitle: '마케팅 대행',
    description: '종합 마케팅 대행 서비스. 상담사 500명+ 고정 클라이언트.',
    icon: <Megaphone className="w-8 h-8" />,
    href: '/marketing',
    gradient: 'from-slate-700 to-slate-500',
  },
  {
    title: 'Stars',
    subtitle: '전문가 매칭',
    description: '검증된 영상 제작 전문가와 협업하세요. 프로젝트 매칭부터 정산까지.',
    icon: <Star className="w-8 h-8" />,
    href: '/stars',
    gradient: 'from-blue-700 to-indigo-600',
  },
  {
    title: 'Education',
    subtitle: 'AI 아카데미',
    description: 'AI 영상 제작 실무 교육. 수료 후 파트너 전문가로 데뷔.',
    icon: <GraduationCap className="w-8 h-8" />,
    href: '/education',
    gradient: 'from-slate-800 to-blue-900',
  },
];

const features = [
  { title: '실시간 피드백', desc: '타임스탬프 기반 정확한 수정 요청' },
  { title: '투명한 정산', desc: '체계적인 정산 시스템으로 안전한 수익 관리' },
  { title: 'AI 자동화', desc: '반복 작업 자동화로 생산성 극대화' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <MainHeader />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(var(--color-primary)/0.05),_transparent)]" />
          {/* Floating Orbs */}
          <m.div
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
          />
          <m.div
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" aria-hidden="true" />
              <span className="text-sm">AI 기반 영상 제작 생태계</span>
            </m.div>

            {/* Title */}
              <m.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-8xl font-black mb-8 tracking-tighter"
              >
                <span className="text-white">
                  함께봄
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent italic">
                  Partnership
                </span>
              </m.h1>

            {/* Description */}
            <m.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
            >
              프리랜서 150명+와 함께하는 B2B2C 영상 제작 플랫폼.
              <br className="hidden md:block" />
              실시간 피드백과 원활한 협업으로 최고의 결과물을 만들어보세요.
            </m.p>

            {/* CTA Buttons */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <Link
                href="/auth/signup"
                className="group flex items-center gap-2 px-10 py-5 bg-primary text-primary-foreground font-bold rounded-full hover:bg-primary/90 transition-all shadow-2xl shadow-primary/20"
                aria-label="무료 회원가입 및 서비스 시작하기"
              >
                무료로 시작하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <Link
                href="/about"
                className="px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors"
              >
                더 알아보기
              </Link>
            </m.div>

            {/* Stats */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-primary">{stat.icon}</span>
                    <span className="text-3xl md:text-4xl font-bold">{stat.value}</span>
                  </div>
                  <span className="text-gray-400">{stat.label}</span>
                </div>
              ))}
            </m.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <m.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
            <m.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </m.div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

        <div className="container mx-auto px-4 relative z-10">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              4가지 핵심 서비스
            </h2>
            <p className="text-xl text-gray-400">
              영상 제작 생태계의 모든 것을 한 곳에서
            </p>
          </m.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <m.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={service.href} className="block group">
                  <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:bg-white/10 h-full">
                    {/* Icon */}
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} mb-4`}>
                      {service.icon}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-primary mb-3">{service.subtitle}</p>
                    <p className="text-gray-400 text-sm">{service.description}</p>

                    {/* Arrow */}
                    <div className="mt-4 flex items-center gap-2 text-sm text-gray-500 group-hover:text-primary transition-colors">
                      자세히 보기
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              왜 함께봄인가요?
            </h2>
          </m.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, i) => (
              <m.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 text-primary mb-4">
                  <Sparkles className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-slate-900 border border-white/5 p-12 md:p-20 text-center"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_white_1px,_transparent_1px)] bg-[length:40px_40px]" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-6xl font-black mb-6 tracking-tight">
                지금 함께 하세요
              </h2>
              <p className="text-xl text-slate-400 mb-10 max-w-xl mx-auto">
                기업 영상 제작의 표준, 함께봄과 함께 새로운 가능성을 경험해보세요.
              </p>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-100 transition-colors shadow-2xl"
                aria-label="지금 플랫폼에 가입하기"
              >
                무료로 가입하기
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </m.div>
        </div>
      </section>

      <MainFooter />
    </div>
  );
}
