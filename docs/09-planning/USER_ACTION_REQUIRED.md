# 📋 사용자 액션 필요 항목

**작성일**: 2026-02-03  
**우선순위**: 높음 → 중간 → 낮음 순서  
**목적**: Phase 1 & 2 인프라를 완전히 활성화하기 위한 최종 단계

---

## ⚡ 즉시 실행 (High Priority)

### 1. E2E 테스트 계정 생성

**소요 시간**: 10분  
**필요성**: Playwright E2E 테스트 6개 활성화  
**현재 상태**: 환경변수만 준비됨

**실행 방법**:

```sql
-- PostgreSQL (Supabase)에 접속하여 실행
INSERT INTO "User" (email, "passwordHash", name, role, "emailVerified") VALUES
  ('test-star@hamkkebom.com', '$2a$10$YourHashedPasswordHere', 'Test Star', 'STAR', TRUE),
  ('test-admin@hamkkebom.com', '$2a$10$YourHashedPasswordHere', 'Test Admin', 'ADMIN', TRUE);
```

**비밀번호 해싱**:
```bash
# bcrypt 사용 (rounds=10)
node -e "console.log(require('bcrypt').hashSync('TestPassword123!', 10))"
```

**환경변수 설정** (`.env`):
```bash
E2E_STAR_EMAIL="test-star@hamkkebom.com"
E2E_STAR_PASSWORD="TestPassword123!"
E2E_ADMIN_EMAIL="test-admin@hamkkebom.com"
E2E_ADMIN_PASSWORD="TestPassword123!"
```

**검증**:
```bash
pnpm e2e
# Expected: 12 tests pass (현재 6개 스킵됨)
```

---

### 2. Cloudflare Image Variants 생성

**소요 시간**: 5분  
**필요성**: 썸네일 최적화 (30-50% 크기 감소)  
**현재 상태**: 환경변수만 준비됨

**실행 방법**:

1. **Cloudflare Dashboard 접속**:
   - URL: https://dash.cloudflare.com/
   - Images → Variants

2. **3개 Variant 생성**:

| Variant Name | Width | Format | Quality | Use Case |
|--------------|-------|--------|---------|----------|
| `thumbnail-sm` | 320px | auto | 80% | 모바일 썸네일 |
| `thumbnail-md` | 640px | auto | 80% | 태블릿/데스크탑 |
| `thumbnail-lg` | 1280px | auto | 85% | 고해상도 디스플레이 |

3. **환경변수 업데이트** (`.env`):
```bash
CLOUDFLARE_IMAGES_VARIANT_SM="thumbnail-sm"
CLOUDFLARE_IMAGES_VARIANT_MD="thumbnail-md"
CLOUDFLARE_IMAGES_VARIANT_LG="thumbnail-lg"
```

**검증**:
```bash
node scripts/test-thumbnail-variants.js
# Expected: 3개 variant 모두 200 OK 응답
```

**참고 문서**: `docs/04-development/THUMBNAIL_OPTIMIZATION.md`

---

## 🚀 성능 최적화 (Medium Priority)

### 3. k6 설치 및 부하 테스트

**소요 시간**: 10분  
**필요성**: API 성능 벤치마크 및 병목 지점 식별  
**현재 상태**: 테스트 시나리오 5개 준비됨

**Windows 설치 (Scoop 권장)**:
```bash
# Scoop 설치 (없는 경우)
irm get.scoop.sh | iex

# k6 설치
scoop install k6

# 버전 확인
k6 version
```

**대체 방법 (MSI Installer)**:
1. https://github.com/grafana/k6/releases 접속
2. 최신 `.msi` 파일 다운로드
3. 설치 후 재시작

**실행**:
```bash
# 개별 시나리오
pnpm load:auth      # Auth 엔드포인트 (로그인, 회원가입)
pnpm load:videos    # Videos 엔드포인트 (목록, 상세)
pnpm load:projects  # Projects 엔드포인트
pnpm load:admin     # Admin 엔드포인트
pnpm load:full      # 전체 사용자 플로우 (종합 시나리오)

# 결과 확인
cat reports/load/summary.json  # 자동 생성됨
```

**예상 결과**:
- **p95 응답시간**: < 200ms (목표)
- **처리량**: 1,000 req/s 이상
- **에러율**: < 1%

**참고 문서**: `docs/04-development/LOAD_TESTING.md`

---

