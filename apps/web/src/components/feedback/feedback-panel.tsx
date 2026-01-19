'use client';

import { useState, useCallback } from 'react';
import { formatTimestamp } from '@/lib/utils';

export interface FeedbackItem {
  id: string;
  content: string;
  timestamp: number; // seconds
  endTimestamp?: number; // optional end time for range
  coordinates?: {
    x: number; // normalized 0-1
    y: number; // normalized 0-1
    type: 'circle' | 'arrow' | 'rectangle';
  };
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'resolved' | 'wontfix';
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface FeedbackPanelProps {
  /** List of feedback items */
  feedbacks: FeedbackItem[];
  /** Current video timestamp */
  currentTime?: number;
  /** Called when user clicks on a timestamp */
  onTimestampClick?: (timestamp: number) => void;
  /** Called when new feedback is submitted */
  onSubmit?: (data: { content: string; timestamp: number; priority: string }) => void;
  /** Called when feedback status changes */
  onStatusChange?: (id: string, status: FeedbackItem['status']) => void;
  /** Enable/disable adding new feedback */
  canAddFeedback?: boolean;
  /** CSS class name */
  className?: string;
}

const priorityColors = {
  low: 'bg-gray-100 text-gray-700',
  medium: 'bg-blue-100 text-blue-700',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  resolved: 'bg-green-100 text-green-700',
  wontfix: 'bg-gray-100 text-gray-500',
};

/**
 * FeedbackPanel - Displays and manages video feedback with timestamps
 */
export function FeedbackPanel({
  feedbacks,
  currentTime = 0,
  onTimestampClick,
  onSubmit,
  onStatusChange,
  canAddFeedback = true,
  className = '',
}: FeedbackPanelProps) {
  const [newContent, setNewContent] = useState('');
  const [newPriority, setNewPriority] = useState<string>('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!newContent.trim() || !onSubmit) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        content: newContent.trim(),
        timestamp: currentTime,
        priority: newPriority,
      });
      setNewContent('');
    } finally {
      setIsSubmitting(false);
    }
  }, [newContent, currentTime, newPriority, onSubmit]);

  const sortedFeedbacks = [...feedbacks].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className={`feedback-panel flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold">피드백</h3>
        <p className="text-sm text-gray-500">
          총 {feedbacks.length}개 · 미해결 {feedbacks.filter(f => f.status === 'pending').length}개
        </p>
      </div>

      {/* Feedback List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {sortedFeedbacks.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>피드백이 없습니다</p>
            <p className="text-sm">영상을 시청하며 피드백을 추가하세요</p>
          </div>
        ) : (
          sortedFeedbacks.map((feedback) => (
            <FeedbackItemCard
              key={feedback.id}
              feedback={feedback}
              isActive={
                currentTime >= feedback.timestamp &&
                currentTime <= (feedback.endTimestamp || feedback.timestamp + 3)
              }
              onTimestampClick={onTimestampClick}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>

      {/* New Feedback Form */}
      {canAddFeedback && (
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium">현재 시간:</span>
            <span className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
              {formatTimestamp(currentTime)}
            </span>
          </div>

          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="피드백 내용을 입력하세요..."
            className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />

          <div className="flex items-center justify-between mt-2">
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="px-3 py-1.5 border rounded-lg text-sm"
            >
              <option value="low">낮음</option>
              <option value="medium">보통</option>
              <option value="high">높음</option>
              <option value="urgent">긴급</option>
            </select>

            <button
              onClick={handleSubmit}
              disabled={!newContent.trim() || isSubmitting}
              className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium
                       hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '저장 중...' : '피드백 추가'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Individual Feedback Card
function FeedbackItemCard({
  feedback,
  isActive,
  onTimestampClick,
  onStatusChange,
}: {
  feedback: FeedbackItem;
  isActive: boolean;
  onTimestampClick?: (timestamp: number) => void;
  onStatusChange?: (id: string, status: FeedbackItem['status']) => void;
}) {
  return (
    <div
      className={`p-3 rounded-lg border transition-all ${
        isActive
          ? 'border-blue-500 bg-blue-50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      {/* Header with timestamp */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => onTimestampClick?.(feedback.timestamp)}
          className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
          {formatTimestamp(feedback.timestamp)}
          {feedback.endTimestamp && ` - ${formatTimestamp(feedback.endTimestamp)}`}
        </button>

        <div className="flex items-center gap-1">
          <span className={`text-xs px-2 py-0.5 rounded ${priorityColors[feedback.priority]}`}>
            {feedback.priority === 'low' && '낮음'}
            {feedback.priority === 'medium' && '보통'}
            {feedback.priority === 'high' && '높음'}
            {feedback.priority === 'urgent' && '긴급'}
          </span>
        </div>
      </div>

      {/* Content */}
      <p className="text-sm text-gray-700 mb-2">{feedback.content}</p>

      {/* Coordinate indicator */}
      {feedback.coordinates && (
        <div className="text-xs text-gray-400 mb-2">
          📍 화면 좌표: ({Math.round(feedback.coordinates.x * 100)}%, {Math.round(feedback.coordinates.y * 100)}%)
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{feedback.author.name}</span>

        {onStatusChange && (
          <select
            value={feedback.status}
            onChange={(e) => onStatusChange(feedback.id, e.target.value as FeedbackItem['status'])}
            className={`px-2 py-0.5 rounded border-0 text-xs ${statusColors[feedback.status]}`}
          >
            <option value="pending">대기 중</option>
            <option value="resolved">해결됨</option>
            <option value="wontfix">해결 안함</option>
          </select>
        )}
      </div>
    </div>
  );
}

export default FeedbackPanel;
