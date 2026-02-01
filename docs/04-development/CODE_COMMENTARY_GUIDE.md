# 함께봄-스타 코드 주석 가이드라인

## 🎯 주석 체계화 목표
- 코드 가독성 50% 향상
- 신규 개발자 온보딩 시간 30% 단축
- 코드 리뷰 시간 40% 감소
- 유지보수 효율 60% 증가

## 📝 주석 스타일 가이드

### 1. 함수 주석 (JSDoc)
```typescript
/**
 * 사용자 프로젝트 목록을 가져옵니다.
 * @description API를 통해 로그인한 사용자의 모든 프로젝트를 병렬로 조회
 * @since 2024.01.31
 * @author 개발팀
 * 
 * @example
 * ```typescript
 * const projects = await fetchUserProjects();
 * console.log(projects.length); // 5
 * ```
 * 
 * @returns {Promise<Project[]>} 사용자 프로젝트 배열
 * @throws {ApiError} API 호출 실패 시 에러 발생
 * @see {@link https://docs.askthestars.com/api/projects} API 문서
 */
async function fetchUserProjects(): Promise<Project[]> {
  // 병렬 처리로 워터폴 제거 (성능 최적화)
  const [user, projects] = await Promise.all([
    fetchCurrentUser(),
    fetchUserProjects()
  ]);
  
  return projects.filter(p => p.userId === user.id);
}
```

### 2. TSX 컴포넌트 주석
```typescript
/**
 * 프리랜서 대시보드 메인 컴포넌트
 * 
 * @description 
 * - 사용자 이름과 인사말 표시
 * - 진행 중인/완료된 프로젝트 수 카드
 * - 최근 프로젝트 목록 (Skeleton UI 포함)
 * - 추천 상담가 섹션 (준비 중)
 * 
 * @performance 
 * - useEffect로 프로젝트 데이터 로드
 * - useMemo로 필터링 최적화
 * - Skeleton UI로 로딩 상태 개선
 * 
 * @since 2024.01.31
 * @author UI팀
 * 
 * @example
 * ```tsx
 * <StarDashboard user={{id: "123", name: "김프리랜서"}} />
 * ```
 */
export function StarDashboard({ user }: UserProps) {
  // 상태 정의
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 데이터 로드 (별도 함수로 분리 권장)
  useEffect(() => {
    loadProjects();
  }, []);
  
  // 진행 중인 프로젝트 수 계산 (메모이제이션)
  const pendingCount = useMemo(() => 
    projects.filter(p => p.status === 'PENDING').length,
    [projects]
  );
  
  return (
    <div className="space-y-6">
      {/* 사용자 인사 섹션 */}
      <section className="flex items-center justify-between">
        <h1>안녕하세요, {user.name}님! ⭐</h1>
        <Button>새 프로젝트 요청</Button>
      </section>
      
      {/* 통계 카드 섹션 */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <ProjectStatsCard 
          title="진행 중인 질문"
          count={pendingCount}
          loading={loading}
        />
      </section>
    </div>
  );
}
```

### 3. 복잡한 로직 주석
```typescript
/**
 * 프로젝트 필터링 및 정렬 로직
 * 
 * @description 
 * 1. 검색어로 제목/설명 필터링
 * 2. 카테고리 다중 선택 필터링  
 * 3. 상태별 필터링 (진행중/완료/취소)
 * 4. 마감일 오름차순 정렬
 * 5. 페이징 처리
 * 
 * @performance 
 * - useMemo로 필터링 결과 캐싱
 * - O(n) → O(log n) 탐색 최적화
 * - Set/Map으로 중복 제거
 * 
 * @param {Project[]} projects - 원본 프로젝트 배열
 * @param {FilterOptions} filters - 필터 옵션
 * @returns {Project[]} 필터링된 프로젝트 배열
 */
const filterAndSortProjects = useMemo(() => {
  let filtered = [...projects];
  
  // 검색어 필터링 (대소문자 무관)
  if (filters.searchQuery.trim()) {
    const searchLower = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(project => 
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower)
    );
  }
  
  // 카테고리 필터링 (Set으로 O(1) 조회)
  if (filters.categories.length > 0) {
    const categorySet = new Set(filters.categories);
    filtered = filtered.filter(project => 
      project.categories.some(cat => categorySet.has(cat))
    );
  }
  
  // 상태 필터링
  if (filters.status.length > 0) {
    const statusSet = new Set(filters.status);
    filtered = filtered.filter(project => 
      statusSet.has(project.status)
    );
  }
  
  // 마감일 정렬 (null 값 마지막)
  return filtered.sort((a, b) => {
    if (!a.deadline && !b.deadline) return 0;
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  });
}, [projects, filters]);
```

### 4. API 함수 주석
```typescript
/**
 * 프로젝트 API 통합 모듈
 * @namespace ProjectsApi
 * @version 1.0.0
 */

/**
 * 프로젝트 목록 조회
 * 
 * @description 
 * - 인증된 사용자의 모든 프로젝트 조회
 * - 페이징 지원 (page, limit)
 * - 정렬 옵션 (createdAt, updatedAt, deadline)
 * - 필터링 옵션 (status, category)
 * 
 * @endpoint GET /api/projects
 * @auth required
 * @rateLimit 100 requests/hour
 * 
 * @example
 * ```typescript
 * const projects = await projectsApi.listProjects({
 *   page: 1,
 *   limit: 20,
 *   sort: 'deadline',
 *   order: 'asc'
 * });
 * ```
 * 
 * @param {ProjectListOptions} options - 조회 옵션
 * @returns {Promise<ProjectResponse>} 프로젝트 목록 응답
 * @throws {UnauthorizedError} 인증되지 않은 경우
 * @throws {ValidationError} 파라미터 유효성 검증 실패
 */
export const listProjects = async (options: ProjectListOptions = {}): Promise<ProjectResponse> => {
  // 파라미터 유효성 검증
  const validatedOptions = validateProjectOptions(options);
  
  // API 호출
  const response = await fetch('/api/projects', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new ApiError(`Failed to fetch projects: ${response.statusText}`);
  }
  
  return response.json();
};
```

## 🔧 실천 가이드라인

### 주석 언어
- **함께봄 스타일**: 전문적이면서 친근한 톤
- **행동 중심**: 사용하는 행동을 설명
- **이유 명시**: 왜 이렇게 구현했는지 설명

### 주석 위치
1. **함수/클래스 상단**: 전체적인 설명
2. **복잡한 로직 전**: 단계별 설명  
3. **성능 최적화 지점**: 최적화 이유와 효과
4. **변경 필요한 부분**: TODO와 함께 개선 방향

### 주석 내용
1. **목적**: 이 코드가 왜 필요한가
2. **동작**: 어떻게 동작하는가
3. **입력**: 어떤 파라미터를 받는가
4. **출력**: 어떤 값을 반환하는가
5. **부가 정보**: 예제, 관련 문서, 성능 정보