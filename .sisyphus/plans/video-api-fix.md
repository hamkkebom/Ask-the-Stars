# Fix Video Loading - Supabase Direct Call Migration

## TL;DR

> **Quick Summary**: 프로덕션 /videos 페이지에서 영상이 로딩되지 않는 문제 수정. `getFeaturedVideos()` 함수가 Supabase를 직접 호출하면서 스키마 불일치로 400 에러 발생. 백엔드 API 호출로 변경.
> 
> **Deliverables**: 
> - `apps/web/src/lib/api/videos.ts` 수정
> - `apps/web/src/test/lib/api/videos.test.ts` 테스트 수정
> - 프로덕션 백엔드 API 접근성 검증
> - 로컬/프로덕션 동작 확인
> 
> **Estimated Effort**: Quick (30분-1시간)
> **Parallel Execution**: NO - sequential
> **Critical Path**: Task 1 (코드 수정) -> Task 2 (환경 검증) -> Task 3 (배포 및 확인)

---

## Context

### Original Request
> "클라우드스트림의 영상을 정상적으로 불러오지못하고있어요"
> 프로덕션에서 전체 페이지에서 영상이 아예 보이지 않음

### Interview Summary
**Key Discussions**:
- 콘솔 에러 분석: Supabase 직접 호출 400, 백엔드 API 404
- 근본 원인: `getFeaturedVideos()` 함수가 Supabase를 직접 호출하며 스키마 불일치

**Research Findings**:
- `VibrantHero` 컴포넌트가 `getFeaturedVideos()` 사용
- 백엔드 `/api/videos` 엔드포인트는 정상 작동 (signed token 포함)
- 다른 컴포넌트들 (`CategorySwimlane`, `AdvancedVideoGrid`)은 이미 백엔드 API 사용 중

### Metis Review
**Identified Gaps** (addressed):
- Backend `sort: 'popular'` is a no-op (both conditions use createdAt:desc) → `sort: 'latest'` 사용
- Featured video 기준 불명확 → 최신 5개 영상 사용으로 결정
- 다른 Supabase 직접 호출 함수들 → 별도 태스크로 분리 (이번 범위 외)
- VideoDetails 인터페이스 정리 필요 → 별도 태스크로 분리 (이번 범위 외)

---

## Work Objectives

### Core Objective
프로덕션 /videos 페이지에서 영상이 정상적으로 로딩되도록 `getFeaturedVideos()` 함수를 백엔드 API 호출로 변경

### Concrete Deliverables
- `apps/web/src/lib/api/videos.ts:264-288` 수정 (getFeaturedVideos 함수)
- `apps/web/src/test/lib/api/videos.test.ts:142-192` 수정 (관련 테스트 2개)
- 프로덕션 백엔드 API 접근성 검증

### Definition of Done
- [ ] 로컬 개발 서버에서 VibrantHero 영상 표시됨
- [ ] 브라우저 콘솔에 Supabase 400 에러 없음
- [ ] 브라우저 콘솔에 /videos 404 에러 없음
- [ ] 프로덕션 배포 후 영상 정상 로딩

### Must Have
- `getFeaturedVideos()` 함수가 `axiosInstance` 사용
- 기존 반환 형식 `{ data: Video[] }` 유지
- 에러 처리 패턴 일관성 (다른 함수들과 동일)

### Must NOT Have (Guardrails)
- 새로운 백엔드 엔드포인트 추가 금지
- Prisma 스키마 변경 금지
- `VideoStatus` enum 변경 금지
- 다른 Supabase 직접 호출 함수 수정 금지 (별도 태스크)
- `VideoDetails` 인터페이스 변경 금지 (별도 태스크)

---

## Verification Strategy (MANDATORY)

> **UNIVERSAL RULE: ZERO HUMAN INTERVENTION**
>
> ALL tasks in this plan MUST be verifiable WITHOUT any human action.

### Test Decision
- **Infrastructure exists**: YES (Vitest)
- **Automated tests**: NO (즉각적 버그 수정, 기존 테스트로 충분)
- **Framework**: Vitest

### Agent-Executed QA Scenarios (MANDATORY - ALL tasks)

모든 검증은 에이전트가 직접 실행합니다:
- **Frontend/UI**: Playwright (playwright skill)
- **API/Backend**: Bash (curl)
- **Build/Lint**: Bash (pnpm commands)

---

## Execution Strategy

