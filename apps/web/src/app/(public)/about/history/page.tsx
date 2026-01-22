'use client';

import React from 'react';
import { m } from 'framer-motion';
import { Building2, Rocket, Award, Users, Globe, Sparkles, TrendingUp, MapPin, Target } from 'lucide-react';

interface HistoryEvent {
  month: string;
  title: string;
  description: string;
  icon: any;
  highlight?: boolean;
  isFirst?: boolean;
}

interface Milestone {
  year: string;
  events: HistoryEvent[];
}

const milestones: Milestone[] = [
  {
    year: "2024",
    events: [
      {
        month: "12월",
        title: "연간 500+ 프로젝트 달성",
        description: "고객 만족도 98% 유지하며 연간 목표 초과 달성",
        icon: Award,
        highlight: true
      },
      {
        month: "9월",
        title: "AI 교육 프로그램 론칭",
        description: "기업 맞춤형 AI 활용 교육 과정 개설, 첫 달 50개 기업 수료",
        icon: Sparkles
      },
      {
        month: "6월",
        title: "전문 인력 50명 돌파",
        description: "AI, 영상, 마케팅 각 분야 전문가 영입 완료",
        icon: Users
      },
      {
        month: "3월",
        title: "Series A 투자 유치",
        description: "50억 원 규모 투자 유치, 사업 확장 가속화",
        icon: TrendingUp
      }
    ]
  },
  {
    year: "2023",
    events: [
      {
        month: "11월",
        title: "AI 마케팅 서비스 확장",
        description: "데이터 기반 퍼포먼스 마케팅 솔루션 정식 출시",
        icon: Globe
      },
      {
        month: "7월",
        title: "서울 강남 본사 이전",
        description: "확장된 시설로 본사 이전 및 전문 스튜디오 오픈",
        icon: Building2
      },
      {
        month: "6월",
        title: "AI 영상 제작 서비스 시작",
        description: "첫 고객사 10곳 확보, 생성형 AI 기반 영상 자동화 시스템 구축",
        icon: Rocket
      },
      {
        month: "3월",
        title: "한깨봄 공식 설립",
        description: "AI 혁신 파트너로서의 여정 시작",
        icon: Building2,
        isFirst: true
      }
    ]
  }
];

const futureGoals = [
  { icon: Globe, title: "글로벌 진출", description: "동남아 시장 시작으로 글로벌 확장" },
  { icon: Target, title: "1,000개 프로젝트", description: "누적 프로젝트 1,000건 달성" },
  { icon: Rocket, title: "AI 플랫폼 런칭", description: "자체 AI 에이전시 플랫폼 출시" },
];

export default function HistoryPage() {
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
              Our History
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
              우리의 여정
            </h1>
            <p className="text-xl text-white/70">
              2023년 설립 이후 지속적인 성장
            </p>

            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary italic">2</div>
                <div className="text-sm text-white/60">년의 역사</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary italic">500+</div>
                <div className="text-sm text-white/60">완료 프로젝트</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary italic">50+</div>
                <div className="text-sm text-white/60">전문 인력</div>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 md:px-20 bg-background">
        <div className="max-w-[1000px] mx-auto">
          {milestones.map((milestone, yearIdx) => (
            <div key={milestone.year} className="mb-24 last:mb-0">
              {/* Year Header */}
              <m.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-6 mb-12"
              >
                <div className="relative">
                  <div className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400 italic">
                    {milestone.year}
                  </div>
                  {/* Pulse effect for current year */}
                  {milestone.year === "2024" && (
                    <m.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -right-2 -top-2 w-4 h-4 bg-primary rounded-full"
                    />
                  )}
                </div>
                <div className="h-1 flex-1 bg-gradient-to-r from-primary to-transparent rounded opacity-20" />
              </m.div>

              {/* Events */}
              <div className="relative pl-8 md:pl-12 border-l-4 border-slate-900">
                {milestone.events.map((event, eventIdx) => (
                  <m.div
                    key={event.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: eventIdx * 0.15 }}
                    className="relative mb-12 last:mb-0"
                  >
                    {/* Timeline Marker */}
                    <m.div
                      whileHover={{ scale: 1.1 }}
                      className={`absolute -left-[34px] md:-left-[38px] w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg ${
                        event.highlight
                          ? 'bg-primary'
                          : event.isFirst
                            ? 'bg-slate-700'
                            : 'bg-background border-4 border-primary'
                      }`}
                    >
                      <event.icon className={`w-6 h-6 ${event.highlight || event.isFirst ? 'text-primary-foreground' : 'text-primary'}`} />

                      {/* Pulse animation for highlight */}
                      {event.highlight && (
                        <m.div
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-primary"
                          style={{ zIndex: -1 }}
                        />
                      )}
                    </m.div>

                    {/* Content Card */}
                    <m.div
                      whileHover={{ x: 10 }}
                      className={`ml-10 md:ml-12 rounded-2xl p-6 md:p-8 transition-all duration-300 border border-white/5 ${
                        event.highlight
                          ? 'bg-primary/10 border-primary/20 shadow-2xl shadow-primary/5'
                          : 'bg-slate-900 hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          event.highlight ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                        }`}>
                          {event.month}
                        </span>
                        {event.isFirst && (
                          <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm font-bold border border-white/5">
                            🎉 창립
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold mt-2 mb-3 text-white">{event.title}</h3>
                      <p className="text-slate-400">{event.description}</p>
                    </m.div>
                  </m.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-24 px-6 md:px-20 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
        <div className="max-w-[1200px] mx-auto">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-bold tracking-widest text-primary uppercase">
              2025 & Beyond
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              앞으로의 여정
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              한깨봄은 멈추지 않습니다. AI 기술의 발전과 함께,
              더 많은 기업이 혁신의 혜택을 누릴 수 있도록 도전합니다.
            </p>
          </m.div>

          {/* Future Goals Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {futureGoals.map((goal, idx) => (
              <m.div
                key={goal.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative bg-slate-900 rounded-2xl p-8 border border-white/10 hover:border-primary/50 transition-all group"
              >
                {/* Sparkle effect */}
                <m.div
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                  className="absolute top-4 right-4 w-2 h-2 bg-primary rounded-full"
                />

                <div className="w-14 h-14 bg-primary text-primary-foreground rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                  <goal.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">{goal.title}</h3>
                <p className="text-white/60">{goal.description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

