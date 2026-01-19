'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatDate, formatTimestamp, formatCurrency } from '@/lib/utils';

// Types
interface SubmissionVersion {
  slot: number;
  title: string;
  currentVersion: string;
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'REVISED';
  videoUrl: string;
  submittedAt: string;
  feedbackCount: number;
  pendingFeedbacks: number;
}

interface ProjectDetail {
  id: string;
  requestId: string;
  requestTitle: string;
  description: string;
  deadline: string;
  budget: number;
  targetCounselor: { id: string; name: string };
  status: 'IN_PROGRESS' | 'SUBMITTED' | 'COMPLETED';
  acceptedAt: string;
  versions: SubmissionVersion[];
  maxVersions: number;
}

// Mock data
const mockProject: ProjectDetail = {
  id: 'proj1',
  requestId: 'req1',
  requestTitle: '신년운세 × 신규 상담사 김태희 홍보',
  description: '2026년 신년운세 시즌 홍보 영상 제작. 경쾌하고 밝은 분위기로 제작해주세요.',
  deadline: '2026-01-25T23:59:59Z',
  budget: 150000,
  targetCounselor: { id: 'c1', name: '김태희' },
  status: 'IN_PROGRESS',
  acceptedAt: '2026-01-16T10:00:00Z',
  maxVersions: 5,
  versions: [
    {
      slot: 1,
      title: '경쾌한 톤',
      currentVersion: 'v2.0',
      status: 'APPROVED',
      videoUrl: '/videos/v1.mp4',
      submittedAt: '2026-01-17T14:00:00Z',
      feedbackCount: 5,
      pendingFeedbacks: 0,
    },
    {
      slot: 2,
      title: '차분한 톤',
      currentVersion: 'v1.0',
      status: 'IN_REVIEW',
      videoUrl: '/videos/v2.mp4',
      submittedAt: '2026-01-17T16:00:00Z',
      feedbackCount: 2,
      pendingFeedbacks: 2,
    },
    {
      slot: 3,
      title: '감성적 톤',
      currentVersion: 'v1.1',
      status: 'REVISED',
      videoUrl: '/videos/v3.mp4',
      submittedAt: '2026-01-17T12:00:00Z',
      feedbackCount: 3,
      pendingFeedbacks: 1,
    },
  ],
};

const statusLabels: Record<string, { label: string; color: string }> = {
  PENDING: { label: '대기 중', color: 'bg-gray-100 text-gray-700' },
  IN_REVIEW: { label: '검수 중', color: 'bg-blue-100 text-blue-700' },
  APPROVED: { label: '승인됨', color: 'bg-green-100 text-green-700' },
  REJECTED: { label: '반려됨', color: 'bg-red-100 text-red-700' },
  REVISED: { label: '수정 요청', color: 'bg-orange-100 text-orange-700' },
};

export default function MyProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project] = useState<ProjectDetail>(mockProject);
  const [isUploading, setIsUploading] = useState(false);
  const [newVersionTitle, setNewVersionTitle] = useState('');
  const [showNewVersionForm, setShowNewVersionForm] = useState(false);

  const availableSlots = Array.from({ length: project.maxVersions }, (_, i) => i + 1)
    .filter((slot) => !project.versions.some((v) => v.slot === slot));

  const handleNewVersionUpload = async () => {
    if (!newVersionTitle.trim()) {
      alert('버전 제목을 입력해주세요.');
      return;
    }

    // Navigate to upload page with pre-filled info
    router.push(`/stars/upload?projectId=${projectId}&slot=${availableSlots[0]}&title=${encodeURIComponent(newVersionTitle)}`);
  };

  const getDaysUntilDeadline = () => {
    const now = new Date();
    const deadline = new Date(project.deadline);
    const diff = deadline.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysLeft = getDaysUntilDeadline();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Link href="/stars/my-projects" className="hover:text-blue-600">
              내 프로젝트
            </Link>
            <span>/</span>
            <span>상세</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {project.requestTitle}
              </h1>
              <p className="mt-1 text-gray-600">
                {project.description}
              </p>
            </div>

            <div className={`px-4 py-2 rounded-lg font-medium ${
              daysLeft <= 1
                ? 'bg-red-100 text-red-700'
                : daysLeft <= 3
                ? 'bg-orange-100 text-orange-700'
                : 'bg-blue-100 text-blue-700'
            }`}>
              {daysLeft <= 0 ? '마감됨' : `D-${daysLeft}`}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Project Info Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">프로젝트 정보</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">대상 상담사</p>
              <p className="font-medium">🔮 {project.targetCounselor.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">마감일</p>
              <p className="font-medium">📅 {formatDate(project.deadline)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">예상 정산</p>
              <p className="font-medium text-green-600">💰 {formatCurrency(project.budget)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">수락일</p>
              <p className="font-medium">{formatDate(project.acceptedAt)}</p>
            </div>
          </div>
        </div>

        {/* Versions Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">
                제출한 버전 ({project.versions.length}/{project.maxVersions}개)
              </h2>
              <p className="text-sm text-gray-500">
                최대 {project.maxVersions}개의 다른 버전을 제작할 수 있습니다
              </p>
            </div>

            {availableSlots.length > 0 && (
              <button
                onClick={() => setShowNewVersionForm(!showNewVersionForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                + 새 버전 추가
              </button>
            )}
          </div>

          {/* New Version Form */}
          {showNewVersionForm && availableSlots.length > 0 && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium mb-3">새 버전 추가</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newVersionTitle}
                  onChange={(e) => setNewVersionTitle(e.target.value)}
                  placeholder='버전 제목 (예: "유머러스 톤")'
                  className="flex-1 px-4 py-2 border rounded-lg"
                />
                <button
                  onClick={handleNewVersionUpload}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  영상 업로드
                </button>
                <button
                  onClick={() => setShowNewVersionForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  취소
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                버전 슬롯 {availableSlots[0]}에 저장됩니다
              </p>
            </div>
          )}

          {/* Version Cards */}
          <div className="space-y-4">
            {project.versions.map((version) => (
              <div
                key={version.slot}
                className="border rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm font-medium">
                      {version.slot}
                    </span>
                    <div>
                      <h3 className="font-medium">{version.title}</h3>
                      <p className="text-sm text-gray-500">
                        {version.currentVersion} · 제출: {formatDate(version.submittedAt)}
                      </p>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusLabels[version.status].color
                  }`}>
                    {version.status === 'APPROVED' && '✅ '}
                    {version.status === 'REJECTED' && '❌ '}
                    {version.status === 'REVISED' && '⏳ '}
                    {version.status === 'IN_REVIEW' && '🔄 '}
                    {statusLabels[version.status].label}
                  </span>
                </div>

                {/* Feedback Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span>📝 피드백 {version.feedbackCount}개</span>
                  {version.pendingFeedbacks > 0 && (
                    <span className="text-orange-600">
                      ⚠️ 미처리 {version.pendingFeedbacks}개
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/stars/feedback?versionSlot=${version.slot}&projectId=${projectId}`}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    피드백 보기
                  </Link>

                  {version.status === 'REVISED' && (
                    <Link
                      href={`/stars/upload?projectId=${projectId}&slot=${version.slot}&revision=true`}
                      className="px-3 py-1.5 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200"
                    >
                      수정 업로드
                    </Link>
                  )}

                  <button className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                    미리보기
                  </button>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {project.versions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>아직 제출한 버전이 없습니다.</p>
                <p className="text-sm mt-1">위의 "새 버전 추가" 버튼을 눌러 영상을 업로드하세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
