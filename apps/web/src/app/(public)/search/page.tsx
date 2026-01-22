'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface SearchResult {
  type: 'video' | 'counselor';
  id: string;
  title: string;
  description: string;
  metadata: Record<string, string | number>;
}

const mockResults: SearchResult[] = [
  {
    type: 'video',
    id: 'v1',
    title: '2026 신년운세 - 하반기 대박 운세',
    description: '2026년 후반기에 대박 운세가 찾아옵니다.',
    metadata: { views: 15420, counselor: '김태희' },
  },
  {
    type: 'video',
    id: 'v2',
    title: '타로로 보는 2026 연애운',
    description: '타로로 사랑의 길을 안내해드립니다.',
    metadata: { views: 8930, counselor: '이수진' },
  },
  {
    type: 'counselor',
    id: 'c1',
    title: '김태희 상담사',
    description: '20년 경력의 사주 전문가입니다.',
    metadata: { rating: 4.9, reviews: 1250 },
  },
  {
    type: 'counselor',
    id: 'c2',
    title: '이수진 상담사',
    description: '타로로 사랑의 길을 안내해드립니다.',
    metadata: { rating: 4.7, reviews: 890 },
  },
];

function formatNumber(num: number): string {
  if (num >= 10000) return `${(num / 10000).toFixed(1)}만`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}천`;
  return num.toString();
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [filter, setFilter] = useState<'all' | 'video' | 'counselor'>('all');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    const filtered = mockResults.filter((r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filtered);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [initialQuery, handleSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const filteredResults = results.filter((r) => {
    if (filter === 'all') return true;
    return r.type === filter;
  });

  const videoCount = results.filter((r) => r.type === 'video').length;
  const counselorCount = results.filter((r) => r.type === 'counselor').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white text-center mb-6">통합 검색</h1>

          <form onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="영상, 상담사를 검색하세요..."
                className="w-full px-6 py-4 pr-14 rounded-full text-lg shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
              >
                🔍
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Filter Tabs */}
        {results.length > 0 && (
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setFilter('all')}
                className={`flex-1 py-3 font-medium ${
                  filter === 'all'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                전체 ({results.length})
              </button>
              <button
                onClick={() => setFilter('video')}
                className={`flex-1 py-3 font-medium ${
                  filter === 'video'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                영상 ({videoCount})
              </button>
              <button
                onClick={() => setFilter('counselor')}
                className={`flex-1 py-3 font-medium ${
                  filter === 'counselor'
                    ? 'text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                상담사 ({counselorCount})
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            <p className="mt-2 text-gray-500">검색 중...</p>
          </div>
        )}

        {/* Results */}
        {!isLoading && filteredResults.length > 0 && (
          <div className="space-y-4">
            {filteredResults.map((result) => (
              <Link
                key={`${result.type}-${result.id}`}
                href={result.type === 'video' ? `/videos/${result.id}` : `/counselors/${result.id}`}
              >
                <div className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
                      {result.type === 'video' ? '🎬' : '🔮'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          result.type === 'video'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {result.type === 'video' ? '영상' : '상담사'}
                        </span>
                        <h3 className="font-medium text-lg">{result.title}</h3>
                      </div>
                      <p className="text-gray-600">{result.description}</p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500">
                        {result.type === 'video' && (
                          <>
                            <span>조회수 {formatNumber(result.metadata.views as number)}</span>
                            <span>상담사: {result.metadata.counselor}</span>
                          </>
                        )}
                        {result.type === 'counselor' && (
                          <>
                            <span>⭐ {result.metadata.rating}</span>
                            <span>리뷰 {formatNumber(result.metadata.reviews as number)}개</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && query && filteredResults.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🤔</div>
            <p className="text-gray-900 text-xl font-bold mb-2">
              &quot;{query}&quot;에 대한 검색 결과가 없습니다.
            </p>
            <p className="text-gray-500 mb-8">
              단어의 철자가 정확한지 확인하거나, 다른 검색어로 시도해보세요.
            </p>

            <div className="max-w-md mx-auto">
              <p className="text-sm text-gray-400 mb-3 uppercase tracking-wider font-semibold">추천 검색어</p>
              <div className="flex flex-wrap justify-center gap-2">
                {['신년운세', '타로', '재물운', '연애운', '김태희', '이수진'].map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => {
                      setQuery(keyword);
                      handleSearch(keyword);
                    }}
                    className="px-4 py-2 bg-gray-50 text-gray-600 rounded-full hover:bg-purple-50 hover:text-purple-600 transition-colors text-sm font-medium"
                  >
                    #{keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Initial State */}
        {!isLoading && !query && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">🔮</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              무엇을 찾고 계신가요?
            </h2>
            <p className="text-gray-500 mb-8">
              원하는 상담 주제나 상담사 이름을 검색해보세요.
            </p>

            <div className="max-w-md mx-auto">
              <p className="text-sm text-gray-400 mb-3 uppercase tracking-wider font-semibold">인기 검색어</p>
              <div className="flex flex-wrap justify-center gap-2">
                 {['신년운세', '타로', '재물운', '연애운', '궁합', '직장운'].map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => {
                      setQuery(keyword);
                      handleSearch(keyword);
                    }}
                    className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full hover:bg-purple-100 transition-colors text-sm font-medium"
                  >
                    #{keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
