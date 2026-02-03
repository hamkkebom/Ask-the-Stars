# 🎯 설정 안내 - 지금 바로 실행하세요!

**자동 설정 완료**: ✅  
**남은 수동 작업**: 2개 (총 10분)  
**현재 상태**: `.env` 파일 준비 완료

---

## ✅ 이미 완료된 작업

1. ✅ `.env` 파일에 환경 변수 템플릿 추가됨
2. ✅ 모든 도구 및 가이드 파일 생성됨
3. ✅ npm 스크립트 설정 완료

---

## 🚨 지금 바로 해야 할 작업 (10분)

### 📋 Step 1: 비밀번호 해시 생성 (3분)

**온라인 도구 사용**:

1. https://bcrypt-generator.com/ 접속

2. **STAR 계정 해시 생성**:
   ```
   비밀번호: TestPassword123!
   Rounds: 10
   → Generate Hash 클릭
   → 결과 복사 (예: $2a$10$abc123...)
   ```

3. **ADMIN 계정 해시 생성**:
   ```
   비밀번호: AdminPassword456!
   Rounds: 10
   → Generate Hash 클릭
   → 결과 복사
   ```

---

### 🗄️ Step 2: Supabase에서 테스트 계정 생성 (5분)

#### 2-1. Supabase 대시보드 접속

```
https://supabase.com/dashboard
→ 프로젝트 선택: Hankaebom-Star
→ 왼쪽 메뉴: SQL Editor
→ New query 클릭
```

#### 2-2. 아래 SQL 실행

**⚠️ 중요**: `<STAR_HASH>`와 `<ADMIN_HASH>`를 Step 1에서 생성한 해시로 교체!

```sql
-- E2E 테스트 계정 생성
INSERT INTO "User" (
  id,
  email,
  "passwordHash",
  name,
  role,
  "emailVerified",
  "createdAt",
  "updatedAt"
) VALUES
  (
    'e2e-star-test-001',
    'test-star@hamkkebom.com',
    '<STAR_HASH>',  -- 👈 여기 교체
    'Test Star',
    'STAR',
    TRUE,
    NOW(),
    NOW()
  ),
  (
    'e2e-admin-test-001',
    'test-admin@hamkkebom.com',
    '<ADMIN_HASH>',  -- 👈 여기 교체
    'Test Admin',
    'ADMIN',
    TRUE,
    NOW(),
    NOW()
  )
ON CONFLICT (email) DO NOTHING;

-- 생성 확인
SELECT id, email, name, role 
FROM "User" 
WHERE email LIKE '%test-%@hamkkebom.com';
```

#### 2-3. 결과 확인

✅ **2개 행이 표시되어야 함**:
```
e2e-star-test-001  | test-star@hamkkebom.com  | Test Star  | STAR
e2e-admin-test-001 | test-admin@hamkkebom.com | Test Admin | ADMIN
```

---

### 🖼️ Step 3: Cloudflare Image Variants 생성 (5분)

#### 3-1. Cloudflare Dashboard 접속

```
https://dash.cloudflare.com/
→ 계정 로그인
→ Images 클릭
→ Variants 탭 클릭
```

#### 3-2. Variant 3개 생성

**Variant 1: thumbnail-sm**
```
Name:     thumbnail-sm
Width:    320
Height:   (비워두기 - 자동)
Fit:      Scale down
Format:   Auto
Quality:  80
→ Create 클릭
```

**Variant 2: thumbnail-md**
```
Name:     thumbnail-md
Width:    640
Height:   (비워두기)
Fit:      Scale down
Format:   Auto
Quality:  80
→ Create 클릭
```

**Variant 3: thumbnail-lg**
```
Name:     thumbnail-lg
Width:    1280
Height:   (비워두기)
Fit:      Scale down
Format:   Auto
Quality:  85
→ Create 클릭
```

#### 3-3. 생성 확인

Variants 목록에 3개가 표시되어야 함:
- ✅ thumbnail-sm
- ✅ thumbnail-md
- ✅ thumbnail-lg

---

## 🎉 Step 4: 검증 (1분)

모든 작업 완료 후 실행:

```bash
# 환경 변수 검증
pnpm setup:verify

# 예상 결과:
# ✅ All required variables are set!

# E2E 테스트 실행
pnpm e2e

# 예상 결과:
# ✅ 12 tests passed (25s)
```

---

## 🆘 문제 해결

### ❌ "User not found" 에러

**원인**: Supabase에 계정이 없음

**해결**:
```sql
-- Supabase SQL Editor에서 확인
SELECT * FROM "User" WHERE email LIKE '%test-%@hamkkebom.com';
```
- 결과 없음 → Step 2 다시 실행
- 결과 있음 → `.env` 파일의 이메일 주소 확인

---

### ❌ "Invalid credentials" 에러

**원인**: 비밀번호 해시 불일치

**해결**:
1. bcrypt 해시 다시 생성 (Rounds: 10 확인)
2. Supabase에서 해시 업데이트:
   ```sql
   UPDATE "User"
   SET "passwordHash" = '<새_해시>'
   WHERE email = 'test-star@hamkkebom.com';
   ```

---

### ❌ "Variant not found" (404)

**원인**: Variant 이름 불일치

**해결**:
1. Cloudflare Dashboard에서 정확한 이름 확인
2. `.env` 파일 확인 (대소문자 구분):
   ```bash
   CLOUDFLARE_IMAGES_VARIANT_SM="thumbnail-sm"  # ✅ 정확
   CLOUDFLARE_IMAGES_VARIANT_SM="Thumbnail-SM"  # ❌ 틀림
   ```

---

## ✅ 완료 체크리스트

### 필수 작업:
- [ ] Step 1: 비밀번호 해시 2개 생성
- [ ] Step 2: Supabase에 계정 2개 생성
- [ ] Step 3: Cloudflare Variants 3개 생성
- [ ] Step 4: `pnpm setup:verify` 통과
- [ ] Step 4: `pnpm e2e` 12개 테스트 통과

### 완료 시:
✅ **인프라 100% 프로덕션 준비 완료!** 🎉

---

## 📚 추가 문서

더 자세한 가이드가 필요하면:

- **전체 가이드**: `USER_ACTIONS_QUICKSTART.md`
- **E2E 상세**: `scripts/setup-e2e-accounts.md`
- **Cloudflare 상세**: `scripts/setup-cloudflare-variants.md`

---

**예상 소요 시간**: 10-15분  
**난이도**: 쉬움 ⭐⭐☆☆☆

**지금 바로 시작하세요!** 🚀
