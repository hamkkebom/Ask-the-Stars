'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatDate, formatCurrency } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/api/axios';
import { Modal } from '@ask-the-stars/ui';
import StreamPlayer from '@/components/player/StreamPlayer';

// Types
interface SubmissionVersion {
  id: string;
  versionSlot: number;
  versionTitle: string;
  version: number; // e.g., 1, 2
  status: 'PENDING' | 'IN_REVIEW' | 'APPROVED' | 'REJECTED' | 'REVISED';
  videoUrl: string;
  streamUid?: string;
  signedToken?: string; // If we start returning it
  createdAt: string;
  updatedAt?: string;
  feedbackCount?: number;
  pendingFeedbacks?: number;
  views?: number;
}

interface ProjectDetail {
  id: string;
  request: {
    title: string;
    description: string;
    deadline: string;
    budget: number; // Assuming budget comes from request or assignment?
    targetCounselorId?: string;
  };
  freelancerId: string;
  status: 'ACCEPTED' | 'IN_PROGRESS' | 'SUBMITTED' | 'COMPLETED';
  acceptedAt: string;
  submissions: SubmissionVersion[];
}

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

  const [newVersionTitle, setNewVersionTitle] = useState('');
  const [showNewVersionForm, setShowNewVersionForm] = useState(false);
  const [previewVideo, setPreviewVideo] = useState<{ uid: string; token?: string; title: string } | null>(null);

  // Fetch Project/Assignment Data
  const { data: assignment, isLoading, error } = useQuery({
    queryKey: ['my-project', projectId],
    queryFn: async () => {
      // Assuming projectId in URL is actually the "Assignment ID" or we have an endpoint that resolves to it.
      // If the URL is my-projects/:assignmentId, better.
      // Let's assume the ID passed is Assignment ID for now.
      const response = await axiosInstance.get(`/project-assignments/${projectId}`);
      // Also fetch related submissions
      const submissionsRes = await axiosInstance.get(`/submissions?assignmentId=${projectId}`);

      return {
        ...response.data,
        submissions: submissionsRes.data
      };
    }
  });

  if (isLoading) return <div className="p-8 text-center">로딩 중...</div>;
  if (error || !assignment) return <div className="p-8 text-center text-red-500">프로젝트를 불러올 수 없습니다.</div>;

  const projectRequest = assignment.request;
  const submissions = assignment.submissions || [];
  const maxVersions = 5;

  const availableSlots = Array.from({ length: maxVersions }, (_, i) => i + 1)
    .filter((slot) => !submissions.some((v: any) => v.versionSlot === slot));

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
    const deadline = new Date(projectRequest.deadline);
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
                {projectRequest.title}
              </h1>
              <p className="mt-1 text-gray-600">
                {projectRequest.description || "설명 없음"}
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
              <p className="text-sm text-gray-500">카테고리</p>
              <p className="font-medium">{projectRequest.categories?.join(', ') || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">마감일</p>
              <p className="font-medium">📅 {formatDate(projectRequest.deadline)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">예상 정산</p>
              <p className="font-medium text-green-600">
                  {projectRequest.estimatedBudget ? formatCurrency(Number(projectRequest.estimatedBudget)) : '미정'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">수락일</p>
              <p className="font-medium">{formatDate(assignment.acceptedAt)}</p>
            </div>
          </div>
        </div>

        {/* Versions Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">
                제출한 버전 ({submissions.length}/{maxVersions}개)
              </h2>
              <p className="text-sm text-gray-500">
                최대 {maxVersions}개의 다른 버전을 제작할 수 있습니다
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
            {submissions.map((version: SubmissionVersion) => (
              <div
                key={version.id}
                className="border rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-sm font-medium">
                      {version.versionSlot}
                    </span>
                    <div>
                      <h3 className="font-medium">{version.versionTitle || `버전 ${version.versionSlot}`}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>v{version.version}.0</span>
                        <span>·</span>
                        <span>{formatDate(version.updatedAt || version.createdAt)}</span>
                        {version.views !== undefined && (
                            <>
                                <span>·</span>
                                <span className="flex items-center gap-1 text-blue-600 font-medium">
                                    👁️ {version.views.toLocaleString()}회 시청
                                </span>
                            </>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusLabels[version.status]?.color || 'bg-gray-100'
                  }`}>
                    {version.status === 'APPROVED' && '✅ '}
                    {version.status === 'REJECTED' && '❌ '}
                    {version.status === 'REVISED' && '⏳ '}
                    {version.status === 'IN_REVIEW' && '🔄 '}
                    {statusLabels[version.status]?.label || version.status}
                  </span>
                </div>

                {/* Feedback Info - Placeholder until API provides it */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  {/* <span>📝 피드백 {version.feedbackCount || 0}개</span> */}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Link
                    href={`/stars/feedback?versionSlot=${version.versionSlot}&projectId=${projectId}`}
                    className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                  >
                    피드백 보기
                  </Link>

                  {(version.status === 'REVISED' || version.status === 'PENDING') && (
                    <Link
                      href={`/stars/upload?projectId=${projectId}&slot=${version.versionSlot}&revision=true&title=${encodeURIComponent(version.versionTitle || '')}`}
                      className="px-3 py-1.5 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200"
                    >
                      수정 업로드
                    </Link>
                  )}

                  {/* Preview Button */}
                    <div className="flex items-center gap-2">
                        {/* Auto Caption (CC) */}
                        <button
                            onClick={async () => {
                                if (!confirm('AI 자동 자막을 생성하시겠습니까? (약 1~2분 소요)')) return;
                                try {
                                    await axiosInstance.post(`/submissions/${version.id}/captions`);
                                    alert('자막 생성이 시작되었습니다.');
                                } catch (e) {
                                    alert('자막 생성 실패');
                                }
                            }}
                            className="px-3 py-1.5 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 flex items-center gap-1"
                            title="AI 자동 자막 생성"
                        >
                            <span>🤖 CC</span>
                        </button>

                        {/* Manual Caption Upload */}
                        <label className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 cursor-pointer flex items-center gap-1" title="자막 파일 업로드 (.vtt/.srt)">
                             <span>📁 자막</span>
                             <input
                                type="file"
                                accept=".vtt,.srt"
                                className="hidden"
                                onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    if (!confirm(`${file.name} 자막을 업로드하시겠습니까?`)) return;

                                    const formData = new FormData();
                                    formData.append('file', file);

                                    try {
                                        // TODO: We need the VIDEO ID, but here we have submission ID.
                                        // The backend SubmissionsController doesn't have uploadCaption yet?
                                        // Wait, I implemented it in VideosController only.
                                        // I need to add uploadCaption to SubmissionsController too or expose the video ID.
                                        // Let's implement it in SubmissionsController quickly or call videos endpoint if we have video ID.
                                        // We have `version.id` (submission ID).
                                        // Let's add the endpoint to SubmissionsController for consistency.
                                        await axiosInstance.put(`/submissions/${version.id}/captions/ko`, formData, {
                                            headers: { 'Content-Type': 'multipart/form-data' }
                                        });
                                        alert('자막 업로드가 완료되었습니다.');
                                    } catch (err) {
                                        console.error(err);
                                        alert('자막 업로드 실패');
                                    }
                                    // Reset input
                                    e.target.value = '';
                                }}
                             />
                        </label>

                        <button
                            onClick={() => {
                                if (version.streamUid) {
                                setPreviewVideo({
                                    uid: version.streamUid,
                                    token: version.signedToken,
                                    title: version.versionTitle || `버전 ${version.versionSlot}`
                                });
                                } else if (version.videoUrl) {
                                // Fallback to direct URL open if no UID
                                window.open(version.videoUrl, '_blank');
                                }
                            }}
                            className="px-3 py-1.5 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                        >
                            미리보기
                        </button>
                    </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {submissions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>아직 제출한 버전이 없습니다.</p>
                <p className="text-sm mt-1">위의 "새 버전 추가" 버튼을 눌러 영상을 업로드하세요.</p>
              </div>
            )}
          </div>
        </div>
      </div>

       {/* Video Preview Modal */}
       <Modal
        open={!!previewVideo}
        onClose={() => setPreviewVideo(null)}
        title={previewVideo?.title || '영상 미리보기'}
        className="max-w-4xl"
      >
        <div className="aspect-video bg-black rounded-lg overflow-hidden">
          {previewVideo && (
            <StreamPlayer
              videoUid={previewVideo.uid}
              signedToken={previewVideo.token}
              controls
              autoplay
              className="w-full h-full"
            />
          )}
        </div>
      </Modal>
    </div>
  );
}
