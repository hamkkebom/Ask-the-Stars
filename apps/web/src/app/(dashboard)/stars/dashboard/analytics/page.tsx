'use client';

import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/lib/api/axios';
import { Loader2, Eye, Video, TrendingUp, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function AnalyticsPage() {
  const { data: submissions, isLoading, error } = useQuery({
    queryKey: ['my-submissions'],
    queryFn: async () => {
      const response = await axiosInstance.get('/submissions/my');
      return response.data;
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-red-500">
        <AlertCircle className="w-10 h-10 mb-2" />
        <p>데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  // Calculate Stat
  const totalSubmissions = submissions?.length || 0;
  const totalViews = submissions?.reduce((acc: number, curr: any) => acc + (curr.views || 0), 0) || 0;

  // Sort by views desc
  const topVideos = [...(submissions || [])].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">크리에이터 분석 대시보드</h1>
        <p className="text-gray-500 mt-1">내 영상의 성과를 확인하세요.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">총 조회수</h3>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
          <div className="mt-2 text-sm text-green-600 flex items-center">
             <TrendingUp className="w-3 h-3 mr-1" />
             <span>실시간 집계 중</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">제출한 영상</h3>
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Video className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">{totalSubmissions.toLocaleString()}</p>
          <p className="mt-2 text-sm text-gray-500">누적 업로드 수</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Placeholder for Revenue or Watch Time */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 font-medium">예상 수익</h3>
             <div className="p-2 bg-green-50 text-green-600 rounded-lg">
              <span className="font-bold">₩</span>
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-900">₩0</p>
          <p className="mt-2 text-sm text-gray-400">정산 시스템 준비 중</p>
        </div>
      </div>

      {/* Top Videos List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-lg text-gray-900">인기 영상 TOP 5</h2>
        </div>
        <div className="divide-y divide-gray-100">
            {topVideos.map((video: any, index: number) => (
                <div key={video.id} className="p-4 flex items-center hover:bg-gray-50 transition-colors">
                    <div className="w-8 text-center font-bold text-gray-400 mr-4">
                        {index + 1}
                    </div>
                    <div className="w-16 h-10 bg-gray-200 rounded overflow-hidden mr-4 relative">
                        {video.thumbnailUrl ? (
                            <img src={video.thumbnailUrl} alt="Thumbnail" className="object-cover w-full h-full" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Img</div>
                        )}
                    </div>
                    <div className="flex-1">
                        <h4 className="font-medium text-gray-900 line-clamp-1">{video.versionTitle || video.project?.title || '제목 없음'}</h4>
                        <div className="flex items-center text-sm text-gray-500 gap-2">
                             <span>{video.project?.title}</span>
                             <span>·</span>
                             <span>{formatDate(video.createdAt)}</span>
                        </div>
                    </div>
                    <div className="text-right pl-4">
                        <div className="font-bold text-gray-900 flex items-center justify-end gap-1">
                            <Eye className="w-4 h-4 text-gray-400" />
                            {video.views?.toLocaleString()}
                        </div>
                    </div>

                    {/* Action */}
                    <Link href={`/stars/my-projects/detail/${video.assignmentId || video.projectId}`} className="ml-4 px-3 py-1 text-sm border rounded hover:bg-gray-100 text-gray-600">
                        상세
                    </Link>
                </div>
            ))}

            {topVideos.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                    아직 데이터가 없습니다. 영상을 업로드해보세요!
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
