---
name: Safe DB Migration
description: Procedure for safe database migrations with Prisma
---

# Safe DB Migration (Prisma)

데이터베이스 스키마 변경 시 안전을 위해 다음 절차를 따릅니다.

## 1. 스키마 변경
`packages/database/prisma/schema.prisma` 파일을 수정합니다.

## 2. 마이그레이션 생성 (개발 환경)
```bash
# 변경 사항을 감지하여 SQL 파일 생성
pnpm db:migrate --name <migration-name>
```
- 예: `pnpm db:migrate --name add_settlements`

## 3. 데이터 검증 (옵션)
Prisma Studio를 열어 변경된 테이블 구조를 확인합니다.
```bash
pnpm db:studio
```

## 4. 배포 (프로덕션)
프로덕션 환경에서는 `deploy` 명령어를 사용합니다. (데이터 소실 방지)
```bash
pnpm db:migrate:deploy
```
**주의**: 프로덕션 배포 전 반드시 백업을 수행하세요. (Supabase 자동 백업 확인)
