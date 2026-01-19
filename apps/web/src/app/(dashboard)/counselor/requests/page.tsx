'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CounselorRequestsPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    concept: '',
    targetAudience: '',
    keyPoints: '',
    style: 'balanced',
    duration: '60',
    references: '',
    deadline: '',
  });

  const styleOptions = [
    { value: 'bright', label: '밝고 경쾌한', desc: '젊은 층 타겟' },
    { value: 'calm', label: '차분하고 신뢰감', desc: '중장년층 타겟' },
    { value: 'balanced', label: '균형잡힌', desc: '전연령대' },
    { value: 'emotional', label: '감성적인', desc: '공감 중심' },
  ];

  const handleSubmit = async () => {
    // TODO: API call to submit request
    alert('영상 제작 요청이 완료되었습니다!');
    router.push('/counselor/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 py-8">
        <div className="max-w-3xl mx-auto px-4 text-white">
          <h1 className="text-2xl font-bold">새 홍보 영상 요청</h1>
          <p className="mt-1 text-purple-200">
            원하는 스타일과 내용을 알려주세요
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${
                  step >= s ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s}
                </div>
                <span className={`ml-2 text-sm ${
                  step >= s ? 'text-purple-600 font-medium' : 'text-gray-400'
                }`}>
                  {s === 1 ? '기본 정보' : s === 2 ? '스타일' : '확인'}
                </span>
                {s < 3 && <div className="w-16 h-0.5 bg-gray-200 mx-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Step 1 */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-6">기본 정보</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  영상 컨셉 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.concept}
                  onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
                  placeholder="예: 2026 신년운세 특집, 타로 연애운 등"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  타겟 시청자
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  placeholder="예: 20-30대 여성, 연애 고민있는 분들"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  꼭 들어가야 할 내용
                </label>
                <textarea
                  value={formData.keyPoints}
                  onChange={(e) => setFormData({ ...formData, keyPoints: e.target.value })}
                  placeholder="영상에 반드시 포함되어야 할 내용을 작성해주세요"
                  className="w-full border rounded-lg px-4 py-2"
                  rows={4}
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-6">스타일 선택</h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  영상 스타일
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {styleOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, style: option.value })}
                      className={`p-4 rounded-lg border-2 text-left ${
                        formData.style === option.value
                          ? 'border-purple-600 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium">{option.label}</p>
                      <p className="text-sm text-gray-500">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  희망 영상 길이
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value="30">30초 (숏츠용)</option>
                  <option value="60">60초</option>
                  <option value="120">2분</option>
                  <option value="180">3분 이상</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  참고 영상/레퍼런스 (선택)
                </label>
                <input
                  type="text"
                  value={formData.references}
                  onChange={(e) => setFormData({ ...formData, references: e.target.value })}
                  placeholder="유튜브 링크 등"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
                >
                  이전
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
                >
                  다음
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3 - Confirm */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-6">요청 내용 확인</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">영상 컨셉</span>
                <span className="font-medium">{formData.concept || '-'}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">타겟 시청자</span>
                <span className="font-medium">{formData.targetAudience || '-'}</span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">스타일</span>
                <span className="font-medium">
                  {styleOptions.find((s) => s.value === formData.style)?.label}
                </span>
              </div>
              <div className="flex justify-between py-3 border-b">
                <span className="text-gray-600">영상 길이</span>
                <span className="font-medium">{formData.duration}초</span>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-purple-800">
                💡 요청하신 내용을 바탕으로 운영팀에서 적합한 프리랜서를 매칭해드립니다.
                보통 3~5일 내에 첫 번째 시안을 받아보실 수 있습니다.
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
              >
                이전
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
              >
                요청 완료
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
