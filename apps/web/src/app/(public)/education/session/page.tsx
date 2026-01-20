'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  CheckCircle2,
  ArrowRight,
  Video,
  Sparkles,
  Gift,
  MessageCircle
} from 'lucide-react';

export default function SessionPage() {
  const sessionDate = '2026년 1월 23일 (금)';
  const sessionTime = '오후 7:00 - 9:00';
  const platform = '온라인 (Zoom)';

  // 설명회 신청 구글폼 URL
  const googleFormUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSeY4ZdcgPMMu8m43Cimx8eLQpCFxJX1c-ZuoPte2jOdJY7jnw/viewform?usp=send_form';

  const benefits = [
    {
      icon: Video,
      title: 'AI 영상 제작 데모',
      desc: '실시간으로 AI 영상 제작 과정을 시연합니다'
    },
    {
      icon: Sparkles,
      title: '수료 후 진로 안내',
      desc: '프리랜서 전환 및 수익화 방법을 소개합니다'
    },
    {
      icon: Gift,
      title: '설명회 참석자 혜택',
      desc: '정규 과정 20% 할인 + 교재 무료 증정'
    },
    {
      icon: MessageCircle,
      title: '1:1 상담 기회',
      desc: '설명회 후 개인별 맞춤 상담 진행'
    }
  ];

  const curriculum = [
    { week: '1주차', title: 'AI 도구 기초', topics: ['ChatGPT 프롬프트 마스터', 'Midjourney 기본 활용'] },
    { week: '2주차', title: '영상 기획', topics: ['스크립트 작성법', '스토리보드 제작'] },
    { week: '3주차', title: '영상 제작', topics: ['AI 영상 편집 도구', '음성 합성 활용'] },
    { week: '4주차', title: '마케팅 실전', topics: ['유튜브/릴스 최적화', '퍼스널 브랜딩'] }
  ];

  const instructors = [
    { name: '김한깨', role: 'AI 영상 제작 전문가', exp: '경력 10년+' },
    { name: '이봄봄', role: '디지털 마케팅 전문가', exp: '구독자 50만+' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050505] to-[#0A0A0A] text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-[#FF3366]/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF3366]/20 to-pink-500/20 border border-[#FF3366]/30 text-[#FF3366]">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-bold tracking-wide">1기 모집 중 · 선착순 50명</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center text-5xl md:text-7xl font-black mb-6 leading-tight"
          >
            AI 영상 제작
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF3366] via-pink-400 to-[#FF3366]">
              무료 설명회
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center text-xl text-neutral-400 max-w-2xl mx-auto mb-10"
          >
            4주 만에 AI 영상 제작 전문가로 성장하세요.
            <br />
            수료 후 프리랜서 전환 및 수익화까지 지원합니다.
          </motion.p>

          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-6 mb-12"
          >
            <div className="flex items-center gap-2 text-neutral-300">
              <Calendar className="w-5 h-5 text-[#FF3366]" />
              <span>{sessionDate}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Clock className="w-5 h-5 text-[#FF3366]" />
              <span>{sessionTime}</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <MapPin className="w-5 h-5 text-[#FF3366]" />
              <span>{platform}</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center gap-4"
          >
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FF3366] to-pink-500 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-[#FF3366]/30 transition-all duration-300 hover:scale-105"
            >
              무료 설명회 신청하기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <p className="text-sm text-neutral-500">
              ✨ 참석만 해도 <span className="text-[#FF3366] font-semibold">정규 과정 20% 할인</span> 혜택!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-neutral-900/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              설명회에서 무엇을 <span className="text-[#FF3366]">얻을 수 있나요?</span>
            </h2>
            <p className="text-neutral-400">2시간 동안 AI 영상 제작의 모든 것을 경험하세요</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4 p-6 bg-neutral-800/50 rounded-2xl border border-white/5 hover:border-[#FF3366]/30 transition-colors"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FF3366]/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-[#FF3366]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{benefit.title}</h3>
                  <p className="text-neutral-400 text-sm">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Preview */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              4주 <span className="text-[#FF3366]">커리큘럼</span> 미리보기
            </h2>
            <p className="text-neutral-400">실전 중심의 체계적인 교육 과정</p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-4">
            {curriculum.map((week, idx) => (
              <motion.div
                key={week.week}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="relative p-6 bg-neutral-800/30 rounded-2xl border border-white/5"
              >
                <div className="absolute -top-3 left-6 px-3 py-1 bg-[#FF3366] rounded-full text-xs font-bold">
                  {week.week}
                </div>
                <h3 className="text-lg font-bold mt-2 mb-4">{week.title}</h3>
                <ul className="space-y-2">
                  {week.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-neutral-400">
                      <CheckCircle2 className="w-4 h-4 text-[#FF3366]/70" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className="py-20 px-6 bg-neutral-900/50">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-[#FF3366]">전문 강사진</span> 소개
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {instructors.map((instructor, idx) => (
              <motion.div
                key={instructor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-6 p-6 bg-neutral-800/50 rounded-2xl border border-white/5"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF3366]/30 to-pink-500/30 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-[#FF3366]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{instructor.name}</h3>
                  <p className="text-neutral-400">{instructor.role}</p>
                  <p className="text-sm text-[#FF3366] mt-1">{instructor.exp}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              지금 바로 <span className="text-[#FF3366]">신청하세요</span>
            </h2>
            <p className="text-lg text-neutral-400 mb-10">
              선착순 50명 한정! 지금 신청하시면 설명회 참석만으로도
              <br />
              정규 과정 20% 할인 혜택을 받으실 수 있습니다.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FF3366] to-pink-500 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-[#FF3366]/30 transition-all duration-300 hover:scale-105"
              >
                무료 설명회 신청
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/education"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/5 text-white font-bold text-lg rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
              >
                교육 과정 보기
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF3366]" />
                100% 무료 참여
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF3366]" />
                Zoom 온라인 진행
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#FF3366]" />
                다시보기 제공
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center text-sm text-neutral-500">
          <p>© 2026 한깨봄 (별들에게 물어봐). All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/terms" className="hover:text-white transition-colors">이용약관</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">개인정보처리방침</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
