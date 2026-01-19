'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const mockCounselor = {
  id: 'c1',
  name: '김태희',
  grade: '찐' as const,
  specialty: ['사주', '신년운세'],
  bio: '20년 경력의 사주 전문가입니다.',
  introduction: '안녕하세요, 김태희 상담사입니다. 어려운 일이 있으신가요? 사주와 운세로 함께 해결책을 찾아보아요. 하루에 한 분 한 분 정성을 다해 상담합니다.',
  rating: 4.9,
  reviewCount: 1250,
  consultCount: 3500,
  videos: [
    { id: 'v1', title: '2026 신년운세 - 하반기 대박 운세', views: 15420, likes: 892 },
    { id: 'v2', title: '사주로 보는 2026 재물운', views: 8930, likes: 567 },
    { id: 'v3', title: '타로 연애운 긴급 점검', views: 5600, likes: 321 },
  ],
  reviews: [
    { id: 'r1', content: '정말 신기하게 다 맞추셨어요!', rating: 5, author: '김**', date: '2026-01-15' },
    { id: 'r2', content: '상담 후 마음이 편해졌습니다.', rating: 5, author: '이**', date: '2026-01-10' },
    { id: 'r3', content: '친절하고 상세한 상담 감사합니다.', rating: 4, author: '박**', date: '2026-01-05' },
  ],
};

const gradeConfig = {
  '신규': { icon: '💚', color: 'bg-green-100 text-green-700' },
  '단골': { icon: '💛', color: 'bg-yellow-100 text-yellow-700' },
  '번개': { icon: '⚡', color: 'bg-orange-100 text-orange-700' },
  '찐': { icon: '👑', color: 'bg-purple-100 text-purple-700' },
};

function formatNumber(num: number): string {
  if (num >= 10000) return `${(num / 10000).toFixed(1)}만`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}천`;
  return num.toString();
}

export default function CounselorDetailPage() {
  const params = useParams();
  const counselorId = params.id as string;

  const [counselor] = useState(mockCounselor);
  const [tab, setTab] = useState<'videos' | 'reviews'>('videos');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center text-6xl mb-4">
            🔮
          </div>
          <h1 className="text-3xl font-bold">{counselor.name}</h1>
          <span className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium ${gradeConfig[counselor.grade].color}`}>
            {gradeConfig[counselor.grade].icon} {counselor.grade}
          </span>
          <p className="mt-3 text-purple-200">{counselor.bio}</p>

          <div className="flex justify-center gap-2 mt-4">
            {counselor.specialty.map((spec) => (
              <span key={spec} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-yellow-500">⭐ {counselor.rating}</p>
              <p className="text-sm text-gray-500">평점</p>
            </div>
            <div>
              <p className="text-3xl font-bold">{formatNumber(counselor.reviewCount)}</p>
              <p className="text-sm text-gray-500">리뷰</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-600">{formatNumber(counselor.consultCount)}</p>
              <p className="text-sm text-gray-500">상담 건수</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">소개</h2>
          <p className="text-gray-700 leading-relaxed">{counselor.introduction}</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setTab('videos')}
              className={`flex-1 py-4 font-medium ${
                tab === 'videos'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              영상 ({counselor.videos.length})
            </button>
            <button
              onClick={() => setTab('reviews')}
              className={`flex-1 py-4 font-medium ${
                tab === 'reviews'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              리뷰 ({counselor.reviews.length})
            </button>
          </div>

          <div className="p-4">
            {tab === 'videos' && (
              <div className="space-y-4">
                {counselor.videos.map((video) => (
                  <Link key={video.id} href={`/videos/${video.id}`}>
                    <div className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg">
                      <div className="w-40 h-24 bg-gray-200 rounded flex items-center justify-center text-3xl flex-shrink-0">
                        🎬
                      </div>
                      <div>
                        <h3 className="font-medium hover:text-purple-600">{video.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          조회수 {formatNumber(video.views)} · 좋아요 {formatNumber(video.likes)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {tab === 'reviews' && (
              <div className="space-y-4">
                {counselor.reviews.map((review) => (
                  <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.author}</span>
                        <span className="text-yellow-500">
                          {'⭐'.repeat(review.rating)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="sticky bottom-4">
          <div className="bg-white rounded-lg shadow-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">지금 바로 상담받기</p>
              <p className="font-bold">빈 시간이 있습니다</p>
            </div>
            <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700">
              상담 예약하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
