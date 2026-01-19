'use client';

import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, Play, BookOpen, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EducationPage() {
  const courses = [
    {
      id: 1,
      title: "AI 타로 마스터 클래스",
      desc: "ChatGPT와 Midjourney를 활용한 타로 상담의 A to Z",
      level: "기초",
      duration: "4주 완성",
      students: 1200,
      color: "from-green-400 to-emerald-600"
    },
    {
      id: 2,
      title: "사주 명리 데이터 분석",
      desc: "고대 통계학과 현대 데이터 분석의 만남",
      level: "중급",
      duration: "8주 과정",
      students: 850,
      color: "from-emerald-400 to-teal-500"
    },
    {
      id: 3,
      title: "퍼스널 브랜딩 & 마케팅",
      desc: "상담사를 위한 실전 인스타그램/유튜브 공략",
      level: "실전",
      duration: "2주 속성",
      students: 2300,
      color: "from-green-300 to-lime-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-vibrant-green/30 pt-20">

      {/* Background Ambient */}
      <div className="fixed top-0 right-0 h-[800px] w-[800px] bg-vibrant-green/5 rounded-[100%] blur-[120px] pointer-events-none z-0" />

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vibrant-green/10 border border-vibrant-green/20 text-vibrant-green mb-8"
          >
            <GraduationCap className="w-4 h-4" />
            <span className="text-sm font-bold tracking-wide">AI ACADEMY</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight px-4"
          >
            미래의 상담사를 위한<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-vibrant-green via-white to-vibrant-green animate-clip-text">
              AI 혁신 교육
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            전통적인 상담 기법에 인공지능 기술을 더해<br />
            더 정확하고, 더 깊이 있는 인사이트를 제공하는 전문가로 성장하세요.
          </motion.p>
        </div>
      </section>

      {/* Course Grid */}
      <section className="relative z-10 px-6 pb-32">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="w-1 h-8 bg-vibrant-green rounded-full"/>
                    인기 강좌
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {courses.map((course, i) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                        className="group relative bg-neutral-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-vibrant-green/50 transition-colors"
                    >
                        {/* Course Image Placeholder */}
                        <div className={`h-40 bg-gradient-to-br ${course.color} relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            <div className="absolute bottom-4 left-4">
                                <span className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs font-bold text-white border border-white/20">
                                    {course.level}
                                </span>
                            </div>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 group-hover:text-vibrant-green transition-colors">
                                {course.title}
                            </h3>
                            <p className="text-neutral-400 text-sm mb-6 min-h-[40px]">
                                {course.desc}
                            </p>

                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-2 text-sm text-neutral-500">
                                    <BookOpen className="w-4 h-4 text-vibrant-green/70" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-neutral-500">
                                    <CheckCircle2 className="w-4 h-4 text-vibrant-green/70" />
                                    <span>수료증 발급</span>
                                </div>
                            </div>

                            <button className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-medium rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2">
                                수강신청 <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

    </div>
  );
}
