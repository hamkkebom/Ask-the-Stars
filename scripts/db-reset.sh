#!/bin/bash

# scripts/db-reset.sh
# 데이터베이스 초기화 및 시딩 스크립트

echo "🗑️  Database Reset Sequence Initiated..."

# 1. 환경 변수 로드 확인
if [ ! -f "apps/api/.env" ]; then
  echo "❌ Error: apps/api/.env file not found."
  exit 1
fi

# 2. Prisma Migrate Reset (데이터 삭제 + 스키마 재생성 + 시딩)
echo "🔄 Running Prisma Migrate Reset..."
cd apps/api
pnpm prisma migrate reset --force --skip-seed

# 3. 데이터 시딩 (선택)
echo "🌱 Seeding Database..."
pnpm prisma db seed

echo "✅ Database reset and seeded successfully!"
