'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  Calendar, Clock, CheckCircle, Play, Lock,
  ChevronDown, ChevronRight, ArrowLeft, Video
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'live' | 'assignment';
  status: 'completed' | 'current' | 'locked';
}

interface Week {
  id: string;
  week: number;
  title: string;
  date: string;
  lessons: Lesson[];
}

const curriculum: Week[] = [
  {
    id: '1',
    week: 1,
    title: 'AI 영상 편집 입문',
    date: '2026-01-11',
    lessons: [
      { id: '1-1', title: 'AI 영상 제작 도구 소개', duration: '35분', type: 'video', status: 'completed' },
      { id: '1-2', title: '기본 인터페이스 익히기', duration: '42분', type: 'video', status: 'completed' },
      { id: '1-3', title: '첫 프로젝트 설정', duration: '38분', type: 'video', status: 'completed' },
      { id: '1-4', title: '1주차 과제: 간단한 영상 만들기', duration: '-', type: 'assignment', status: 'completed' },
    ],
  },
  {
    id: '2',
    week: 2,
    title: '자막 자동화',
    date: '2026-01-18',
    lessons: [
      { id: '2-1', title: '음성 인식 기술 이해', duration: '42분', type: 'video', status: 'completed' },
      { id: '2-2', title: '자막 자동 생성하기', duration: '38분', type: 'video', status: 'completed' },
      { id: '2-3', title: '자막 스타일링', duration: '45분', type: 'video', status: 'completed' },
      { id: '2-4', title: '2주차 과제: 자막 넣기', duration: '-', type: 'assignment', status: 'completed' },
    ],
  },
  {
    id: '3',
    week: 3,
    title: '음성 합성 & 더빙',
    date: '2026-01-25',
    lessons: [
      { id: '3-1', title: 'TTS 기술 활용하기', duration: '40분', type: 'live', status: 'current' },
      { id: '3-2', title: '음성 클로닝 기초', duration: '45분', type: 'video', status: 'locked' },
      { id: '3-3', title: '오디오 믹싱', duration: '35분', type: 'video', status: 'locked' },
      { id: '3-4', title: '3주차 과제: 더빙 영상 만들기', duration: '-', type: 'assignment', status: 'locked' },
    ],
  },
  {
    id: '4',
    week: 4,
    title: '포트폴리오 제작',
    date: '2026-02-01',
    lessons: [
      { id: '4-1', title: '실전 프로젝트 시작', duration: '50분', type: 'live', status: 'locked' },
      { id: '4-2', title: '피드백 & 수정', duration: '40분', type: 'video', status: 'locked' },
      { id: '4-3', title: '최종 발표 및 수료', duration: '60분', type: 'live', status: 'locked' },
    ],
  },
];

export default function CurriculumPage() {
  const [expandedWeeks, setExpandedWeeks] = useState<string[]>(['1', '2', '3']);

  const toggleWeek = (weekId: string) => {
    setExpandedWeeks(prev =>
      prev.includes(weekId)
        ? prev.filter(id => id !== weekId)
        : [...prev, weekId]
    );
  };

  const getStatusIcon = (status: Lesson['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'current':
        return <Play className="w-5 h-5 text-primary" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: Lesson['type']) => {
    switch (type) {
      case 'video':
        return { label: '녹화', color: 'bg-blue-500/20 text-blue-400' };
      case 'live':
        return { label: '라이브', color: 'bg-red-500/20 text-red-400' };
      case 'assignment':
        return { label: '과제', color: 'bg-yellow-500/20 text-yellow-400' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900/20 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Link
          href="/education/lms"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          내 강의실로 돌아가기
        </Link>

        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-8 h-8 text-primary" />
            커리큘럼
          </h1>
          <p className="text-gray-400 mt-1">AI 영상제작 기초반 - 4주 과정</p>
        </m.div>

        {/* Progress Overview */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm">전체 진행률</p>
                <p className="text-2xl font-bold text-white">75%</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 text-sm">완료한 강의</p>
                <p className="text-2xl font-bold text-white">12/16</p>
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-gradient-to-r from-primary to-purple-500 rounded-full" />
            </div>
          </GlassCard>
        </m.div>

        {/* Curriculum List */}
        <div className="space-y-4">
          {curriculum.map((week, weekIndex) => (
            <m.div
              key={week.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: weekIndex * 0.1 }}
            >
              <GlassCard className="overflow-hidden">
                {/* Week Header */}
                <button
                  onClick={() => toggleWeek(week.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center font-bold",
                      week.lessons.every(l => l.status === 'completed')
                        ? "bg-green-500/20 text-green-400"
                        : week.lessons.some(l => l.status === 'current')
                        ? "bg-primary/20 text-primary"
                        : "bg-white/10 text-gray-400"
                    )}>
                      {week.week}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-white">{week.title}</h3>
                      <p className="text-sm text-gray-500">{week.date}</p>
                    </div>
                  </div>
                  {expandedWeeks.includes(week.id) ? (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {/* Lessons */}
                {expandedWeeks.includes(week.id) && (
                  <div className="border-t border-white/10 p-4 space-y-2">
                    {week.lessons.map((lesson) => {
                      const typeInfo = getTypeLabel(lesson.type);
                      return (
                        <div
                          key={lesson.id}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-lg",
                            lesson.status === 'current' && "bg-primary/10 border border-primary/30",
                            lesson.status !== 'current' && "bg-white/5"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            {getStatusIcon(lesson.status)}
                            <div>
                              <p className={cn(
                                "font-medium",
                                lesson.status === 'locked' ? "text-gray-500" : "text-white"
                              )}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={cn("px-2 py-0.5 rounded text-xs font-medium", typeInfo.color)}>
                                  {typeInfo.label}
                                </span>
                                {lesson.duration !== '-' && (
                                  <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {lesson.duration}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          {lesson.status !== 'locked' && (
                            <button className={cn(
                              "px-3 py-1 rounded-lg text-sm font-medium transition-colors",
                              lesson.status === 'completed'
                                ? "bg-white/5 text-gray-400 hover:bg-white/10"
                                : "bg-primary text-white hover:opacity-90"
                            )}>
                              {lesson.status === 'completed' ? '다시보기' : '시작하기'}
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </GlassCard>
            </m.div>
          ))}
        </div>
      </div>
    </div>
  );
}

