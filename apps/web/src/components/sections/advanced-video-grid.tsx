'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Clock, Sparkles, Globe, Grid, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CompactVideoCard, VideoProps } from '@/components/ui/compact-video-card';
import { FILTERS } from '@/data/mocks/advanced-video-grid';
import { FilterButton, FilterPill } from './advanced-video-grid-components';
import { useQuery } from '@tanstack/react-query';
import { videosApi } from '@/lib/api/videos';


const R2_BASE_URL = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || "https://pub-722ebb0880314050a41c19d4580214a1.r2.dev";

type CounselorType = 'ALL' | 'TAROT' | 'MECHANICS' | 'SHAMANISM';

export function AdvancedVideoGrid() {
  const [activeTray, setActiveTray] = useState<string | null>(null);

  // Active Filters State
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedCounselor, setSelectedCounselor] = useState("전체보기");
  const [selectedCreator, setSelectedCreator] = useState("전체보기");
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [selectedTime, setSelectedTime] = useState("전체");

  const [counselorType, setCounselorType] = useState<CounselorType>('ALL');
  // Custom Date Range State
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [traySearch, setTraySearch] = useState("");

  const { data: rawVideos, isLoading } = useQuery({
    queryKey: ['final-videos'],
    queryFn: videosApi.listAllFinalVideos,
  });

  const videos: VideoProps[] = (rawVideos || []).map((v: any) => ({
    id: v.id,
    title: v.project?.title || v.versionLabel,
    thumbnailUrl: v.technicalSpec?.thumbnailUrl || "/placeholder.jpg",
    videoUrl: v.technicalSpec?.r2Key ? `${R2_BASE_URL}/${v.technicalSpec.r2Key}` : undefined,
    description: v.feedback,
    category: v.project?.category?.name || "기타",
    tags: [v.project?.counselor?.name || "일반"],
    counselor: { name: v.project?.counselor?.name || "상담사" },
    creator: { name: v.maker?.name || v.project?.owner?.name || "함께봄" },
    createdAt: new Date(v.createdAt).toLocaleDateString('ko-KR', { year: '2-digit', month: '2-digit', day: '2-digit' }).replace(/\. /g, '/').replace('.', ''),
  }));

  const toggleTray = (trayName: string) => {
    if (activeTray === trayName) {
      setActiveTray(null);
    } else {
      setActiveTray(trayName);
      setTraySearch(""); // Reset search when opening new tray
    }
  };

  // Helper to filter items in tray based on search
  const filterItems = (items: { label: string, count?: number }[]) => {
    if (!traySearch) return items;
    return items.filter(item => item.label.toLowerCase().includes(traySearch.toLowerCase()));
  };

  // Close tray when clicking outside (simple overlay)
  const closeTray = () => setActiveTray(null);

  // Reset Logic for "All" / "View All"
  const handleCategorySelect = (label: string) => {
      setSelectedCategory(label);
      closeTray();
  };

  const handleCounselorSelect = (label: string) => {
      setSelectedCounselor(label);
      closeTray();
  };

  const handleCreatorSelect = (label: string) => {
      setSelectedCreator(label);
      closeTray();
  };

  const handleTimeSelect = (label: string, value: string) => {
      setSelectedTime(label);
      if (value !== 'custom') {
          closeTray();
      }
  };

  return (
    <div className="w-full bg-black min-h-screen relative">

      {/* --- Sticky Filter Bar --- */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-3 transition-all">
        <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Filter Groups (Trays) */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar w-full md:w-auto">

                {/* 1. Category */}
                <FilterButton
                    label="카테고리"
                    activeValue={selectedCategory !== "전체" ? selectedCategory : undefined}
                    isActive={activeTray === 'categories'}
                    onClick={() => toggleTray('categories')}
                    icon={<Grid className="w-4 h-4" />}
                />

                {/* 2. Counselor */}
                <FilterButton
                    label="상담사"
                    activeValue={selectedCounselor !== "전체보기" && selectedCounselor !== "대상없음" ? selectedCounselor : undefined}
                    isActive={activeTray === 'counselors'}
                    onClick={() => toggleTray('counselors')}
                    icon={<Sparkles className="w-4 h-4" />}
                    colorClass="text-vibrant-magenta"
                />

                {/* 3. Creator */}
                <FilterButton
                    label="제작자"
                    activeValue={selectedCreator !== "전체보기" ? selectedCreator : undefined}
                    isActive={activeTray === 'creators'}
                    onClick={() => toggleTray('creators')}
                    icon={<Globe className="w-4 h-4" />}
                    colorClass="text-vibrant-cyan"
                />

                 {/* 4. Time Travel */}
                 <FilterButton
                    label="시간여행"
                    activeValue={selectedTime !== "전체" ? selectedTime : undefined}
                    isActive={activeTray === 'time'}
                    onClick={() => toggleTray('time')}
                    icon={<Clock className="w-4 h-4" />}
                />

            </div>

             {/* Right Side: Sort & Count */}
            <div className="flex items-center gap-4 ml-auto min-w-max">
                <span className="text-sm text-gray-400 font-mono hidden sm:block">
                    Total <span className="text-white font-bold">{videos.length}</span> / 542
                </span>

                {/* Sort Dropdown (Simple for now, can be tray too if needed) */}
                <div className="relative group">
                    <button
                        onClick={() => toggleTray('sort')}
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                    >
                        <Filter className="w-4 h-4" />
                        <span>{selectedSort}</span>
                        <ChevronDown className={cn("w-3 h-3 transition-transform", activeTray === 'sort' ? "rotate-180" : "")} />
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
                                        onClick={() => { setSelectedSort(opt.label); setActiveTray(null); }}
                                        className={cn(
                                            "w-full text-left px-4 py-2 text-xs font-medium hover:bg-white/10 transition-colors",
                                            selectedSort === opt.label ? "text-vibrant-cyan bg-white/5" : "text-gray-400"
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

        {/* --- EXPANDABLE TRAYS (Overlay) --- */}
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
                                    {activeTray === 'categories' && <><Grid className="w-5 h-5 text-gray-400"/> 카테고리 선택</>}
                                    {activeTray === 'counselors' && <><Sparkles className="w-5 h-5 text-vibrant-magenta"/> 상담사 검색</>}
                                    {activeTray === 'creators' && <><Globe className="w-5 h-5 text-vibrant-cyan"/> 제작자 검색</>}
                                    {activeTray === 'time' && <><Clock className="w-5 h-5 text-gray-400"/> 시간여행 설정</>}
                                </h3>

                                {/* 2. Counselor Sub-filters (Centered) */}
                                {activeTray === 'counselors' && (
                                    <div className="flex items-center gap-2 bg-black/40 p-1 rounded-full border border-white/10 mx-auto">
                                        {(['ALL', 'TAROT', 'MECHANICS', 'SHAMANISM'] as const).map(type => (
                                            <button
                                                key={type}
                                                onClick={() => setCounselorType(type)}
                                                className={cn(
                                                    "px-4 py-1.5 rounded-full text-xs font-medium transition-colors",
                                                    counselorType === type
                                                        ? "bg-vibrant-magenta text-black shadow-lg shadow-vibrant-magenta/20"
                                                        : "text-gray-400 hover:text-white"
                                                )}
                                            >
                                                {type === 'ALL' && '전체'}
                                                {type === 'TAROT' && '타로'}
                                                {type === 'MECHANICS' && '역학'}
                                                {type === 'SHAMANISM' && '신점'}
                                            </button>
                                        ))}
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
                                    {activeTray === 'categories' && FILTERS.categories.map(item => (
                                         <FilterPill
                                            key={item.label} label={item.label} count={item.count}
                                            isSelected={selectedCategory === item.label}
                                            onClick={() => handleCategorySelect(item.label)}
                                        />
                                    ))}

                                    {/* Counselors */}
                                    {activeTray === 'counselors' && filterItems(FILTERS.counselors).map(item => (
                                        <FilterPill
                                            key={item.label} label={item.label} count={item.count}
                                            isSelected={selectedCounselor === item.label}
                                            onClick={() => handleCounselorSelect(item.label)}
                                        />
                                    ))}

                                    {/* Creators */}
                                    {activeTray === 'creators' && filterItems(FILTERS.creators).map(item => (
                                        <FilterPill
                                            key={item.label} label={item.label} count={item.count}
                                            isSelected={selectedCreator === item.label}
                                            onClick={() => handleCreatorSelect(item.label)}
                                        />
                                    ))}

                                    {/* Time Travel */}
                                     {activeTray === 'time' && (
                                        <div className="col-span-full flex flex-col gap-6">
                                            <div className="flex flex-wrap gap-3">
                                                {FILTERS.time.map(item => (
                                                    <FilterPill
                                                        key={item.label} label={item.label}
                                                        isSelected={selectedTime === item.label}
                                                        onClick={() => handleTimeSelect(item.label, item.value)}
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
                                                        <label className="text-xs text-gray-400 ml-1">시작 날짜</label>
                                                        <input
                                                            type="date"
                                                            value={startDate}
                                                            onChange={(e) => setStartDate(e.target.value)}
                                                            className="bg-neutral-800 border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-white/30"
                                                        />
                                                    </div>
                                                    <span className="text-gray-500 mt-5">~</span>
                                                    <div className="flex flex-col gap-1">
                                                        <label className="text-xs text-gray-400 ml-1">종료 날짜</label>
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

      {/* --- Main Content Grid --- */}
      <div className="px-6 py-8 md:px-12 max-w-[1920px] mx-auto min-h-[80vh]">
        <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-12"
        >
            <AnimatePresence mode='popLayout'>
                {videos.map((video, index) => (
                    <motion.div
                        key={video.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.02 }}
                        className="relative list-item-optimized"
                        style={{ zIndex: hoveredId === video.id ? 50 : 1 }}
                    >
                        <CompactVideoCard
                            {...video}
                            onHoverChange={(isHovered: boolean) => setHoveredId(isHovered ? video.id : null)}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        {/* Load More Trigger (Disabled - All videos loaded) */}
        <div className="w-full flex justify-center py-20">
            <button
                disabled={true}
                className="group relative px-8 py-3 bg-neutral-900 border border-white/10 rounded-full text-sm font-medium text-gray-500 cursor-not-allowed transition-all overflow-hidden"
            >
                <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? "Loading..." : "All Videos Loaded"}
                    {!isLoading && <ChevronDown className="w-4 h-4" />}
                </span>
            </button>
        </div>

      </div>
    </div>
  );
}
