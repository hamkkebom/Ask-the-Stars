'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import {
  Clock, Users, Star, CheckCircle, Calendar,
  BookOpen, Video, Award, ArrowLeft, Play
} from 'lucide-react';

const courseData = {
  title: 'AI 영상제작 기초반',
  subtitle: '2급 자격증 취득 과정',
  price: 159000,
  originalPrice: 250000,
  duration: '4주 (16시간)',
  schedule: '매주 토요일 10:00-14:00',
  startDate: '2026년 2월 8일',
  students: 156,
  rating: 4.9,
  description: 'AI 도구를 활용한 영상 편집의 기초를 배우는 과정입니다. 자막 자동화, 음성 합성, 기본 편집 기술을 익히고 실제 프로젝트를 완성합니다.',
  instructor: {
    name: '김영상 강사',
    title: 'AI 영상제작 전문가',
    experience: '10년+ 영상제작 경력',
  },
  curriculum: [
    { week: 1, title: 'AI 영상 편집 입문', topics: ['AI 도구 소개', '기본 인터페이스', '프로젝트 설정'] },
    { week: 2, title: '자막 자동화', topics: ['음성 인식', '자막 생성', '스타일링'] },
    { week: 3, title: '음성 합성 & 더빙', topics: ['TTS 활용', '음성 클로닝', '믹싱'] },
    { week: 4, title: '포트폴리오 제작', topics: ['실전 프로젝트', '피드백', '수료'] },
  ],
  features: [
    '실시간 온라인 수업',
    '녹화 영상 무제한 복습',
    '1:1 피드백',
    '수료증 발급',
    '프리랜서 데뷔 지원',
    '커뮤니티 참여권',
  ],
};

export default function BasicCoursePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900/20 to-slate-900">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <Link
          href="/education/courses"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          전체 과정 보기
        </Link>
      </div>

      {/* Hero */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="inline-block px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                  기초반
                </span>
                <h1 className="text-4xl font-bold text-white mb-2">{courseData.title}</h1>
                <p className="text-xl text-gray-400 mb-6">{courseData.subtitle}</p>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 mb-8 text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {courseData.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" /> {courseData.students}명 수강
                  </span>
                  <span className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" /> {courseData.rating}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {courseData.startDate} 개강
                  </span>
                </div>

                {/* Description */}
                <GlassCard className="p-6 mb-8">
                  <h2 className="text-lg font-semibold text-white mb-3">과정 소개</h2>
                  <p className="text-gray-300 leading-relaxed">{courseData.description}</p>
                </GlassCard>

                {/* Curriculum */}
                <GlassCard className="p-6 mb-8">
                  <h2 className="text-lg font-semibold text-white mb-4">커리큘럼</h2>
                  <div className="space-y-4">
                    {courseData.curriculum.map((item, index) => (
                      <m.div
                        key={item.week}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                            {item.week}
                          </span>
                          <h3 className="font-medium text-white">{item.title}</h3>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-11">
                          {item.topics.map((topic) => (
                            <span key={topic} className="px-2 py-1 rounded bg-white/5 text-gray-400 text-sm">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </m.div>
                    ))}
                  </div>
                </GlassCard>

                {/* Instructor */}
                <GlassCard className="p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">강사 소개</h2>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                      👨‍🏫
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{courseData.instructor.name}</h3>
                      <p className="text-gray-400">{courseData.instructor.title}</p>
                      <p className="text-sm text-gray-500">{courseData.instructor.experience}</p>
                    </div>
                  </div>
                </GlassCard>
              </m.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <m.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-8"
              >
                <GlassCard className="p-6">
                  {/* Preview */}
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl mb-6 flex items-center justify-center cursor-pointer group">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-gray-500 line-through">
                      {courseData.originalPrice.toLocaleString()}원
                    </span>
                    <p className="text-3xl font-bold text-white">
                      {courseData.price.toLocaleString()}
                      <span className="text-lg text-gray-400">원</span>
                    </p>
                    <p className="text-sm text-green-400 mt-1">
                      {Math.round((1 - courseData.price / courseData.originalPrice) * 100)}% 할인
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {courseData.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:opacity-90 transition-opacity mb-3">
                    수강 신청하기
                  </button>
                  <Link
                    href="/education/session"
                    className="block w-full py-3 px-4 rounded-xl bg-white/5 text-center text-gray-300 font-medium hover:bg-white/10 transition-colors"
                  >
                    무료 설명회 먼저 듣기
                  </Link>

                  {/* Schedule */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-sm text-gray-400 mb-2">📅 수업 일정</p>
                    <p className="text-white font-medium">{courseData.schedule}</p>
                    <p className="text-sm text-primary mt-1">다음 개강: {courseData.startDate}</p>
                  </div>
                </GlassCard>
              </m.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

