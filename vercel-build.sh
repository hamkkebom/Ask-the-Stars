#!/bin/bash
# Vercel 빌드 스크립트
echo "Installing dependencies..."
pnpm install

echo "Building web app..."
pnpm build --filter=web

echo "Build completed!"