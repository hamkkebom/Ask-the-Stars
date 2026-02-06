# Shared Packages

## OVERVIEW
모노레포 공유 패키지. `@ask-the-stars/*` 네임스페이스. apps/web과 apps/api 양쪽에서 사용.

## PACKAGES

| 패키지 | 경로 | 용도 | 파일수 |
|--------|------|------|--------|
| `@ask-the-stars/database` | `database/` | Prisma ORM 스키마, 클라이언트, 마이그레이션 | schema 929줄, 33 모델 |
| `@ask-the-stars/types` | `types/` | 공유 TypeScript 타입 | 16 파일 (entities/, enums/, dto/) |
| `@ask-the-stars/ui` | `ui/` | 공유 React UI 컴포넌트 | 8 컴포넌트 |
| `@ask-the-stars/utils` | `utils/` | 공유 유틸리티 함수 | 5 파일 (validation, date, video, currency) |

## database/

```
database/
├── prisma/
│   ├── schema.prisma       # PostgreSQL 17 + pgvector (929줄, 33 모델)
│   └── schema.build.prisma # 빌드용 스키마
├── generated/
│   └── client/             # 자동 생성 Prisma 클라이언트 (수정 금지)
└── src/
    └── index.ts            # 패키지 엔트리포인트
```

- 스키마 변경 후 반드시: `pnpm db:generate` → `pnpm db:migrate`
- `generated/` 디렉토리 절대 수동 편집 금지
- `postinstall`에서 자동 `prisma generate` 실행
- binaryTargets: `["native", "debian-openssl-3.0.x"]` (Cloud Run 호환)
- pgvector 확장 활성화 (`extensions = [vector]`)

## types/

```
types/src/
├── entities/    # 도메인 엔티티 (User, Project, Video, Settlement, Feedback, Submission)
├── enums/       # UserRole, ProjectStatus, AssignmentType, FeedbackStatus
├── dto/         # 공유 DTO (auth, feedback, project)
└── index.ts     # 배럴 export
```

- `interface` = 모델/엔티티, `type` = 유틸리티
- 프론트/백엔드 양쪽 import
- UserRole: ADMIN, MOON_MANAGER, MOON_ADVERTISING, MOON_FEEDBACK, MOON_SETTLEMENT, STAR, COUNSELOR

## ui/

```
ui/src/components/
├── annotation-canvas.tsx   # Fabric.js 기반 캔버스
├── button.tsx
├── card.tsx
├── glass-card.tsx          # 글래스모피즘 카드
├── modal.tsx
├── skeleton.tsx
├── table.tsx
└── video-player.tsx
```

- `apps/web`의 `transpilePackages`에 등록됨
- RSC 호환성 확인 필요 (대부분 'use client')

## utils/

```
utils/src/
├── validation.ts   # 공통 유효성 검증
├── date.ts         # 날짜 포맷/계산
├── video.ts        # 영상 URL/메타데이터
├── currency.ts     # 통화 포맷
└── index.ts        # 배럴 export
```

- 환경 무관 (브라우저/Node 양쪽 동작)

## CONVENTIONS

- 새 패키지 추가 시: root `tsconfig.json` path alias + `pnpm-workspace.yaml` 확인
- 패키지 간 의존성: `workspace:*` 프로토콜 (api), `file:../../packages/*` (web)
- `generated/` 수동 편집 절대 금지
- web은 `file:` 프로토콜, api는 `workspace:*` 프로토콜 사용 (불일치 주의)
