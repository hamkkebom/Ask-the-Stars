"use client";

import Link from "next/link";
import { Star, Video, Wallet, Clock, ArrowRight, Users } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Wallet,
    title: "합리적인 수익",
    description: "영상 제작에 대한 공정한 보상을 받으세요.",
  },
  {
    icon: Clock,
    title: "유연한 일정",
    description: "원하는 프로젝트를 선택하고 자유롭게 작업하세요.",
  },
  {
    icon: Video,
    title: "포트폴리오 구축",
    description: "다양한 프로젝트로 경력을 쌓아보세요.",
  },
  {
    icon: Users,
    title: "커뮤니티",
    description: "함께봄 전문가 네트워크에 참여하세요.",
  },
];

export default function StarsLandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-vibrant-cyan/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-vibrant-cyan/10 border border-vibrant-cyan/20 mb-8">
              <Star className="w-4 h-4 text-vibrant-cyan fill-vibrant-cyan" />
              <span className="text-sm text-vibrant-cyan font-medium">전문가 포털</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-400">
              함께봄의 전문가가 되어보세요
            </h1>

            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
              영상 편집 전문가로서 다양한 프로젝트에 참여하고,
              <br className="hidden md:block" />
              당신의 실력을 발휘할 기회를 만나보세요.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-vibrant-cyan hover:shadow-[0_0_30px_-5px_rgba(0,255,255,0.5)] transition-all duration-300"
              >
                전문가로 시작하기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/auth/login"
                className="px-8 py-4 border border-white/20 text-white font-medium rounded-xl hover:bg-white/5 hover:border-white/40 transition-all"
              >
                로그인
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">왜 함께봄인가요?</h2>
            <p className="text-neutral-400">전문가로서 누릴 수 있는 혜택들</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-neutral-900/50 border border-white/5 rounded-2xl hover:border-vibrant-cyan/30 transition-all group"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-vibrant-cyan/10 mb-4 group-hover:bg-vibrant-cyan/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-vibrant-cyan" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-8 md:p-12 bg-gradient-to-b from-neutral-900 to-neutral-950 border border-white/10 rounded-3xl"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-neutral-400 mb-8">
              회원가입 후 바로 프로젝트에 지원할 수 있습니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-vibrant-cyan text-black font-bold rounded-xl hover:shadow-[0_0_30px_-5px_rgba(0,255,255,0.5)] transition-all"
              >
                무료로 시작하기
              </Link>
              <Link
                href="/stars/open-projects"
                className="px-8 py-4 text-vibrant-cyan hover:underline"
              >
                프로젝트 둘러보기 →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
