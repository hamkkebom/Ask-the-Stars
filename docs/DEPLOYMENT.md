# 🚀 배포 가이드

> **최종 수정일**: 2026-01-17

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
│   Next.js 15    │────────────▶│   NestJS 11     │
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
# Node.js 22 (nvm 사용)
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

자동 배포 (GitHub Actions):

```yaml
# .github/workflows/cd-web.yml
# main 브랜치에 apps/web/** 변경 시 자동 배포
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

자동 배포 (GitHub Actions):

```yaml
# .github/workflows/cd-api.yml
# main 브랜치에 apps/api/** 변경 시 자동 배포
```

수동 배포:

```bash
cd apps/api

# Docker 이미지 빌드
docker build -t asia-northeast3-docker.pkg.dev/[PROJECT_ID]/ask-the-stars/api:latest -f Dockerfile ../..

# 이미지 푸시
docker push asia-northeast3-docker.pkg.dev/[PROJECT_ID]/ask-the-stars/api:latest

# Cloud Run 배포
gcloud run deploy ask-the-stars-api \
  --image asia-northeast3-docker.pkg.dev/[PROJECT_ID]/ask-the-stars/api:latest \
  --region asia-northeast3 \
  --platform managed \
  --allow-unauthenticated
```

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
- 📝 배포 이력은 [CHANGELOG.md](./CHANGELOG.md)에 기록
- 🚨 긴급 이슈 시 [INCIDENT_RESPONSE.md](./INCIDENT_RESPONSE.md) 참조