### Dependency Matrix

| Task | Depends On | Blocks | Can Parallelize With |
|------|------------|--------|---------------------|
| 1 | None | 2, 3 | None |
| 2 | 1 | 3 | None |
| 3 | 2 | None | None |

### Agent Dispatch Summary

| Task | Recommended Agent |
|------|-------------------|
| 1 | delegate_task(category="quick", load_skills=[], ...) |
| 2 | delegate_task(category="quick", load_skills=[], ...) |
| 3 | delegate_task(category="quick", load_skills=["playwright"], ...) |

---

## TODOs

- [ ] 1. Fix `getFeaturedVideos()` to use backend API and update tests

  **What to do**:
  
  **Part A: 코드 수정**
  - `apps/web/src/lib/api/videos.ts` 파일 열기
  - 라인 264-288의 `getFeaturedVideos` 함수 수정:
    - Supabase 직접 호출 제거
    - `axiosInstance.get('/videos', { params: { sort: 'latest', limit: 5 } })` 사용
    - 반환 형식 `{ data: response.data.data || [] }` 유지
    - 에러 처리는 `listVideosByCategory` 패턴 참고 (라인 246-260)

  **Part B: 테스트 수정** (CI 실패 방지 - CRITICAL)
  - `apps/web/src/test/lib/api/videos.test.ts` 파일 열기
  - 라인 142-150 (`gets featured videos via supabase`) 테스트 수정:
    - Supabase mock 대신 axios mock 사용
    - `axios.get.mockResolvedValue({ data: { data: [{ id: 'v1' }] } })`
    - `expect(axios.get).toHaveBeenCalledWith('/videos', { params: { sort: 'latest', limit: 5 } })`
  - 라인 179-192 (`returns empty featured videos on error`) 테스트 수정:
    - Supabase error mock 대신 axios rejection mock 사용
    - `axios.get.mockRejectedValue(new Error('fail'))`

  **Must NOT do**:
  - 다른 함수 수정 금지 (`incrementViews`, `getMyVideos` 등)
  - `VideoDetails` 인터페이스 변경 금지
  - 새로운 import 추가 금지 (이미 `axiosInstance` import됨)
  - 다른 테스트 케이스 수정 금지 (getFeaturedVideos 관련 2개만)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 단일 파일, 명확한 수정 범위, 30분 미만 작업
  - **Skills**: `[]`
    - 추가 스킬 불필요 - 단순 코드 수정
  - **Skills Evaluated but Omitted**:
    - `playwright`: 이 태스크에서는 코드 수정만 수행, 브라우저 검증은 Task 3

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Task 1)
  - **Blocks**: Task 2, Task 3
  - **Blocked By**: None (can start immediately)

  **References** (CRITICAL - Be Exhaustive):

  **Pattern References** (existing code to follow):
  - `apps/web/src/lib/api/videos.ts:246-260` - `listVideosByCategory` 패턴 (axiosInstance 사용, 에러 처리)
  - `apps/web/src/lib/api/videos.ts:191-231` - `listAllFinalVideos` 패턴 (params 전달 방식)

  **Test References** (testing patterns to follow):
  - `apps/web/src/test/lib/api/videos.test.ts:103-113` - `listVideosByCategory` 테스트 패턴 (axios mock)
  - `apps/web/src/test/lib/api/videos.test.ts:127-140` - axios 에러 처리 테스트 패턴
  - `apps/web/src/test/lib/api/videos.test.ts:142-150` - 수정 대상: `gets featured videos via supabase`
  - `apps/web/src/test/lib/api/videos.test.ts:179-192` - 수정 대상: `returns empty featured videos on error`

  **API/Type References** (contracts to implement against):
  - Backend response shape: `{ data: Video[], meta: { total, page, last_page, has_more } }`
  - 함수 반환 형식: `{ data: Video[] }` (meta 없이 data만)

  **WHY Each Reference Matters**:
  - `listVideosByCategory`를 참고하는 이유: 동일한 `/videos` 엔드포인트 호출, 동일한 에러 처리 패턴
  - 반환 형식 유지 이유: `VibrantHero` 컴포넌트가 `data?.data` 형태로 접근
  - 테스트 수정 이유: CI에서 `pnpm test` 실행 시 기존 Supabase mock 테스트가 실패함

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios (MANDATORY):**

  ```
  Scenario: TypeScript compilation succeeds
    Tool: Bash
    Preconditions: Repository cloned, dependencies installed
    Steps:
      1. cd apps/web
      2. pnpm exec tsc --noEmit
    Expected Result: Exit code 0, no type errors
    Evidence: Command output showing no errors

  Scenario: Code modification is correct
    Tool: Bash (grep)
    Preconditions: File modified
    Steps:
      1. grep -A 20 "getFeaturedVideos:" apps/web/src/lib/api/videos.ts
      2. Assert: Contains "axiosInstance.get('/videos'"
      3. Assert: Does NOT contain "supabase" or "createClient" in the function body
    Expected Result: Function uses axios, not Supabase
    Evidence: grep output

  Scenario: Tests pass (CRITICAL - CI blocker prevention)
    Tool: Bash
    Preconditions: Code and tests modified
    Steps:
      1. pnpm test --filter=web
    Expected Result: Exit code 0, all tests pass
    Evidence: Test output showing pass count
    Failure Indicators: "FAIL" in output, non-zero exit code

  Scenario: Build succeeds
    Tool: Bash
    Preconditions: Code modified
    Steps:
      1. pnpm build --filter=web
    Expected Result: Exit code 0, build completes
    Evidence: Build output showing success
  ```

  **Evidence to Capture:**
  - [ ] TypeScript compilation output
  - [ ] Grep output showing modified function
  - [ ] Test output (all tests passing)
  - [ ] Build output

  **Commit**: YES
  - Message: `fix(web): use backend API for getFeaturedVideos instead of direct Supabase call`
  - Files: `apps/web/src/lib/api/videos.ts`, `apps/web/src/test/lib/api/videos.test.ts`
  - Pre-commit: `pnpm test --filter=web && pnpm build --filter=web`

