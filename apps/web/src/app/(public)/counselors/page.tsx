'use client';

import { useState } from 'react';
import Link from 'next/link';
import { EmptyState } from '@/components/common/EmptyState';
import { Search } from 'lucide-react';

interface Counselor {
  id: string;
  name: string;
  grade: '신규' | '단골' | '번개' | '찐';
  specialty: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  videoCount: number;
  profileImage?: string;
}

const mockCounselors: Counselor[] = [
  {
    id: 'c1',
    name: '김태희',
    grade: '찐',
    specialty: ['사주', '신년운세'],
    bio: '20년 경력의 사주 전문가입니다.',
    rating: 4.9,
    reviewCount: 1250,
    videoCount: 45,
  },
  {
    id: 'c2',
    name: '이수진',
    grade: '번개',
    specialty: ['타로', '연애운'],
    bio: '타로로 사랑의 길을 안내해드립니다.',
    rating: 4.7,
    reviewCount: 890,
    videoCount: 32,
  },
  {
    id: 'c3',
    name: '박명수',
    grade: '단골',
    specialty: ['신점', '인간관계'],
    bio: '영적 메시지로 고민을 해결해드립니다.',
    rating: 4.6,
    reviewCount: 567,
    videoCount: 28,
  },
  {
    id: 'c4',
    name: '최수아',
    grade: '신규',
    specialty: ['사주', '타로'],
    bio: '젊은 감각으로 다가가는 운세 상담',
    rating: 4.5,
    reviewCount: 123,
    videoCount: 8,
  },
];

const gradeConfig = {
  '신규': { icon: '💚', color: 'bg-green-100 text-green-700' },
  '단골': { icon: '💛', color: 'bg-yellow-100 text-yellow-700' },
  '번개': { icon: '⚡', color: 'bg-orange-100 text-orange-700' },
  '찐': { icon: '👑', color: 'bg-purple-100 text-purple-700' },
};

export default function CounselorsPage() {
  const [counselors] = useState<Counselor[]>(mockCounselors);
  const [filter, setFilter] = useState({ grade: 'all', specialty: 'all', sort: 'rating' });

  const allSpecialties = Array.from(new Set(counselors.flatMap(c => c.specialty)));

  const filteredCounselors = counselors.filter((c) => {
    if (filter.grade !== 'all' && c.grade !== filter.grade) return false;
    if (filter.specialty !== 'all' && !c.specialty.includes(filter.specialty)) return false;
    return true;
  });

  const sortedCounselors = [...filteredCounselors].sort((a, b) => {
    if (filter.sort === 'rating') return b.rating - a.rating;
    if (filter.sort === 'reviews') return b.reviewCount - a.reviewCount;
    if (filter.sort === 'videos') return b.videoCount - a.videoCount;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-white">
          <h1 className="text-3xl font-bold">상담사 목록</h1>
          <p className="mt-2 text-purple-200">
            사주천궁의 실력있는 상담사들을 만나보세요
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <select
              value={filter.grade}
              onChange={(e) => setFilter({ ...filter, grade: e.target.value })}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">전체 등급</option>
              <option value="찐">👑 찐</option>
              <option value="번개">⚡ 번개</option>
              <option value="단골">💛 단골</option>
              <option value="신규">💚 신규</option>
            </select>

            <select
              value={filter.specialty}
              onChange={(e) => setFilter({ ...filter, specialty: e.target.value })}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">전체 분야</option>
              {allSpecialties.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>

            <select
              value={filter.sort}
              onChange={(e) => setFilter({ ...filter, sort: e.target.value })}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="rating">평점 높은 순</option>
              <option value="reviews">리뷰 많은 순</option>
              <option value="videos">영상 많은 순</option>
            </select>
          </div>
        </div>

        {/* Counselor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCounselors.map((counselor) => (
            <Link key={counselor.id} href={`/counselors/${counselor.id}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 text-center text-white">
                  <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center text-4xl mb-3">
                    🔮
                  </div>
                  <h3 className="text-xl font-bold">{counselor.name}</h3>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${gradeConfig[counselor.grade].color}`}>
                    {gradeConfig[counselor.grade].icon} {counselor.grade}
                  </span>
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex justify-center gap-2 mb-4">
                    {counselor.specialty.map((spec) => (
                      <span key={spec} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-sm">
                        {spec}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-gray-600 text-center mb-4">{counselor.bio}</p>

                  <div className="grid grid-cols-3 gap-2 text-center border-t pt-4">
                    <div>
                      <p className="text-lg font-bold text-yellow-500">⭐ {counselor.rating}</p>
                      <p className="text-xs text-gray-500">평점</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{counselor.reviewCount}</p>
                      <p className="text-xs text-gray-500">리뷰</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold">{counselor.videoCount}</p>
                      <p className="text-xs text-gray-500">영상</p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="p-4 border-t">
                  <button className="w-full py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700">
                    프로필 보기
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {sortedCounselors.length === 0 && (
          <EmptyState
            title="조건에 맞는 상담사가 없습니다"
            description="필터를 변경하거나 다른 검색 조건을 시도해보세요."
            icon={Search}
            action={{
              label: "필터 초기화",
              onClick: () => setFilter({ grade: 'all', specialty: 'all', sort: 'rating' })
            }}
          />
        )}
      </div>
    </div>
  );
}
