'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';
import {
  Settings,
  Users,
  Shield,
  Bell,
  Palette,
  Database,
  Key,
  Globe,
  Save,
  RotateCcw,
  ChevronRight
} from 'lucide-react';

// Settings sections
const settingsSections = [
  { id: 'general', label: '일반 설정', icon: Settings },
  { id: 'roles', label: '권한 관리', icon: Shield },
  { id: 'notifications', label: '알림 설정', icon: Bell },
  { id: 'appearance', label: '테마 설정', icon: Palette },
  { id: 'integrations', label: '연동 관리', icon: Database },
  { id: 'security', label: '보안 설정', icon: Key },
];

// Mock settings
const moduleSettings = [
  { id: 'stars', label: '프리랜서', enabled: true },
  { id: 'studio', label: 'AI 스튜디오', enabled: true },
  { id: 'marketing', label: '마케팅 대행', enabled: false },
  { id: 'education', label: 'AI 교육', enabled: true },
  { id: 'contests', label: 'AI 공모전', enabled: false },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('general');
  const [modules, setModules] = useState(moduleSettings);

  const toggleModule = (id: string) => {
    setModules(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-2">
            <Settings className="w-8 h-8 text-gray-400" />
            시스템 설정
          </h1>
          <p className="text-gray-400 mt-1">시스템과 서비스 모듈을 관리합니다</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition-colors flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            초기화
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" />
            저장하기
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <GlassCard className="p-4 lg:col-span-1 h-fit">
          <div className="space-y-1">
            {settingsSections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-colors",
                  activeSection === section.id
                    ? "bg-primary/20 text-primary"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-3">
                  <section.icon className="w-4 h-4" />
                  <span>{section.label}</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Module toggles */}
          {activeSection === 'general' && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-bold text-white mb-6">서비스 모듈 ON/OFF</h2>
              <p className="text-gray-400 text-sm mb-6">
                활성화된 모듈만 관리자 사이드바에 표시됩니다
              </p>

              <div className="space-y-4">
                {modules.map(module => (
                  <div
                    key={module.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-white font-medium">{module.label}</span>
                    <button
                      onClick={() => toggleModule(module.id)}
                      className={cn(
                        "w-12 h-6 rounded-full transition-all relative",
                        module.enabled ? "bg-primary" : "bg-gray-700"
                      )}
                    >
                      <div
                        className={cn(
                          "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                          module.enabled ? "left-7" : "left-1"
                        )}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {activeSection === 'roles' && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-bold text-white mb-6">권한 그룹</h2>

              <div className="space-y-4">
                {[
                  { name: '시스템 관리자', permissions: '모든 권한', users: 2, color: 'bg-red-500' },
                  { name: '프리랜서 담당', permissions: 'stars, talent', users: 3, color: 'bg-blue-500' },
                  { name: '정산 담당', permissions: 'finance', users: 2, color: 'bg-green-500' },
                  { name: '콘텐츠 담당', permissions: 'studio, marketing', users: 4, color: 'bg-purple-500' },
                ].map(role => (
                  <div
                    key={role.name}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg ${role.color}/20 flex items-center justify-center`}>
                        <Shield className={`w-5 h-5 ${role.color.replace('bg-', 'text-')}`} />
                      </div>
                      <div>
                        <p className="text-white font-medium group-hover:text-primary transition-colors">
                          {role.name}
                        </p>
                        <p className="text-gray-500 text-sm">{role.permissions}</p>
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {role.users}명
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-6 w-full py-3 rounded-lg border border-dashed border-white/20 text-gray-400 hover:border-primary hover:text-primary transition-colors">
                + 새 권한 그룹 추가
              </button>
            </GlassCard>
          )}

          {activeSection === 'appearance' && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-bold text-white mb-6">테마 설정</h2>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { name: '다크 모드', active: true, preview: 'bg-[#0B0E14]' },
                  { name: '라이트 모드', active: false, preview: 'bg-gray-100' },
                  { name: '시스템 설정', active: false, preview: 'bg-gradient-to-br from-gray-900 to-gray-100' },
                ].map(theme => (
                  <button
                    key={theme.name}
                    className={cn(
                      "p-4 rounded-xl border-2 transition-all",
                      theme.active
                        ? "border-primary"
                        : "border-white/10 hover:border-white/30"
                    )}
                  >
                    <div className={`w-full h-20 rounded-lg mb-3 ${theme.preview}`} />
                    <p className="text-white text-sm">{theme.name}</p>
                  </button>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Placeholder for other sections */}
          {!['general', 'roles', 'appearance'].includes(activeSection) && (
            <GlassCard className="p-6">
              <h2 className="text-lg font-bold text-white mb-4">
                {settingsSections.find(s => s.id === activeSection)?.label}
              </h2>
              <p className="text-gray-400">이 섹션은 곧 구현될 예정입니다.</p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
