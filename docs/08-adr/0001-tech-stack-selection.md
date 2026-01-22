# ADR 0001: 기술 스택 선정 (함께봄)

> **날짜**: 2026-01-19
> **상태**: 승인됨 (Accepted)
> **대상**: 함께봄 플랫폼 코어 아키텍처

---

## 1. 배경 (Context)

함께봄 프로젝트는 교육, 프리랜서 매칭, 마케팅 대행을 포함하는 복합 생태계 플랫폼입니다. 초기에는 다양한 기술 스택(Spring, Fast API 등)이 논의되었으나, 효율적인 유지보수와 빠른 개발 속도, 그리고 동일 언어 기반의 풀스택 개발 환경을 위해 새로운 기술 스택을 결정해야 했습니다.

---

## 2. 결정 (Decision)

우리는 **TypeScript** 기반의 모노레포 아키텍처를 최종적으로 선택했습니다.

*   **Frontend**: [Next.js 15 (App Router)](https://nextjs.org/)
    *   이유: 강력한 SEO 지원 및 React 19의 최신 기능(Server Components) 활용
*   **Backend**: [NestJS 11](https://nestjs.com/)
    *   이유: TypeScript 기반의 체계적인 모듈 아키텍처 및 기업용 확장성
*   **Database**: [Prisma ORM](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/)
    *   이유: 타입 안전한 데이터 접근 및 직관적인 스키마 관리
*   **Infra**: [Vercel](https://vercel.com/) (Web) + [Google Cloud Run](https://cloud.google.com/run) (API)
    *   이유: 서버리스 기반의 비용 효율적인 운영 및 서울 리전 지원

---

## 3. 대안 비교 (Alternatives)

| 대안 | 장점 | 단점 | 선정 여부 |
|---|---|---|---|
| **Spring Boot** | 생태계가 매우 크고 안정적임 | 생산 속도가 상대적으로 느리고 인프라 비용이 높음 | ❌ |
| **FastAPI** | AI 연동(Python)에 매우 유리함 | 웹 서비스 전반의 체계적인 아키텍처 구축이 번거로움 | ❌ |
| **Next.js (API Routes)** | 프론트-백엔드 완전 통합 | 비즈니스 로직이 복잡해질 경우 모듈화 및 관리가 어려움 | ❌ |

---

## 4. 결과 (Consequences)

### 긍정적 효과
*   **언어 단일화**: 전 직원이 TypeScript 하나로 프론트/백엔드 모두 참여 가능
*   **코드 공유**: `packages/types`를 통해 API DTO 타입을 프론트엔드와 실시간 공유
*   **배포 자동화**: Vercel과 Cloud Run을 통한 무중단 배포 환경 구축
*   **실시간 확장성**: Redis 어댑터를 통한 Socket.io 수평 확장 대응 (2026-01-21 업데이트)

### 잠재적 위험
*   **Cold Start**: Cloud Run의 인스턴스 기동 지연 (Warm-up 스크립트 필요)
*   **Monorepo 복잡도**: 프로젝트 규모가 커짐에 따라 Turborepo 관리 역량 필요
