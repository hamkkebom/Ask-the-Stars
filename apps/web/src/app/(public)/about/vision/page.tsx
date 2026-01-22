'use client';

import React from 'react';
import { m } from 'framer-motion';
import Link from 'next/link';
import { Lightbulb, Target, Heart, Rocket, Users, Zap, Quote, ArrowRight, Briefcase, Handshake } from 'lucide-react';

const coreValues = [
  {
    icon: Lightbulb,
    title: "혁신",
    subtitle: "Innovation",
    description: "끊임없이 새로운 AI 기술을 연구하고 적용하여 고객에게 최고의 솔루션을 제공합니다.",
    color: "from-amber-400 to-orange-500"
  },
  {
    icon: Heart,
    title: "진정성",
    subtitle: "Authenticity",
    description: "고객의 진정한 성공을 위해 형식적인 서비스가 아닌 진심 어린 파트너십을 추구합니다.",
    color: "from-rose-400 to-pink-500"
  },
  {
    icon: Target,
    title: "성과 중심",
    subtitle: "Results-Driven",
    description: "측정 가능한 결과를 통해 고객의 비즈니스 성장에 실질적으로 기여합니다.",
    color: "from-emerald-400 to-green-500"
  },
  {
    icon: Users,
    title: "협업",
    subtitle: "Collaboration",
    description: "고객과의 긴밀한 소통을 통해 최적의 결과물을 함께 만들어갑니다.",
    color: "from-blue-400 to-indigo-500"
  },
  {
    icon: Rocket,
    title: "속도",
    subtitle: "Speed",
    description: "빠르게 변화하는 시장에서 민첩하게 대응하여 경쟁 우위를 제공합니다.",
    color: "from-purple-400 to-violet-500"
  },
  {
    icon: Zap,
    title: "효율성",
    subtitle: "Efficiency",
    description: "AI 자동화를 통해 비용은 줄이고 품질은 높이는 스마트한 솔루션을 제공합니다.",
    color: "from-cyan-400 to-teal-500"
  }
];

export default function VisionPage() {
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
              Our Vision
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
              우리의 비전
            </h1>
            <p className="text-xl text-white/70">
              모든 비즈니스가 AI의 혜택을 누릴 수 있도록
            </p>
          </m.div>
        </div>
      </section>

      {/* Philosophy Section - Large Quote */}
      <section className="py-24 px-6 md:px-20">
        <div className="max-w-[1000px] mx-auto">
          <m.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-slate-900 rounded-3xl p-12 md:p-16 border border-white/5 shadow-2xl"
          >
            {/* Decorative Quote Icon */}
            <div className="absolute -top-6 left-12">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>

            <blockquote className="text-2xl md:text-4xl font-bold text-center leading-relaxed mt-4">
              <span className="text-primary italic">"AI 기술의 민주화"</span>
              <br />
              <span className="text-white">
                대기업만 누리던 첨단 기술을<br className="hidden md:block" />
                모든 비즈니스가 활용할 수 있도록
              </span>
            </blockquote>

            <p className="text-slate-400 text-center mt-8 text-lg max-w-2xl mx-auto">
              우리는 AI가 대기업만의 전유물이 아니라고 믿습니다.
              중소기업부터 스타트업까지, 모든 비즈니스가 AI를 통해 성장할 수 있도록 돕습니다.
            </p>
          </m.div>
        </div>
      </section>

      {/* Vision & Mission - Glassmorphism Cards */}
      <section className="py-24 px-6 md:px-20 bg-background/50 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              Vision & Mission
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
              비전과 미션
            </h2>
          </m.div>

          <div className="grid md:grid-cols-2 gap-8">
            <m.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden bg-slate-900 border border-white/5 rounded-3xl p-10 shadow-xl"
            >
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="text-primary text-sm font-bold tracking-widest uppercase">Vision</span>
                <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-4">
                  AI가 만드는<br />새로운 비즈니스 표준
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  우리는 AI 기술이 모든 비즈니스의 필수 도구가 되는 미래를 그립니다.
                  한깨봄은 그 미래를 앞당기는 선도자로서, 모든 기업이 AI의 혜택을 누릴 수 있도록 다리를 놓겠습니다.
                </p>

                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-sm text-slate-500">2030년 목표</p>
                  <p className="text-2xl font-black text-primary italic">10,000개 기업의 AI 전환 지원</p>
                </div>
              </div>
            </m.div>

            <m.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden bg-gray-900 rounded-3xl p-10 text-white"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
                <span className="text-white/60 text-sm font-bold tracking-widest uppercase">Mission</span>
                <h3 className="text-2xl md:text-3xl font-bold mt-2 mb-4">
                  기술을 넘어<br />비즈니스 성공까지
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  단순히 AI 기술을 제공하는 것에 그치지 않습니다. 고객의 비즈니스를 깊이 이해하고,
                  AI를 통해 실질적인 성과를 달성할 수 있도록 전략부터 실행까지 함께합니다.
                </p>

                <div className="mt-6 pt-6 border-t border-white/20">
                  <p className="text-sm text-white/50">핵심 약속</p>
                  <p className="text-xl font-bold">측정 가능한 ROI를 제공합니다</p>
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* Core Values - 3x2 Grid with Hover */}
      <section className="py-24 px-6 md:px-20 bg-background border-t border-white/5">
        <div className="max-w-[1400px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              Core Values
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-white">
              우리가 추구하는 가치
            </h2>
          </m.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, idx) => (
              <m.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-slate-900 border border-white/5 rounded-2xl p-8 hover:bg-slate-800 transition-all duration-300"
              >
                <m.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6`}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </m.div>
                <h3 className="text-2xl font-bold mb-1 text-white">{value.title}</h3>
                <p className="text-sm text-slate-500 mb-4">{value.subtitle}</p>
                <p className="text-slate-400 leading-relaxed">{value.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-20 bg-primary font-bold">
        <div className="max-w-[1000px] mx-auto text-center text-white">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              비전에 공감하시나요?
            </h2>
            <p className="text-xl text-white/80 mb-10">
              한깨봄과 함께 AI로 새로운 가치를 만들어갈 파트너를 찾습니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about/culture"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary font-black rounded-full hover:bg-slate-100 transition-colors"
              >
                <Briefcase className="w-5 h-5" />
                함께할 팀원 찾기
              </Link>
              <Link
                href="/about/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors"
              >
                <Handshake className="w-5 h-5" />
                파트너 제휴 문의
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </>
  );
}

