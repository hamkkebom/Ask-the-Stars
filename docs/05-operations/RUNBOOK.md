# 📕 장애 대응 런북 (Incident Runbook - 함께봄)

> **시스템**: Ask the Stars (함께봄: 별들에게 물어봐)
> **최종 업데이트**: 2026-01-17

---

## 1. 시스템 아키텍처 개요

- **Frontend**: Next.js (App Router) -> **Vercel** 배포
- **Backend**: NestJS (Monorepo) -> **Google Cloud Run** (Docker)
- **Database**: PostgreSQL -> **Supabase**
- **File Storage**: **AWS S3**

---

## 2. 배포 절차 (Deployment)

### 2.1 Frontend (Vercel)
GitHub `main` 브랜치에 푸시되면 자동으로 프로덕션 배포가 트리거됩니다.

```bash
# 수동 배포 (필요시)
cd apps/web
vercel --prod
```

### 2.2 Backend (Cloud Run)
GitHub Actions를 통해 자동 배포되거나, 로컬에서 Docker 이미지를 빌드하여 배포합니다.

```bash
# 1. Docker 이미지 빌드 (로컬)
docker build -f apps/api/Dockerfile -t gcr.io/ask-the-stars-484712/api:latest .

# 2. Container Registry 푸시
docker push gcr.io/ask-the-stars-484712/api:latest

# 3. Cloud Run 배포
gcloud run deploy ask-the-stars-api \
  --image gcr.io/ask-the-stars-484712/api:latest \
  --platform managed \
  --region asia-northeast3 \
  --allow-unauthenticated
```

---

## 3. 데이터베이스 운영

### 3.1 마이그레이션 (Migration)
스키마 변경 사항이 있을 경우 프로덕션 DB에 적용합니다.

```bash
# 마이그레이션 적용 (Bastion 또는 로컬)
pnpm db:migrate:deploy
```

### 3.2 백업 및 복구
- **자동 백업**: Supabase Point-in-Time Recovery (PITR) 활성화됨
- **수동 백업**:
  ```bash
  # Supabase CLI 사용
  supabase db dump > backup_20260117.sql
  ```

---

## 4. 모니터링 링크

| 서비스 | URL | 용도 |
|--------|-----|------|
| **Vercel** | [vercel.com/dashboard](https://vercel.com/dashboard) | 프론트엔드 상태, 빌드 로그 |
| **GCP Console** | [console.cloud.google.com](https://console.cloud.google.com) | 백엔드 인스턴스, 로그 |
| **Sentry** | [sentry.io](https://sentry.io) | 실시간 에러 트래킹 |
| **BetterStack** | [betterstack.com](https://betterstack.com) | 업타임 모니터링, 상태 페이지 |

---

## 5. 정기 점검 리스트 (매주 월요일)

- [ ] Sentry 에러 리포트 주간 트렌드 확인
- [ ] AWS S3 스토리지 사용량 점검 (불필요한 임시 파일 삭제)
- [ ] Supabase DB Connections 및 CPU 사용량 점검
- [ ] 사용자 문의(CS) 미처리 건 확인
