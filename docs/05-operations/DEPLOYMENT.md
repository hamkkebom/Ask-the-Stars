# 🚀 배포 가이드

> **최종 수정일**: 2026-02-01

---

## 📌 배포 환경

| 환경 | 프론트엔드 | 백엔드 | 용도 |
|------|-----------|--------|------|
| **개발** | localhost:3000 | localhost:4000 | 로컬 개발 |
| **프로덕션** | Vercel | Cloud Run (서울) | 실서비스 |

---

## 🏗 인프라 구성

### 서비스 구성

| 서비스 | 용도 | 리전 | 월 비용 |
|--------|------|------|---------|
| **Vercel** | 프론트엔드 | 서울 PoP | $0 |
| **Google Cloud Run** | 백엔드 API | 서울 (asia-northeast3) | $25 |
| **Supabase** | PostgreSQL + Auth | 서울 | $25 |
| **Upstash** | Redis 캐시 | 도쿄 | $10 |
| **Cloudflare R2** | 영상 스토리지 | CDN | $2 |
| **Cloudflare Stream** | 영상 스트리밍 | CDN | $5 |

### 아키텍처 다이어그램

```
┌─────────────────────────────────────────────────────────┐
│                       Client                            │
└────────────────────────┬────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         ▼                               ▼
┌─────────────────┐             ┌─────────────────┐
│  Vercel (서울)  │             │ Cloud Run (서울)│
│   Next.js 16   │────────────▶│   NestJS 11     │
└─────────────────┘     API     └────────┬────────┘
                                         │
                    ┌────────────────────┼────────────────────┐
                    ▼                    ▼                    ▼
           ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
           │ Supabase     │    │ Upstash      │    │ Cloudflare   │
           │ PostgreSQL   │    │ Redis        │    │ R2 + Stream  │
           └──────────────┘    └──────────────┘    └──────────────┘
```

---

## 📋 사전 요구사항

### 필수 계정

