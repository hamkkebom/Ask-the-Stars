# 메인 페이지 영상 로딩 수정

## TL;DR

> **Quick Summary**: 백엔드 API 버전 불일치로 인한 영상 로딩 실패 수정. axios에서 `/v1` prefix 제거.
> 
> **Deliverables**:
> - axios.ts 수정 (API_VERSION 제거)
> - Vercel 재배포 후 메인 페이지 영상 표시 확인
> 
> **Estimated Effort**: Quick (5분)
> **Parallel Execution**: NO - sequential
> **Critical Path**: Task 1 → 배포 → 확인

---

## Context

### Original Request
메인 페이지에서 Cloudflare Stream 영상이 표시되지 않는 문제 해결

### 문제 진단 결과

**Root Cause**: 프론트엔드와 백엔드 API 버전 불일치

| 구분 | 요청 경로 | 결과 |
|------|----------|------|
| 프론트엔드 요청 | `/api/v1/videos` | ❌ 404 |
| 백엔드 실제 경로 | `/api/videos` | ✅ 작동 |

**원인**: Cloud Run에 배포된 백엔드가 URI Versioning(`/v1`)을 지원하지 않는 상태

### Research Findings
- `/api/videos?limit=1` → `{"data":[],"meta":{"total":0,...}}` (정상 응답)
- `/api/v1/videos?limit=1` → `{"message":"Cannot GET /api/v1/videos","error":"Not Found","statusCode":404}`
- 백엔드 `/health` 엔드포인트 정상 작동

---

## Work Objectives

### Core Objective
프론트엔드 axios 설정에서 API 버전 prefix(`/v1`)를 제거하여 백엔드와 일치시킴

### Concrete Deliverables
- `apps/web/src/lib/api/axios.ts` 수정

### Definition of Done
- [ ] 메인 페이지(https://www.hamkkebom.com)에서 영상 그리드 표시
- [ ] 네트워크 탭에서 `/api/videos` 요청 성공 (200)
- [ ] CategorySwimlane 컴포넌트에 영상 카드 렌더링

### Must Have
- API 요청이 `/api/videos`로 전송되어야 함
- 기존 인증 로직 유지

### Must NOT Have (Guardrails)
- 백엔드 코드 수정 (별도 작업)
- 다른 API 클라이언트 코드 변경
- 환경 변수 외 Vercel 설정 변경

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO (E2E 테스트 없음)
- **Automated tests**: NO
- **Agent-Executed QA**: YES (Playwright로 메인 페이지 확인)

### Agent-Executed QA Scenarios (MANDATORY)

```
Scenario: 메인 페이지 영상 그리드 표시 확인
  Tool: Playwright (playwright skill)
  Preconditions: Vercel 배포 완료
  Steps:
    1. Navigate to: https://www.hamkkebom.com
    2. Wait for: .min-h-screen (page load, timeout: 10s)
    3. Open DevTools Network tab filter: Fetch/XHR
    4. Check: /api/videos 요청 존재 (NOT /api/v1/videos)
    5. Assert: /api/videos 응답 status 200
    6. Wait for: video card elements or skeleton loaders
    7. Screenshot: .sisyphus/evidence/task-1-main-page.png
  Expected Result: API 요청 성공, 영상 카드 또는 빈 상태 표시
  Evidence: .sisyphus/evidence/task-1-main-page.png

Scenario: API 응답에 데이터 포함 확인
  Tool: Bash (curl)
  Preconditions: None
  Steps:
    1. curl -s "https://api.hamkkebom.com/api/videos?limit=5"
    2. Assert: HTTP 200
    3. Assert: response contains "data" array
  Expected Result: JSON 응답 with data array
  Evidence: Terminal output
```

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Single Task):
└── Task 1: axios.ts 수정

