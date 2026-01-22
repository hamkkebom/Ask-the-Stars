'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  BookOpen, Video, FileText, Calendar, CheckCircle,
  Play, Clock, Users, Award, MessageSquare, ArrowRight
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
  nextLessonDate: string;
}

interface Notification {
  id: string;
  type: 'assignment' | 'feedback' | 'announcement';
  message: string;
  time: string;
}

const myCourses: Course[] = [
  {
    id: '1',
    title: 'AI 영상제작 기초반',
    progress: 75,
    totalLessons: 16,
    completedLessons: 12,
    nextLesson: '3주차: 음성 합성 & 더빙',
    nextLessonDate: '2026-01-25 10:00',
  },
];

const notifications: Notification[] = [
  { id: '1', type: 'assignment', message: '3주차 과제가 등록되었습니다', time: '2시간 전' },
  { id: '2', type: 'feedback', message: '2주차 과제에 피드백이 도착했습니다', time: '1일 전' },
  { id: '3', type: 'announcement', message: '다음 주 수업 시간이 변경되었습니다', time: '2일 전' },
];

const quickLinks = [
  { href: '/education/lms/curriculum', icon: Calendar, label: '커리큘럼', color: 'text-blue-400' },
  { href: '/education/lms/assignments', icon: FileText, label: '과제', color: 'text-green-400' },
  { href: '#', icon: Video, label: '녹화강의', color: 'text-purple-400' },
  { href: '#', icon: MessageSquare, label: '질문하기', color: 'text-yellow-400' },
];

export default function LMSPage() {
  const [course] = useState(myCourses[0]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900/20 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <m.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-primary" />
            내 강의실
          </h1>
          <p className="text-gray-400 mt-1">수강 중인 과정을 확인하고 학습을 이어가세요</p>
        </m.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Course */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">수강 중인 과정</h2>
                  <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                    수강중
                  </span>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{course.completedLessons}/{course.totalLessons} 강의 완료</span>
                    <span className="text-primary font-medium">{course.progress}% 진행</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="h-3 bg-white/10 rounded-full mb-6 overflow-hidden">
                  <m.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                  />
                </div>

                {/* Next Lesson */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sm text-gray-400 mb-1">다음 수업</p>
                  <p className="text-white font-medium">{course.nextLesson}</p>
                  <p className="text-sm text-primary mt-1 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.nextLessonDate}
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                    <Play className="w-5 h-5" />
                    이어서 학습하기
                  </button>
                  <Link
                    href="/education/lms/curriculum"
                    className="py-3 px-4 rounded-xl bg-white/5 text-gray-300 font-medium hover:bg-white/10 transition-colors"
                  >
                    전체 커리큘럼
                  </Link>
                </div>
              </GlassCard>
            </m.div>

            {/* Quick Links */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid grid-cols-4 gap-4">
                {quickLinks.map((link, index) => (
                  <Link key={link.label} href={link.href}>
                    <GlassCard className="p-4 text-center hover:bg-white/10 transition-colors group">
                      <div className={cn("w-10 h-10 mx-auto mb-2 rounded-xl bg-white/5 flex items-center justify-center", link.color)}>
                        <link.icon className="w-5 h-5" />
                      </div>
                      <p className="text-sm text-gray-300 group-hover:text-white transition-colors">{link.label}</p>
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </m.div>

            {/* Recent Lessons */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-lg font-semibold text-white mb-4">최근 수강 강의</h2>
                <div className="space-y-3">
                  {[
                    { title: '2주차: 자막 자동화 - 스타일링', duration: '45분', completed: true },
                    { title: '2주차: 자막 자동화 - 자막 생성', duration: '38분', completed: true },
                    { title: '2주차: 자막 자동화 - 음성 인식', duration: '42분', completed: true },
                  ].map((lesson, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          lesson.completed ? "bg-green-500/20" : "bg-white/10"
                        )}>
                          {lesson.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Play className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{lesson.title}</p>
                          <p className="text-gray-500 text-xs">{lesson.duration}</p>
                        </div>
                      </div>
                      <button className="text-sm text-primary hover:underline">다시보기</button>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </m.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-lg font-semibold text-white mb-4">알림</h2>
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="p-3 rounded-lg bg-white/5 border-l-2 border-primary">
                      <p className="text-white text-sm">{notif.message}</p>
                      <p className="text-gray-500 text-xs mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </m.div>

            {/* Stats */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <GlassCard className="p-6">
                <h2 className="text-lg font-semibold text-white mb-4">내 학습 현황</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">총 학습 시간</span>
                    <span className="text-white font-medium">8시간 32분</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">완료한 강의</span>
                    <span className="text-white font-medium">12강</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">제출한 과제</span>
                    <span className="text-white font-medium">2개</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">출석률</span>
                    <span className="text-green-400 font-medium">100%</span>
                  </div>
                </div>
              </GlassCard>
            </m.div>

            {/* Certificate Preview */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Link href="/education/certification">
                <GlassCard className="p-6 hover:bg-white/10 transition-colors group">
                  <div className="flex items-center gap-3 mb-3">
                    <Award className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-lg font-semibold text-white">자격증</h2>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    과정 수료 후 2급 자격증을 취득할 수 있습니다
                  </p>
                  <span className="text-primary text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                    자세히 보기 <ArrowRight className="w-4 h-4" />
                  </span>
                </GlassCard>
              </Link>
            </m.div>
          </div>
        </div>
      </div>
    </div>
  );
}

