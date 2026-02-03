# Shared Packages

## OVERVIEW
모노레포 공유 패키지. `@ask-the-stars/*` 네임스페이스. apps/web과 apps/api에서 공유.

## PACKAGES

| 패키지 | 경로 | 용도 |
|--------|------|------|
| `@ask-the-stars/database` | `database/` | Prisma ORM 스키마, 클라이언트, 마이그레이션 |
| `@ask-the-stars/types` | `types/` | 공유 TypeScript 타입 (entities/, enums/) |
| `@ask-the-stars/ui` | `ui/` | 공유 React UI 컴포넌트 (9개) |
| `@ask-the-stars/utils` | `utils/` | 공유 유틸리티 함수 (5개) |

## database/

```
database/
├── prisma/
│   └── schema.prisma    # PostgreSQL 17 스키마 (Supabase)
├── generated/
│   └── client/          # 자동 생성 Prisma 클라이언트 (수정 금지)
└── src/
    └── index.ts         # 패키지 엔트리포인트
```

- 스키마 변경 후 반드시: `pnpm db:generate` → `pnpm db:migrate`
- `generated/` 디렉토리는 자동 생성. 절대 수동 편집 금지
- `postinstall`에서 자동 Prisma generate 실행

## types/

```
types/src/
├── entities/    # 도메인 엔티티 타입 (User, Project, Video 등)
├── enums/       # 공유 enum (Role, Status 등)
└── index.ts     # 배럴 export
```

- `interface` = 모델/엔티티, `type` = 유틸리티
- 프론트/백엔드 양쪽에서 import

## ui/

```
ui/src/components/   # 9개 공유 UI 컴포넌트
```

- `apps/web`의 `transpilePackages`에 등록됨
- 프론트엔드 전용 (RSC 호환성 확인 필요)

## utils/

```
utils/src/           # 5개 공유 유틸리티
```

- 프론트/백엔드 공통 유틸리티
- 환경 무관 (브라우저/Node 양쪽 동작)

## CONVENTIONS

- 새 패키지 추가 시: root `tsconfig.json` path alias 등록 필요
- 패키지 간 의존성: `workspace:*` 프로토콜 사용
- `generated/` 파일 수동 편집 절대 금지
