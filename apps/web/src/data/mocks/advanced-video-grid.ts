import { VideoProps } from '@/components/ui/compact-video-card';

export const FILTERS = {
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

export const GENERATE_MOCK_VIDEOS = (count: number): VideoProps[] => {
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
