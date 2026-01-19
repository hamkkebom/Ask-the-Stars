'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Check, Clock, Sparkles, Globe, Grid, Video, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { CompactVideoCard, VideoProps } from '@/components/ui/compact-video-card';

// --- Mock Data ---
const FILTERS = {
  categories: [
    { label: "전체", count: 0 },
    { label: "상담사 소개영상", count: 85 },
    { label: "고민영상", count: 63 },
    { label: "콕콕상담", count: 39 },
    { label: "상담사 기도영상", count: 38 },
    { label: "신년운세", count: 32 },
    { label: "별님의 소개영상", count: 18 },
    { label: "선물상담", count: 11 },
    { label: "타로코너 영상", count: 9 },
    { label: "퍼스널브랜딩", count: 9 },
    { label: "별님의 모집영상", count: 8 },
    { label: "별님의 과제제출", count: 7 },
    { label: "별님의 추억영상", count: 7 },
    { label: "기부상담", count: 5 },
    { label: "기타(모르겠어요)", count: 5 },
    { label: "별님의 꿈꿈영상", count: 5 },
    { label: "효심말벗", count: 4 },
    { label: "사주코너 영상", count: 1 },
  ],
  counselors: [
    { label: "전체보기", count: 300 }, // Added View All
    { label: "대상없음", count: 90 },
    { label: "다연", count: 14 },
    { label: "끌로에", count: 13 },
    { label: "카르멘", count: 13 },
    { label: "대상아님", count: 10 },
    { label: "콕콕상담", count: 10 },
    { label: "지니", count: 9 },
    { label: "데이먼", count: 8 },
    { label: "제석궁", count: 8 },
    { label: "프라하", count: 8 },
    { label: "타라", count: 7 },
    { label: "행운", count: 7 },
    { label: "리디아", count: 6 },
    { label: "천명", count: 6 },
    { label: "새해운세", count: 5 },
    { label: "천량신궁", count: 5 },
    { label: "골든벨", count: 4 },
    { label: "샤넬", count: 3 },
    { label: "세렌느", count: 3 },
    { label: "신비당", count: 3 },
    { label: "연정", count: 3 },
    { label: "연화보살", count: 3 },
    { label: "윤별", count: 3 },
    { label: "하빛", count: 3 },
    { label: "나미", count: 2 },
    { label: "루시", count: 2 },
    { label: "루시아", count: 2 },
    { label: "멜린다", count: 2 },
    { label: "백기당", count: 2 },
    { label: "오꽃님", count: 2 },
    { label: "운경", count: 2 },
    { label: "청월", count: 2 },
    { label: "달님", count: 1 },
    { label: "도화", count: 1 },
    { label: "성무", count: 1 },
    { label: "소피아", count: 1 },
    { label: "여니", count: 1 },
    { label: "케니", count: 1 },
    { label: "호산당", count: 1 },
  ],
  creators: [
    { label: "전체보기", count: 542 }, // Added View All
    { label: "박건우", count: 32 },
    { label: "산다라(김지민)", count: 28 },
    { label: "샛별(김지은)", count: 22 },
    { label: "이파(박주연)", count: 20 },
    { label: "아이(이혜원)", count: 19 },
    { label: "여울(김남원)", count: 18 },
    { label: "온세나래 (이경수)", count: 18 },
    { label: "해솔(방지훈)", count: 18 },
    { label: "꿈돌 (정태민)", count: 14 },
    { label: "밤온(김예솔)", count: 14 },
    { label: "김소영", count: 10 },
    { label: "늘다온(김보라)", count: 10 },
    { label: "최종일", count: 10 },
    { label: "문상원", count: 9 },
    { label: "새론(김윤석)", count: 9 },
    { label: "새벽별 (김신성)", count: 9 },
    { label: "누리봄(백한수)", count: 8 },
    { label: "드림온(이두혁)", count: 8 },
    { label: "미르길 (이용현)", count: 8 },
    { label: "채윤(하윤나)", count: 8 },
    { label: "김현우", count: 5 },
    { label: "다솜마루(김지은)", count: 5 },
    { label: "달달(박준용)", count: 5 },
    { label: "루다(양현진)", count: 5 },
    { label: "심현석", count: 5 },
    { label: "이다혜", count: 5 },
    { label: "초승달(이승태)", count: 4 },
    { label: "빛담은(김애경)", count: 3 },
    { label: "이음(박종찬)", count: 3 },
    { label: "잇는길(김용수)", count: 3 },
    { label: "사공(곽용희)", count: 2 },
    { label: "이룸(윤종석)", count: 2 },
    { label: "최석진", count: 2 },
    { label: "가온(강희선)", count: 1 },
    { label: "마루(엄용철)", count: 1 },
    { label: "별빛나래(이인선)", count: 1 },
    { label: "새로이(차은규)", count: 1 },
    { label: "이름 미제출", count: 1 },
  ],
  sort: [
    { label: "최신순", value: "latest" },
    { label: "오래된순", value: "oldest" },
    { label: "조회수순", value: "views" },
    { label: "좋아요순", value: "likes" },
  ],
  time: [
    { label: "전체", value: "all" },
    { label: "1일 전", value: "1d" },
    { label: "1주일 전", value: "1w" },
    { label: "1개월 전", value: "1m" },
    { label: "직접 설정", value: "custom" },
  ]
};

