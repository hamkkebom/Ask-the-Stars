export interface UserProfile {
  id: string;
  name: string;
  email: string;
  title: string;
  avatarUrl: string;
  bio: string;
  location: string;
  website?: string;
  github?: string;
  skills: string[];
  experience: {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
  }[];
  education: {
    id: string;
    degree: string;
    school: string;
    period: string;
  }[];
}

export const mockUserProfile: UserProfile = {
  id: 'u1',
  name: '김스타',
  email: 'star@example.com',
  title: '시니어 영상 편집자 & 모션 그래픽 디자이너',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
  bio: '5년차 영상 편집자 김스타입니다. 유튜브 예능 편집부터 기업 홍보 영상까지 다양한 장르를 소화합니다. 클라이언트의 의도를 정확히 파악하여 최상의 결과물을 만들어냅니다.',
  location: '서울 강남구',
  website: 'https://star-portfolio.com',
  github: 'https://github.com/star-editor',
  skills: ['Premiere Pro', 'After Effects', 'Photoshop', 'Final Cut Pro', 'DaVinci Resolve', 'Sound Design'],
  experience: [
    {
      id: 'e1',
      role: '영상 편집 팀장',
      company: '유튜브 크리에이티브 스튜디오',
      period: '2022.03 - 현재',
      description: '구독자 50만 채널의 메인 편집 담당. 팀원 3명 관리 및 콘텐츠 기획 참여.'
    },
    {
      id: 'e2',
      role: '프리랜서 PD',
      company: 'Self-employed',
      period: '2020.01 - 2022.02',
      description: '다수 기업 홍보 영상 및 웨딩 영상 제작. 클라이언트 커뮤니케이션 및 촬영/편집 전담.'
    }
  ],
  education: [
    {
      id: 'edu1',
      degree: '영상디자인학과 학사',
      school: '한국예술대학교',
      period: '2016.03 - 2020.02'
    }
  ]
};
