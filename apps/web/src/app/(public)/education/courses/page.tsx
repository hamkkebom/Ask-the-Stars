'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  GraduationCap, Clock, Users, Star, CheckCircle,
  ArrowRight, BookOpen, Award, Zap, Target
} from 'lucide-react';

interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  level: '기초' | '심화';
  price: number;
  originalPrice?: number;
  duration: string;
  students: number;
  rating: number;
  features: string[];
  badge?: string;
  color: string;
}

const courses: Course[] = [
  {
    id: '1',
    slug: 'basic',
    title: 'AI 영상제작 기초반',
    subtitle: '2급 자격증 취득 과정',
    level: '기초',
    price: 159000,
    originalPrice: 250000,
    duration: '4주 (16시간)',
    students: 156,
    rating: 4.9,
    features: [
      'AI 영상 편집 기초',
      '자막 자동화',
      '음성 합성 기술',
      '포트폴리오 제작',
      '실무 프로젝트 1개',
    ],
    badge: '인기',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: '2',
    slug: 'advanced',
    title: 'AI 퍼스널마케팅 심화반',
    subtitle: '1급 자격증 취득 과정',
    level: '심화',
    price: 259000,
    originalPrice: 400000,
    duration: '6주 (24시간)',
    students: 89,
    rating: 4.8,
    features: [
      '고급 AI 영상 제작',
      'AI 마케팅 전략',
      '자동화 워크플로우',
      '클라이언트 커뮤니케이션',
      '실무 프로젝트 3개',
      '취업 연계',
    ],
    badge: '취업연계',
    color: 'from-primary to-blue-400',
  },
];

const benefits = [
  {
    icon: Zap,
    title: '실무 중심 커리큘럼',
    description: '현업 전문가가 직접 설계한 실전 교육',
  },
  {
    icon: Target,
    title: '취업 연계',
    description: '수료 후 프리랜서 활동 및 취업 지원',
  },
  {
    icon: Award,
    title: '자격증 취득',
    description: 'AI 영상제작 1급/2급 자격증 발급',
  },
  {
    icon: Users,
    title: '커뮤니티',
    description: '150명+ 프리랜서 네트워크 참여',
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="max-w-6xl mx-auto px-4 relative">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
              🎓 정규 교육 과정
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              AI 영상제작 전문가 되기
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              4주 만에 AI 영상 편집 기술을 마스터하고<br />
              프리랜서로 데뷔하세요
            </p>
          </m.div>

          {/* Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {benefits.map((benefit, index) => (
              <m.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-4 text-center h-full">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/20 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.description}</p>
                </GlassCard>
              </m.div>
            ))}
          </div>

          {/* Course Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, index) => (
              <m.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link href={`/education/courses/${course.slug}`}>
                  <GlassCard className="p-6 h-full hover:bg-white/10 transition-all group relative overflow-hidden">
                    {/* Badge */}
                    {course.badge && (
                      <span className={cn(
                        "absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white",
                        `bg-gradient-to-r ${course.color}`
                      )}>
                        {course.badge}
                      </span>
                    )}

                    {/* Header */}
                    <div className="mb-6">
                      <div className={cn(
                        "inline-block px-3 py-1 rounded-lg text-sm font-bold mb-3",
                        course.level === '기초' ? 'bg-blue-600/20 text-blue-400' : 'bg-primary/20 text-primary'
                      )}>
                        {course.level}반
                      </div>
                      <h2 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {course.title}
                      </h2>
                      <p className="text-gray-400">{course.subtitle}</p>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 mb-6 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" aria-hidden="true" /> {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" aria-hidden="true" /> {course.students}명 수강
                      </span>
                      <span className="flex items-center gap-1 text-yellow-400">
                        <Star className="w-4 h-4 fill-current" aria-hidden="true" /> {course.rating}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="space-y-2 mb-6">
                      {course.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Price */}
                    <div className="pt-6 border-t border-white/10">
                      <div className="flex items-end justify-between">
                        <div>
                          {course.originalPrice && (
                            <span className="text-gray-500 line-through text-sm">
                              {course.originalPrice.toLocaleString()}원
                            </span>
                          )}
                          <p className="text-3xl font-bold text-white">
                            {course.price.toLocaleString()}
                            <span className="text-lg text-gray-400">원</span>
                          </p>
                        </div>
                        <span className="flex items-center gap-1 text-primary font-bold group-hover:gap-2 transition-all">
                          자세히 보기 <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              어떤 과정이 맞을지 고민되시나요?
            </h2>
            <p className="text-gray-400 mb-6">
              무료 설명회에 참석하시면 1:1 상담을 받으실 수 있습니다
            </p>
            <Link
              href="/education/session"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-black hover:opacity-90 transition-opacity"
            >
              <BookOpen className="w-5 h-5" />
              무료 설명회 신청하기
            </Link>
          </GlassCard>
        </div>
      </section>
    </div>
  );
}
