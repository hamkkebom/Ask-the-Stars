'use client';

import { useState, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { VideoPlayer } from '@/components/video';
import { FeedbackPanel, AnnotationCanvas, AnnotationToolbar } from '@/components/feedback';
import type { FeedbackItem, Annotation, AnnotationType } from '@/components/feedback';
import { formatTimestamp } from '@/lib/utils';

// Mock data
const mockSubmission = {
  id: 'sub1',
  projectId: 'proj1',
  projectTitle: '신년운세 × 신규 상담사 김태희 홍보',
  freelancer: { id: 'user1', name: '박건우' },
  versionSlot: 1,
  versionTitle: '경쾌한 톤',
  version: 2,
  videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  duration: 596,
  status: 'IN_REVIEW',
  submittedAt: '2026-01-16T14:30:00Z',
};

const mockFeedbacks: FeedbackItem[] = [
  {
    id: 'fb1',
    content: '자막이 화면 하단에 가려집니다. 위치를 조정해주세요.',
    timestamp: 32,
    endTimestamp: 45,
    priority: 'high',
    status: 'pending',
    createdAt: '2026-01-16T15:00:00Z',
    author: { id: 'reviewer1', name: '피드백팀' },
  },
  {
    id: 'fb2',
    content: 'BGM 볼륨이 너무 큽니다.',
    timestamp: 120,
    endTimestamp: 150,
    priority: 'medium',
    status: 'resolved',
    createdAt: '2026-01-16T15:10:00Z',
    author: { id: 'reviewer1', name: '피드백팀' },
  },
];

const mockVersions = [
  { slot: 1, title: '경쾌한 톤', version: 'v2.0', status: 'IN_REVIEW' },
  { slot: 2, title: '차분한 톤', version: 'v1.0', status: 'PENDING' },
  { slot: 3, title: '감성적 톤', version: 'v1.1', status: 'REVISED' },
];

export default function VideoReviewPage() {
  const params = useParams();
  const submissionId = params.id as string;

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(mockFeedbacks);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [activeTool, setActiveTool] = useState<AnnotationType | null>(null);
  const [annotationColor, setAnnotationColor] = useState('#FF5733');
  const [selectedVersion, setSelectedVersion] = useState(1);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Handle time update from video
  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  // Handle timestamp click from feedback panel
  const handleTimestampClick = useCallback((timestamp: number) => {
    const video = videoContainerRef.current?.querySelector('video');
    if (video) {
      video.currentTime = timestamp;
    }
  }, []);

  // Handle new feedback submission
  const handleFeedbackSubmit = useCallback(async (data: { content: string; timestamp: number; priority: string }) => {
    const newFeedback: FeedbackItem = {
      id: `fb${Date.now()}`,
      content: data.content,
      timestamp: data.timestamp,
      priority: data.priority as FeedbackItem['priority'],
      status: 'pending',
      createdAt: new Date().toISOString(),
      author: { id: 'current-user', name: '피드백팀' },
    };

    setFeedbacks((prev) => [...prev, newFeedback]);
    // TODO: API call to save feedback
  }, []);

  // Handle feedback status change
  const handleStatusChange = useCallback((id: string, status: FeedbackItem['status']) => {
    setFeedbacks((prev) =>
      prev.map((fb) => (fb.id === id ? { ...fb, status } : fb))
    );
    // TODO: API call to update status
  }, []);

  // Handle annotation creation
  const handleAnnotationCreate = useCallback((annotation: Omit<Annotation, 'id'>) => {
    const newAnnotation: Annotation = {
      ...annotation,
      id: `ann${Date.now()}`,
    };
    setAnnotations((prev) => [...prev, newAnnotation]);
    setActiveTool(null);
  }, []);

  // Handle approve/reject actions
  const handleApprove = async () => {
    if (!confirm('이 버전을 승인하시겠습니까? 1차 정산이 트리거됩니다.')) return;
    // TODO: API call to approve
    alert('승인되었습니다!');
  };

  const handleRequestRevision = async () => {
    if (feedbacks.filter(f => f.status === 'pending').length === 0) {
      alert('수정 요청할 피드백이 없습니다. 먼저 피드백을 작성해주세요.');
      return;
    }
    if (!confirm('수정을 요청하시겠습니까?')) return;
    // TODO: API call to request revision
    alert('수정 요청을 전송했습니다.');
  };

  const handleReject = async () => {
    const reason = prompt('반려 사유를 입력해주세요:');
    if (!reason) return;
    // TODO: API call to reject
    alert('반려되었습니다.');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-[1920px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">{mockSubmission.projectTitle}</h1>
              <p className="text-sm text-gray-400 mt-1">
                프리랜서: {mockSubmission.freelancer.name} ·
                버전 {mockSubmission.versionSlot}: {mockSubmission.versionTitle} (v{mockSubmission.version}.0)
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleReject}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium"
              >
                ❌ 반려
              </button>
              <button
                onClick={handleRequestRevision}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg font-medium"
              >
                ✏️ 수정 요청
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium"
              >
                ✅ 승인
              </button>
            </div>
          </div>

          {/* Version Tabs */}
          <div className="flex gap-2 mt-4">
            {mockVersions.map((v) => (
              <button
                key={v.slot}
                onClick={() => setSelectedVersion(v.slot)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedVersion === v.slot
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                버전 {v.slot}: {v.title}
                <span className="ml-2 text-xs opacity-75">({v.version})</span>
                {v.status === 'APPROVED' && ' ✅'}
                {v.status === 'REVISED' && ' ⏳'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1920px] mx-auto flex h-[calc(100vh-140px)]">
        {/* Video Section */}
        <div className="flex-1 p-4">
          <div className="relative bg-black rounded-lg overflow-hidden" ref={videoContainerRef}>
            {/* Video Player */}
            <VideoPlayer
              src={mockSubmission.videoUrl}
              onTimeUpdate={handleTimeUpdate}
              onReady={() => setIsVideoReady(true)}
              className="aspect-video"
            />

            {/* Annotation Canvas Overlay */}
            {isVideoReady && activeTool && (
              <AnnotationCanvas
                width={1280}
                height={720}
                currentTime={currentTime}
                annotations={annotations}
                activeTool={activeTool}
                color={annotationColor}
                onAnnotationCreate={handleAnnotationCreate}
                editable={true}
                className="z-10"
              />
            )}
          </div>

          {/* Annotation Toolbar */}
          <div className="mt-4 flex justify-center">
            <AnnotationToolbar
              activeTool={activeTool}
              onToolChange={setActiveTool}
              color={annotationColor}
              onColorChange={setAnnotationColor}
              onClear={() => setAnnotations([])}
            />
          </div>

          {/* Timeline Info */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
            <span>현재 시간: {formatTimestamp(currentTime)}</span>
            <span>
              미해결 피드백: {feedbacks.filter(f => f.status === 'pending').length}개
            </span>
          </div>
        </div>

        {/* Feedback Sidebar */}
        <div className="w-[400px] bg-gray-800 border-l border-gray-700">
          <FeedbackPanel
            feedbacks={feedbacks}
            currentTime={currentTime}
            onTimestampClick={handleTimestampClick}
            onSubmit={handleFeedbackSubmit}
            onStatusChange={handleStatusChange}
            canAddFeedback={true}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}
