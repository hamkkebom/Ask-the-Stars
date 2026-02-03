# Backend (NestJS 11)

## OVERVIEW
NestJS 11 백엔드 API. 18개 도메인 모듈, Prisma ORM, JWT+Passport 인증, Socket.io 실시간.

## MODULES

```
src/modules/
├── auth/          # JWT + Passport 인증 (login, signup, refresh, logout)
├── users/         # 사용자 CRUD, 프로필 관리
├── projects/      # 프로젝트 생성/매칭/관리
├── videos/        # 영상 CRUD + Cloudflare Stream webhook
├── submissions/   # 과제 제출 관리
├── feedback/      # 영상 피드백 (타임코드 마킹)
├── portfolios/    # 포트폴리오 CRUD
├── settlements/   # 1차/2차 정산 관리
├── uploads/       # 파일 업로드 (Cloudflare R2/Stream)
├── resources/     # 학습 리소스
├── leads/         # 리드 수집 (설명회 신청)
├── chat/          # 실시간 채팅 (Socket.io Gateway)
├── notifications/ # 실시간 알림 (Socket.io Gateway)
├── mail/          # 이메일 발송 (Resend API)
├── cloudflare/    # Cloudflare Stream/R2 서비스
├── ai/            # AI 기능 (OpenAI)
├── analytics/     # 분석 데이터
└── common/        # 공통 (guards, decorators, adapters)
```

## ARCHITECTURE PATTERN

```
Controller → Service → (Repository) → Prisma
     ↓
   DTO (class-validator)
```

- **Controller**: 라우팅 + 요청/응답 처리만. 비즈니스 로직 금지
- **Service**: 순수 비즈니스 로직
- **Repository**: Prisma 접근 캡슐화 (Service에서 직접 Prisma 호출 지양)
- **DTO**: class-validator 데코레이터로 검증. Request/Response 분리
- **Guard**: `JwtAuthGuard` → `@UseGuards(JwtAuthGuard)`
- **Decorator**: `@CurrentUser()` → 현재 인증 사용자

## WHERE TO LOOK

| 작업 | 위치 |
|------|------|
| 엔트리포인트 | `src/main.ts` (port 4000/8080) |
| 루트 모듈 | `src/app.module.ts` |
| Prisma 서비스 | `src/database/prisma.service.ts` |
| JWT 전략 | `src/modules/auth/strategies/jwt.strategy.ts` |
| 인증 가드 | `src/common/guards/jwt-auth.guard.ts` |
| 현재 유저 데코레이터 | `src/common/decorators/current-user.decorator.ts` |
| Redis 어댑터 | `src/common/adapters/redis-io.adapter.ts` |
| Sentry 설정 | `src/common/sentry.ts` |
| 헬스체크 | `src/common/health.controller.ts` |
| Cloudflare webhook | `src/modules/videos/webhook.controller.ts` |

## CONVENTIONS

- **API Prefix**: `/api` (excludes `/health`, `/`)
- **CORS**: localhost:3000/3001, hamkkebom.com
- **Validation**: `ValidationPipe` 글로벌 적용 (whitelist, forbidNonWhitelisted)
- **인증**: 모든 보호 라우트에 `@UseGuards(JwtAuthGuard)` + `@CurrentUser()`
- **WebSocket**: Socket.io + Redis adapter (Upstash)
- **큐**: BullMQ (백그라운드 작업)
- **이메일**: Resend API
- **any 허용**: 백엔드 DTO에서 예외적 허용 (프론트 금지)

## ANTI-PATTERNS

- Controller에 비즈니스 로직 금지
- Service에서 직접 Prisma 호출 지양 → Repository 패턴
- NestJS field injection 금지 → constructor injection 사용
- `DROP/TRUNCATE/DELETE FROM` (production without WHERE) 절대 금지

## NOTES

- **포트**: 개발 4000, Cloud Run 8080
- **테스트**: Jest 29 + @nestjs/testing. 테스트 파일 미구현
- **TODO**: videos controller 로직 → service 이동 필요
- **TODO**: settlements RoleGuard 미구현
- **TODO**: feedback permission 로직 리팩토링 필요
- **TODO**: auth token refresh 로직 미구현
