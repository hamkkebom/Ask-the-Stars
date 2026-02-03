# 📋 E2E 테스트 계정 생성 가이드

**소요 시간**: 10분  
**목적**: Playwright E2E 테스트 6개 활성화

---

## Step 1: 비밀번호 해시 생성 (2분)

### 방법 A: Node.js 스크립트 사용 (권장)

```bash
# STAR 계정 비밀번호 해시 생성
node scripts/generate-bcrypt-hash.js TestPassword123!

# ADMIN 계정 비밀번호 해시 생성  
node scripts/generate-bcrypt-hash.js AdminPassword456!
```

**출력 예시**:
```
🔐 Generating bcrypt hash...

Password: TestPassword123!
Rounds:   10

✅ Generated Hash:

$2a$10$abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOP

📋 Copy the hash above for your SQL INSERT statement
```

### 방법 B: 온라인 도구 사용

1. https://bcrypt-generator.com/ 접속
2. `TestPassword123!` 입력
3. Rounds: `10` 선택
4. "Generate Hash" 클릭
5. 생성된 해시 복사

---

## Step 2: 데이터베이스에 계정 생성 (5분)

### Supabase Dashboard 사용

1. **Supabase 대시보드 접속**
   - https://supabase.com/dashboard
   - 프로젝트 선택: `Hankaebom-Star`

2. **SQL Editor 열기**
   - 왼쪽 메뉴 → SQL Editor → New query

3. **SQL 실행** (아래 템플릿 수정 후 실행)

```sql
-- ⚠️ IMPORTANT: Replace <STAR_HASH> and <ADMIN_HASH> with actual hashes from Step 1

-- STAR 계정 생성
INSERT INTO "User" (
  id,
  email,
  "passwordHash",
  name,
  role,
  "emailVerified",
  "createdAt",
  "updatedAt"
) VALUES (
  'e2e-star-test-001',                           -- 고정 ID (테스트용)
  'test-star@hamkkebom.com',                     -- 이메일
  '<STAR_HASH>',                                 -- 👈 Step 1에서 생성한 해시로 교체
  'Test Star',                                   -- 이름
  'STAR',                                        -- 역할
  TRUE,                                          -- 이메일 인증됨
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;                  -- 이미 존재하면 스킵

-- ADMIN 계정 생성
INSERT INTO "User" (
  id,
  email,
  "passwordHash",
  name,
  role,
  "emailVerified",
  "createdAt",
  "updatedAt"
) VALUES (
  'e2e-admin-test-001',                          -- 고정 ID (테스트용)
  'test-admin@hamkkebom.com',                    -- 이메일
  '<ADMIN_HASH>',                                -- 👈 Step 1에서 생성한 해시로 교체
  'Test Admin',                                  -- 이름
  'ADMIN',                                       -- 역할
  TRUE,                                          -- 이메일 인증됨
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;                  -- 이미 존재하면 스킵

-- 생성 확인
SELECT 
  id, 
  email, 
  name, 
  role, 
  "emailVerified",
  "createdAt"
FROM "User"
WHERE email IN ('test-star@hamkkebom.com', 'test-admin@hamkkebom.com');
```

4. **실행 결과 확인**
   - ✅ 2개 행 삽입 성공
   - 또는 "ON CONFLICT DO NOTHING" (이미 존재)

### Prisma Studio 사용 (대안)

```bash
# Prisma Studio 실행
cd apps/api
pnpm prisma studio

# 브라우저에서 http://localhost:5555 열림
# 1. "User" 모델 선택
# 2. "Add record" 클릭
# 3. 아래 값 입력:

# STAR 계정
id:             e2e-star-test-001
email:          test-star@hamkkebom.com
passwordHash:   <Step 1에서 생성한 해시>
name:           Test Star
role:           STAR
emailVerified:  true

# 4. "Save 1 change" 클릭
# 5. ADMIN 계정도 동일하게 생성
```

---

## Step 3: 환경 변수 설정 (2분)

### 프로젝트 루트의 `.env` 파일에 추가

```bash
# E2E Test Accounts
E2E_STAR_EMAIL="test-star@hamkkebom.com"
E2E_STAR_PASSWORD="TestPassword123!"
E2E_ADMIN_EMAIL="test-admin@hamkkebom.com"
E2E_ADMIN_PASSWORD="AdminPassword456!"
```

**⚠️ 주의**: 
- 비밀번호는 **원본 평문**으로 입력 (해시 아님)
- Step 1에서 사용한 비밀번호와 정확히 일치해야 함
- 따옴표 포함

---

## Step 4: 검증 (1분)

### E2E 테스트 실행

```bash
# 전체 E2E 테스트 실행
pnpm e2e

# 특정 테스트만 실행 (빠른 확인)
pnpm e2e tests/e2e/auth/login.spec.ts
```

**예상 결과**:

```
Running 12 tests using 1 worker

  ✓ Auth - Login (authenticated) > should login as STAR        (2.5s)
  ✓ Auth - Login (authenticated) > should login as ADMIN       (2.1s)
  ✓ Stars - Dashboard (authenticated) > should show dashboard  (3.2s)
  ✓ Stars - Projects (authenticated) > should list projects    (2.8s)
  ...

  12 passed (25s)
```

**실패 시 체크리스트**:
- [ ] `.env` 파일에 `E2E_*` 변수 4개 모두 존재하는가?
- [ ] 비밀번호가 평문으로 입력되었는가? (해시 아님)
- [ ] SQL INSERT가 성공했는가? (Supabase에서 확인)
- [ ] 이메일 주소가 정확한가? (`@hamkkebom.com`)

---

## 트러블슈팅

### ❌ "User not found" 에러

**원인**: DB에 계정이 없음

**해결**:
```sql
-- Supabase SQL Editor에서 확인
SELECT * FROM "User" WHERE email LIKE '%test-%@hamkkebom.com';
```

- 결과 없음 → Step 2 다시 실행
- 결과 있음 → 이메일 주소 오타 확인

---

### ❌ "Invalid credentials" 에러

**원인**: 비밀번호 해시 불일치

**해결**:
1. **비밀번호 해시 재생성**
   ```bash
   node scripts/generate-bcrypt-hash.js TestPassword123!
   ```

2. **DB 업데이트**
   ```sql
   UPDATE "User"
   SET "passwordHash" = '<새로_생성한_해시>'
   WHERE email = 'test-star@hamkkebom.com';
   ```

3. **재시도**
   ```bash
   pnpm e2e tests/e2e/auth/login.spec.ts
   ```

---

### ❌ "Environment variable E2E_STAR_EMAIL is not set"

**원인**: `.env` 파일 누락

**해결**:
```bash
# .env 파일 확인
cat .env | grep E2E_

# 없으면 추가
echo 'E2E_STAR_EMAIL="test-star@hamkkebom.com"' >> .env
echo 'E2E_STAR_PASSWORD="TestPassword123!"' >> .env
echo 'E2E_ADMIN_EMAIL="test-admin@hamkkebom.com"' >> .env
echo 'E2E_ADMIN_PASSWORD="AdminPassword456!"' >> .env
```

---

## 완료 체크리스트

- [ ] Step 1: 비밀번호 해시 2개 생성 완료
- [ ] Step 2: Supabase에 계정 2개 생성 완료
- [ ] Step 3: `.env` 파일에 환경 변수 4개 추가 완료
- [ ] Step 4: `pnpm e2e` 실행하여 12개 테스트 통과 확인

**완료 시**: ✅ E2E 테스트 인프라 활성화 완료!

---

**다음 단계**: Cloudflare Image Variants 설정 (`scripts/setup-cloudflare-variants.md`)
