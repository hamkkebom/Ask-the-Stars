'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { GlassCard } from '@/components/ui/glass-card';
import { cn, formatDate } from '@/lib/utils';
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MessageSquare,
  Clock,
  FileText,
  Download,
  Plus,
  Square,
  Circle,
  ArrowRight,
  Trash2,
  Check,
  Columns,
  Smartphone,
  Monitor,
  RotateCcw
} from 'lucide-react';

import {
  type FeedbackType,
  type AnnotationType,
  type ViewMode,
  type AspectRatio,
  type Feedback,
  type Annotation,
  videoVersions,
  initialFeedbacks,
  reviewData,
  feedbackTypes
} from '@/data/mocks/video-reviews';

// Format seconds to mm:ss
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function ReviewDetailPage({ params }: { params: { id: string } }) {
  // View mode
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');

  // Version selection for A/B compare
  const [selectedVersionA, setSelectedVersionA] = useState(videoVersions[videoVersions.length - 1]); // Latest
  const [selectedVersionB, setSelectedVersionB] = useState(videoVersions[0]); // Previous

  // Video state
  const [isSynced, setIsSynced] = useState(true);
  const [isPlayingA, setIsPlayingA] = useState(false);
  const [isPlayingB, setIsPlayingB] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Muted by default for compare
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60);
  const videoRefA = useRef<HTMLVideoElement>(null);
  const videoRefB = useRef<HTMLVideoElement>(null);

  // Feedback state
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(initialFeedbacks);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackFilter, setFeedbackFilter] = useState<FeedbackType | 'all'>('all');
  const [feedbackVersionFilter, setFeedbackVersionFilter] = useState<'all' | 'A' | 'B'>('all');

  // New feedback form
  const [newFeedbackType, setNewFeedbackType] = useState<FeedbackType>('subtitle');
  const [newFeedbackContent, setNewFeedbackContent] = useState('');
  const [newFeedbackTimestampEnd, setNewFeedbackTimestampEnd] = useState<number | null>(null);

  // Annotation state
  const [annotationTool, setAnnotationTool] = useState<AnnotationType | null>(null);
  const [currentAnnotation, setCurrentAnnotation] = useState<Annotation | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState<{ x: number; y: number } | null>(null);
  const annotationRef = useRef<SVGSVGElement>(null);

  // Action modal
  const [showActionModal, setShowActionModal] = useState<'approve' | 'reject' | 'revision' | null>(null);
  const [actionFeedback, setActionFeedback] = useState('');

  // Sync videos in compare mode
  useEffect(() => {
    if (viewMode === 'compare' && isSynced && videoRefA.current && videoRefB.current) {
      // Sync time if difference is large enough to avoid stutter
      if (Math.abs(videoRefB.current.currentTime - videoRefA.current.currentTime) > 0.1) {
        videoRefB.current.currentTime = videoRefA.current.currentTime;
      }

      // Sync play state
      if (isPlayingA && videoRefB.current.paused) videoRefB.current.play();
      if (!isPlayingA && !videoRefB.current.paused) videoRefB.current.pause();
    }
  }, [currentTime, viewMode, isSynced, isPlayingA]); // Added isPlayingA to dependencies

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlayPause('A');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          seekTo(currentTime - 5);
          break;
        case 'ArrowRight':
          e.preventDefault();
          seekTo(currentTime + 5);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setIsMuted(false);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setIsMuted(true);
          break;
        case 'KeyM':
          setIsMuted(!isMuted);
          break;
        case 'KeyF':
          setShowFeedbackModal(true);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, isPlayingA, isMuted]);

  // Seek to specific time
  const seekTo = (time: number) => {
    const clampedTime = Math.max(0, Math.min(time, duration));
    setCurrentTime(clampedTime);
    if (videoRefA.current) videoRefA.current.currentTime = clampedTime;
    if (videoRefB.current) videoRefB.current.currentTime = clampedTime;
  };

  // Filtered feedbacks
  const filteredFeedbacks = feedbacks.filter(fb => {
    const typeMatch = feedbackFilter === 'all' || fb.type === feedbackFilter;
    const versionMatch = feedbackVersionFilter === 'all'
      ? true
      : feedbackVersionFilter === 'A'
        ? fb.version === selectedVersionA.version
        : fb.version === selectedVersionB.version;
    return typeMatch && versionMatch;
  });

  // Handle feedback click - jump to timestamp
  const handleFeedbackClick = (feedback: Feedback) => {
    setCurrentTime(feedback.timestamp);
    setSelectedFeedback(feedback);
    if (videoRefA.current) {
      videoRefA.current.currentTime = feedback.timestamp;
    }
    if (videoRefB.current) {
      videoRefB.current.currentTime = feedback.timestamp;
    }
  };

  // Toggle play/pause for videos
  const togglePlayPause = (target: 'A' | 'B') => {
    if (isSynced) {
      // If synced, control both based on A's state
      if (videoRefA.current) {
        if (isPlayingA) {
          videoRefA.current.pause();
          videoRefB.current?.pause();
          setIsPlayingA(false);
          setIsPlayingB(false);
        } else {
          videoRefA.current.play();
          videoRefB.current?.play();
          setIsPlayingA(true);
          setIsPlayingB(true);
        }
      }
    } else {
      // Independent control
      if (target === 'A' && videoRefA.current) {
        if (isPlayingA) videoRefA.current.pause();
        else videoRefA.current.play();
        setIsPlayingA(!isPlayingA);
      } else if (target === 'B' && videoRefB.current) {
        if (isPlayingB) videoRefB.current.pause();
        else videoRefB.current.play();
        setIsPlayingB(!isPlayingB);
      }
    }
  };

  // Add new feedback
  const handleAddFeedback = () => {
    const newFeedback: Feedback = {
      id: `fb-${Date.now()}`,
      version: selectedVersionA.version,
      timestamp: currentTime,
      timestampEnd: newFeedbackTimestampEnd || undefined,
      type: newFeedbackType,
      content: newFeedbackContent,
      annotation: currentAnnotation || undefined,
      resolved: false,
      createdAt: new Date().toISOString(),
    };
    setFeedbacks([...feedbacks, newFeedback]);
    setShowFeedbackModal(false);
    setNewFeedbackContent('');
    setNewFeedbackTimestampEnd(null);
    setCurrentAnnotation(null);
    setAnnotationTool(null);
  };

  // Toggle feedback resolved
  const toggleResolved = (id: string) => {
    setFeedbacks(feedbacks.map(fb =>
      fb.id === id ? { ...fb, resolved: !fb.resolved } : fb
    ));
  };

  // Annotation drawing handlers
  const handleAnnotationMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!annotationTool || !annotationRef.current) return;
    const rect = annotationRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setIsDrawing(true);
    setDrawStart({ x, y });
    setCurrentAnnotation({ type: annotationTool, color: '#ff6b6b', points: [{ x, y }] });
  };

  const handleAnnotationMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!isDrawing || !drawStart || !annotationRef.current) return;
    const rect = annotationRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCurrentAnnotation(prev => prev ? { ...prev, points: [drawStart, { x, y }] } : null);
  };

  const handleAnnotationMouseUp = () => setIsDrawing(false);

  // Render annotation shape
  const renderAnnotation = (annotation: Annotation, opacity: number = 1) => {
    const { type, color, points } = annotation;
    if (points.length < 2) return null;
    switch (type) {
      case 'rect':
        const [p1, p2] = points;
        return (
          <rect
            x={`${Math.min(p1.x, p2.x)}%`} y={`${Math.min(p1.y, p2.y)}%`}
            width={`${Math.abs(p2.x - p1.x)}%`} height={`${Math.abs(p2.y - p1.y)}%`}
            fill="none" stroke={color} strokeWidth="3" opacity={opacity}
          />
        );
      case 'ellipse':
        return (
          <ellipse
            cx={`${(points[0].x + points[1].x) / 2}%`} cy={`${(points[0].y + points[1].y) / 2}%`}
            rx={`${Math.abs(points[1].x - points[0].x) / 2}%`} ry={`${Math.abs(points[1].y - points[0].y) / 2}%`}
            fill="none" stroke={color} strokeWidth="3" opacity={opacity}
          />
        );
      case 'arrow':
        return (
          <g opacity={opacity}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={color} />
              </marker>
            </defs>
            <line
              x1={`${points[0].x}%`} y1={`${points[0].y}%`}
              x2={`${points[1].x}%`} y2={`${points[1].y}%`}
              stroke={color} strokeWidth="3" markerEnd="url(#arrowhead)"
            />
          </g>
        );
      default:
        return null;
    }
  };

  // Video player component
  const VideoPlayer = ({
    videoRef,
    src,
    label,
    showAnnotation = true,
    targetVersion,
    isPlaying,
    onToggle
  }: {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    src: string;
    label?: string;
    showAnnotation?: boolean;
    targetVersion?: number;
    isPlaying: boolean;
    onToggle: () => void;
  }) => (
    <div className="relative w-full h-full bg-black overflow-hidden rounded-lg">
      {/* Version Label */}
      {label && (
        <div className="absolute top-2 left-2 z-10 px-2 py-1 rounded bg-black/70 text-white text-xs font-medium">
          {label}
        </div>
      )}

      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        className={cn(
          "w-full h-full",
          aspectRatio === '9:16' ? "object-contain" : "object-cover"
        )}
        muted={isMuted}
        loop
        playsInline
        onTimeUpdate={(e) => {
          if (videoRef === videoRefA) setCurrentTime(e.currentTarget.currentTime);
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onClick={onToggle}
      />

      {/* Play overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
            <Play className="w-6 h-6 text-white ml-1" />
          </div>
        </div>
      )}

      {/* Annotation SVG Overlay */}
      {showAnnotation && (
        <svg
          ref={annotationRef}
          className={cn(
            "absolute inset-0 w-full h-full",
            annotationTool ? "cursor-crosshair" : "pointer-events-none"
          )}
          onMouseDown={handleAnnotationMouseDown}
          onMouseMove={handleAnnotationMouseMove}
          onMouseUp={handleAnnotationMouseUp}
          onMouseLeave={handleAnnotationMouseUp}
        >
          {currentAnnotation && renderAnnotation(currentAnnotation, 0.7)}
          {/* Show annotation if feedback belongs to this version OR if it's the active feedback being checked */}
          {selectedFeedback?.annotation &&
           (selectedFeedback.version === targetVersion || !targetVersion) &&
           renderAnnotation(selectedFeedback.annotation)}
        </svg>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/stars/reviews"
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-white">{reviewData.title}</h1>
          <p className="text-gray-400 text-sm">
            {reviewData.project.title} · {reviewData.freelancer.name}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('single')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors",
              viewMode === 'single'
                ? "bg-primary text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            <Monitor className="w-4 h-4" />
            단일
          </button>
          <button
            onClick={() => setViewMode('compare')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors",
              viewMode === 'compare'
                ? "bg-primary text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            <Columns className="w-4 h-4" />
            A/B 비교
          </button>
        </div>

        {/* Aspect Ratio Toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setAspectRatio('16:9')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors",
              aspectRatio === '16:9'
                ? "bg-blue-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            <Monitor className="w-4 h-4" />
            16:9
          </button>
          <button
            onClick={() => setAspectRatio('9:16')}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm flex items-center gap-1.5 transition-colors",
              aspectRatio === '9:16'
                ? "bg-blue-500 text-white"
                : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            <Smartphone className="w-4 h-4" />
            9:16
          </button>
        </div>

        <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-medium flex items-center gap-1">
          <Clock className="w-4 h-4" />
          검수 대기
        </span>
      </div>

      {/* Version Selector for Compare Mode */}
      {viewMode === 'compare' && (
        <GlassCard className="p-3">
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">버전 선택:</span>
            <div className="flex gap-4 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-primary font-medium">A (현재)</span>
                <select
                  value={selectedVersionA.version}
                  onChange={(e) => {
                    const v = videoVersions.find(v => v.version === Number(e.target.value));
                    if (v) setSelectedVersionA(v);
                  }}
                  className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white"
                >
                  {videoVersions.map(v => (
                    <option key={v.version} value={v.version}>
                      v{v.version} - {formatDate(v.submittedAt)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-orange-400 font-medium">B (이전)</span>
                <select
                  value={selectedVersionB.version}
                  onChange={(e) => {
                    const v = videoVersions.find(v => v.version === Number(e.target.value));
                    if (v) setSelectedVersionB(v);
                  }}
                  className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white"
                >
                  {videoVersions.map(v => (
                    <option key={v.version} value={v.version}>
                      v{v.version} - {formatDate(v.submittedAt)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={() => {
                const temp = selectedVersionA;
                setSelectedVersionA(selectedVersionB);
                setSelectedVersionB(temp);
              }}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              title="좌우 바꾸기"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            {/* Sync Toggle */}
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
              <button
                onClick={() => setIsSynced(!isSynced)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm flex items-center gap-2 transition-colors",
                  isSynced
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10"
                )}
              >
                <RotateCcw className={cn("w-4 h-4", isSynced && "text-primary")} />
                {isSynced ? "동기화 ON" : "동기화 OFF"}
              </button>
            </div>
          </div>
      </GlassCard>
    )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Video Player Section */}
        <div className={cn("space-y-4", "lg:col-span-2")}>
          <GlassCard className="p-4">
            {/* Video Container - Dynamic Ratio */}
            <div className={cn(
              "relative mx-auto transition-all",
              aspectRatio === '16:9' ? "w-full aspect-video" :
              viewMode === 'compare' ? "w-full h-[80vh]" : "h-[80vh] aspect-9/16"
            )}>
              {viewMode === 'single' ? (
                /* Single Video View */
                <VideoPlayer
                  videoRef={videoRefA}
                  src={selectedVersionA.url}
                  label={`v${selectedVersionA.version}`}
                  showAnnotation={true}
                  targetVersion={selectedVersionA.version}
                  isPlaying={isPlayingA}
                  onToggle={() => togglePlayPause('A')}
                />
              ) : (
                /* A/B Compare View - 가로는 좌우, 세로는 상하 배치 */
                <div className="flex flex-row gap-2 h-full">
                  <div className="relative flex-1 h-full transition-all">
                    <VideoPlayer
                      videoRef={videoRefA}
                      src={selectedVersionA.url}
                      label={`v${selectedVersionA.version} (현재)`}
                      showAnnotation={true}
                      targetVersion={selectedVersionA.version}
                      isPlaying={isPlayingA}
                      onToggle={() => togglePlayPause('A')}
                    />
                  </div>
                  <div className="w-px h-full bg-white/20" />
                  <div className="relative flex-1 h-full transition-all">
                    <VideoPlayer
                      videoRef={videoRefB}
                      src={selectedVersionB.url}
                      label={`v${selectedVersionB.version} (이전)`}
                      showAnnotation={true}
                      targetVersion={selectedVersionB.version}
                      isPlaying={isPlayingB}
                      onToggle={() => togglePlayPause('B')}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls */}
            <div className="mt-4">
              {/* Progress bar with feedback markers */}
              <div className="relative mb-3">
                <div className="h-1.5 bg-white/20 rounded-full">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                {/* Feedback markers on timeline */}
                {feedbacks.map(fb => (
                  <button
                    key={fb.id}
                    className={cn(
                      "absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 transition-transform hover:scale-150",
                      fb.resolved ? "bg-green-500 border-green-400" : "bg-yellow-500 border-yellow-400"
                    )}
                    style={{ left: `${(fb.timestamp / duration) * 100}%` }}
                    onClick={() => handleFeedbackClick(fb)}
                    title={`${formatTime(fb.timestamp)} - ${fb.content}`}
                  />
                ))}
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={e => {
                    const time = Number(e.target.value);
                    setCurrentTime(time);
                    if (videoRefA.current) videoRefA.current.currentTime = time;
                    if (videoRefB.current) videoRefB.current.currentTime = time;
                  }}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => togglePlayPause('A')} className="text-white hover:text-primary transition-colors">
                  {isPlayingA ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <span className="text-white text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <div className="flex-1" />
                <button onClick={() => setIsMuted(!isMuted)} className="text-white hover:text-primary transition-colors">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button className="text-white hover:text-primary transition-colors">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Annotation Tools */}
          <GlassCard className="p-3">
            <div className="flex items-center gap-4">
              <span className="text-gray-400 text-sm">🖊️ 마킹:</span>
              <div className="flex gap-1">
                {[
                  { type: 'rect' as AnnotationType, icon: Square, label: '사각형' },
                  { type: 'ellipse' as AnnotationType, icon: Circle, label: '원' },
                  { type: 'arrow' as AnnotationType, icon: ArrowRight, label: '화살표' },
                ].map(tool => (
                  <button
                    key={tool.type}
                    onClick={() => setAnnotationTool(annotationTool === tool.type ? null : tool.type)}
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      annotationTool === tool.type
                        ? "bg-primary text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                    )}
                    title={tool.label}
                  >
                    <tool.icon className="w-4 h-4" />
                  </button>
                ))}
                <button
                  onClick={() => { setCurrentAnnotation(null); setAnnotationTool(null); }}
                  className="p-2 rounded-lg bg-white/5 text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                  title="삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1" />
              <button
                onClick={() => setShowFeedbackModal(true)}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/80 text-white text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                피드백 추가
              </button>
            </div>
          </GlassCard>



          {/* Action Buttons - Only in single mode or at bottom in compare mode */}
          {(viewMode === 'single' || viewMode === 'compare') && (
            <div className="flex gap-3">
              <button
                onClick={() => setShowActionModal('approve')}
                className="flex-1 py-3 rounded-lg bg-green-600 hover:bg-green-500 text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                승인
              </button>
              <button
                onClick={() => setShowActionModal('revision')}
                className="flex-1 py-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-5 h-5" />
                수정요청
              </button>
              <button
                onClick={() => setShowActionModal('reject')}
                className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="w-5 h-5" />
                반려
              </button>
            </div>
          )}
        </div>

        {/* Feedback List Sidebar */}
        <div className="space-y-4">
            <GlassCard className="p-4">
              <div className="flex flex-col gap-4 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-blue-400" />
                    피드백 ({feedbacks.length})
                  </h3>
                   <select
                    value={feedbackFilter}
                    onChange={e => setFeedbackFilter(e.target.value as FeedbackType | 'all')}
                    className="bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-gray-300"
                  >
                    <option value="all">전체 유형</option>
                    {Object.entries(feedbackTypes).map(([key, val]) => (
                      <option key={key} value={key}>{val.label}</option>
                    ))}
                  </select>
                </div>

                {/* Version Filter */}
                <div className="flex bg-white/5 p-1 rounded-lg">
                  <button
                    onClick={() => setFeedbackVersionFilter('all')}
                    className={cn(
                      "flex-1 py-1 text-xs font-medium rounded transition-colors",
                      feedbackVersionFilter === 'all' ? "bg-primary text-white" : "text-gray-400 hover:text-white"
                    )}
                  >
                    전체
                  </button>
                  <button
                    onClick={() => setFeedbackVersionFilter('A')}
                    className={cn(
                      "flex-1 py-1 text-xs font-medium rounded transition-colors",
                      feedbackVersionFilter === 'A' ? "bg-primary text-white" : "text-gray-400 hover:text-white"
                    )}
                  >
                    {viewMode === 'compare' ? `A (v${selectedVersionA.version})` : `현재 (v${selectedVersionA.version})`}
                  </button>
                  {viewMode === 'compare' && (
                    <button
                      onClick={() => setFeedbackVersionFilter('B')}
                      className={cn(
                        "flex-1 py-1 text-xs font-medium rounded transition-colors",
                        feedbackVersionFilter === 'B' ? "bg-primary text-white" : "text-gray-400 hover:text-white"
                      )}
                    >
                      B (v{selectedVersionB.version})
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {filteredFeedbacks.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center py-4">피드백이 없습니다</p>
                ) : (
                  filteredFeedbacks.map(fb => (
                    <button
                      key={fb.id}
                      onClick={() => handleFeedbackClick(fb)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg border-l-2 transition-colors",
                        selectedFeedback?.id === fb.id
                          ? "bg-primary/20 border-primary"
                          : "bg-white/5 border-transparent hover:bg-white/10",
                        feedbackTypes[fb.type].color.split(' ')[2]
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-primary">
                          ⏱️ {formatTime(fb.timestamp)}
                          {fb.timestampEnd && ` - ${formatTime(fb.timestampEnd)}`}
                        </span>
                        <span className={cn("px-1.5 py-0.5 rounded text-xs", feedbackTypes[fb.type].color)}>
                          {feedbackTypes[fb.type].icon} {feedbackTypes[fb.type].label}
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">{fb.content}</p>
                      <div className="flex items-center gap-2 mt-2">
                        {fb.annotation && <span className="text-xs text-gray-500">🖼️ 마킹</span>}
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleResolved(fb.id); }}
                          className={cn(
                            "ml-auto text-xs px-2 py-0.5 rounded flex items-center gap-1",
                            fb.resolved ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"
                          )}
                        >
                          <Check className="w-3 h-3" />
                          {fb.resolved ? '해결됨' : '해결'}
                        </button>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </GlassCard>

            {/* Video Info */}
            <GlassCard className="p-4">
              <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-gray-400" />
                영상 정보
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">현재 버전</span>
                  <span className="text-white">v{selectedVersionA.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">비율</span>
                  <span className="text-white">{aspectRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">제출일</span>
                  <span className="text-white">{formatDate(selectedVersionA.submittedAt)}</span>
                </div>
              </div>
              <button className="w-full mt-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-sm flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                다운로드
              </button>
            </GlassCard>
          </div>

      </div>



      {/* Add Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <GlassCard className="w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-white mb-4">📍 피드백 추가</h3>
            <div className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm block mb-1">타임스탬프</label>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-2 bg-white/5 rounded-lg text-white font-mono">{formatTime(currentTime)}</span>
                  <span className="text-gray-500">~</span>
                  <input
                    type="text"
                    placeholder="끝"
                    value={newFeedbackTimestampEnd ? formatTime(newFeedbackTimestampEnd) : ''}
                    onChange={e => {
                      const parts = e.target.value.split(':');
                      if (parts.length === 2) {
                        const secs = parseInt(parts[0]) * 60 + parseInt(parts[1]);
                        if (!isNaN(secs)) setNewFeedbackTimestampEnd(secs);
                      }
                    }}
                    className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-mono w-20"
                  />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-2">유형</label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(feedbackTypes).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setNewFeedbackType(key as FeedbackType)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm transition-colors",
                        newFeedbackType === key ? val.color : "bg-white/5 text-gray-400"
                      )}
                    >
                      {val.icon} {val.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm block mb-1">내용</label>
                <textarea
                  value={newFeedbackContent}
                  onChange={e => setNewFeedbackContent(e.target.value)}
                  placeholder="수정이 필요한 내용..."
                  className="w-full h-20 bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 resize-none"
                />
              </div>
              {currentAnnotation && (
                <div className="p-2 bg-primary/10 rounded-lg text-primary text-sm">🖼️ 마킹 포함</div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowFeedbackModal(false); setNewFeedbackContent(''); setCurrentAnnotation(null); }}
                className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
              >
                취소
              </button>
              <button
                onClick={handleAddFeedback}
                disabled={!newFeedbackContent.trim()}
                className="flex-1 py-2 rounded-lg bg-primary hover:bg-primary/80 text-white font-medium disabled:opacity-50"
              >
                추가
              </button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <GlassCard className="w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-white mb-4">
              {showActionModal === 'approve' ? '✅ 영상 승인' :
               showActionModal === 'revision' ? '🔄 수정 요청' : '❌ 영상 반려'}
            </h3>
            {showActionModal === 'revision' && feedbacks.filter(f => !f.resolved).length > 0 && (
              <div className="mb-4 p-3 bg-orange-500/10 rounded-lg text-orange-400 text-sm">
                미해결 피드백 {feedbacks.filter(f => !f.resolved).length}건이 함께 전송됩니다.
              </div>
            )}
            <textarea
              value={actionFeedback}
              onChange={e => setActionFeedback(e.target.value)}
              placeholder={showActionModal === 'approve' ? '승인 메모 (선택)' : '사유 입력...'}
              className="w-full h-24 bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-500 resize-none"
            />
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => { setShowActionModal(null); setActionFeedback(''); }}
                className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
              >
                취소
              </button>
              <button
                onClick={() => { console.log('Action:', showActionModal, actionFeedback); setShowActionModal(null); setActionFeedback(''); }}
                className={cn(
                  "flex-1 py-2 rounded-lg text-white font-medium",
                  showActionModal === 'approve' ? "bg-green-600 hover:bg-green-500" :
                  showActionModal === 'revision' ? "bg-orange-600 hover:bg-orange-500" : "bg-red-600 hover:bg-red-500"
                )}
              >
                확인
              </button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
