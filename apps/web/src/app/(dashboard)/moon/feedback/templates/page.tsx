'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FeedbackTemplate {
  id: string;
  name: string;
  type: string;
  content: string;
  priority: 'LOW' | 'NORMAL' | 'HIGH';
  usageCount: number;
  isActive: boolean;
}

const mockTemplates: FeedbackTemplate[] = [
  {
    id: 't1',
    name: '자막 위치 조정',
    type: '자막',
    content: '자막이 화면 하단에 가려집니다. 위치를 조정해주세요.',
    priority: 'HIGH',
    usageCount: 45,
    isActive: true,
  },
  {
    id: 't2',
    name: 'BGM 볼륨 낮추기',
    type: 'BGM',
    content: 'BGM 볼륨이 너무 큽니다. 30% 정도 낮춰주세요.',
    priority: 'NORMAL',
    usageCount: 38,
    isActive: true,
  },
  {
    id: 't3',
    name: '컷 전환 느리게',
    type: '컷편집',
    content: '컷 전환이 너무 빠릅니다. 좀 더 여유있게 편집해주세요.',
    priority: 'NORMAL',
    usageCount: 28,
    isActive: true,
  },
  {
    id: 't4',
    name: '색보정 요청',
    type: '색보정',
    content: '전체적인 색감이 어둡습니다. 밝게 보정해주세요.',
    priority: 'LOW',
    usageCount: 15,
    isActive: false,
  },
];

const typeColors: Record<string, string> = {
  '자막': 'bg-blue-100 text-blue-700',
  'BGM': 'bg-purple-100 text-purple-700',
  '컷편집': 'bg-green-100 text-green-700',
  '색보정': 'bg-orange-100 text-orange-700',
};

const priorityConfig = {
  LOW: { label: '낮음', color: 'text-gray-500' },
  NORMAL: { label: '보통', color: 'text-blue-600' },
  HIGH: { label: '높음', color: 'text-red-600' },
};

export default function FeedbackTemplatesPage() {
  const [templates, setTemplates] = useState<FeedbackTemplate[]>(mockTemplates);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    type: '자막',
    content: '',
    priority: 'NORMAL' as const,
  });

  const handleCreate = () => {
    if (!newTemplate.name || !newTemplate.content) {
      alert('이름과 내용을 입력해주세요.');
      return;
    }

    const template: FeedbackTemplate = {
      id: `t${Date.now()}`,
      ...newTemplate,
      usageCount: 0,
      isActive: true,
    };

    setTemplates([template, ...templates]);
    setNewTemplate({ name: '', type: '자막', content: '', priority: 'NORMAL' });
    setShowCreateForm(false);
  };

  const toggleActive = (id: string) => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">피드백 템플릿</h1>
              <p className="mt-1 text-gray-600">
                자주 사용하는 피드백을 템플릿으로 관리합니다
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              + 새 템플릿
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">새 템플릿 추가</h2>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  placeholder="템플릿 이름"
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">유형</label>
                <select
                  value={newTemplate.type}
                  onChange={(e) => setNewTemplate({ ...newTemplate, type: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="자막">자막</option>
                  <option value="BGM">BGM</option>
                  <option value="컷편집">컷편집</option>
                  <option value="색보정">색보정</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">우선순위</label>
                <select
                  value={newTemplate.priority}
                  onChange={(e) => setNewTemplate({ ...newTemplate, priority: e.target.value as 'LOW' | 'NORMAL' | 'HIGH' })}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="LOW">낮음</option>
                  <option value="NORMAL">보통</option>
                  <option value="HIGH">높음</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">내용</label>
              <textarea
                value={newTemplate.content}
                onChange={(e) => setNewTemplate({ ...newTemplate, content: e.target.value })}
                placeholder="피드백 내용..."
                className="w-full border rounded-lg px-3 py-2"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                취소
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                추가
              </button>
            </div>
          </div>
        )}

        {/* Template List */}
        <div className="space-y-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`bg-white rounded-lg shadow p-5 ${!template.isActive ? 'opacity-60' : ''}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${typeColors[template.type]}`}>
                      {template.type}
                    </span>
                    <h3 className="font-medium">{template.name}</h3>
                    <span className={`text-sm ${priorityConfig[template.priority].color}`}>
                      {priorityConfig[template.priority].label}
                    </span>
                  </div>
                  <p className="text-gray-600">{template.content}</p>
                  <p className="text-sm text-gray-400 mt-2">사용 횟수: {template.usageCount}회</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleActive(template.id)}
                    className={`px-3 py-1 rounded text-sm ${
                      template.isActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {template.isActive ? '활성' : '비활성'}
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
                    수정
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