---

- [ ] 2. Verify production backend API accessibility

  **What to do**:
  - curl로 프로덕션 백엔드 API에 직접 요청하여 접근성 확인
  - 응답이 정상인지 확인 (HTTP 200, 유효한 JSON)
  - API가 영상 데이터를 반환하는지 확인

  **Must NOT do**:
  - 환경 변수 수동 변경 (이 태스크에서는 검증만)
  - 백엔드 코드 수정

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: curl 기반 API 검증 작업
  - **Skills**: `[]`
    - 추가 스킬 불필요

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Task 2)
  - **Blocks**: Task 3
  - **Blocked By**: Task 1

  **References**:
  - `apps/web/src/lib/api/axios.ts:8-9` - `NEXT_PUBLIC_API_URL` 사용 위치
  - 프로덕션 백엔드 URL: `https://api.hamkkebom.com/api`

  **WHY**: 프로덕션 백엔드 API가 응답하지 않으면 프론트엔드 수정이 무의미함

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios (MANDATORY):**

  ```
  Scenario: Backend API returns HTTP 200
    Tool: Bash (curl)
    Preconditions: Internet connection available
    Steps:
      1. curl -s -o /dev/null -w "%{http_code}" "https://api.hamkkebom.com/api/videos?limit=1"
    Expected Result: Output is "200"
    Failure Indicators: Output is "404", "500", "000" (connection failed)
    Evidence: Status code string

  Scenario: Backend returns valid video data
    Tool: Bash (curl)
    Preconditions: jq installed (or use grep for JSON validation)
    Steps:
      1. curl -s "https://api.hamkkebom.com/api/videos?limit=5"
      2. Assert: Response contains "data" array
      3. Assert: Response is valid JSON (not HTML error page)
    Expected Result: JSON with data array
    Failure Indicators: HTML content, error message, empty response
    Evidence: Response body (first 500 chars)

  Scenario: Backend API has video records
    Tool: Bash (curl + jq)
    Preconditions: jq installed
    Steps:
      1. curl -s "https://api.hamkkebom.com/api/videos?limit=5" | jq '.data | length'
    Expected Result: Number >= 1 (at least one video exists)
    Failure Indicators: 0, null, jq parse error
    Evidence: Data count
  ```

  **Evidence to Capture:**
  - [ ] HTTP status code (should be 200)
  - [ ] Response body sample (truncated)
  - [ ] Video data count

  **Commit**: NO (검증 태스크 - 코드 변경 없음)

---

