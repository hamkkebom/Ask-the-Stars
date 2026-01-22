export interface ResourceCategory {
  id: string;
  name: string;
  count: number;
}

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: 'PDF' | 'ZIP' | 'LINK' | 'DOCX';
  fileSize?: string;
  author: string;
  downloads: number;
  date: string;
  isNew?: boolean;
}

export const mockResourceCategories: ResourceCategory[] = [
  { id: 'all', name: '전체', count: 12 },
  { id: 'guide', name: '작업 가이드', count: 4 },
  { id: 'asset', name: '디자인 에셋', count: 5 },
  { id: 'contract', name: '계약 양식', count: 3 },
];

export const mockResources: ResourceItem[] = [
  {
    id: '1',
    title: '2025년 영상 제작 표준 가이드라인_v1.0',
    description: 'Hamkkebom 플랫폼의 영상 제작 표준 규격 및 납품 가이드라인입니다. 모든 작업 전 필독해주세요.',
    category: 'guide',
    fileType: 'PDF',
    fileSize: '2.5 MB',
    author: '운영팀',
    downloads: 1250,
    date: '2025.01.02',
    isNew: true
  },
  {
    id: '2',
    title: '공식 로고 및 워터마크 팩',
    description: '영상에 삽입해야 할 공식 로고와 워터마크 AI, PNG 파일 모음입니다.',
    category: 'asset',
    fileType: 'ZIP',
    fileSize: '15.4 MB',
    author: '디자인팀',
    downloads: 890,
    date: '2024.12.15'
  },
  {
    id: '3',
    title: '표준 용역 계약서 양식',
    description: '프리랜서 용역 계약 체결 시 사용하는 표준 계약서 양식입니다.',
    category: 'contract',
    fileType: 'DOCX',
    fileSize: '450 KB',
    author: '법무팀',
    downloads: 340,
    date: '2024.11.20'
  },
  {
    id: '4',
    title: '무료 상업용 폰트 모음 (저작권 확인 완료)',
    description: '영상 자막에 자유롭게 사용할 수 있는 산돌, 나눔 등 무료 폰트 리스트입니다.',
    category: 'asset',
    fileType: 'LINK',
    author: '운영팀',
    downloads: 2100,
    date: '2025.01.10',
    isNew: true
  },
  {
    id: '5',
    title: '유튜브 썸네일 템플릿 (PSD)',
    description: '클릭률을 높이는 검증된 썸네일 레이아웃 템플릿 5종입니다.',
    category: 'asset',
    fileType: 'ZIP',
    fileSize: '58 MB',
    author: '디자인팀',
    downloads: 560,
    date: '2025.01.05'
  }
];
