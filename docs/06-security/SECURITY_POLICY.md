# 🔐 보안 정책 (Security Policy)

> **문서 버전**: 2026-02-03
> **플랫폼 비전**: 영상 갤러리 + 프리랜서 + 관리자

---

## 📋 목차

1. [의존성 보안](#의존성-보안)
2. [자동 보안 검사](#자동-보안-검사)
3. [인증](#인증)
4. [권한 관리](#권한-관리)
5. [데이터 보안](#데이터-보안)
6. [취약점 보고](#취약점-보고)

---

## 의존성 보안

### npm audit 자동 검사

모든 PR과 push에서 자동으로 npm audit을 실행합니다:

```bash
# 로컬에서 수동 검사
pnpm security:audit          # moderate 이상 취약점 검사
pnpm security:check          # 프로덕션 의존성만 검사
pnpm security:fix            # 자동 수정 시도
```

### 검사 기준

| 심각도 | 프로덕션 | Dev | 조치 |
|--------|---------|-----|------|
| **Critical** | ❌ 차단 | ⚠️ 경고 | 즉시 수정 필수 |
| **High** | ❌ 차단 | ⚠️ 경고 | 48시간 내 수정 |
| **Moderate** | ⚠️ 경고 | ✅ 허용 | 주간 검토 |
| **Low** | ✅ 허용 | ✅ 허용 | 월간 검토 |

### Dependabot 자동 업데이트

GitHub Dependabot이 매주 월요일 자동으로 의존성을 업데이트합니다:

- **npm 패키지**: 매주 월요일 09:00 UTC
- **GitHub Actions**: 매주 월요일 10:00 UTC
- **Docker 이미지**: 매주 월요일 11:00 UTC

**정책**:
- 마이너/패치 버전: 자동 업데이트
- 메이저 버전: 수동 검토 필수

### 현재 취약점 상태

```
실행 날짜: 2026-02-03
프로덕션 의존성: 0 취약점 ✅
개발 의존성: 2 low 취약점 ⚠️
```

---

## 자동 보안 검사

### GitHub Actions 워크플로우

#### security.yml
- **npm audit**: 매 PR/push에서 실행
- **SBOM 생성**: Software Bill of Materials 생성
- **PR 코멘트**: 취약점 발견 시 자동 코멘트
- **스케줄**: 매주 월요일 09:00 UTC

#### ci.yml
- **보안 검사**: 린트/테스트 전에 실행
- **실패 조건**: moderate 이상 취약점 발견 시 빌드 실패

---

## 1️⃣ 인증 (Authentication)

### 시스템 기준
| 항목 | 설정 |
|------|------|
| 프레임워크 | Passport.js |
| 방식 | JWT (JSON Web Token) |
| 저장소 | Supabase Auth (PostgreSQL) |

### 토큰 정책 (Token Policy)

| 토큰 | 수명 | 저장 위치 |
|------|------|----------|
| Access Token | 1시간 | Memory/Header |
| Refresh Token | 14일 | HttpOnly Cookie |

- **Rotation**: Refresh Token 사용 시 새로운 Access/Refresh Token 발급 (One-time use)

---

## 2️⃣ 권한 관리 (RBAC)

시스템은 **역할 기반 접근 제어 (Role-Based Access Control)**를 따릅니다.

### 사용자 역할 (User Roles)

| 역할 | 설명 | 접근 범위 |
|------|------|----------|
| **Guest** | 비회원 | 영상 갤러리 시청 |
| **CLIENT** | 클라이언트 | 의뢰 요청 (관리자 통해) |
| **STAR** | 프리랜서 | `/stars/*` (업로드, 수정, 정산) |
| **ADMIN** | 관리자 | `/admin/*` (검수, 승인, 재무) |

### 경로별 접근 권한

| 경로 | 접근 가능 역할 |
|------|---------------|
| `/videos/*` | 모든 사용자 |
| `/stars/*` | STAR |
| `/admin/*` | ADMIN |

---

## 3️⃣ 데이터 보안

### 비밀번호 처리
- **암호화**: Argon2 또는 Bcrypt (단방향)
- **최소 요구사항**: 8자 이상, 숫자/특수문자 포함

### 전송 보안
- **TLS**: 1.2+ 필수
- **HTTPS**: 모든 프로덕션 통신

---

## 4️⃣ CORS 정책

| 설정 | 값 |
|------|-----|
| Allowed Origins | `https://hamkkebom.com`, `https://www.hamkkebom.com`, `http://localhost:3000` |
| Credentials | `true` (쿠키 허용) |
| Methods | `GET, POST, PUT, PATCH, DELETE` |

---

## 5️⃣ 영상 보안 (Cloudflare Stream)

| 기능 | 설정 |
|------|------|
| Signed URL | 5분 만료 토큰 |
| IP 제한 | 선택적 적용 |
| 다운로드 방지 | Stream 기본 설정 |

---

## 6️⃣ 보안 취약점 리포트

### 취약점 보고 절차

보안 관련 이슈 발견 시:

1. **공개하지 마세요** - 공개 이슈로 보고하지 마세요
2. **비공개로 보고** - `security@hamkkebom.com`으로 이메일 발송
3. **정보 포함**:
   - 취약점 설명
   - 영향받는 버전
   - 재현 방법 (가능한 경우)
   - 제안된 수정 방법

### 응답 시간

- **Critical**: 24시간 내 응답
- **High**: 48시간 내 응답
- **Moderate**: 1주일 내 응답
- **Low**: 2주일 내 응답

---

## 의존성 업데이트 프로세스

### 자동 업데이트 (Dependabot)

```
Dependabot PR 생성
    ↓
자동 테스트 실행 (CI)
    ↓
보안 검사 통과 확인
    ↓
수동 검토 및 승인
    ↓
자동 병합 (또는 수동 병합)
```

### 수동 업데이트

메이저 버전 업데이트는 수동으로 처리합니다:

```bash
# 특정 패키지 업데이트
pnpm update package-name@latest

# 모든 패키지 업데이트 (대화형)
pnpm update --interactive

# 업데이트 후 테스트
pnpm test
pnpm build
```

---

## 보안 체크리스트

### 새로운 의존성 추가 시

- [ ] npm audit 통과 확인
- [ ] 라이선스 확인 (MIT, Apache 2.0 등)
- [ ] 유지보수 상태 확인 (최근 업데이트)
- [ ] 다운로드 수 및 평판 확인
- [ ] 보안 이슈 히스토리 확인

### PR 병합 전

- [ ] 모든 CI 검사 통과
- [ ] 보안 audit 통과
- [ ] 코드 리뷰 완료
- [ ] 테스트 커버리지 확인

---

## 참고 자료

- [npm audit 문서](https://docs.npmjs.com/cli/v9/commands/npm-audit)
- [GitHub Dependabot 문서](https://docs.github.com/en/code-security/dependabot)
- [Node.js 보안 모범 사례](https://nodejs.org/en/docs/guides/security/)

---

**마지막 업데이트**: 2026-02-03
**담당자**: 개발팀
