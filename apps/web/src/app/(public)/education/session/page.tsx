import type { Metadata } from 'next';
import { CalendarClock, CheckCircle2, MonitorPlay } from 'lucide-react';
import LeadForm from '@/components/features/leads/lead-form';

export const metadata: Metadata = {
  title: '무료 설명회 신청',
  description:
    'AI 영상 제작 교육과 전문가 활동 방법을 소개하는 무료 온라인 설명회입니다.',
};

const agenda = [
  'AI 영상 제작이 실제로 어떻게 이루어지는지',
  '교육 과정 구성과 수료 후 활동 방법',
  '전문가로 의뢰를 받고 영상을 납품하는 흐름',
  '참여 전에 준비하면 좋은 포트폴리오',
];

export default function SessionInfoPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-start">
        <section className="max-w-2xl">
          <p className="text-sm font-semibold text-secondary mb-3">
            교육 설명회
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            무료 설명회 신청
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-10">
            AI 영상 제작을 배우고 전문가로 활동하는 과정을 한 번에 소개합니다.
            궁금한 점은 설명회에서 바로 질문하실 수 있습니다.
          </p>

          <div className="grid gap-4 sm:grid-cols-2 mb-10">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex gap-4">
              <MonitorPlay
                className="w-6 h-6 text-primary shrink-0"
                aria-hidden="true"
              />
              <div>
                <h2 className="font-semibold text-white mb-1">진행 방식</h2>
                <p className="text-sm text-muted-foreground">
                  온라인(Zoom) 라이브 + 질의응답
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-5 flex gap-4">
              <CalendarClock
                className="w-6 h-6 text-primary shrink-0"
                aria-hidden="true"
              />
              <div>
                <h2 className="font-semibold text-white mb-1">일정 안내</h2>
                <p className="text-sm text-muted-foreground">
                  약 60분 · 신청하신 이메일로 일정을 보내드립니다
                </p>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mb-4">
            설명회에서 다루는 내용
          </h2>
          <ul className="space-y-3">
            {agenda.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2
                  className="w-5 h-5 text-secondary shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <LeadForm />
      </div>
    </div>
  );
}
