'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, Sparkles, Globe, Grid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FilterPill } from './advanced-video-grid-components';
import { FILTERS } from '@/data/mocks/advanced-video-grid';
import type { UseVideoGridFiltersReturn } from '@/hooks/useVideoGridFilters';

interface VideoGridFilterTrayProps {
  filters: UseVideoGridFiltersReturn;
}

export function VideoGridFilterTray({ filters }: VideoGridFilterTrayProps) {
  const {
    activeTray,
    selectedCategory,
    selectedCounselor,
    selectedCreator,
    selectedTime,
    counselorType,
    traySearch,
    startDate,
    endDate,
    setCounselorType,
    setTraySearch,
    setStartDate,
    setEndDate,
    closeTray,
    handleCategorySelect,
    handleCounselorSelect,
    handleCreatorSelect,
    handleTimeSelect,
    filterItems,
  } = filters;

  return (
    <AnimatePresence>
      {activeTray && activeTray !== 'sort' && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeTray}
            className="fixed inset-0 top-[180px] bg-black/60 backdrop-blur-sm z-30"
          />

          {/* Tray Content */}
          <motion.div
            layoutId="filter-tray"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky top-[60px] z-30 w-full bg-neutral-900/95 border-b border-white/10 shadow-2xl backdrop-blur-xl"
          >
            <div className="max-w-[1920px] mx-auto px-6 py-6">
              {/* Tray Header */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 whitespace-nowrap">
                  {activeTray === 'categories' && (
                    <>
                      <Grid className="w-5 h-5 text-gray-400" /> 카테고리 선택
                    </>
                  )}
                  {activeTray === 'counselors' && (
                    <>
                      <Sparkles className="w-5 h-5 text-vibrant-magenta" />{' '}
                      상담사 검색
                    </>
                  )}
                  {activeTray === 'creators' && (
                    <>
                      <Globe className="w-5 h-5 text-vibrant-cyan" /> 제작자
                      검색
                    </>
                  )}
                  {activeTray === 'time' && (
                    <>
                      <Clock className="w-5 h-5 text-gray-400" /> 시간여행 설정
                    </>
                  )}
                </h3>

                {/* 2. Counselor Sub-filters (Centered) */}
                {activeTray === 'counselors' && (
                  <div className="flex items-center gap-2 bg-black/40 p-1 rounded-full border border-white/10 mx-auto">
                    {(['ALL', 'TAROT', 'MECHANICS', 'SHAMANISM'] as const).map(
                      (type) => (
                        <button
                          key={type}
                          onClick={() => setCounselorType(type)}
                          className={cn(
                            'px-4 py-1.5 rounded-full text-xs font-medium transition-colors',
                            counselorType === type
                              ? 'bg-vibrant-magenta text-black shadow-lg shadow-vibrant-magenta/20'
                              : 'text-gray-400 hover:text-white'
                          )}
                        >
                          {type === 'ALL' && '전체'}
                          {type === 'TAROT' && '타로'}
                          {type === 'MECHANICS' && '역학'}
                          {type === 'SHAMANISM' && '신점'}
                        </button>
                      )
                    )}
                  </div>
                )}

                {/* Search Bar */}
                {(activeTray === 'counselors' || activeTray === 'creators') && (
                  <div className="relative w-full md:w-64 ml-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                      type="search"
                      inputMode="search"
                      enterKeyHint="search"
                      autoComplete="off"
                      placeholder="이름 검색..."
                      value={traySearch}
                      onChange={(e) => setTraySearch(e.target.value)}
                      className="w-full bg-black/50 border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-white focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>
                )}
              </div>

              {/* Grid of Options */}
              <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {/* Categories */}
                  {activeTray === 'categories' &&
                    FILTERS.categories.map((item) => (
                      <FilterPill
                        key={item.label}
                        label={item.label}
                        count={item.count}
                        isSelected={selectedCategory === item.label}
                        onClick={() => handleCategorySelect(item.label)}
                      />
                    ))}

                  {/* Counselors */}
                  {activeTray === 'counselors' &&
                    filterItems(FILTERS.counselors).map((item) => (
                      <FilterPill
                        key={item.label}
                        label={item.label}
                        count={item.count}
                        isSelected={selectedCounselor === item.label}
                        onClick={() => handleCounselorSelect(item.label)}
                      />
                    ))}

                  {/* Creators */}
                  {activeTray === 'creators' &&
                    filterItems(FILTERS.creators).map((item) => (
                      <FilterPill
                        key={item.label}
                        label={item.label}
                        count={item.count}
                        isSelected={selectedCreator === item.label}
                        onClick={() => handleCreatorSelect(item.label)}
                      />
                    ))}

                  {/* Time Travel */}
                  {activeTray === 'time' && (
                    <div className="col-span-full flex flex-col gap-6">
                      <div className="flex flex-wrap gap-3">
                        {FILTERS.time.map((item) => (
                          <FilterPill
                            key={item.label}
                            label={item.label}
                            isSelected={selectedTime === item.label}
                            onClick={() =>
                              handleTimeSelect(item.label, item.value)
                            }
                          />
                        ))}
                      </div>

                      {/* Custom Date Range Picker */}
                      {selectedTime === '직접 설정' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="flex items-center gap-4 pt-4 border-t border-white/10"
                        >
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-400 ml-1">
                              시작 날짜
                            </label>
                            <input
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-white/30"
                            />
                          </div>
                          <span className="text-gray-500 mt-5">~</span>
                          <div className="flex flex-col gap-1">
                            <label className="text-xs text-gray-400 ml-1">
                              종료 날짜
                            </label>
                            <input
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-white/30"
                            />
                          </div>
                          <button
                            onClick={() => closeTray()}
                            className="mt-5 px-6 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-neutral-200 transition-colors"
                          >
                            적용하기
                          </button>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
