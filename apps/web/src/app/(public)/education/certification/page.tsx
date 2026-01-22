'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import {
  Award, CheckCircle, ArrowLeft, Download,
  Star, Briefcase, Users, ArrowRight
} from 'lucide-react';

const certifications = [
  {
    id: '1',
    level: 2,
    title: 'AI 영상제작 2급',
    course: 'AI 영상제작 기초반',
    requirements: [
      '모든 강의 수강 완료',
      '과제 3개 제출 및 평가',
      '출석률 80% 이상',
      '종합 평가 70점 이상',
    ],
    benefits: [
      '프리랜서 활동 자격 부여',
      '기초 프로젝트 매칭 우선권',
      '커뮤니티 정회원 등급',
    ],
    status: 'in_progress',
    progress: 75,
  },
  {
    id: '2',
    level: 1,
    title: 'AI 영상제작 1급',
    course: 'AI 퍼스널마케팅 심화반',
    requirements: [
      '2급 자격증 보유',
      '심화 과정 수료',
      '실전 프로젝트 3개 완료',
      '멘토 평가 통과',
    ],
    benefits: [
      '고급 프로젝트 매칭',
      '취업 연계 프로그램',
      '강사 양성 과정 참여권',
    ],
    status: 'locked',
    progress: 0,
  },
];

const successStories = [
  {
    name: '김OO',
    certification: '1급',
    story: '수료 후 3개월 만에 월 500만원 수익 달성',
  },
  {
    name: '이OO',
    certification: '2급',
    story: '프리랜서 활동 시작, 첫 달 10건 프로젝트 완료',
  },
  {
    name: '박OO',
    certification: '1급',
    story: '영상 제작사 취업 성공',
  },
];

export default function CertificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-yellow-900/10 to-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-12">
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
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-yellow-500/20 mb-4">
            <Award className="w-8 h-8 text-yellow-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">자격증 & 데뷔</h1>
          <p className="text-gray-400 text-lg">
            과정을 수료하고 AI 영상제작 전문가로 데뷔하세요
          </p>
        </m.div>

        {/* Certification Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {certifications.map((cert, index) => (
            <m.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className={`p-6 h-full ${cert.status === 'locked' ? 'opacity-60' : ''}`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-3 py-1 rounded-lg text-sm font-bold ${
                        cert.level === 1 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {cert.level}급
                      </span>
                      {cert.status === 'in_progress' && (
                        <span className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs">
                          진행중
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-white">{cert.title}</h2>
                    <p className="text-gray-400 text-sm">{cert.course}</p>
                  </div>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                    cert.level === 1 ? 'bg-yellow-500/20' : 'bg-blue-500/20'
                  }`}>
                    <Award className={`w-8 h-8 ${
                      cert.level === 1 ? 'text-yellow-400' : 'text-blue-400'
                    }`} />
                  </div>
                </div>

                {/* Progress */}
                {cert.status === 'in_progress' && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">진행률</span>
                      <span className="text-primary font-medium">{cert.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                        style={{ width: `${cert.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Requirements */}
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-3">취득 조건</h3>
                  <ul className="space-y-2">
                    {cert.requirements.map((req, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                        <CheckCircle className={`w-4 h-4 ${
                          cert.status === 'in_progress' && i < 2 ? 'text-green-400' : 'text-gray-500'
                        }`} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <h3 className="text-white font-medium mb-3">취득 혜택</h3>
                  <ul className="space-y-2">
                    {cert.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                {cert.status === 'in_progress' && (
                  <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-opacity">
                    학습 계속하기
                  </button>
                )}
                {cert.status === 'locked' && (
                  <button className="w-full py-3 px-4 rounded-xl bg-white/10 text-gray-400 font-medium cursor-not-allowed">
                    2급 취득 후 도전 가능
                  </button>
                )}
              </GlassCard>
            </m.div>
          ))}
        </div>

        {/* Success Stories */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="p-8">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              수료생 성공 스토리
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {successStories.map((story, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-white/5">
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <p className="font-medium text-white">{story.name}</p>
                  <p className="text-sm text-primary mb-2">{story.certification} 취득</p>
                  <p className="text-sm text-gray-400">{story.story}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/education/courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-500 text-white font-medium hover:opacity-90 transition-opacity"
              >
                <Briefcase className="w-5 h-5" />
                나도 시작하기
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </GlassCard>
        </m.div>
      </div>
    </div>
  );
}

