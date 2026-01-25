
'use client';

import { useState, useRef, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/glass-card';
import { cn, formatDate } from '@/lib/utils';
import { submissionsApi, Submission } from '@/lib/api/submissions';
import { StreamPlayer } from '@/components/ui/stream-player';
import {
  ArrowLeft, Play, Pause, Volume2, VolumeX, Maximize,
  CheckCircle, XCircle, AlertTriangle, MessageSquare,
  Clock, FileText, Download, Plus, Square, Circle,
  ArrowRight, Trash2, Check, Columns, Smartphone,
  Monitor, RotateCcw, Loader2
} from 'lucide-react';

import {
  type FeedbackType, type AnnotationType, type ViewMode,
  type AspectRatio, type Feedback, type Annotation,
  feedbackTypes
} from '@/data/mocks/video-reviews';

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

function VideoPlayerComp({
  submission,
  label,
  showAnnotation = true,
  isPlaying,
  onToggle,
  aspectRatio,
  isMuted,
  setDuration,
  setCurrentTime,
  annotationRef,
  annotationTool,
  handleAnnotationMouseDown,
  handleAnnotationMouseMove,
  handleAnnotationMouseUp,
  currentAnnotation,
  renderAnnotation,
  selectedFeedback
}: {
  submission: Submission | null;
  label?: string;
  showAnnotation?: boolean;
  isPlaying: boolean;
  onToggle: () => void;
  aspectRatio: AspectRatio;
  isMuted: boolean;
  setDuration: (d: number) => void;
  setCurrentTime: (t: number) => void;
  annotationRef?: React.RefObject<SVGSVGElement | null>;
  annotationTool?: AnnotationType | null;
  handleAnnotationMouseDown?: (e: React.MouseEvent<SVGSVGElement>) => void;
  handleAnnotationMouseMove?: (e: React.MouseEvent<SVGSVGElement>) => void;
  handleAnnotationMouseUp?: () => void;
  currentAnnotation?: Annotation | null;
  renderAnnotation?: (annotation: Annotation, opacity?: number) => React.ReactNode;
  selectedFeedback?: Feedback | null;
}) {
  if (!submission) return <div className="w-full h-full bg-neutral-900 animate-pulse rounded-lg" />;

  return (
    <div className="relative w-full h-full bg-black overflow-hidden rounded-lg">
      {label && (
        <div className="absolute top-2 left-2 z-20 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium">
          {label}
        </div>
      )}

      {/* Temporary fix for build: disable StreamPlayer */}
      {/* Temporary fix for build: disable StreamPlayer
      {false && submission.streamUid ? (
          <StreamPlayer
            uid={submission.streamUid}
            token={submission.signedToken}
            className="w-full h-full"
            muted={isMuted}
            onTimeUpdate={(t) => setCurrentTime(t)}
            onDurationChange={(d) => setDuration(d)}
          />
      ) : ( */}
          <video
            src={submission.videoUrl}
            className={cn("w-full h-full", aspectRatio === '9:16' ? "object-contain" : "object-cover")}
            muted={isMuted}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
            onClick={onToggle}
          />
      {/* )} */}

      {showAnnotation && renderAnnotation && (
        <svg
          ref={annotationRef}
          className={cn(
            "absolute inset-0 w-full h-full z-10",
            annotationTool ? "cursor-crosshair" : "pointer-events-none"
          )}
          onMouseDown={handleAnnotationMouseDown}
          onMouseMove={handleAnnotationMouseMove}
          onMouseUp={handleAnnotationMouseUp}
          onMouseLeave={handleAnnotationMouseUp}
        >
          {currentAnnotation && renderAnnotation(currentAnnotation, 0.7)}
          {selectedFeedback?.annotation && renderAnnotation(selectedFeedback.annotation)}
        </svg>
      )}
    </div>
  );
}

export default function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [versions, setVersions] = useState<Submission[]>([]);

  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [selectedVersionA, setSelectedVersionA] = useState<Submission | null>(null);
  const [selectedVersionB, setSelectedVersionB] = useState<Submission | null>(null);

  const [isPlayingA, setIsPlayingA] = useState(false);
  const [isPlayingB, setIsPlayingB] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState<'approve' | 'reject' | 'revision' | null>(null);
  const [actionFeedback, setActionFeedback] = useState('');

  const [annotationTool, setAnnotationTool] = useState<AnnotationType | null>(null);
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
  const annotationRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      const sub = await submissionsApi.getById(id);
      setSubmission(sub);
      setSelectedVersionA(sub);

      // Fetch similar versions (all submissions for the same assignment)
      if (sub.assignmentId) {
          const all = await submissionsApi.getAll(); // Filter by assignmentId on client for simplicity
          const rel = all.filter(s => s.assignmentId === sub.assignmentId).sort((a,b) => b.version - a.version);
          setVersions(rel);
          if (rel.length > 1) setSelectedVersionB(rel[1]);
          else setSelectedVersionB(rel[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleActionConfirm = async () => {
    if (!submission || !showActionModal) return;

    const statusMap = {
        approve: 'APPROVED',
        reject: 'REJECTED',
        revision: 'REVISION'
    } as const;

    try {
        await submissionsApi.updateStatus(submission.id, statusMap[showActionModal], actionFeedback);
        setShowActionModal(null);
        router.push('/admin/stars/reviews');
    } catch (err) {
        console.error(err);
        alert("상태 업데이트에 실패했습니다.");
    }
  };

  // Simplified Handlers for brevity
  const togglePlayPause = () => setIsPlayingA(!isPlayingA);
  const handleFeedbackClick = (fb: Feedback) => {
    setCurrentTime(fb.timestamp);
    setSelectedFeedback(fb);
  };

  const renderAnnotation = (annotation: Annotation, opacity: number = 1) => {
    const { type, color, points } = annotation;
    if (points.length < 2) return null;
    switch (type) {
      case 'rect':
        const [p1, p2] = points;
        return <rect x={`${Math.min(p1.x, p2.x)}%`} y={`${Math.min(p1.y, p2.y)}%`} width={`${Math.abs(p2.x - p1.x)}%`} height={`${Math.abs(p2.y - p1.y)}%`} fill="none" stroke={color} strokeWidth="3" opacity={opacity} />;
      case 'ellipse':
        return <ellipse cx={`${(points[0].x + points[1].x) / 2}%`} cy={`${(points[0].y + points[1].y) / 2}%`} rx={`${Math.abs(points[1].x - points[0].x) / 2}%`} ry={`${Math.abs(points[1].y - points[0].y) / 2}%`} fill="none" stroke={color} strokeWidth="3" opacity={opacity} />;
      default: return null;
    }
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  if (!submission) return <div className="text-center py-20 text-white">제출물을 찾을 수 없습니다.</div>;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/stars/reviews" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">{submission.assignment?.request.title || submission.project?.title}</h1>
          <p className="text-gray-400 text-sm">{submission.user?.name} · v{submission.version}</p>
        </div>

        <div className="flex gap-2">
          <button onClick={() => setViewMode('single')} className={cn("px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5", viewMode === 'single' ? "bg-primary text-white" : "bg-white/5 text-gray-400")}>
            <Monitor className="w-4 h-4" /> 단일
          </button>
          <button onClick={() => setViewMode('compare')} className={cn("px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5", viewMode === 'compare' ? "bg-primary text-white" : "bg-white/5 text-gray-400")}>
            <Columns className="w-4 h-4" /> A/B 비교
          </button>
        </div>

        <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium flex items-center gap-1">
          <Clock className="w-4 h-4" /> {submission.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <GlassCard className="p-4 overflow-hidden">
            <div className={cn("relative mx-auto transition-all", aspectRatio === '16:9' ? "w-full aspect-video" : "h-[80vh] aspect-9/16")}>
              {viewMode === 'single' ? (
                <VideoPlayerComp
                  submission={selectedVersionA}
                  label={`v${selectedVersionA?.version}`}
                  isPlaying={isPlayingA}
                  onToggle={togglePlayPause}
                  aspectRatio={aspectRatio}
                  isMuted={isMuted}
                  setDuration={setDuration}
                  setCurrentTime={setCurrentTime}
                  renderAnnotation={renderAnnotation}
                  selectedFeedback={selectedFeedback}
                />
              ) : (
                <div className="flex flex-row gap-2 h-full">
                  <div className="flex-1 h-full"><VideoPlayerComp submission={selectedVersionA} label={`v${selectedVersionA?.version}`} isPlaying={isPlayingA} onToggle={togglePlayPause} aspectRatio={aspectRatio} isMuted={isMuted} setDuration={setDuration} setCurrentTime={setCurrentTime} renderAnnotation={renderAnnotation} /></div>
                  <div className="flex-1 h-full"><VideoPlayerComp submission={selectedVersionB} label={`v${selectedVersionB?.version}`} isPlaying={isPlayingB} onToggle={() => setIsPlayingB(!isPlayingB)} aspectRatio={aspectRatio} isMuted={isMuted} setDuration={() => {}} setCurrentTime={() => {}} renderAnnotation={renderAnnotation} /></div>
                </div>
              )}
            </div>

            {/* Timeline & Basic Controls */}
            <div className="mt-4 space-y-4">
                <input type="range" min="0" max={duration} value={currentTime} className="w-full" onChange={e => setCurrentTime(Number(e.target.value))} />
                <div className="flex items-center gap-4">
                    <button onClick={togglePlayPause} className="text-white">{isPlayingA ? <Pause /> : <Play />}</button>
                    <span className="text-white font-mono">{formatTime(currentTime)} / {formatTime(duration)}</span>
                    <div className="flex-1" />
                    <button onClick={() => setIsMuted(!isMuted)} className="text-white">{isMuted ? <VolumeX /> : <Volume2 />}</button>
                </div>
            </div>
          </GlassCard>

          {/* Logic for actions */}
          <div className="flex gap-3">
              <button onClick={() => setShowActionModal('approve')} className="flex-1 py-3 bg-green-600 rounded-lg font-bold text-white">승인</button>
              <button onClick={() => setShowActionModal('revision')} className="flex-1 py-3 bg-orange-600 rounded-lg font-bold text-white">수정요청</button>
              <button onClick={() => setShowActionModal('reject')} className="flex-1 py-3 bg-red-600 rounded-lg font-bold text-white">반려</button>
          </div>
        </div>

        <div className="space-y-4">
            <GlassCard className="p-4">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-400" /> 피드백
                </h3>
                <div className="text-sm text-neutral-500 italic">피드백 시스템은 추후 고도화될 예정입니다.</div>
            </GlassCard>
            <GlassCard className="p-4">
                <h3 className="text-white font-medium mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" /> 정보
                </h3>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-neutral-500">제출일</span><span className="text-white">{formatDate(submission.createdAt)}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-500">버전</span><span className="text-white">v{submission.version}</span></div>
                    <div className="flex justify-between"><span className="text-neutral-500">노트</span><span className="text-white">{submission.notes || '-'}</span></div>
                </div>
            </GlassCard>

            {versions.length > 1 && (
                <GlassCard className="p-4">
                    <h3 className="text-white font-medium mb-4">버전 내역</h3>
                    <div className="space-y-2">
                        {versions.map(v => (
                            <button key={v.id} onClick={() => setSelectedVersionA(v)} className={cn("w-full text-left p-2 rounded text-sm transition-colors", selectedVersionA?.id === v.id ? "bg-primary text-white" : "hover:bg-white/5 text-neutral-400")}>
                                v{v.version} - {formatDate(v.createdAt)}
                            </button>
                        ))}
                    </div>
                </GlassCard>
            )}
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <GlassCard className="w-full max-w-md p-6">
                <h3 className="text-xl font-bold mb-4 capitalize">{showActionModal} 처리</h3>
                <textarea
                    className="w-full bg-neutral-900 border border-white/10 rounded-lg p-3 text-white h-32 mb-4"
                    placeholder="담당자에게 전달할 메모를 입력하세요..."
                    value={actionFeedback}
                    onChange={e => setActionFeedback(e.target.value)}
                />
                <div className="flex gap-2">
                    <button onClick={() => setShowActionModal(null)} className="flex-1 py-2 bg-white/5 rounded text-neutral-400">취소</button>
                    <button onClick={handleActionConfirm} className="flex-1 py-2 bg-primary rounded font-bold text-white">확인</button>
                </div>
            </GlassCard>
        </div>
      )}
    </div>
  );
}