### 4. Turborepo Remote Caching 활성화

**소요 시간**: 15분  
**필요성**: CI 빌드 시간 50% 단축 (5-10분 → 2-3분)  
**현재 상태**: 설정만 준비됨

**실행 방법**:

1. **Vercel 계정 연동**:
```bash
pnpx turbo login
# 브라우저에서 Vercel 계정으로 로그인
```

2. **프로젝트 연결**:
```bash
pnpx turbo link
# 프로젝트 선택 (Hankaebom-Star)
```

3. **토큰 확인**:
```bash
# .turbo/config.json 생성 확인
cat .turbo/config.json
```

4. **GitHub Secrets 추가**:
   - Repository → Settings → Secrets and variables → Actions
   - 2개 Secret 추가:
     - `TURBO_TOKEN`: (pnpx turbo link 후 출력된 값)
     - `TURBO_TEAM`: (팀 이름, 보통 Vercel username)

**검증**:
```bash
# PR 생성 후 CI 로그 확인
# "Remote caching enabled" 메시지 확인
# "cache hit" 메시지 확인 (2번째 빌드부터)
```

**예상 효과**:
- 첫 빌드: 5-10분 (캐시 생성)
- 이후 빌드: 2-3분 (캐시 히트)
- 캐시 히트율: 90% 이상

**참고 문서**: `docs/05-operations/CI_OPTIMIZATION.md`

---

## 🔍 검증 및 모니터링 (Low Priority)

### 5. Lighthouse 성능 재측정

**소요 시간**: 5분  
**필요성**: 성능 최적화 효과 확인  
**현재 상태**: 최적화 완료, 재측정 필요

**실행**:
```bash
# 백엔드 서버 시작 (다른 터미널)
pnpm dev --filter=@ask-the-stars/api

# 프론트엔드 빌드
pnpm build --filter=@ask-the-stars/web

# Lighthouse 실행
pnpm lighthouse
```

**예상 개선**:
| 지표 | 이전 | 예상 | 개선 |
|------|------|------|------|
| Performance | 0.69 | 0.80-0.85 | +15-20% |
| LCP | 4.77s | 2.5-3.5s | -30-50% |
| CLS | 0.149 | 0.05-0.08 | -40-60% |
| Accessibility | 0.88 | 0.92-0.95 | +5-8% |

**리포트 링크**:
- 콘솔에 출력된 Google Storage URL 확인
- `.lighthouseci/*.html` 파일 브라우저로 열기

---

### 6. CI/CD 워크플로우 검증

**소요 시간**: 10분  
**필요성**: 자동화 파이프라인 동작 확인  
**현재 상태**: 워크플로우 설정 완료

**실행 방법**:

1. **테스트 PR 생성**:
```bash
git checkout -b test/ci-verification
echo "# CI Test" >> README.md
git add README.md
git commit -m "test: verify ci workflows"
git push origin test/ci-verification
```

2. **GitHub에서 PR 생성**:
   - Repository → Pull requests → New pull request
   - base: `main` ← compare: `test/ci-verification`

3. **Actions 탭에서 확인**:
   - ✅ **CI Workflow**: 테스트, 린트, 빌드
   - ✅ **Lighthouse**: 성능 리포트 (코멘트로 추가됨)
   - ✅ **Security**: 보안 스캔 (주간 자동 실행)

4. **확인 후 정리**:
```bash
git checkout main
git branch -D test/ci-verification
git push origin --delete test/ci-verification
```

**체크리스트**:
- [ ] CI 워크플로우 성공 (녹색 체크)
- [ ] Lighthouse 리포트 PR 코멘트 확인
- [ ] 테스트 커버리지 94% 유지
- [ ] 빌드 시간 확인 (Turborepo cache 활성화 시 2-3분)

---

### 7. API v1 엔드포인트 테스트

**소요 시간**: 5분  
**필요성**: API Versioning 동작 확인  
**현재 상태**: 코드는 완료, 런타임 검증 필요

**실행**:
```bash
# 백엔드 서버 시작
pnpm dev --filter=@ask-the-stars/api

# 다른 터미널에서 테스트
curl http://localhost:4000/api/v1/health
# Expected: {"status":"ok","version":"1.0","uptime":...}

# Legacy 경로 리다이렉트 확인
curl -I http://localhost:4000/api/health
# Expected: HTTP/1.1 308 Permanent Redirect
# Location: /api/v1/health

# Swagger 확인
curl http://localhost:4000/api/v1/docs
# Expected: HTML (Swagger UI)
```

