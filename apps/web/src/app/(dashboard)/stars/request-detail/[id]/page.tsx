'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/glass-card';
import { toast } from '@/hooks/use-toast';
import { formatDate, formatCurrency, cn } from '@/lib/utils';
import {
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Tag,
  User,
  DollarSign,
  Play,
  Loader2
} from 'lucide-react';

// Types
interface ProjectRequest {
  id: string;
  title: string;
  description?: string;
  categories: string[];
  deadline: string;
  assignmentType: 'SINGLE' | 'MULTIPLE';
  maxAssignees: number;
  currentAssignees: number;
  status: 'OPEN' | 'FULL' | 'CLOSED' | 'CANCELLED';
  estimatedBudget?: number;
  createdAt: string;
  createdBy?: { name: string };
  targetCounselor?: { name: string };
  requirements?: string[];
  attachments?: { name: string; url: string }[];
}

// Mock Data - 실제로는 API에서 가져옴
const mockRequests: Record<string, ProjectRequest> = {
  '1': {
    id: '1',
    title: '신년운세 × 신규 상담사 김태희 홍보',
    description: '2026년 신년운세 시즌 홍보 영상 제작. 새해를 맞아 신년운세와 신규 상담사 김태희님을 홍보하는 영상을 제작합니다. 밝고 희망찬 분위기로 제작해주세요.',
    categories: ['신년운세', '신규상담사', '사주'],
    deadline: '2026-01-25T23:59:59Z',
    assignmentType: 'MULTIPLE',
    maxAssignees: 3,
    currentAssignees: 1,
    status: 'OPEN',
    estimatedBudget: 150000,
    createdAt: '2026-01-15T10:00:00Z',
    createdBy: { name: '관리팀' },
    targetCounselor: { name: '김태희' },
    requirements: [
      '영상 길이: 30초 ~ 1분',
      '썸네일 포함 필수',
      '상담사 소개 장면 필수',
      '새해 분위기 BGM 사용',
    ],
    attachments: [
      { name: '김태희_프로필사진.jpg', url: '#' },
      { name: '브랜드가이드.pdf', url: '#' },
    ],
  },
  '2': {
    id: '2',
    title: '2026 봄 타로 시즌 캠페인',
    description: '봄 시즌 타로 운세 홍보 영상. 봄의 따뜻한 느낌을 살려 타로 상담을 홍보하는 영상입니다.',
    categories: ['타로', '계절별', '브랜드홍보'],
    deadline: '2026-02-10T23:59:59Z',
    assignmentType: 'SINGLE',
    maxAssignees: 1,
    currentAssignees: 0,
    status: 'OPEN',
    estimatedBudget: 200000,
    createdAt: '2026-01-16T14:00:00Z',
    createdBy: { name: '관리팀' },
    requirements: [
      '영상 길이: 1분 ~ 2분',
      '봄 시즌 느낌 연출',
      '타로 카드 시각적 효과 포함',
    ],
  },
};

const categoryColors: Record<string, string> = {
  '신년운세': 'bg-red-500/20 text-red-200 border-red-500/30',
  '타로': 'bg-purple-500/20 text-purple-200 border-purple-500/30',
  '사주': 'bg-blue-500/20 text-blue-200 border-blue-500/30',
  '신점': 'bg-orange-500/20 text-orange-200 border-orange-500/30',
  'default': 'bg-gray-500/20 text-gray-200 border-gray-500/30',
};

function getCategoryStyle(cat: string) {
  return categoryColors[cat] || categoryColors['default'];
}

function StatusBadge({ status }: { status: ProjectRequest['status'] }) {
  const styles = {
    OPEN: 'bg-green-500/20 text-green-300 border-green-500/30',
    FULL: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    CLOSED: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    CANCELLED: 'bg-red-500/20 text-red-300 border-red-500/30',
  };

  const labels = {
    OPEN: '모집중',
    FULL: '모집마감',
    CLOSED: '완료',
    CANCELLED: '취소됨',
  };

  return (
    <span className={cn("px-3 py-1 rounded-full text-sm font-medium border", styles[status])}>
      {labels[status]}
    </span>
  );
}

