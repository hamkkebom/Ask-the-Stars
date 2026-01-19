# 🌟 별들에게 물어봐 (Ask the Stars)

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](docs/CONTRIBUTING.md)
[![Node.js](https://img.shields.io/badge/Node.js-22_LTS-green?style=flat-square&logo=nodedotjs)](https://nodejs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.9-black?style=flat-square&logo=nextdotjs)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-11.1.12-e0234e?style=flat-square&logo=nestjs)](https://nestjs.com/)
[![Turbo](https://img.shields.io/badge/Turborepo-2.7.5-ef4444?style=flat-square&logo=turborepo)](https://turbo.build/)

<p align="center">
  <strong>사주천궁 영상 협업 플랫폼</strong><br>
  영상 제작자(스타)와 상담사를 위한 실시간 영상 피드백 & 협업 시스템
</p>

[문서](./docs/README.md) • [기술 스택](./docs/TECH_STACK.md) • [기여 가이드](./docs/CONTRIBUTING.md) • [배포](./docs/DEPLOYMENT.md)

</div>

---

## 📖 소개 (Introduction)

**별들에게 물어봐**는 영상 제작자(**스타**)와 상담사가 고품질 영상을 기반으로 실시간 소통하고 피드백을 주고받을 수 있는 전문 협업 플랫폼입니다.

### ✨ 주요 기능
- 🎬 **고화질 스트리밍**: Cloudflare R2 & Stream 기반의 끊김 없는 재생
- 💬 **타임스탬프 피드백**: 영상의 정확한 시점에 댓글 및 피드백 작성
- ✏️ **캔버스 드로잉**: 화면 위에 직접 그리는 직관적인 시각적 피드백
- 🔔 **실시간 협업**: WebSocket을 이용한 즉각적인 알림 및 상태 동기화
- 💰 **투명한 정산**: 상담 및 피드백 활동에 대한 자동화된 정산 시스템

---

## 🛠️ 기술 스택 (Tech Stack)

| 분류 | 기술 | 버전 |
|------|------|------|
| **Frontend** | ![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js) ![React](https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=react&logoColor=black) ![Tailwind](https://img.shields.io/badge/-Tailwind-38B2AC?style=flat-square&logo=tailwind-css) | 15.5.9 / 19.0.0 |
| **Backend** | ![NestJS](https://img.shields.io/badge/-NestJS-E0234E?style=flat-square&logo=nestjs) ![Prisma](https://img.shields.io/badge/-Prisma-2D3748?style=flat-square&logo=prisma) | 11.1.12 / 6.3.1 |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql) ![Redis](https://img.shields.io/badge/-Redis-DC382D?style=flat-square&logo=redis) | 17 / 7.4 (Upstash) |
| **Infra** | ![Vercel](https://img.shields.io/badge/-Vercel-000000?style=flat-square&logo=vercel) ![Cloud Run](https://img.shields.io/badge/-Cloud_Run-4285F4?style=flat-square&logo=google-cloud) | Serverless |
| **DevOps** | ![Pnpm](https://img.shields.io/badge/-Pnpm-F69220?style=flat-square&logo=pnpm) ![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker) | Monorepo (Turbo) |

👉 상세 기술 스택 확인: [docs/TECH_STACK.md](docs/TECH_STACK.md)

### 💡 기술 선정 배경 (Why this stack?)

| 기술 | 선정 이유 및 이점 |
|------|-------------------|
| **Next.js 15** | Server Components를 통한 **초기 로딩 속도 최적화** 및 SEO 강화 (상담사 프로필 노출) |
| **NestJS 11** | 모듈형 아키텍처로 협업 시 **코드 일관성 유지** 및 엔터프라이즈급 확장성 확보 |
| **Prisma** | 강력한 타입 안정성(Type-safety)으로 **런타임 에러 예방** 및 생산성 향상 |
| **Cloudflare R2** | AWS S3 대비 **대역폭(Egress) 비용 100% 절감** (영상 스트리밍 핵심) |
| **Supabase** | **서울 리전** 지원 및 데이터베이스와 인증(Auth) 통합 관리로 개발 효율 극대화 |

👉 [기술 스택 비교 분석 상세 보기](docs/TECH_STACK_COMPARISON.md)

---

## 🚀 빠른 시작 (Quick Start)

### 필수 요구사항
- Node.js 22 LTS
- pnpm 9.x
- Docker (로컬 DB 실행용)

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/hamkkebom/Ask-the-Stars.git
   cd Ask-the-Stars
   ```

2. **의존성 설치**
   ```bash
   pnpm install
   ```

3. **환경변수 설정**
   ```bash
   cp apps/web/.env.example apps/web/.env
   cp apps/api/.env.example apps/api/.env
   ```

4. **로컬 서비스 실행 (DB, Redis)**
   ```bash
   docker-compose up -d
   ```

5. **개발 서버 시작**
   ```bash
   pnpm dev
   ```
   - 프론트엔드: http://localhost:3000
   - 백엔드 API: http://localhost:4000
   - Prisma Studio: `pnpm db:studio`

---

## 📁 프로젝트 구조 (Monorepo)

```bash
ask-the-stars/
├── apps/
│   ├── web/              # Next.js 15 (프론트엔드)
│   └── api/              # NestJS 11 (백엔드)
├── packages/
│   ├── ui/               # shadcn/ui 기반 공유 컴포넌트
│   ├── types/            # 공유 TypeScript 타입 정의
│   └── utils/            # 공유 유틸리티 함수
├── docs/                 # 프로젝트 문서화
└── scripts/              # 개발 및 배포 스크립트
```

---

## � 주요 문서

프로젝트에 대한 자세한 정보는 `docs/` 폴더를 참조하세요.

- [� 문서 목차 (Index)](docs/DOCUMENT_INDEX.md)
- [� 기술 스택 (Tech Stack)](docs/TECH_STACK.md)
- [🚀 배포 가이드 (Deployment)](docs/DEPLOYMENT.md)
- [📝 기여 가이드 (Contributing)](docs/CONTRIBUTING.md)
- [📋 코딩 컨벤션 (Coding Convention)](docs/CODING_CONVENTION.md)

---

## 🤝 기여하기 (Contributing)

이 프로젝트는 오픈 소스 기여를 환영합니다. 새로운 기능을 제안하거나 버그를 리포트하려면 이슈를 생성해주세요. 자세한 내용은 [CONTRIBUTING.md](docs/CONTRIBUTING.md)를 참고하시기 바랍니다.

---

## 📄 라이선스 (License)

이 프로젝트는 [MIT License](LICENSE)에 따라 라이선스가 부여됩니다.

---

<div align="center">
  Generated by <b>Antigravity</b> 🚀
</div>
