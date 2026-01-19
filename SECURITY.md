# 🔐 보안 정책 (Security Policy)

> **최종 업데이트**: 2026-01-19
> **GitHub 공식 보안 정책 페이지**

한깨봄 프로젝트는 사용자의 데이터 보호와 시스템 보안을 최우선으로 생각합니다. 보안 취약점을 발견하셨다면 아래 절차에 따라 제보해 주시기 바랍니다.

---

## 🛡️ 취약점 제보 (Reporting a Vulnerability)

보안 취약점을 발견하셨을 경우, **공개 이슈(Public Issue)로 등록하지 마시고** 아래의 비공개 경로를 이용해 주세요.

1.  **비공개 이메일**: `security@hamkkebom.com`
2.  **GitHub Security Advisories**: 본 저장소 상단의 `Security` 탭 -> `Advisories` -> `Report a vulnerability` 버튼 클릭

### 제보 시 포함 사항
*   취약점의 종류 (예: XSS, SQL Injection 등)
*   영향을 받는 모듈 및 파일 경로 (`apps/web`, `apps/api` 등)
*   재현 단계 (Step-by-step)
*   잠재적인 위협 상황

---

## ⚡ 대응 절차 (Response Policy)

*   **접수 확인**: 제보 후 영업일 기준 48시간 이내에 확인 메일을 발송합니다.
*   **초기 진단**: 7일 이내에 심각도를 평가하고 대응 계획을 수립합니다.
*   **패치 및 배포**: 취약점의 중요도에 따라 최우선 순위로 작업하여 수정본을 배포합니다.

---

## 🔐 보안 기술 스택
우리 시스템은 다음의 보안 표준을 준수합니다.
*   **인증**: Passport.js + JWT (Access/Refresh Token Rotation)
*   **암호화**: Argon2/Bcrypt 기반 비밀번호 단방향 암호화
*   **통신**: 전 구간 HTTPS (TLS 1.2+) 강제 적용
*   **인가**: 역할 기반 접근 제어 (RBAC) 및 서버 측 권한 검증

> 상세한 보안 구현 사양은 [보안 가이드](./docs/06-security/SECURITY_POLICY.md)를 참조하세요.
