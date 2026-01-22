'use client';

import { useState } from 'react';
import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  FileText, Clock, CheckCircle, AlertCircle,
  Upload, ArrowLeft, Calendar, MessageSquare
} from 'lucide-react';

interface Assignment {
  id: string;
  week: number;
  title: string;
  description: string;
  dueDate: string;
  status: 'submitted' | 'graded' | 'pending' | 'overdue';
  score?: number;
  feedback?: string;
}

const assignments: Assignment[] = [
  {
    id: '1',
    week: 1,
    title: '간단한 영상 만들기',
    description: 'AI 도구를 사용하여 30초 분량의 간단한 영상을 제작하세요.',
    dueDate: '2026-01-17',
    status: 'graded',
    score: 95,
    feedback: '훌륭합니다! 기본 기능을 잘 이해하고 계시네요. 다음엔 트랜지션을 더 다양하게 활용해보세요.',
  },
  {
    id: '2',
    week: 2,
    title: '자막 넣기 실습',
    description: '제공된 영상에 자막을 자동 생성하고 스타일을 적용하세요.',
    dueDate: '2026-01-24',
    status: 'submitted',
  },
  {
    id: '3',
    week: 3,
    title: '더빙 영상 만들기',
    description: 'TTS를 활용하여 나레이션이 포함된 영상을 제작하세요.',
    dueDate: '2026-01-31',
    status: 'pending',
  },
];

const statusConfig = {
  submitted: { label: '제출완료', color: 'bg-blue-500/20 text-blue-400', icon: CheckCircle },
  graded: { label: '평가완료', color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
  pending: { label: '진행중', color: 'bg-yellow-500/20 text-yellow-400', icon: Clock },
  overdue: { label: '기한초과', color: 'bg-red-500/20 text-red-400', icon: AlertCircle },
};

export default function AssignmentsPage() {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

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
            <FileText className="w-8 h-8 text-primary" />
            과제
          </h1>
          <p className="text-gray-400 mt-1">AI 영상제작 기초반 과제 목록</p>
        </m.div>

        {/* Stats */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-3 gap-4 mb-8">
            <GlassCard className="p-4 text-center">
              <p className="text-2xl font-bold text-white">3</p>
              <p className="text-sm text-gray-400">전체 과제</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <p className="text-2xl font-bold text-green-400">1</p>
              <p className="text-sm text-gray-400">평가 완료</p>
            </GlassCard>
            <GlassCard className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">1</p>
              <p className="text-sm text-gray-400">제출 대기</p>
            </GlassCard>
          </div>
        </m.div>

        {/* Assignment List */}
        <div className="space-y-4">
          {assignments.map((assignment, index) => {
            const config = statusConfig[assignment.status];
            const StatusIcon = config.icon;

            return (
              <m.div
                key={assignment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard
                  className={cn(
                    "p-6 cursor-pointer hover:bg-white/10 transition-colors",
                    selectedAssignment?.id === assignment.id && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedAssignment(
                    selectedAssignment?.id === assignment.id ? null : assignment
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 text-primary flex items-center justify-center font-bold">
                        {assignment.week}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{assignment.title}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          마감: {assignment.dueDate}
                        </p>
                      </div>
                    </div>
                    <span className={cn("px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1", config.color)}>
                      <StatusIcon className="w-3 h-3" />
                      {config.label}
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm">{assignment.description}</p>

                  {/* Expanded Content */}
                  {selectedAssignment?.id === assignment.id && (
                    <m.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      {assignment.status === 'graded' && (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-400">점수</span>
                            <span className="text-2xl font-bold text-green-400">{assignment.score}점</span>
                          </div>
                          <div>
                            <p className="text-gray-400 text-sm mb-2 flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              강사 피드백
                            </p>
                            <p className="text-white bg-white/5 rounded-lg p-3">
                              {assignment.feedback}
                            </p>
                          </div>
                        </div>
                      )}

                      {assignment.status === 'submitted' && (
                        <div className="text-center py-4">
                          <CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                          <p className="text-white font-medium">제출 완료!</p>
                          <p className="text-sm text-gray-400">평가 결과를 기다려주세요</p>
                        </div>
                      )}

                      {assignment.status === 'pending' && (
                        <div className="space-y-4">
                          <p className="text-gray-400 text-sm">
                            과제 파일을 업로드해주세요. 영상 파일 또는 링크를 제출할 수 있습니다.
                          </p>
                          <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                            <Upload className="w-10 h-10 text-gray-500 mx-auto mb-3" />
                            <p className="text-white font-medium">클릭하여 파일 업로드</p>
                            <p className="text-sm text-gray-500 mt-1">MP4, MOV 또는 유튜브 링크</p>
                          </div>
                          <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-opacity">
                            과제 제출하기
                          </button>
                        </div>
                      )}
                    </m.div>
                  )}
                </GlassCard>
              </m.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

