'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  ChevronDown,
  Clock,
  Sparkles,
  Globe,
  Grid,
  Filter,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FilterButton } from './advanced-video-grid-components';
import { FILTERS } from '@/data/mocks/advanced-video-grid';
import type { UseVideoGridFiltersReturn } from '@/hooks/useVideoGridFilters';

interface VideoGridFilterBarProps {
  filters: UseVideoGridFiltersReturn;
  videoCount: number;
  totalCount?: number;
}

export function VideoGridFilterBar({
  filters,
  videoCount,
  totalCount = 542,
}: VideoGridFilterBarProps) {
  const {
    activeTray,
    searchQuery,
    selectedCategory,
    selectedCounselor,
    selectedCreator,
    selectedTime,
    selectedSort,
    setSearchQuery,
    toggleTray,
    handleSortSelect,
  } = filters;

  return (
    <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-3 transition-all">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-80 flex-shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="search"
            inputMode="search"
            enterKeyHint="search"
            autoComplete="off"
            placeholder="영상 검색 (제목, 카테고리, 상담사...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900/80 border border-white/10 rounded-full pl-11 pr-10 py-2.5 text-sm text-white focus:outline-none focus:border-vibrant-cyan/50 focus:ring-1 focus:ring-vibrant-cyan/20 transition-all placeholder:text-gray-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Groups (Trays) */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto">
          {/* 1. Category */}
          <FilterButton
            label="카테고리"
            activeValue={
              selectedCategory !== '전체' ? selectedCategory : undefined
            }
            isActive={activeTray === 'categories'}
            onClick={() => toggleTray('categories')}
            icon={<Grid className="w-4 h-4" />}
          />

          {/* 2. Counselor */}
          <FilterButton
            label="상담사"
            activeValue={
              selectedCounselor !== '전체보기' &&
              selectedCounselor !== '대상없음'
                ? selectedCounselor
                : undefined
            }
            isActive={activeTray === 'counselors'}
            onClick={() => toggleTray('counselors')}
            icon={<Sparkles className="w-4 h-4" />}
            colorClass="text-vibrant-magenta"
          />

          {/* 3. Creator */}
          <FilterButton
            label="제작자"
            activeValue={
              selectedCreator !== '전체보기' ? selectedCreator : undefined
            }
            isActive={activeTray === 'creators'}
            onClick={() => toggleTray('creators')}
            icon={<Globe className="w-4 h-4" />}
            colorClass="text-vibrant-cyan"
          />

          {/* 4. Time Travel */}
          <FilterButton
            label="시간여행"
            activeValue={selectedTime !== '전체' ? selectedTime : undefined}
            isActive={activeTray === 'time'}
            onClick={() => toggleTray('time')}
            icon={<Clock className="w-4 h-4" />}
          />
        </div>

        {/* Right Side: Sort & Count */}
        <div className="flex items-center gap-4 ml-auto min-w-max">
          <span className="text-sm text-gray-400 font-mono hidden sm:block">
            {searchQuery ? (
              <>
                검색 결과{' '}
                <span className="text-white font-bold">{videoCount}</span>건
              </>
            ) : (
              <>
                Total <span className="text-white font-bold">{videoCount}</span>{' '}
                / {totalCount}
              </>
            )}
          </span>

          {/* Sort Dropdown */}
          <div className="relative group">
            <button
              onClick={() => toggleTray('sort')}
              className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>{selectedSort}</span>
              <ChevronDown
                className={cn(
                  'w-3 h-3 transition-transform',
                  activeTray === 'sort' ? 'rotate-180' : ''
                )}
              />
            </button>
            {/* Inline Sort Dropdown */}
            <AnimatePresence>
              {activeTray === 'sort' && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-32 bg-neutral-900 border border-white/10 rounded-lg shadow-2xl py-1 z-50 overflow-hidden"
                >
                  {FILTERS.sort.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSortSelect(opt.label)}
                      className={cn(
                        'w-full text-left px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors',
                        selectedSort === opt.label
                          ? 'text-vibrant-cyan bg-white/5'
                          : 'text-gray-400'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
