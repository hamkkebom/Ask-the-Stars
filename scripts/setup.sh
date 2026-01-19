#!/bin/bash

echo "🚀 별들에게 물어봐 프로젝트 초기 설정"

# Node.js 버전 확인
if ! command -v node &> /dev/null; then
    echo "❌ Node.js가 설치되지 않았습니다."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'.' -f1 | cut -d'v' -f2)
if [ "$NODE_VERSION" -lt 22 ]; then
    echo "⚠️ Node.js 22 이상이 필요합니다. 현재 버전: $(node -v)"
    echo "   nvm use 22 또는 fnm use 22 를 실행해주세요."
    exit 1
fi

# pnpm 설치 확인
if ! command -v pnpm &> /dev/null; then
    echo "📦 pnpm 설치 중..."
    npm install -g pnpm
fi

# 의존성 설치
echo "📦 의존성 설치 중..."
pnpm install

# 환경변수 파일 복사
echo "📄 환경변수 파일 생성 중..."
if [ ! -f "apps/web/.env" ]; then
    cp apps/web/.env.example apps/web/.env
    echo "   ✅ apps/web/.env 생성됨"
fi
if [ ! -f "apps/api/.env" ]; then
    cp apps/api/.env.example apps/api/.env
    echo "   ✅ apps/api/.env 생성됨"
fi

# Docker 컨테이너 시작
if command -v docker &> /dev/null; then
    echo "🐳 Docker 컨테이너 시작 중..."
    docker-compose up -d
else
    echo "⚠️ Docker가 설치되지 않았습니다. 로컬 PostgreSQL과 Redis를 수동으로 설정해주세요."
fi

echo ""
echo "✅ 설정 완료!"
echo ""
echo "다음 명령어로 개발 서버를 시작하세요:"
echo "  pnpm dev"
echo ""
echo "접속 URL:"
echo "  - 프론트엔드: http://localhost:3000"
echo "  - 백엔드 API: http://localhost:4000"
