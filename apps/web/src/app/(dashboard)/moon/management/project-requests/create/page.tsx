'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CreateProjectRequestPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [] as string[],
    assignmentType: 'MULTIPLE',
    maxAssignees: 3,
    estimatedBudget: 150000,
    deadline: '',
    targetCounselorId: '',
    requirements: '',
    referenceLinks: '',
  });

  const categoryOptions = [
    '신년운세', '사주', '타로', '신점', '연애운', '재물운', '인간관계', '취업/진로',
  ];

  const handleCategoryToggle = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.deadline) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    // TODO: API call to create project request
    alert('제작요청이 등록되었습니다!');
    router.push('/moon/management/project-requests');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/moon/management/project-requests" className="hover:text-blue-600">
              제작요청 관리
            </Link>
            <span>/</span>
            <span>새 제작요청</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">새 제작요청 등록</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">기본 정보</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제목 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="예: 신년운세 × 신규 상담사 김태희 홍보"
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  상세 설명 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="영상 제작에 필요한 상세 내용을 작성해주세요..."
                  className="w-full border rounded-lg px-4 py-2"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리
                </label>
                <div className="flex flex-wrap gap-2">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleCategoryToggle(cat)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        formData.categories.includes(cat)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">제작 방식</h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, assignmentType: 'SINGLE' })}
                className={`p-4 rounded-lg border-2 text-left ${
                  formData.assignmentType === 'SINGLE'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-medium">👤 독점 제작</p>
                <p className="text-sm text-gray-500">1명의 프리랜서만 수락</p>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, assignmentType: 'MULTIPLE' })}
                className={`p-4 rounded-lg border-2 text-left ${
                  formData.assignmentType === 'MULTIPLE'
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="font-medium">🔁 중복 제작</p>
                <p className="text-sm text-gray-500">여러 프리랜서가 제작</p>
              </button>
            </div>

            {formData.assignmentType === 'MULTIPLE' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  최대 인원
                </label>
                <select
                  value={formData.maxAssignees}
                  onChange={(e) => setFormData({ ...formData, maxAssignees: parseInt(e.target.value) })}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  {[2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}명</option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Budget & Deadline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">예산 및 마감</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  예상 정산 금액 (1인당)
                </label>
                <select
                  value={formData.estimatedBudget}
                  onChange={(e) => setFormData({ ...formData, estimatedBudget: parseInt(e.target.value) })}
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option value={100000}>₩100,000</option>
                  <option value={150000}>₩150,000</option>
                  <option value={200000}>₩200,000</option>
                  <option value={250000}>₩250,000</option>
                  <option value={300000}>₩300,000</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  마감일 <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">추가 정보 (선택)</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  제작 요구사항
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="영상 길이, 스타일, 특별 요청 등..."
                  className="w-full border rounded-lg px-4 py-2"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  레퍼런스 링크
                </label>
                <input
                  type="text"
                  value={formData.referenceLinks}
                  onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
                  placeholder="유튜브 링크 등"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Link
              href="/moon/management/project-requests"
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
            >
              취소
            </Link>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
