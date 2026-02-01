'use client';

import { useState } from 'react';
import {
  Plus,
  Calendar,
  Clock,
  Video,
  CheckCircle,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Mock 작업 일지 데이터
const mockJournalEntries = [
  {
    id: '1',
    date: '2026-01-29',
    entries: [
      {
        id: 'e1',
        time: '10:00',
        description: '브랜드 영상 편집 시작',
        project: '삼성 브랜드 영상',
        completed: true,
      },
      {
        id: 'e2',
        time: '14:00',
        description: '색보정 및 자막 작업',
        project: '삼성 브랜드 영상',
        completed: true,
      },
      {
        id: 'e3',
        time: '16:30',
        description: '최종 렌더링 및 업로드',
        project: '삼성 브랜드 영상',
        completed: false,
      },
    ],
  },
  {
    id: '2',
    date: '2026-01-28',
    entries: [
      {
        id: 'e4',
        time: '09:00',
        description: '클라이언트 미팅 - 요구사항 논의',
        project: 'LG 제품 소개',
        completed: true,
      },
      {
        id: 'e5',
        time: '13:00',
        description: '스토리보드 작성',
        project: 'LG 제품 소개',
        completed: true,
      },
    ],
  },
  {
    id: '3',
    date: '2026-01-27',
    entries: [
      {
        id: 'e6',
        time: '10:00',
        description: '영상 촬영',
        project: '현대 이벤트 영상',
        completed: true,
      },
      {
        id: 'e7',
        time: '15:00',
        description: '러프 편집',
        project: '현대 이벤트 영상',
        completed: true,
      },
    ],
  },
];

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayStr = today.toISOString().split('T')[0];
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (dateStr === todayStr) return '오늘';
  if (dateStr === yesterdayStr) return '어제';

  return date.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  });
}

export default function WorkJournalPage() {
  const [isAdding, setIsAdding] = useState(false);

  // 통계 계산
  const totalEntries = mockJournalEntries.reduce(
    (acc, day) => acc + day.entries.length,
    0
  );
  const completedEntries = mockJournalEntries.reduce(
    (acc, day) => acc + day.entries.filter((e) => e.completed).length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">작업 일지</h1>
        <button
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          <Plus className="w-4 h-4" />새 기록
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-4">
          <div className="flex items-center gap-2 text-[#aaa] text-sm mb-2">
            <Calendar className="w-4 h-4" />
            이번 주 작업일
          </div>
          <p className="text-2xl font-bold text-white">5일</p>
        </div>
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-4">
          <div className="flex items-center gap-2 text-[#aaa] text-sm mb-2">
            <CheckCircle className="w-4 h-4" />
            완료된 작업
          </div>
          <p className="text-2xl font-bold text-white">{completedEntries}개</p>
        </div>
        <div className="bg-[#212121] rounded-xl border border-[#3f3f3f] p-4">
          <div className="flex items-center gap-2 text-[#aaa] text-sm mb-2">
            <Video className="w-4 h-4" />
            진행 중 프로젝트
          </div>
          <p className="text-2xl font-bold text-white">3개</p>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-1 text-[#aaa] hover:text-white transition-colors">
          <ChevronLeft className="w-4 h-4" />
          이전 주
        </button>
        <span className="text-white font-medium">2026년 1월 4주차</span>
        <button className="flex items-center gap-1 text-[#aaa] hover:text-white transition-colors">
          다음 주
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Journal Entries */}
      <div className="space-y-4">
        {mockJournalEntries.map((day) => (
          <div
            key={day.id}
            className="bg-[#212121] rounded-xl border border-[#3f3f3f] overflow-hidden"
          >
            {/* Date Header */}
            <div className="px-4 py-3 border-b border-[#3f3f3f] bg-[#1a1a1a]">
              <h2 className="font-medium text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#aaa]" />
                {formatDate(day.date)}
                <span className="text-[#666] text-sm ml-2">
                  {day.entries.filter((e) => e.completed).length}/
                  {day.entries.length} 완료
                </span>
              </h2>
            </div>

            {/* Entries */}
            <div className="divide-y divide-[#3f3f3f]">
              {day.entries.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center gap-4 p-4 hover:bg-[#3f3f3f] transition-colors group"
                >
                  {/* Checkbox */}
                  <button
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                      entry.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-[#666] hover:border-[#aaa]'
                    }`}
                  >
                    {entry.completed && (
                      <CheckCircle className="w-3 h-3 text-white" />
                    )}
                  </button>

                  {/* Time */}
                  <div className="flex items-center gap-1 text-[#666] text-sm w-16 shrink-0">
                    <Clock className="w-3 h-3" />
                    {entry.time}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`${entry.completed ? 'text-[#666] line-through' : 'text-white'}`}
                    >
                      {entry.description}
                    </p>
                    <p className="text-[#aaa] text-sm mt-0.5">
                      📁 {entry.project}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 hover:bg-[#272727] rounded transition-colors">
                      <Edit className="w-4 h-4 text-[#aaa]" />
                    </button>
                    <button className="p-1.5 hover:bg-[#272727] rounded transition-colors">
                      <Trash2 className="w-4 h-4 text-[#aaa] hover:text-red-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
