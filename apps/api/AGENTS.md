# Backend (NestJS 11)

## OVERVIEW
NestJS 11 백엔드 API. 18개 도메인 모듈, Prisma ORM, JWT+Passport+Supabase 인증, Socket.io 실시간, BullMQ 큐.

## MODULES

```
src/modules/
├── auth/          # JWT + Passport (login, signup, refresh, logout). strategies/jwt.strategy.ts
├── users/         # 사용자 CRUD, 프로필
├── projects/      # 프로젝트 생성/매칭. dto/create-project-request.dto.ts
├── videos/        # 영상 CRUD + Cloudflare Stream webhook (712줄 service — 분리 필요)
├── submissions/   # 과제 제출. dto/generate-upload-url.dto.ts
├── feedback/      # 영상 피드백 (타임코드 마킹)
├── portfolios/    # 포트폴리오 CRUD (create, update DTOs)
├── settlements/   # 1차/2차 정산 관리
├── uploads/       # 파일 업로드 (R2/Stream presigned URL)
├── resources/     # 학습 리소스 (create, update DTOs)
├── leads/         # 리드 수집 (설명회 신청). dto/create-lead.dto.ts
├── chat/          # 실시간 채팅 (Socket.io Gateway)
├── notifications/ # 실시간 알림 (Socket.io Gateway)
├── mail/          # 이메일 발송 (Resend API)
├── cloudflare/    # Stream/R2 서비스 (544줄 — 어댑터 분리 필요)
├── ai/            # AI 기능 (Google Generative AI + OpenAI)
├── analytics/     # 분석 데이터
└── ffprobe/       # 미디어 분석 (fluent-ffmpeg)
```

## ARCHITECTURE

```
Controller → Service → (Repository) → Prisma
     ↓
   DTO (class-validator + Zod)
```

- **Controller**: 라우팅 + 요청/응답만. 비즈니스 로직 금지
- **Service**: 순수 비즈니스 로직
- **Repository**: Prisma 캡슐화 (Service→Prisma 직접 호출 지양)
- **DTO**: class-validator 데코레이터. Request/Response 분리
- **Guard**: `JwtAuthGuard` → `@UseGuards(JwtAuthGuard)`
- **Decorator**: `@CurrentUser()` → 현재 인증 사용자

## WHERE TO LOOK

| 작업 | 위치 |
|------|------|
| 엔트리포인트 | `src/main.ts` (dev:4000, prod:8080) |
| 루트 모듈 | `src/app.module.ts` |
| Prisma 서비스 | `src/database/prisma.service.ts` |
| JWT 전략 | `src/modules/auth/strategies/jwt.strategy.ts` |
| 인증 가드 | `src/common/guards/jwt-auth.guard.ts` |
| 역할 가드 | `src/common/guards/roles.guard.ts` |
| 역할 데코레이터 | `src/common/decorators/roles.decorator.ts` |
| 현재 유저 | `src/common/decorators/current-user.decorator.ts` |
| Redis 어댑터 | `src/common/adapters/redis-io.adapter.ts` |
| HTTP 예외 필터 | `src/common/filters/http-exception.filter.ts` |
| Sentry | `src/common/sentry.ts` |
| BetterStack 로거 | `src/common/betterstack-logger.ts` |
| 헬스체크 | `src/common/health.controller.ts` |
| Cloudflare webhook | `src/modules/videos/webhook.controller.ts` |
| Swagger | `/api/v1/docs` (NestJS Swagger) |

## CONVENTIONS (API 전용)

- **API Prefix**: `/api` (excludes `/health`, `/`)
- **API Versioning**: URI Versioning `/api/v1/*`
- **CORS**: localhost:3000/3001, hamkkebom.com
- **Validation**: `ValidationPipe` 글로벌 (whitelist, forbidNonWhitelisted)
- **인증**: `@UseGuards(JwtAuthGuard)` + `@CurrentUser()`
- **WebSocket**: Socket.io + Redis adapter (Upstash)
- **큐**: BullMQ (백그라운드 작업)
- **이메일**: Resend API
- **AI**: Google Generative AI + OpenAI 듀얼
- **비밀번호**: argon2 + bcrypt 병행
- **any 허용**: DTO에서만 예외적 허용

## ANTI-PATTERNS (API 전용)

- Controller에 비즈니스 로직 금지 → Service 분리
- Service에서 직접 Prisma 호출 지양 → Repository 패턴
- NestJS field injection 금지 → constructor injection 사용
- `DROP/TRUNCATE/DELETE FROM` (WHERE 없이) 프로덕션 금지

## NOTES

- **포트**: 개발 4000, Cloud Run 8080
- **테스트**: Jest 29 + @nestjs/testing. 커버리지 93.57%
- **videos 아키텍처**: VideosService(Facade) → VideoQueryService, VideoMutationService, VideoSyncService, VideoStorageService
- **settlements**: RoleGuard 구현 완료 (@UseGuards + @Roles)
- **feedback**: canUpdateFeedback 권한 로직 구현 완료
- **auth**: token refresh 구현 완료 (AuthService.refresh)
- **Firebase Admin**: 푸시 알림용 (firebase-admin 패키지)
