# 배포 가이드

> 최종 수정일: YYYY-MM-DD

## 📌 개요

프로젝트 배포 절차를 설명합니다.

## 🏗 배포 환경

| 환경 | URL | 용도 |
|------|-----|------|
| 개발 (dev) | | 개발 테스트 |
| 스테이징 (staging) | | QA 테스트 |
| 운영 (prod) | | 실서비스 |

## 🛠 인프라 구성

### 클라우드 서비스

| 서비스 | 용도 | 비고 |
|--------|------|------|
| Firebase Hosting | 프론트엔드 | |
| Cloud Run | 백엔드 | |
| Cloud SQL | 데이터베이스 | MySQL 8.0 |
| Cloud Storage | 파일 저장 | |

### 아키텍처 다이어그램

```
[Client] → [Firebase Hosting] → [Cloud Run] → [Cloud SQL]
                                     ↓
                              [Cloud Storage]
```

## 📋 사전 요구사항

- [ ] Firebase CLI 설치
- [ ] Google Cloud SDK 설치
- [ ] 필요한 권한 부여
- [ ] 환경변수 설정

```bash
# Firebase CLI 설치
npm install -g firebase-tools

# Google Cloud SDK 설치
# https://cloud.google.com/sdk/docs/install

# 로그인
firebase login
gcloud auth login
```

## 🚀 배포 절차

### 1. 프론트엔드 배포 (Firebase Hosting)

```bash
# 빌드
cd frontend
npm run build

# 배포
firebase deploy --only hosting
```

### 2. 백엔드 배포 (Cloud Run)

```bash
# Docker 이미지 빌드
cd backend
docker build -t gcr.io/[PROJECT_ID]/backend:latest .

# 이미지 푸시
docker push gcr.io/[PROJECT_ID]/backend:latest

# Cloud Run 배포
gcloud run deploy backend \
  --image gcr.io/[PROJECT_ID]/backend:latest \
  --platform managed \
  --region asia-northeast3 \
  --allow-unauthenticated
```

### 3. 데이터베이스 마이그레이션

```bash
# 마이그레이션 실행
./gradlew flywayMigrate
```

## 🔄 롤백 절차

### 프론트엔드 롤백

```bash
# 이전 버전 목록 확인
firebase hosting:channel:list

# 특정 버전으로 롤백
firebase hosting:clone [SOURCE_SITE]:live [TARGET_SITE]:live
```

### 백엔드 롤백

```bash
# 이전 리비전 목록 확인
gcloud run revisions list --service backend

# 특정 리비전으로 트래픽 전환
gcloud run services update-traffic backend \
  --to-revisions=[REVISION_NAME]=100
```

## ✅ 배포 체크리스트

### 배포 전

- [ ] 모든 테스트 통과 확인
- [ ] 코드 리뷰 완료
- [ ] 환경변수 확인
- [ ] DB 마이그레이션 스크립트 확인
- [ ] 배포 일정 공유

### 배포 후

- [ ] 서비스 정상 동작 확인
- [ ] 주요 기능 테스트
- [ ] 에러 모니터링 확인
- [ ] 배포 완료 공지

## 📝 참고사항

- 운영 배포는 업무 시간 외 진행 권장
- 대규모 변경 시 단계적 배포 (Canary) 적용
- 배포 이력은 CHANGELOG.md에 기록
