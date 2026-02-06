# 함께봄 (Hamkkebom) - AI 영상 제작 인재 생태계 플랫폼

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![CI](https://github.com/hamkkebom/Ask-the-Stars/actions/workflows/ci.yml/badge.svg)](https://github.com/hamkkebom/Ask-the-Stars/actions/workflows/ci.yml)
[![CD API](https://github.com/hamkkebom/Ask-the-Stars/actions/workflows/cd-api.yml/badge.svg)](https://github.com/hamkkebom/Ask-the-Stars/actions/workflows/cd-api.yml)
[![CD Web](https://github.com/hamkkebom/Ask-the-Stars/actions/workflows/cd-web.yml/badge.svg)](https://github.com/hamkkebom/Ask-the-Stars/actions/workflows/cd-web.yml)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.1.12-red)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.3.1-black)](https://www.prisma.io/)
[![Zod](https://img.shields.io/badge/Zod-3.24.1-blue)](https://zod.dev/)

> AI 영상 제작 교육부터 프리랜서 매칭, 공모전, 마케팅 대행까지 통합한 종합 영상 제작 생태계 플랫폼

함께봄은 AI 영상 제작 인재를 육성하고, 100명 이상의 프리랜서와 500명 이상의 상담사를 연결하며, 교육-제작-마케팅을 통합한 순환 구조의 비즈니스 플랫폼입니다. Next.js 15와 NestJS 11 기반의 모노레포 아키텍처로 구축되었습니다.

## Table of Contents

- [Background](#background)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Install](#install)
- [Usage](#usage)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Background

### 비즈니스 모델

한깨봄은 **"AI 영상 제작 인재 생태계 + 종합 마케팅"** 모델을 기반으로 합니다:

```
┌─────────────────────────────────────────────────────────────┐
│                       순환 구조                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   [교육] ───→ [프리랜서 150명+] ───→ [영상 제작]            │
│   💰 교육비          ↑                    ↓                 │
│       ↑         [공모전]              [마케팅]              │
│       │          발굴                    ↓                  │
│       └────────── 대행업체 ←── 상담사 500명 ────┘           │
│                  (고정 클라이언트)                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 수익 구조

- **수익 1**: 교육비 (유료 AI 영상 제작 교육)
- **수익 2**: 제작비 (AI 스튜디오 서비스)
- **수익 3**: 마케팅 대행비 (종합 마케팅 서비스)
- **고정 클라이언트**: 대행업체 (상담사 500명 관리)

### 핵심 가치

이 플랫폼은 다음과 같은 문제를 해결합니다:

- AI 영상 제작 인재의 체계적 육성 및 취업 연계
- 프리랜서와 클라이언트 간의 효율적인 매칭
- 영상 제작부터 마케팅까지 원스톱 서비스 제공
- 투명한 정산 시스템과 품질 관리

## Features

### 🎓 교육 (Education)

- 무료 설명회 및 유료 정규 과정 운영
- AI 영상제작 기초반 (2급) / AI 퍼스널마케팅 심화반 (1급)
- LMS 기반 강의실 및 과제 관리
- 수료 후 프리랜서 전환 지원

### ⭐ 프리랜서 (별들에게 물어봐)

- 제작요청 게시판 및 프로젝트 매칭
- 실시간 영상 업로드 및 피드백 시스템
- 투명한 1차/2차 정산 관리
- 포트폴리오 및 성과 관리

### 🎬 AI 스튜디오

- AI 크리에이터 기반 영상 제작 서비스
- B2B 클라이언트 프로젝트 관리
- 포트폴리오 갤러리 및 서비스 안내 (준비 중)

### 📊 마케팅 대행

- 대행업체 대상 종합 마케팅 서비스
- 상담사 500명 관리 및 성과 추적 (준비 중)

### 🏆 AI 공모전

- 공모전 개최 및 출품작 관리
- 우수 인재 발굴 및 스카우트

### 👤 관리자 (Admin)

- 모듈별 담당자 권한 관리 (RBAC)
- 통합 대시보드 및 할일 관리
- 인재 허브 (150명+), 클라이언트 관리
- 재무 대시보드 및 통합 정산

### 🎥 영상 브라우저

- Netflix 스타일의 영상 탐색 (Advanced Grid)
- Plyr + HLS.js 기반 스트리밍 플레이어
- Fabric.js 기반 Canvas 마킹 시스템

## Architecture

### System Architecture (C4 Model - Level 1: Context)

```mermaid
graph TD
    User([사용자]) -->|HTTPS| CDN[Cloudflare CDN]
    CDN -->|Next.js App| Vercel[Vercel Frontend<br/>Seoul PoP]
    CDN -->|Images/Videos| R2[Cloudflare R2 & Stream]
    
    Vercel -->|API Calls| CloudRun[Google Cloud Run<br/>Backend API<br/>Seoul asia-northeast3]
    
    subgraph Data Layer
        CloudRun -->|Prisma ORM| DB[(Supabase PostgreSQL<br/>Seoul ap-northeast-2)]
        CloudRun -->|Cache & Adapter| Redis[(Upstash Redis<br/>Tokyo)]
    end
    
    subgraph Services
        CloudRun -->|Auth| Passport[Passport.js]
        CloudRun -->|Email| Resend[Resend API]
        CloudRun -->|Queue| BullMQ[BullMQ]
        CloudRun -->|WebSocket| Socket[Socket.io]
    end
    
    subgraph Monitoring
        Vercel -.->|Error Tracking| Sentry[Sentry]
        CloudRun -.->|Error Tracking| Sentry
    end
```

### Container Architecture (C4 Model - Level 2)

```mermaid
graph TB
    subgraph Frontend Container
        NextJS[Next.js 15<br/>App Router]
        React[React 19]
        Zustand[Zustand<br/>State Management]
        TanStack[TanStack Query<br/>Server State]
    end
    
    subgraph Backend Container
        NestJS[NestJS 11<br/>API Server]
        Prisma[Prisma ORM]
        SocketIO[Socket.io Server]
        BullMQ[BullMQ Queue]
    end
    
    subgraph Video Container
        Plyr[Plyr Player]
        HLS[HLS.js Streaming]
        Fabric[Fabric.js Canvas]
    end
    
    NextJS --> NestJS
    NextJS --> Plyr
    NestJS --> Prisma
    NestJS --> SocketIO
    NestJS --> BullMQ
```

### Sitemap Overview

```mermaid
graph LR
    Root[/ 그룹사 메인] --> About[/about 회사소개]
    Root --> Admin[/admin 관리자]
    Root --> Stars[/stars 프리랜서]
    Root --> Studio[/studio AI스튜디오]
    Root --> Marketing[/marketing 마케팅대행]
    Root --> Education[/education 교육]
    Root --> Contests[/contests 공모전]
    Root --> Videos[/videos 영상브라우저]
    
    Admin --> AdminStars[/admin/stars]
    Admin --> AdminStudio[/admin/studio]
    Admin --> AdminMarketing[/admin/marketing]
    Admin --> AdminEducation[/admin/education]
    Admin --> AdminContests[/admin/contests]
    Admin --> AdminFinance[/admin/finance]
    
    Stars --> Dashboard[/stars/dashboard]
    Stars --> ProjectBoard[/stars/project-board]
    Stars --> MyProjects[/stars/my-projects]
    Stars --> Earnings[/stars/earnings]
    
    Education --> Session[/education/session]
    Education --> Courses[/education/courses]
    Education --> LMS[/education/lms]
```

## Tech Stack

### Frontend

| 기술 | 버전 | 용도 |
|------|------|------|
| Next.js | 15.5.9 | React 프레임워크 (App Router) |
| React | 19.0.0 | UI 라이브러리 |
| TypeScript | 5.7.2 | 타입 안전성 |
| TailwindCSS | 4.0.8 | 유틸리티 CSS 프레임워크 |
| Zustand | 5.0.10 | 상태 관리 |
| TanStack Query | 5.62.7 | 서버 상태 관리 |
| Plyr | 3.8.4 | 영상 플레이어 |
| HLS.js | 1.6.15 | HLS 스트리밍 |
| Fabric.js | 6.9.1 | Canvas 마킹 시스템 |
| Socket.io Client | 4.8.3 | WebSocket 클라이언트 |
| Lucide React | 0.469.0 | 아이콘 라이브러리 |

### Backend

| 기술 | 버전 | 용도 |
|------|------|------|
| NestJS | 11.1.12 | Node.js 프레임워크 |
| Node.js | 22.x (LTS) | JavaScript 런타임 |
| Prisma | 6.3.1 | ORM (Object-Relational Mapping) |
| PostgreSQL | 17 | 관계형 데이터베이스 |
| BullMQ | 5.66.5 | 작업 큐 |
| Socket.io | 4.8.3 | WebSocket 서버 |
| class-validator | 0.14.1 | DTO 유효성 검증 |
| Passport | 0.7.0 | 인증 미들웨어 |
| Zod | 3.24.1 | 스키마 검증 (표준화) |

### Infrastructure

| 서비스 | 용도 | 리전 | 월 비용 | 상태 |
|--------|------|------|---------|:----:|
| Vercel | 프론트엔드 호스팅 | 서울 PoP | $0 | ✅ |
| Google Cloud Run | 백엔드 호스팅 | 서울 (asia-northeast3) | $0 (3개월 무료) | ✅ |
| Supabase | PostgreSQL + Auth | 서울 (ap-northeast-2) | $25 | ✅ |
| Upstash | Redis 캐시 | 도쿄 | $0 (Free Tier) | ✅ |
| Cloudflare Stream | 영상 스트리밍 (Primary) | CDN | $5 | ✅ |
| Cloudflare R2 | 영상 스토리지 (Fallback/Origin) | CDN | $0 | ✅ |
| Resend | 이메일 발송 | - | $0 (Free Tier) | ✅ |
| Sentry | 에러 추적 | - | $0 (5,000 errors/월) | ✅ |

**총 월 비용: $30 (예상)**

### Development Tools

| 도구 | 버전 | 용도 |
|------|------|------|
| pnpm | 9.x | 패키지 매니저 |
| Turborepo | 2.7.5 | 모노레포 빌드 시스템 |
| ESLint | 9.17.0 | JavaScript/TypeScript 린터 |
| Prettier | 3.8.0 | 코드 포매터 |
| Vitest | 2.1.8 | 프론트엔드 테스트 (17 test files, **94.72% coverage**) |
| Jest | 29.7.0 | 백엔드 테스트 (13 test files, **93.57% coverage**) |
| Playwright | 1.58.1 | E2E 테스트 (12 test suites) |
| k6 | 0.x | 부하 테스트 (5 scenarios) |
| Lighthouse CI | 0.15.1 | 성능 모니터링 (자동화) |
| Husky | 9.1.7 | Git hooks (pre-commit, commit-msg) |
| lint-staged | 16.2.7 | 스테이징된 파일 린트 |
| commitlint | 20.4.1 | Conventional Commits 검증 |
| Docker Compose | - | 로컬 개발 환경 |

### Quality & Security

| 항목 | 상태 | 상세 |
|------|------|------|
| **테스트 커버리지** | ✅ **94%** | Frontend 94.72%, Backend 93.57% |
| **보안 취약점** | ✅ **0개** | 프로덕션 의존성 (2 low in devDependencies) |
| **성능 모니터링** | ✅ 자동화 | Lighthouse CI (PR마다 실행) |
| **코드 품질** | ✅ 자동화 | Pre-commit hooks + Commitlint |
| **API 버전 관리** | ✅ 구현됨 | URI Versioning (/api/v1/*) |
| **CI/CD** | ✅ GitHub Actions | 테스트, 린트, 빌드, 배포, 보안 스캔 |

## Project Structure

```
ask-the-stars/
├── apps/
│   ├── web/                    # Next.js 15 프론트엔드
│   │   ├── app/                # App Router
│   │   ├── components/         # React 컴포넌트
│   │   ├── lib/                # 유틸리티 함수
│   │   └── public/             # 정적 파일
│   └── api/                    # NestJS 11 백엔드
│       ├── src/
│       │   ├── modules/        # 기능별 모듈
│       │   ├── common/         # 공통 모듈
│       │   └── prisma/         # Prisma 설정
│       └── test/               # 테스트
├── packages/
│   ├── ui/                     # 공유 UI 컴포넌트
│   ├── types/                  # TypeScript 타입 정의
│   └── utils/                  # 유틸리티 함수
├── docs/                       # 프로젝트 문서
│   ├── TECH_STACK.md
│   ├── SITEMAP.md
│   ├── DEPLOYMENT.md
│   ├── CODING_CONVENTION.md
│   └── CONTRIBUTING.md
├── scripts/                    # 빌드/배포 스크립트
├── docker-compose.yml          # 로컬 개발 환경
├── turbo.json                  # Turborepo 설정
└── package.json                # 루트 패키지
```

## Prerequisites

시스템 요구사항:

- **Node.js**: 22.x (LTS)
- **pnpm**: 9.x 이상
- **PostgreSQL**: 17 이상 (로컬 개발 시)
- **Redis**: 최신 버전 (로컬 개발 시)
- **Docker**: 최신 버전 (선택사항, 로컬 환경 구성 시)

## Install

### 1. 저장소 클론

```bash
git clone https://github.com/hamkkebom/Ask-the-Stars.git
cd ask-the-stars
```

### 2. 의존성 설치

```bash
pnpm install
```

### 3. 환경 변수 설정

루트 디렉토리에 `.env` 파일 생성:

```bash
cp .env.example .env
```

필수 환경 변수 설정 (자세한 내용은 [Environment Variables](#environment-variables) 참조):

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/hamkkebom"

# JWT
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"

# API
NEXT_PUBLIC_API_URL="http://localhost:4000"

# Email
RESEND_API_KEY="your-resend-api-key"

# Cloudflare
CLOUDFLARE_ACCOUNT_ID="your-account-id"
CLOUDFLARE_R2_ACCESS_KEY="your-access-key"
CLOUDFLARE_R2_SECRET_KEY="your-secret-key"
```

### 4. 데이터베이스 마이그레이션

```bash
cd apps/api
pnpm run db:generate
pnpm prisma migrate dev
```

### 5. 로컬 개발 환경 (Docker 사용 시)

```bash
docker-compose up -d
```

## Usage

### 개발 서버 실행

모든 애플리케이션 동시 실행:

```bash
pnpm dev
```

개별 애플리케이션 실행:

```bash
# 프론트엔드만
pnpm dev --filter=web

# 백엔드만
pnpm dev --filter=api
```

접속 URL:

- **프론트엔드**: <http://localhost:3000>
- **백엔드 API**: <http://localhost:4000>
- **API 문서**: <http://localhost:4000/api/docs>

### 빌드

```bash
# 전체 빌드
pnpm build

# 개별 빌드
pnpm build --filter=web
pnpm build --filter=api
```

### 테스트

```bash
# 전체 테스트 (Unit + Integration)
pnpm test

# 프론트엔드 테스트 (Vitest)
pnpm test --filter=web              # 17 test files
pnpm test --filter=web -- --coverage # 94.72% coverage

# 백엔드 테스트 (Jest)
pnpm test --filter=api              # 13 test files
pnpm test --filter=api -- --coverage # 93.57% coverage

# E2E 테스트 (Playwright)
pnpm e2e                            # Headless 모드
pnpm e2e:headed                     # UI 모드

# 성능 테스트 (Lighthouse CI)
pnpm lighthouse                     # 성능, 접근성, SEO 측정
pnpm lighthouse:desktop             # 데스크탑 프리셋

# 부하 테스트 (k6) - k6 설치 필요
pnpm load:auth                      # Auth 엔드포인트
pnpm load:videos                    # Videos 엔드포인트
pnpm load:full                      # 전체 시나리오

# 보안 감사
pnpm security:audit                 # npm audit (moderate+)
pnpm security:check                 # 프로덕션만
pnpm security:fix                   # 자동 수정
```

### 린트 및 포맷

```bash
# 린트 검사
pnpm lint

# 린트 자동 수정
pnpm lint:fix

# 코드 포맷팅
pnpm format
```

### CI/CD

프로젝트는 GitHub Actions를 통해 자동화되어 있습니다:

- **CI (Continuous Integration)**: PR마다 테스트, 린트, 빌드, 보안 스캔 실행
- **Lighthouse**: PR마다 성능 리포트 생성
- **Security**: 매주 취약점 스캔 (Dependabot)
- **CD (Continuous Deployment)**:
  - `main` 브랜치 푸시 시 Vercel (프론트엔드) + Cloud Run (백엔드) 자동 배포

## Deployment

### Vercel (프론트엔드)

```bash
cd apps/web
vercel --prod
```

### Google Cloud Run (백엔드)

```bash
cd apps/api
gcloud run deploy api \
  --source . \
  --platform managed \
  --region asia-northeast3 \
  --allow-unauthenticated
```

자세한 배포 가이드는 [DEPLOYMENT.md](./docs/DEPLOYMENT.md)를 참조하세요.

## Environment Variables

### 프론트엔드 (apps/web/.env)

| 변수명 | 설명 | 필수 |
|--------|------|:----:|
| `NEXT_PUBLIC_API_URL` | 백엔드 API 엔드포인트 | ✅ |
| `NEXT_PUBLIC_SOCKET_URL` | WebSocket 서버 URL | ✅ |
| `NEXT_PUBLIC_CDN_URL` | Cloudflare CDN URL | ✅ |

### 백엔드 (apps/api/.env)

| 변수명 | 설명 | 필수 |
|--------|------|:----:|
| `DATABASE_URL` | PostgreSQL 연결 문자열 | ✅ |
| `REDIS_URL` | Redis 연결 문자열 | ✅ |
| `JWT_SECRET` | JWT 서명 비밀키 | ✅ |
| `JWT_EXPIRES_IN` | JWT 만료 시간 | ✅ |
| `RESEND_API_KEY` | Resend 이메일 API 키 | ✅ |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 계정 ID | ✅ |
| `CLOUDFLARE_R2_ACCESS_KEY` | R2 액세스 키 | ✅ |
| `CLOUDFLARE_R2_SECRET_KEY` | R2 시크릿 키 | ✅ |
| `CLOUDFLARE_SIGNING_KEY_ID` | Stream 서명 키 ID | ✅ |
| `CLOUDFLARE_SIGNING_KEY_PEM` | Stream 서명 Private Key (RSA) | ✅ |
| `SENTRY_DSN` | Sentry 에러 추적 DSN | ⚠️ |

## API Documentation

### API Versioning

API는 **URI Versioning** 전략을 사용합니다:

- **Current Version**: `/api/v1/*` (모든 엔드포인트)
- **Legacy Support**: `/api/*` → `/api/v1/*` (HTTP 308 Redirect)
- **Swagger UI**: <http://localhost:4000/api/v1/docs>
- **OpenAPI JSON**: <http://localhost:4000/api/v1/docs-json>

### Authentication

모든 API 요청은 JWT 토큰을 사용합니다:

```bash
Authorization: Bearer <access_token>
```

### 주요 엔드포인트 (v1)

#### 인증 (Auth)

```http
POST /api/v1/auth/login
POST /api/v1/auth/signup
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
```

#### 프리랜서 (Stars)

```http
GET /api/v1/stars/projects
GET /api/v1/stars/projects/:id
POST /api/v1/stars/projects/:id/apply
POST /api/v1/stars/videos/upload
GET /api/v1/stars/earnings
```

#### 관리자 (Admin)

```http
GET /api/v1/admin/dashboard
GET /api/v1/admin/talent
GET /api/v1/admin/clients
GET /api/v1/admin/finance/revenue
POST /api/v1/admin/projects/create
```

#### 영상 (Videos)

```http
GET /api/v1/videos
GET /api/v1/videos/:id
POST /api/v1/videos/:id/feedback
```

### 문서 링크

- **Swagger UI**: <http://localhost:4000/api/v1/docs> (인터랙티브 API 문서)
- **API Versioning Guide**: [docs/03-api/VERSIONING.md](./docs/03-api/VERSIONING.md)
- **Testing Guide**: [docs/04-development/TESTING.md](./docs/04-development/TESTING.md)

## Contributing

기여를 환영합니다! 기여 방법은 [CONTRIBUTING.md](./docs/CONTRIBUTING.md)를 참조하세요.

### Quick Start

1. 이 저장소를 Fork 합니다
2. 새로운 브랜치를 생성합니다

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. 변경사항을 커밋합니다 (Conventional Commits 형식)

   ```bash
   git commit -m 'feat: add amazing feature'
   ```

4. 브랜치에 Push 합니다

   ```bash
   git push origin feature/amazing-feature
   ```

5. Pull Request를 생성합니다

### Commit Convention

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 형식을 따릅니다:

- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 스타일 변경 (포맷팅)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 설정, 패키지 매니저 등

### Code of Conduct

이 프로젝트는 [Contributor Covenant](./docs/CODE_OF_CONDUCT.md) 행동 강령을 따릅니다.

## License

[MIT](LICENSE) © 함께봄 (Hamkkebom)

---

**Made with ❤️ by Hamkkebom Team**