- [ ] 3. Deploy and verify in production

  **What to do**:
  - Git push로 자동 배포 트리거 (Vercel)
  - 프로덕션 사이트에서 /videos 페이지 확인
  - 브라우저 콘솔 에러 없음 확인
  - VibrantHero 영상 로딩 확인

  **Must NOT do**:
  - 수동 배포 스크립트 사용 금지 (GitHub Actions 자동 배포 사용)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: 배포 및 검증 작업
  - **Skills**: `["playwright"]`
    - `playwright`: 프로덕션 사이트 UI 검증

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential (Task 3)
  - **Blocks**: None (final task)
  - **Blocked By**: Task 1, Task 2

  **References**:
  - `.github/workflows/cd-web.yml` - Vercel 자동 배포 워크플로우
  - 프로덕션 URL: `https://www.hamkkebom.com/videos`

  **Acceptance Criteria**:

  **Agent-Executed QA Scenarios (MANDATORY):**

  ```
  Scenario: Push triggers deployment
    Tool: Bash (git)
    Preconditions: Changes committed
    Steps:
      1. git push origin main
      2. Wait for GitHub Actions to complete
    Expected Result: Push succeeds, workflow triggered
    Evidence: Git push output, workflow URL

  Scenario: Production video page loads correctly
    Tool: Playwright (playwright skill)
    Preconditions: Deployment completed
    Steps:
      1. Navigate to: https://www.hamkkebom.com/videos
      2. Wait for: .min-h-screen visible (timeout: 30s)
      3. Assert: No console errors containing "supabase.co"
      4. Assert: No console errors containing "404"
      5. Screenshot: .sisyphus/evidence/task-3-video-page.png
    Expected Result: Page loads without Supabase/404 errors
    Evidence: .sisyphus/evidence/task-3-video-page.png

  Scenario: VibrantHero displays video
    Tool: Playwright (playwright skill)
    Preconditions: Page loaded
    Steps:
      1. Navigate to: https://www.hamkkebom.com/videos
      2. Wait for: section.relative.w-full visible (VibrantHero container)
      3. Assert: h1 text is NOT "별들에게 물어봐: 공모전 시즌 2" (fallback)
      4. Assert: Link to /videos/[id] exists
      5. Screenshot: .sisyphus/evidence/task-3-hero-loaded.png
    Expected Result: Hero shows real video, not fallback
    Evidence: .sisyphus/evidence/task-3-hero-loaded.png
  ```

  **Evidence to Capture:**
  - [ ] Git push output
  - [ ] Screenshot of video page
  - [ ] Screenshot of hero section
  - [ ] Console log (no errors)

  **Commit**: NO (이미 Task 1에서 커밋됨)

---

## Commit Strategy

| After Task | Message | Files | Verification |
|------------|---------|-------|--------------|
| 1 | `fix(web): use backend API for getFeaturedVideos instead of direct Supabase call` | `apps/web/src/lib/api/videos.ts`, `apps/web/src/test/lib/api/videos.test.ts` | `pnpm test --filter=web && pnpm build --filter=web` |

---

## Success Criteria

### Verification Commands
```bash
# Local verification
pnpm dev --filter=web
# Open http://localhost:3000/videos
# Expected: No console errors, hero video loads

# Production verification (after deploy)
curl -s "https://api.hamkkebom.com/api/videos?limit=5" | jq '.data | length'
# Expected: Number > 0
```

### Final Checklist
- [ ] `getFeaturedVideos()` uses `axiosInstance` instead of Supabase
- [ ] Tests for `getFeaturedVideos()` updated to use axios mock
- [ ] All tests pass (`pnpm test --filter=web`)
- [ ] No Supabase 400 errors in browser console
- [ ] No 404 errors for /videos endpoint
- [ ] VibrantHero displays real video (not fallback)
- [ ] TypeScript compiles without errors
- [ ] Build succeeds

---

## Follow-up Tasks (Out of Scope)

> 이번 작업 범위 외 - 별도 태스크로 관리

1. **Migrate other Supabase direct calls**: `incrementViews`, `getMyVideos`, `createVideo`, `updateVideo`, `deleteVideo`, `getVideoPreviewUrl`
2. **Clean up VideoDetails interface**: 존재하지 않는 필드 (`views`, `likes`, `isAdApproved`) 정리
3. **Add proper featured endpoint**: 백엔드에 `/api/videos/featured` 엔드포인트 추가 (views 기반 정렬)
4. **Views caching**: Cloudflare Analytics views를 DB에 캐싱
