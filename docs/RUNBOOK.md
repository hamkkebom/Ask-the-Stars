# 운영 런북 (Runbook)

> 최종 수정일: YYYY-MM-DD

## 📌 개요

서비스 운영에 필요한 절차를 정리합니다.

## 🔍 일상 점검

### 매일 점검
- [ ] 서비스 정상 동작 확인
- [ ] 에러 로그 확인
- [ ] 디스크 사용량 확인
- [ ] 백업 완료 확인

### 주간 점검
- [ ] 성능 지표 리뷰
- [ ] 보안 취약점 스캔
- [ ] 인증서 만료일 확인

## 🚀 배포 절차

### 프론트엔드 배포
```bash
cd frontend
npm run build
firebase deploy --only hosting
```

### 백엔드 배포
```bash
gcloud run deploy backend \
  --image gcr.io/[PROJECT]/backend:latest \
  --region asia-northeast3
```

## 🔄 롤백 절차

### 프론트엔드
```bash
firebase hosting:clone [SITE]:prev [SITE]:live
```

### 백엔드
```bash
gcloud run services update-traffic backend \
  --to-revisions=[PREV_REVISION]=100
```

## 📊 모니터링

### 대시보드 링크
- Cloud Console: [링크]
- Firebase Console: [링크]

### 알림 채널
- 이메일: ops@example.com
- Slack: #ops-alerts

## 🔧 유지보수

### DB 백업
```bash
gcloud sql export sql [INSTANCE] gs://[BUCKET]/backup.sql
```

### 로그 확인
```bash
gcloud logging read "resource.type=cloud_run_revision"
```

## 📞 연락처

| 역할 | 이름 | 연락처 |
|------|------|--------|
| 1차 담당 | | |
| 2차 담당 | | |