export default function RequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [request, setRequest] = useState<ProjectRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      const data = mockRequests[id];
      if (data) {
        setRequest(data);
      }
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  const handleAccept = async () => {
    if (!request) return;

    setAccepting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('제작 요청을 수락했습니다!');
    setAccepting(false);

    // 내 프로젝트 페이지로 이동
    router.push('/stars/my-projects');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <AlertCircle className="w-16 h-16 text-gray-400" />
        <h2 className="text-xl font-bold text-white">요청을 찾을 수 없습니다</h2>
        <Link href="/stars/project-board" className="text-primary hover:underline">
          프로젝트 보드로 돌아가기
        </Link>
      </div>
    );
  }

  const canAccept = request.status === 'OPEN' && request.currentAssignees < request.maxAssignees;
  const daysLeft = Math.ceil((new Date(request.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-transparent p-6 space-y-6">
      {/* Back Button */}
      <Link
        href="/stars/project-board"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        프로젝트 보드로 돌아가기
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row justify-between items-start gap-4"
      >
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <StatusBadge status={request.status} />
            {request.assignmentType === 'MULTIPLE' && (
              <span className="text-sm text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">
                중복 가능
              </span>
            )}
          </div>
          <h1 className="text-3xl font-bold text-white">{request.title}</h1>
          <div className="flex items-center gap-4 text-gray-400">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {request.createdBy?.name}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(request.createdAt)}
            </span>
          </div>
        </div>

        {/* Accept Button */}
        {canAccept && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAccept}
            disabled={accepting}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white px-6 py-3 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-primary/20"
          >
            {accepting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                수락 중...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                제작 수락하기
              </>
            )}
          </motion.button>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              상세 설명
            </h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {request.description}
            </p>
          </GlassCard>

          {/* Requirements */}
          {request.requirements && request.requirements.length > 0 && (
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                제작 요구사항
              </h3>
              <ul className="space-y-3">
                {request.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-300">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    {req}
                  </li>
                ))}
              </ul>
            </GlassCard>
          )}

          {/* Attachments */}
          {request.attachments && request.attachments.length > 0 && (
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                첨부파일
              </h3>
              <div className="space-y-2">
                {request.attachments.map((file, index) => (
                  <a
                    key={index}
                    href={file.url}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <FileText className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{file.name}</span>
                  </a>
                ))}
              </div>
            </GlassCard>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-white">요약 정보</h3>

            <div className="space-y-4">
              {/* Budget */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-400">
                  <DollarSign className="w-4 h-4" />
                  예상 예산
                </span>
                <span className="text-xl font-bold text-primary">
                  {formatCurrency(request.estimatedBudget ?? 0)}
                </span>
              </div>

              {/* Deadline */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-400">
                  <Clock className="w-4 h-4" />
                  마감일
                </span>
                <span className={cn(
                  "font-medium",
                  daysLeft < 3 ? "text-red-400" : daysLeft < 7 ? "text-yellow-400" : "text-gray-300"
                )}>
                  {formatDate(request.deadline)}
                  {daysLeft > 0 && <span className="text-sm ml-1">({daysLeft}일 남음)</span>}
                </span>
              </div>

              {/* Assignees */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-400">
                  <Users className="w-4 h-4" />
                  참여 현황
                </span>
                <span className="font-medium text-gray-300">
                  {request.currentAssignees} / {request.maxAssignees}명
                </span>
              </div>

              {/* Assignment Type */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-400">
                  <AlertCircle className="w-4 h-4" />
                  수락 유형
                </span>
                <span className="font-medium text-gray-300">
                  {request.assignmentType === 'SINGLE' ? '독점' : '중복 가능'}
                </span>
              </div>
            </div>
          </GlassCard>

          {/* Categories */}
          <GlassCard className="p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-purple-400" />
              카테고리
            </h3>
            <div className="flex flex-wrap gap-2">
              {request.categories.map(cat => (
                <span key={cat} className={cn("px-3 py-1 rounded-full text-sm border", getCategoryStyle(cat))}>
                  {cat}
                </span>
              ))}
            </div>
          </GlassCard>

          {/* Target Counselor */}
          {request.targetCounselor && (
            <GlassCard className="p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-yellow-400" />
                대상 상담사
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold">
                  {request.targetCounselor.name[0]}
                </div>
                <span className="text-lg font-medium text-white">
                  {request.targetCounselor.name}
                </span>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