- [ ] [Vercel](https://vercel.com/) 계정
- [ ] [Google Cloud](https://cloud.google.com/) 프로젝트
- [ ] [Supabase](https://supabase.com/) 프로젝트 (서울 리전)
- [ ] [Upstash](https://upstash.com/) Redis 인스턴스
- [ ] [Cloudflare](https://cloudflare.com/) 계정 (R2 + Stream)

### CLI 도구 설치

```bash
# Node.js 22 (Fat Image 전략 호환)
nvm install 22
nvm use 22

# pnpm
npm install -g pnpm

# Vercel CLI
npm install -g vercel

# Google Cloud SDK
# https://cloud.google.com/sdk/docs/install
```

### GitHub Secrets 설정

```bash
# 프론트엔드 (Vercel)
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx

# 백엔드 (Cloud Run)
GCP_PROJECT_ID=xxx
GCP_SA_KEY=xxx  # JSON 형식

# 환경변수 (모든 환경)
DATABASE_URL=xxx
SUPABASE_URL=xxx
REDIS_URL=xxx
SENTRY_DSN=xxx
```

---

## 🚀 배포 절차

### 1. 프론트엔드 배포 (Vercel)

#### [Vercel UI 설정 - 중요]
모노레포 구조이므로 Vercel 대시보드에서 다음 설정을 수동으로 적용해야 합니다.
- **Root Directory**: `.` (루트)
- **Output Directory**: `.next`
- **Build Command**: `pnpm turbo run build --filter=@ask-the-stars/web`
- **Install Command**: `pnpm install`
- **Root Directory 옵션**: "Include files outside of the root directory..." **활성화**

#### Turborepo 환경변수 설정 (`turbo.json`)

```json
{
  "tasks": {
    "build": {
      "env": ["DATABASE_URL", "DIRECT_URL", "NEXT_PUBLIC_*"],
      "outputs": ["dist/**", ".next/**"]
    }
  }
}
```

> [!IMPORTANT]
> `turbo.json`의 `env` 배열에 빌드 시 필요한 환경변수를 명시적으로 선언해야 합니다.

#### 자동 배포 (GitHub Actions):

```yaml
# .github/workflows/ci.yml
# PR 생성/업데이트 시 빌드 및 테스트 자동 검증
```

수동 배포:

```bash
cd apps/web

# 프로덕션 배포
vercel --prod

# 프리뷰 배포
vercel
```

### 2. 백엔드 배포 (Cloud Run)

**빌드 전략 (Build Strategy):**
현재 pnpm 모노레포 구조와 네이티브 모듈(Canvas, Prisma 등)의 호환성을 위해 **Single-Stage Build (Fat Image)** 전략을 사용합니다.
- Base Image: `node:22` (Full)
- 설치 방식: `pnpm install` (스크립트 포함, API 필터링)
- 배포: `cloudbuild.yaml` 또는 `gcloud builds submit`

자동 배포 (GitHub Actions):

```yaml
# .github/workflows/cd-api.yml
# main 브랜치에 apps/api/** 변경 시 자동 배포
```

수동 배포 (Recommended):

```bash
cd apps/api

# Cloud Build를 통한 원격 빌드 및 배포
# (로컬 Docker 데몬 없이도 빠르고 안정적으로 배포 가능)
gcloud builds submit --config=../../cloudbuild.yaml ../..

# 또는 수동 명령 (Dockerfile 경로 확인 필요)
# gcloud builds submit --tag gcr.io/[PROJECT_ID]/api .
```

> [!IMPORTANT]
> **Cloudflare Stream**: 실시간 영상 스트리밍을 위해 `CLOUDFLARE_STREAM_TOKEN`과 `CLOUDFLARE_ACCOUNT_ID`가 서버 환경 변수에 정확히 설정되어야 합니다.

### 3. 데이터베이스 마이그레이션

```bash
cd apps/api

# 마이그레이션 생성
pnpm db:migrate

# 프로덕션 마이그레이션 적용
DATABASE_URL=production_url npx prisma migrate deploy
```

---

## 🔄 롤백 절차

### 프론트엔드 롤백 (Vercel)

```bash
# 배포 목록 확인
vercel ls

# 특정 배포로 롤백
vercel rollback [DEPLOYMENT_URL]
```

### 백엔드 롤백 (Cloud Run)

```bash
# 리비전 목록 확인
gcloud run revisions list --service ask-the-stars-api --region asia-northeast3

# 특정 리비전으로 롤백
gcloud run services update-traffic ask-the-stars-api \
  --to-revisions [REVISION_NAME]=100 \
  --region asia-northeast3
```

---

## ✅ 배포 체크리스트

### 배포 전

- [ ] 모든 테스트 통과 (`pnpm test`)
- [ ] 린트 검사 통과 (`pnpm lint`)
- [ ] 타입 체크 통과 (`pnpm type-check`)
- [ ] 환경변수 설정 확인
- [ ] DB 마이그레이션 스크립트 확인
- [ ] PR 리뷰 완료

### 배포 후

- [ ] Health Check 정상 확인
- [ ] Sentry 에러 모니터링 확인
- [ ] BetterStack 로그 확인
- [ ] 주요 기능 수동 테스트
- [ ] 레이턴시 확인 (한국 기준 <100ms)

---

## 🔧 환경별 설정

### 개발 환경

```bash
# 로컬 DB 시작
docker-compose up -d

# 개발 서버 시작
pnpm dev
```

### 프로덕션 환경

```bash
# 프로덕션 빌드
pnpm build

# 프로덕션 시작 (로컬 테스트)
pnpm start
```

---

## 📝 참고사항

- 🕐 운영 배포는 업무 시간 외 (22:00 이후) 권장
- 📊 배포 후 15분간 모니터링 필수
- 📝 배포 이력은 [CHANGELOG.md](../../CHANGELOG.md)에 기록
- 🚨 긴급 이슈 시 [INCIDENT_RESPONSE.md](./INCIDENT_RESPONSE.md) 참조
