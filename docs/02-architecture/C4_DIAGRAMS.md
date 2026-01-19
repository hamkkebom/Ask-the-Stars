# 🏗️ C4 모델 다이어그램 (C4 Diagrams)

> **문서 버전**: 2026-01-19
> **기반**: `docs/02-architecture/OVERVIEW.md`

이 문서는 한깨봄 시스템의 구조를 **C4 모델(Context, Container, Component, Code)** 수준에 맞춰 시각화합니다.

---

## 1️⃣ Level 1: System Context Diagram (시스템 컨텍스트)

한깨봄 시스템이 외부 세계(사용자, 외부 서비스)와 어떻게 상호작용하는지 보여줍니다.

```mermaid
graph TD
    User([모든 사용자\n방문자/프리랜서/수강생]) --- Hankaebom[<b>한깨봄 플랫폼</b>\nNext.js + NestJS]
    Admin([관리자\n운영팀]) --- Hankaebom
    
    Hankaebom --- Email[Resend\n이메일 발송]
    Hankaebom --- Storage[Cloudflare\n영상 스토리지/전송]
    Hankaebom --- Auth[Supabase Auth\n인증]
```

---

## 2️⃣ Level 2: Container Diagram (컨테이너)

한깨봄 프로젝트의 물리적 구성 요소(애플리케이션, 데이터베이스)와 기술 스택을 보여줍니다.

```mermaid
graph TB
    subgraph Client [Client Side]
        Web[<b>Next.js 15 Web App</b>\nReact, TypeScript\nVercel Hosting]
    end

    subgraph Server [Google Cloud Run]
        API[<b>NestJS 11 Backend API</b>\nNode.js, Prisma\nSeoul Region]
    end

    subgraph Database [Data Layer]
        PSQL[(<b>PostgreSQL</b>\nSupabase Hosting)]
        Redis[(<b>Redis Cache</b>\nUpstash)]
    end

    subgraph External [External Services]
        Email[Resend API]
        R2[Cloudflare R2/Stream]
    end

    User([User]) --> Web
    Web -->|JSON/HTTPS| API
    API -->|Prisma ORM| PSQL
    API -->|Key-Value| Redis
    API -->|SMTP| Email
    API -->|S3/HLS| R2
```

---

## 3️⃣ Level 3: Component Diagram (컴포넌트 - API 서버)

백엔드 서버 내부의 주요 모듈 구조입니다.

```mermaid
graph LR
    Controller[Controllers\nRequest Handling] --> Service[Services\nBusiness Logic]
    Service --> Repository[Repositories\nData Access]
    Repository --> Prisma[Prisma Client]
    
    subgraph Modules
        AuthModule
        StarModule
        EduModule
        AdminModule
    end
```

---

## 4️⃣ 다음 단계
*   상세 인터페이스 정의: [API 가이드](../03-api/README.md)
*   데이터 구조: [데이터베이스 스키마](./DATABASE_SCHEMA.md)
