import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Clapperboard,
  GraduationCap,
  Mail,
  Megaphone,
  Users,
} from 'lucide-react';
import { BRAND_NAME, COMPANY_NAME } from '@/components/layout/brand-logo';

export const metadata: Metadata = {
  title: '서비스 소개',
  description: `${BRAND_NAME}는 AI 영상 제작 인재를 키우고, 연결하고, 함께 만드는 플랫폼입니다.`,
};

const steps = [
  {
    icon: GraduationCap,
    title: '교육',
    description:
      'AI 영상 제작을 처음 배우는 분도 실무에 바로 쓸 수 있도록 설명회와 교육 과정을 운영합니다.',
  },
  {
    icon: Users,
    title: '전문가 매칭',
    description:
      '교육을 마친 크리에이터를 프리랜서 전문가로 연결하고, 의뢰에 맞는 사람을 찾아드립니다.',
  },
  {
    icon: Clapperboard,
    title: '영상 제작',
    description:
      '의뢰 접수부터 피드백, 수정, 납품까지 한 곳에서 관리하며 영상을 완성합니다.',
  },
  {
    icon: Megaphone,
    title: '마케팅',
    description:
      '완성된 영상이 실제 성과로 이어지도록 홍보와 광고 운영까지 함께합니다.',
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 space-y-24">
      {/* Intro */}
      <section className="max-w-3xl">
        <p className="text-sm font-semibold text-secondary mb-3">서비스 소개</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
          {BRAND_NAME}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {BRAND_NAME}는 AI 영상 제작 인재를 키우고, 연결하고, 함께 만드는
          플랫폼입니다. 배우는 사람과 만드는 사람, 영상이 필요한 사람이 한
          곳에서 만납니다.
        </p>
        <div className="flex flex-wrap gap-3 mt-8">
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors"
          >
            영상 둘러보기
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
          <Link
            href="/education/session"
            className="inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-lg transition-colors"
          >
            무료 설명회 신청
          </Link>
        </div>
      </section>

      {/* Vision */}
      <section id="vision" className="scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">비전</h2>
        <p className="text-muted-foreground max-w-2xl mb-10">
          배움이 일이 되고, 일이 다시 성장으로 이어지는 순환을 만듭니다. 네
          단계가 하나로 이어져 있어 어느 단계에서 시작해도 다음 단계로
          자연스럽게 넘어갈 수 있습니다.
        </p>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, index) => (
            <li
              key={title}
              className="relative rounded-2xl bg-white/5 border border-white/10 p-6"
            >
              <span className="absolute top-6 right-6 text-sm font-semibold text-gray-500">
                0{index + 1}
              </span>
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-24 rounded-2xl bg-white/5 border border-white/10 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">문의하기</h2>
          <p className="text-muted-foreground">
            제작 의뢰, 제휴, 이용 문의는 이메일로 보내 주세요. {BRAND_NAME}는{' '}
            {COMPANY_NAME}이 운영합니다.
          </p>
        </div>
        <a
          href="mailto:contact@hamkkebom.com"
          className="inline-flex items-center gap-2 px-5 py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg transition-colors shrink-0"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          contact@hamkkebom.com
        </a>
      </section>
    </div>
  );
}
