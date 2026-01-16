---
name: Safe DB Migration
description: Procedure for safe database migrations
---

# DB 마이그레이션 절차 (Migration Procedure)

> 데이터베이스 스키마 변경 시 반드시 이 절차를 따르십시오.

## 1단계: 백업

```bash
# 프로덕션 DB 백업
pg_dump -h $DB_HOST -U $DB_USER $DB_NAME > backup_$(date +%Y%m%d).sql
```

## 2단계: 검토

마이그레이션 파일 검토:

- 롤백 가능 여부 확인
- 성능 영향 분석
- 인덱스 변경 확인

## 3단계: Dry Run

```bash
# 스테이징 환경에서 테스트
npm run migrate:dry-run
```

## 4단계: 실행

승인 후 마이그레이션 실행:

- 트래픽 최소 시간대 선택
- 모니터링 대시보드 확인

```bash
npm run migrate
```

## 5단계: 검증

마이그레이션 후 검증:

- 스키마 변경 확인
- 애플리케이션 정상 동작 확인
- 성능 메트릭 확인
