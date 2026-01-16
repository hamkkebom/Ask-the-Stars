# GitHub 연결 가이드

> 최종 수정일: 2026-01-16

## 📌 목적

로컬 프로젝트를 GitHub에 안전하게 업로드하기 위한 인증 설정 가이드입니다.

---

## 🆕 GitHub 최초 가입 시 필수 설정

### 1. 프로필 설정
👉 [https://github.com/settings/profile](https://github.com/settings/profile)

| 항목 | 설명 |
|------|------|
| **Name** | 표시될 이름 (한글 가능) |
| **Bio** | 짧은 자기소개 |
| **Public email** | 공개할 이메일 (선택) |

### 2. 이메일 설정 (중요!)
👉 [https://github.com/settings/emails](https://github.com/settings/emails)

- [ ] **Primary email 확인**: 인증 메일 확인 필수
- [ ] **Keep my email private**: ✅ 체크 권장 (스팸 방지)
- [ ] **Block command line pushes**: 실수로 이메일 노출 방지

### 3. 2단계 인증 (2FA) 설정 - 강력 권장
👉 [https://github.com/settings/security](https://github.com/settings/security)

> [!WARNING]
> 2024년부터 GitHub는 모든 사용자에게 2FA를 권장합니다.

**설정 방법:**
1. **Two-factor authentication** → **Enable**
2. **Authenticator app** 선택 (Google Authenticator, Microsoft Authenticator 등)
3. QR 코드 스캔 → 6자리 코드 입력
4. **Recovery codes** 저장 (분실 대비)

### 4. 로컬 Git 사용자 정보 설정 (터미널)
```powershell
git config --global user.name "hamkkebom"
git config --global user.email "your-email@example.com"
```

> [!TIP]
> 이메일 공개 원치 않으면 GitHub에서 제공하는 noreply 이메일 사용:
> `사용자ID+유저명@users.noreply.github.com`

---

## 🔐 토큰(PAT) 발행 절차

GitHub는 2021년 8월부터 **비밀번호 대신 토큰**을 사용합니다.

### 1단계: 토큰 생성 페이지 이동

👉 [https://github.com/settings/tokens/new](https://github.com/settings/tokens/new)

### 2단계: 토큰 설정

| 항목 | 설정값 |
|------|--------|
| **Note** | `Ask-the-Stars` (식별용 이름) |
| **Expiration** | `No expiration` 또는 `90 days` |
| **Select scopes** | 아래 표 참조 |

### 📋 스코프(Scopes) 전체 가이드

> [!NOTE]
> 스코프는 토큰이 할 수 있는 "권한 범위"입니다.
> 아래 표에서 **열면 무엇을 할 수 있는지**와 **위험도**를 확인하세요.

---

#### 🟢 안전 + 필수 (개발에 꼭 필요)

| 스코프 | 열면 할 수 있는 것 | 위험도 |
|--------|-------------------|:------:|
| **repo** | ✅ Private/Public 저장소 Push, Pull, Clone<br>✅ Issue/PR 생성 및 관리<br>✅ 브랜치 생성/삭제 | 🟢 낮음 |
| **workflow** | ✅ GitHub Actions 워크플로우(.yml) 수정<br>✅ CI/CD 파이프라인 관리 | 🟢 낮음 |

---

#### � 유용함 (상황에 따라 체크)

| 스코프 | 열면 할 수 있는 것 | 위험도 | 언제 필요? |
|--------|-------------------|:------:|-----------|
| **write:packages** | ✅ GitHub Packages에 npm/Docker 이미지 배포 | 🟡 중간 | Docker 배포 시 |
| **read:packages** | ✅ GitHub Packages에서 패키지 다운로드 | 🟢 낮음 | 패키지 사용 시 |
| **gist** | ✅ Gist 생성, 수정, 삭제 | 🟢 낮음 | 코드 스니펫 공유 |
| **project** | ✅ GitHub Projects 보드 관리 | 🟢 낮음 | 프로젝트 관리 시 |
| **admin:repo_hook** | ✅ Webhook 생성/수정/삭제 | 🟡 중간 | 외부 서비스 연동 |
| **notifications** | ✅ 알림 읽기/관리 | 🟢 낮음 | 알림 자동화 |
| **read:user** | ✅ 프로필 정보 읽기 (이름, 이메일 등) | 🟢 낮음 | 사용자 정보 필요 시 |
| **user:email** | ✅ 이메일 주소 읽기 | 🟢 낮음 | 이메일 확인 필요 시 |

---

#### � 주의 필요 (신중하게 판단)

| 스코프 | 열면 할 수 있는 것 | 위험도 | 주의사항 |
|--------|-------------------|:------:|---------|
| **delete_repo** | ⚠️ 저장소 완전 삭제 | 🔴 **높음** | 실수로 삭제 위험! |
| **admin:org** | ⚠️ 조직 설정 변경, 멤버 관리 | 🟠 중상 | 개인용은 불필요 |
| **write:org** | ⚠️ 조직/팀 멤버십 수정 | 🟠 중상 | 팀 관리 시만 |
| **admin:public_key** | ⚠️ SSH 키 추가/삭제 | 🟠 중상 | 키 관리 자동화 시 |
| **admin:gpg_key** | ⚠️ GPG 키 관리 | 🟠 중상 | 서명 자동화 시 |

---

#### 🔴 위험 (절대 체크 금지)

| 스코프 | 열면 할 수 있는 것 | 위험도 | 왜 위험한가? |
|--------|-------------------|:------:|------------|
| **user** | ❌ 모든 사용자 정보 수정 | 🔴 **최고** | 계정 탈취 가능 |
| **admin:enterprise** | ❌ 기업 전체 설정 제어 | 🔴 **최고** | 기업 계정 필요 없음 |
| **codespace** | ❌ Codespace 전체 제어 | 🟠 중상 | 비용 발생 가능 |
| **copilot** | ❌ Copilot 설정 변경 | 🟠 중상 | 개인용 불필요 |

---

#### ✅ Antigravity 아키텍처 최종 권장

```text
[필수 체크] ────────────────────────────
✅ repo              - 저장소 접근
✅ workflow          - CI/CD 관리

[권장 체크] ────────────────────────────
☑️ write:packages    - Docker 이미지 배포
☑️ read:packages     - 패키지 다운로드
☑️ project           - 프로젝트 보드 관리
☑️ gist              - 코드 스니펫 공유

[선택 체크] ────────────────────────────
◻️ admin:repo_hook   - Webhook 설정 시
◻️ notifications     - 알림 자동화 시

[절대 체크 금지] ───────────────────────
❌ delete_repo
❌ user
❌ admin:org
❌ admin:enterprise
```

> [!WARNING]
> 토큰이 유출되면 체크한 모든 권한이 악용될 수 있습니다.
> **필요한 최소한만 체크하세요!**

#### ✅ Google Antigravity 아키텍처 기반 권장 스코프

> [!NOTE]
> Antigravity 아키텍처는 GitHub Actions, Firebase, Cloud Run 연동을 사용합니다.
> 아래 스코프를 체크하면 전체 개발 사이클을 커버합니다.

| 스코프 | 용도 | 체크 |
|--------|------|:----:|
| **repo** | 저장소 Push/Pull, PR 관리, Issues | ✅ **필수** |
| **workflow** | GitHub Actions 워크플로우 수정 (CI/CD) | ✅ **필수** |
| **write:packages** | Docker 이미지 GitHub Container Registry 배포 | ☑️ 권장 |
| **read:packages** | 패키지 다운로드 | ☑️ 권장 |
| **project** | GitHub Projects 보드 관리 | ☑️ 선택 |

```text
[필수 체크]
✅ repo
✅ workflow

[권장 체크]
☑️ write:packages
☑️ read:packages

[나머지는 전부 체크 해제!]
```

> [!IMPORTANT]
> 최소 권한 원칙! `admin:*`, `delete_repo`, `user` 등 위험한 권한은 절대 체크하지 마세요.

### 3단계: 토큰 복사

**[Generate token]** 버튼 클릭 후, `ghp_` 또는 `github_pat_`로 시작하는 토큰을 **즉시 복사**하세요.

> [!CAUTION]
> 토큰은 다시 볼 수 없습니다. 분실 시 재발행 필요

---

## 💻 터미널에서 Push 하기

```powershell
git push -u origin main
```

### 인증 창이 뜨면:
- **Token** 탭 선택 → 복사한 토큰 붙여넣기

### 터미널에서 비밀번호 입력 요청 시:
- Username: `hamkkebom`
- Password: **토큰 붙여넣기** (화면에 표시 안 됨)

---

## ✅ 성공 확인

```
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

위 메시지가 나오면 완료!

---

## 🔗 저장소 바로가기

[https://github.com/hamkkebom/Ask-the-Stars](https://github.com/hamkkebom/Ask-the-Stars)