Post-Deployment (Manual):
└── Vercel 자동 배포 대기 후 확인
```

---

## TODOs

- [x] 1. axios.ts에서 API_VERSION 제거

  **What to do**:
  - `apps/web/src/lib/api/axios.ts` 파일 열기
  - Line 4: `const API_VERSION = 'v1';` 를 `const API_VERSION = '';` 로 변경
  - 또는 getBaseUrl 함수 수정하여 /v1 없이 /api만 반환

  **Exact Code Change**:
  ```typescript
  // 변경 전 (Line 4)
  const API_VERSION = 'v1';
  
  // 변경 후
  const API_VERSION = '';
  ```

  **Alternative (더 명확한 방법)**:
  ```typescript
  // 변경 전 (Line 6-13)
  const getBaseUrl = () => {
    const rawUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const url = rawUrl.replace(/\/$/, '');
    if (url.endsWith('/api')) {
      return `${url}/${API_VERSION}`;
    }
    return `${url}/api/${API_VERSION}`;
  };
  
  // 변경 후
  const getBaseUrl = () => {
    const rawUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const url = rawUrl.replace(/\/$/, '');
    // 백엔드가 /v1 미지원 상태이므로 /api만 사용
    // TODO: 백엔드 재배포 후 versioning 복구
    if (url.endsWith('/api')) {
      return url;
    }
    return `${url}/api`;
  };
  ```

  **Must NOT do**:
  - 다른 파일 수정
  - interceptor 로직 변경
  - 환경 변수 하드코딩

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 파일, 2줄 변경, 5분 미만 작업
  - **Skills**: [`git-master`]
    - `git-master`: 커밋 및 푸시 필요

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Wave 1 (단독)
  - **Blocks**: 배포 확인
  - **Blocked By**: None

  **References**:
  - `apps/web/src/lib/api/axios.ts:1-20` - 수정 대상 파일
  - `apps/web/src/lib/api/videos.ts:220,251` - axios 사용처 (영향 범위)

  **Acceptance Criteria**:
  - [x] `API_VERSION`이 빈 문자열이거나 getBaseUrl이 `/api`만 반환
  - [x] `axiosInstance.defaults.baseURL`이 `https://api.hamkkebom.com/api` (끝에 /v1 없음)

  **Agent-Executed QA Scenarios**:
  ```
  Scenario: 코드 변경 후 빌드 성공
    Tool: Bash
    Steps:
      1. cd apps/web && pnpm build
      2. Assert: exit code 0
      3. Assert: no TypeScript errors
    Expected Result: Build succeeds
    Evidence: Build output
  
  Scenario: API baseURL 확인
    Tool: Bash (grep)
    Steps:
      1. grep -n "API_VERSION" apps/web/src/lib/api/axios.ts
      2. Assert: value is '' or function returns without /v1
    Expected Result: No /v1 in API path
    Evidence: grep output
  ```

  **Commit**: YES
  - Message: `fix(web): remove API version prefix for backend compatibility`
  - Files: `apps/web/src/lib/api/axios.ts`
  - Pre-commit: `pnpm lint --filter=web` (현재 스킵됨)

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `fix(web): remove API version prefix for backend compatibility` | axios.ts | curl test |

---

## Success Criteria

### Verification Commands
```bash
# API 직접 테스트
curl -s "https://api.hamkkebom.com/api/videos?limit=5"
# Expected: {"data":[...],"meta":{...}}

# 메인 페이지 로드 (배포 후)
# https://www.hamkkebom.com 접속하여 영상 그리드 확인
```

### Final Checklist
- [x] axios.ts에서 /v1 제거됨
- [x] Git push 완료
- [ ] Vercel 자동 배포 완료
- [ ] 메인 페이지에서 영상 API 호출 성공 (Network 탭)
- [ ] 영상 카드 또는 "영상 없음" 상태 표시

---

## Notes

### 장기 해결책 (별도 작업)
백엔드 Cloud Run 재배포하여 URI Versioning 활성화 후:
1. `API_VERSION = 'v1'` 복구
2. 모든 API 엔드포인트 `/api/v1/*` 지원 확인

### 영상 데이터가 비어있는 경우
현재 `/api/videos` 응답이 `{"data":[]}` (빈 배열)
- DB에 `status='FINAL'` 영상이 없을 수 있음
- 이 경우 메인 페이지에 빈 그리드 표시됨 (정상 동작)
- 영상 업로드/승인 후 표시됨