// --- Helper for Mock Videos ---
const GENERATE_MOCK_VIDEOS = (count: number): VideoProps[] => {
  const counselorNames = ["다연", "끌로에", "지니", "타라", "제석궁", "천명"];
  const creatorNames = ["심현석", "이다혜", "최석진", "김애경", "박종찬"];
  const categories = ["신년운세", "타로", "궁합", "연애운", "재물운"];

  return Array.from({ length: count }).map((_, i) => {
    const counselorName = counselorNames[Math.floor(Math.random() * counselorNames.length)];
    const creatorName = creatorNames[Math.floor(Math.random() * creatorNames.length)];
    return {
        id: `v-${Math.random().toString(36).substr(2, 9)}`,
        title: i % 2 === 0 ? `2025년 호랑이띠 필독! 대박나는 월별 운세 총정리` : `${counselorName}의 타로상담: 그 사람은 나를 어떻게 생각할까?`,
        thumbnailUrl: `https://picsum.photos/seed/${i + Math.random()}/640/360`,
        currentYear: "2025년",
        counselor: {
            name: counselorName,
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${counselorName}` // Mock avatar
        },
        creator: {
            name: creatorName,
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${creatorName}` // Mock avatar
        },
        category: categories[Math.floor(Math.random() * categories.length)],
        tags: ["운세", "2025", "대박"],
        views: Math.floor(Math.random() * 5000),
        createdAt: `25/0${Math.floor(Math.random() * 9) + 1}/${Math.floor(Math.random() * 28) + 1}`,
        description: "샘플 데이터입니다.",
        duration: "10:05",
        matchScore: 98
    };
  });
};

type CounselorType = 'ALL' | 'TAROT' | 'MECHANICS' | 'SHAMANISM';

const INITIAL_BATCH = GENERATE_MOCK_VIDEOS(30);

export function AdvancedVideoGrid() {
  const [activeTray, setActiveTray] = useState<string | null>(null);

  // Active Filters State
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedCounselor, setSelectedCounselor] = useState("전체보기"); // Default to View All
  const [selectedCreator, setSelectedCreator] = useState("전체보기"); // Default to View All
  const [selectedSort, setSelectedSort] = useState("최신순");
  const [selectedTime, setSelectedTime] = useState("전체");

  // Counselor Sub-filter State
  const [counselorType, setCounselorType] = useState<CounselorType>('ALL');

  // Custom Date Range State
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [videos, setVideos] = useState<VideoProps[]>(INITIAL_BATCH);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Search Search for Trays
  const [traySearch, setTraySearch] = useState("");

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
        setVideos(prev => [...prev, ...GENERATE_MOCK_VIDEOS(30)]);
        setIsLoading(false);
    }, 1000);
  };

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
      <div className="sticky top-[0px] z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-3 transition-all">
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
                                            type="text"
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
                        className="relative"
                        style={{ zIndex: hoveredId === video.id ? 50 : 1 }}
                    >
                        <CompactVideoCard
                            {...video}
                            onHoverChange={(isHovered) => setHoveredId(isHovered ? video.id : null)}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>

        {/* Load More Trigger */}
        <div className="w-full flex justify-center py-20">
            <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="group relative px-8 py-3 bg-neutral-900 border border-white/10 rounded-full text-sm font-medium text-gray-400 hover:text-white hover:border-white/30 transition-all overflow-hidden"
            >
                <span className="relative z-10 flex items-center gap-2">
                    {isLoading ? "Loading..." : "Load More Videos"}
                    {!isLoading && <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
        </div>

      </div>
    </div>
  );
}

// --- Sub-components for Cleaner Code ---

const FilterButton = ({ label, activeValue, isActive, onClick, icon, colorClass = "text-white" }: any) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-sm whitespace-nowrap",
            isActive || activeValue
                ? "bg-white/10 border-white/30 text-white"
                : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-gray-200"
        )}
    >
        <span className={cn("opacity-70", isActive ? colorClass : "")}>{icon}</span>
        <span className="font-medium">{label}</span>
        {activeValue && (
            <>
                <div className="w-px h-3 bg-white/20 mx-1" />
                <span className={cn("font-bold", colorClass)}>{activeValue}</span>
            </>
        )}
        <ChevronDown className={cn("w-3 h-3 opacity-50 transition-transform", isActive ? "rotate-180" : "")} />
    </button>
);

const FilterPill = ({ label, count, isSelected, onClick }: any) => (
    <button
        onClick={onClick}
        className={cn(
            "flex items-center justify-between px-4 py-3 rounded-lg border text-left transition-all group",
            isSelected
                ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                : "bg-neutral-800/50 border-transparent text-gray-400 hover:bg-neutral-800 hover:text-white hover:border-white/20"
        )}
    >
        <span className="text-sm font-medium truncate pr-2">{label}</span>
        {count !== undefined && (
            <span className={cn(
                "text-xs font-mono px-1.5 py-0.5 rounded",
                isSelected ? "bg-black/10 text-black/70" : "bg-black/30 text-gray-500 group-hover:text-gray-300"
            )}>
                {count}
            </span>
        )}
    </button>
);
