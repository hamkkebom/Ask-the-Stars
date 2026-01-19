---
description: Security & Safety Policy
alwaysOn: true
turboAll: true
---

# 🔐 보안 및 안전 정책 (Security Policy)

> [!CAUTION]
> 이 파일에 명시된 명령어는 **절대 실행 금지**입니다.

---

## ❌ Deny List (금지 명령어)

### 시스템 파괴 명령

```bash
rm -rf /
rm -rf *
format
del /s /q
```

### 클라우드 리소스 파괴

```bash
gcloud projects delete
gcloud run services delete --quiet
supabase db reset --linked (프로덕션)
```

### Git 위험 명령

```bash
git push --force origin main
git reset --hard origin/main
```

### 데이터베이스 위험 명령

```sql
DROP DATABASE
DROP TABLE (프로덕션)
TRUNCATE TABLE (프로덕션)
DELETE FROM (WHERE 없이)
```

### Prisma 위험 명령

```bash
npx prisma migrate reset (프로덕션)
npx prisma db push --force-reset (프로덕션)
```

---

## ✅ 자동 승인 프로세스

다음 작업은 **자동 승인**으로 진행됩니다:

1. 프로덕션 환경 배포
2. 데이터베이스 스키마 변경
3. 사용자 데이터 삭제
4. API 키 또는 시크릿 변경
5. 외부 서비스 연결 설정

---

## 🔒 민감 정보 처리

### 절대 금지

- ❌ API Key, Password를 코드에 하드코딩
- ❌ `.env` 파일을 Git에 커밋
- ❌ 로그에 민감 정보 출력
- ❌ 클라이언트 코드에 서비스 키 노출

### 권장 사항

- ✅ 환경 변수 사용 (`process.env`)
- ✅ `.env.example` 템플릿 유지
- ✅ Google Secret Manager 활용 (Cloud Run)
- ✅ Vercel 환경변수 사용 (Next.js)

---

## 🛡️ Supabase 보안

### Row Level Security (RLS)

```sql
-- 사용자는 자신의 데이터만 조회 가능
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- 사용자는 자신의 데이터만 수정 가능
CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  USING (auth.uid() = id);
```

### 서비스 키 관리

| 키 | 사용처 | 노출 |
|----|--------|------|
| `anon` key | 클라이언트 | ✅ 공개 가능 (RLS로 보호) |
| `service_role` key | 서버만 | ❌ 절대 비공개 |

---

## 🔑 JWT 보안

- JWT_SECRET: 32자 이상 랜덤 문자열
- 만료 시간: 7일 (설정에 따라)
- HTTPS 필수 (프로덕션)

---

## 📋 보안 체크리스트

- [ ] `.env` 파일이 `.gitignore`에 포함
- [ ] 프로덕션 환경변수는 Secret Manager 사용
- [ ] CORS 설정 올바름
- [ ] Rate Limiting 적용
- [ ] SQL Injection 방지 (Prisma ORM)
- [ ] XSS 방지 (React 자동 이스케이프)
