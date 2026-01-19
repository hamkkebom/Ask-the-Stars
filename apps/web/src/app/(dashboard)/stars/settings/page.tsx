'use client';

import { useState } from 'react';
import { User, Bell, Shield, Palette, Globe, HelpCircle, ChevronRight } from 'lucide-react';

interface SettingSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  href?: string;
}

const settingSections: SettingSection[] = [
  {
    title: '프로필 설정',
    description: '이름, 프로필 사진, 자기소개 등을 수정합니다',
    icon: <User className="w-5 h-5" />,
    iconBg: 'bg-blue-500/20 text-blue-400',
    href: '/stars/profile',
  },
  {
    title: '알림 설정',
    description: '이메일, 푸시 알림 등 알림 방식을 설정합니다',
    icon: <Bell className="w-5 h-5" />,
    iconBg: 'bg-yellow-500/20 text-yellow-400',
  },
  {
    title: '보안',
    description: '비밀번호 변경, 2단계 인증 등 보안 설정',
    icon: <Shield className="w-5 h-5" />,
    iconBg: 'bg-green-500/20 text-green-400',
  },
  {
    title: '테마 및 디스플레이',
    description: '다크 모드, 언어, 시간대 설정',
    icon: <Palette className="w-5 h-5" />,
    iconBg: 'bg-purple-500/20 text-purple-400',
  },
  {
    title: '결제 정보',
    description: '정산 계좌, 세금 정보 관리',
    icon: <Globe className="w-5 h-5" />,
    iconBg: 'bg-orange-500/20 text-orange-400',
  },
  {
    title: '도움말 및 지원',
    description: '자주 묻는 질문, 고객 지원 문의',
    icon: <HelpCircle className="w-5 h-5" />,
    iconBg: 'bg-gray-500/20 text-gray-400',
  },
];

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  });

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">설정</h1>
        <p className="text-gray-400 mt-1">
          계정 설정 및 환경설정을 관리하세요
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-3">
        {settingSections.map((section, index) => (
          <button
            key={index}
            className="w-full rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between hover:bg-white/10 transition-colors text-left group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${section.iconBg}`}>
                {section.icon}
              </div>
              <div>
                <h3 className="font-medium text-white group-hover:text-yellow-400 transition-colors">
                  {section.title}
                </h3>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
          </button>
        ))}
      </div>

      {/* Quick Settings: Notifications */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold text-white mb-4">빠른 설정</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">이메일 알림</p>
              <p className="text-sm text-gray-500">새 피드백, 정산 알림 등</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, email: !notifications.email })}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications.email ? 'bg-yellow-500' : 'bg-white/10'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                notifications.email ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">푸시 알림</p>
              <p className="text-sm text-gray-500">브라우저 푸시 알림</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, push: !notifications.push })}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications.push ? 'bg-yellow-500' : 'bg-white/10'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                notifications.push ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">마케팅 수신 동의</p>
              <p className="text-sm text-gray-500">이벤트 및 프로모션 정보</p>
            </div>
            <button
              onClick={() => setNotifications({ ...notifications, marketing: !notifications.marketing })}
              className={`w-12 h-6 rounded-full transition-colors ${
                notifications.marketing ? 'bg-yellow-500' : 'bg-white/10'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                notifications.marketing ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
        <h2 className="text-lg font-semibold text-red-400 mb-2">위험 구역</h2>
        <p className="text-sm text-gray-500 mb-4">
          계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
        </p>
        <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors">
          계정 삭제
        </button>
      </div>
    </div>
  );
}
