# 💻 로컬 개발 환경 (Local Setup)

> **문서 버전**: 2026-01-19

이 문서는 로컬에서 데이터베이스(DB)와 백엔드 서비스를 실행하기 위한 상세 설정을 다룹니다.

---

## 1️⃣ 환경 변수 설정 (`.env`)
루트 디렉토리의 `.env` 파일은 다음 구조를 따라야 합니다.
(`cp .env.example .env` 후 수정)

### 필수 변수
```env
# Database (Prisma)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/hamkkebom?schema=public"

# Frontend (Next.js)
NEXT_PUBLIC_API_URL="http://localhost:4000"

# Backend (NestJS)
JWT_SECRET="local_dev_secret_key"
PORT=4000
```

### 선택 변수 (외부 서비스 연동 시)
```env
# Supabase & Cloudflare (로컬 개발 시 선택 사항)
SUPABASE_URL="..."
SUPABASE_ANON_KEY="..."
CLOUDFLARE_R2_ACCESS_KEY_ID="..."
CLOUDFLARE_R2_SECRET_ACCESS_KEY="..."
```

---

## 2️⃣ 데이터베이스 & Redis 실행 (Docker)
로컬 개발 환경에서는 Docker Compose를 사용하여 PostgreSQL과 Redis를 실행하는 것을 권장합니다.

### 실행
```bash
docker-compose up -d
```
> **구성 요소**:
> *   PostgreSQL (5432 포트)
> *   Redis (6379 포트)

### 중지
```bash
docker-compose down
```

---

## 3️⃣ 데이터베이스 초기화 (Prisma)
DB 컨테이너가 실행 중인 상태에서 다음 명령어로 스키마를 동기화합니다.

```bash
cd apps/api

# 마이그레이션 적용
pnpm prisma migrate dev

# Prisma Client 생성
pnpm prisma generate

# (선택) 시드 데이터 주입
pnpm prisma db seed
```

---

## 4️⃣ 전체 실행 확인
이제 3가지 요소가 모두 준비되었습니다.
1.  **Docker**: DB/Redis 실행 중
2.  **API**: `http://localhost:4000` (NestJS)
3.  **Web**: `http://localhost:3000` (Next.js)

`pnpm dev` 명령어로 통합 실행하여 확인하세요.