**브라우저 확인**:
- http://localhost:4000/api/v1/docs - Swagger UI
- http://localhost:4000/api/v1/docs-json - OpenAPI JSON

**프론트엔드 확인**:
```bash
# 프론트엔드 서버 시작
pnpm dev --filter=@ask-the-stars/web

# 브라우저 개발자 도구 → Network 탭
# API 호출이 /api/v1/* 로 가는지 확인
```

---

## 📊 완료 체크리스트

### 즉시 실행 (필수)

- [ ] E2E 테스트 계정 생성 (10분)
  - [ ] DB에 test-star 계정 추가
  - [ ] DB에 test-admin 계정 추가
  - [ ] .env에 환경변수 설정
  - [ ] `pnpm e2e` 실행하여 12개 테스트 통과 확인

- [ ] Cloudflare Image Variants 생성 (5분)
  - [ ] thumbnail-sm (320w) 생성
  - [ ] thumbnail-md (640w) 생성
  - [ ] thumbnail-lg (1280w) 생성
  - [ ] `node scripts/test-thumbnail-variants.js` 실행 확인

### 성능 최적화 (권장)

- [ ] k6 설치 및 부하 테스트 (10분)
  - [ ] k6 바이너리 설치 (scoop install k6)
  - [ ] `pnpm load:auth` 실행
  - [ ] `pnpm load:videos` 실행
  - [ ] `pnpm load:full` 실행
  - [ ] 성능 리포트 확인

- [ ] Turborepo Remote Caching 활성화 (15분)
  - [ ] `pnpx turbo login` 실행
  - [ ] `pnpx turbo link` 실행
  - [ ] GitHub Secrets 추가 (TURBO_TOKEN, TURBO_TEAM)
  - [ ] PR 생성하여 캐시 히트 확인

### 검증 및 모니터링 (선택)

- [ ] Lighthouse 성능 재측정 (5분)
  - [ ] `pnpm lighthouse` 실행
  - [ ] 성능 점수 개선 확인
  - [ ] 리포트 URL 저장

- [ ] CI/CD 워크플로우 검증 (10분)
  - [ ] 테스트 PR 생성
  - [ ] Lighthouse 리포트 확인
  - [ ] Security 스캔 확인
  - [ ] PR 삭제

- [ ] API v1 엔드포인트 테스트 (5분)
  - [ ] 서버 시작 후 curl 테스트
  - [ ] Swagger UI 확인
  - [ ] 프론트엔드 Network 탭 확인

---

## 🚀 우선순위 가이드

**바로 지금 (5분 안에)**:
1. Cloudflare Image Variants 생성 (5분)

**오늘 중 (30분 안에)**:
2. E2E 테스트 계정 생성 (10분)
3. k6 설치 (10분)
4. Turborepo Remote Caching (15분)

**이번 주 중**:
5. Lighthouse 재측정
6. CI/CD 검증
7. API v1 테스트

---

## 📞 문제 발생 시

### E2E 테스트 실패
- DB 연결 확인: `DATABASE_URL` 환경변수
- 비밀번호 해시 확인: bcrypt rounds=10
- 이메일 중복 확인: 기존 사용자와 충돌 가능

### Cloudflare Variants 오류
- 계정 권한 확인: Images 접근 권한 필요
- Variant 이름 정확히 일치해야 함

### k6 실행 안 됨
- PATH 확인: `which k6` 또는 `where k6`
- 재시작 필요할 수 있음

### Turborepo 캐시 미적용
- GitHub Secrets 확인: 대소문자 정확히
- Workflow 파일 확인: `.github/workflows/ci.yml`

---

## ✅ 완료 후 확인

모든 액션 완료 후 다음을 확인하세요:

```bash
# 전체 테스트 실행
pnpm test                # Frontend + Backend (94% coverage)
pnpm e2e                 # E2E 12개 모두 통과
pnpm lighthouse          # 성능 점수 0.85+ 목표

# 보안 감사
pnpm security:audit      # 0 vulnerabilities

# 빌드
pnpm build               # 전체 빌드 성공
```

**예상 결과**: 모든 명령어 성공 ✅

---

**작성**: 2026-02-03  
**작성자**: AI Development Agent (Sisyphus)  
**문의**: IMPROVEMENT_STATUS.md 참조
