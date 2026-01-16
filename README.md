# Hankaebom-Star

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](docs/CONTRIBUTING.md)

> Google Antigravity Reference Architecture 기반 프로젝트 템플릿

---

## 📖 소개

이 프로젝트는 **AI 에이전트 친화적인 개발 환경**을 제공하는 레퍼런스 아키텍처입니다.
`.agent/`, `.context/`, `.config/` 구조를 통해 AI 어시스턴트가 프로젝트를 빠르게 이해하고 효율적으로 작업할 수 있습니다.

### 주요 특징

- 🧠 **에이전트 제어 평면** (`.agent/`): 규칙, 스킬, 워크플로우 정의
- 📚 **RAG 지식 기반** (`.context/`): 아키텍처, 요구사항, API 명세
- ⚙️ **환경 설정** (`.config/`): MCP, Nix, 프로젝트 메타데이터
- 🐳 **Docker 지원**: 컨테이너화 준비 완료

---

## 🚀 빠른 시작

### 필수 요구사항

- Git
- (선택) Nix 패키지 매니저
- (선택) Docker

### 설치

```bash
# 저장소 클론
git clone https://github.com/dokkaebimarketing1-lang/Hankaebom-Star.git
cd Hankaebom-Star

# 환경 변수 설정
cp .env.example .env
# .env 파일 수정
```

### 개발 환경 (Nix)

```bash
nix-shell .config/dev.nix
```

### Docker 실행

```bash
docker-compose up -d
```

---

## 📁 프로젝트 구조

```text
Hankaebom-Star/
│
├── .agent/                  # 🧠 에이전트 제어 평면
│   ├── rules/               # 행동 규칙
│   │   ├── global.md        # 프로젝트 헌법
│   │   ├── security.md      # 보안 정책
│   │   └── style.md         # 코딩 스타일
│   ├── skills/              # 도구 정의
│   │   ├── git-commit/      # 커밋 메시지 규칙
│   │   └── db-migration/    # DB 마이그레이션 절차
│   └── workflows/           # 작업 절차 (SOP)
│       ├── feature-dev.md   # 기능 개발
│       └── bug-fix.md       # 버그 수정
│
├── .context/                # 📚 RAG 지식 기반
│   ├── architecture/        # 시스템 설계
│   ├── product/             # 제품 요구사항
│   ├── docs/                # API 명세
│   └── style/               # 디자인 토큰
│
├── .config/                 # ⚙️ 환경 설정
│   ├── mcp/                 # MCP 서버 설정
│   ├── dev.nix              # Nix 개발 환경
│   └── project.json         # 프로젝트 메타데이터
│
├── artifacts/               # 📦 산출물 (계획서, 검증 결과)
├── docs/                    # 📖 문서
├── src/                     # 💻 소스 코드
├── tests/                   # 🧪 테스트
│
├── .dockerignore
├── .env.example
├── .gitignore
├── AGENTS.md                # 에이전트 진입점
├── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 📋 개발 가이드

### 워크플로우

| 작업 | 명령어 |
|------|--------|
| 기능 개발 | `/feature-dev` |
| 버그 수정 | `/bug-fix` |

### 핵심 원칙

1. **Context First**: 코드 작성 전 `.context/` 참조
2. **Test Driven**: 테스트 먼저, 구현 나중
3. **Artifacts**: 계획서는 `artifacts/plans/`에 저장
4. **Documentation**: 작업 로그는 `docs/korean_logs/`에 기록

---

## 🔗 관련 문서

| 문서 | 경로 |
|------|------|
| 프로젝트 헌법 | [.agent/rules/global.md](.agent/rules/global.md) |
| 보안 정책 | [.agent/rules/security.md](.agent/rules/security.md) |
| 코딩 스타일 | [.agent/rules/style.md](.agent/rules/style.md) |
| 시스템 아키텍처 | [.context/architecture/system.md](.context/architecture/system.md) |
| API 명세 | [.context/docs/api-schema.md](.context/docs/api-schema.md) |

---

## 🤝 기여하기

기여를 환영합니다! 자세한 내용은 [CONTRIBUTING.md](docs/CONTRIBUTING.md)를 참조하세요.

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스로 배포됩니다.

---

## 📞 문의

- 이슈: [GitHub Issues](https://github.com/dokkaebimarketing1-lang/Hankaebom-Star/issues)
