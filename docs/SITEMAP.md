# 🗺️ 한깨봄 (Hankaebom) 사이트맵

> **최종 확정일**: 2026-01-18  
> **메인 도메인**: `hankaebom.com`

---

## 🏗️ 전체 사이트 구조

```txt
🏠 한깨봄 (hankaebom.com) - 그룹사
│
├── 1️⃣ 그룹사 소개 (메인)          → /
├── 2️⃣ 관리자                      → /admin/
├── 3️⃣ 프리랜서 (별들에게 물어봐)   → /stars/
├── 4️⃣ AI 스튜디오                 → /studio/
├── 5️⃣ 마케팅 대행                 → /marketing/
├── 6️⃣ AI 교육                        → /education/
└── 7️⃣ AI 공모전                      → /contests/
```

---

## 💼 비즈니스 모델

```txt
한깨봄 = "AI 영상 제작 인재 생태계 + 종합 마케팅"

┌─────────────────────────────────────────────────────────────┐
│                       순환 구조                              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│   [교육] ───→ [프리랜서 150명+] ───→ [영상 제작]            │
│   💰 교육비          ↑                    ↓                 │
│       ↑         [공모전]              [마케팅]              │
│       │          발굴                    ↓                  │
│       └────────── 대행업체 ←── 상담사 500명 ────┘           │
│                  (고정 클라이언트)                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

★ 모집 채널: 교육 (유료 AI 영상 제작 교육)
★ 수익 1: 교육비 (수강료)
★ 수익 2: 제작비 (AI 스튜디오)
★ 수익 3: 마케팅 대행비 (종합 마케팅)
★ 고정 클라이언트: 대행업체 (상담사 500명 관리)
```

---

## 👥 사용자 (페르소나)

| 페르소나 | 접속 | 사용 영역 | 플로우 |
|----------|:----:|-----------|--------|
| 일반 방문자 | ✅ | `/` | 회사 정보 확인 |
| 예비 수강생 | ✅ | `/education/` | 교육 정보 → 수강 신청 |
| 수강생 | ✅ | `/education/` | 수강 → 수료 → 프리랜서 전환 |
| 프리랜서 (별님) | ✅ | `/stars/` | 제작요청 수락 → 영상 제작 → 수입 |
| 공모전 참가자 | ✅ | `/contests/` | 출품 → 수상 → 스카우트 |
| B2B 클라이언트 | ✅ | `/studio/` | 영상 제작 의뢰 |
| 대행업체 | ✅ | `/marketing/` | 마케팅 대행 의뢰 |
| 상담사 500명 | ❌ | - | 플랫폼 접속 안함 (대행업체가 대신) |
| 관리자 | ✅ | `/admin/` | 전체 운영 관리 |

---

## 📊 페이지 통계

| 섹션 | 예상 페이지 수 |
|------|:--------------:|
| 🏠 그룹사 소개 | 15+ |
| 🌙 관리자 | 50+ |
| ⭐ 프리랜서 | 15+ |
| 🤖 AI 스튜디오 | 15+ |
| 📣 마케팅 대행 | 15+ |
| 📚 교육 | 12+ |
| 🏆 공모전 | 12+ |
| 🔐 인증 | 10+ |
| **총계** | **144+** |

---

## 1️⃣ 그룹사 소개 (메인)

> **경로**: `/`  
> **대상**: 모든 방문자

```txt
/
├── /                           ✅ 메인 홈페이지
│
├── /about/                     ✅ 회사 소개
│   ├── /vision/                ✅ 비전
│   ├── /history/               ✅ 연혁
│   ├── /culture/               ✅ 기업문화
│   └── /contact/               ✅ 연락처
│
├── /news/                      ❌ 📰 뉴스룸 (SEO)
│   ├── /                       ❌ 뉴스 목록
│   ├── /category/{slug}/       ❌ 카테고리별
│   └── /{slug}/                ❌ 개별 뉴스
│
├── /search/                    ✅ 통합 검색
│
└── /help/                      ❌ 고객센터
    ├── /                       ❌ 메인
    ├── /faq/                   ❌ FAQ
    ├── /terms/                 ❌ 이용약관 🔴법적필수
    └── /privacy/               ❌ 개인정보처리방침 🔴법적필수
```

---

## 2️⃣ 관리자

> **경로**: `/admin/`  
> **대상**: 운영팀 (담당자)  
> **컨셉**: 담당자 중심 + 모듈화 + 통합 정산

### 🔐 권한 구조 (RBAC)

```txt
관리자 가입/초대 시 담당 선택 → 해당 모듈만 접근 가능

├── □ 프리랜서 담당        → /admin/stars/
├── □ AI 스튜디오 담당     → /admin/studio/
├── □ 마케팅 대행 담당     → /admin/marketing/
├── □ AI 교육 담당         → /admin/education/
├── □ AI 공모전 담당       → /admin/contests/
├── □ 인재 관리 담당       → /admin/talent/
├── □ 클라이언트 담당      → /admin/clients/
├── □ 정산/회계 담당       → /admin/finance/
└── □ 시스템 관리자        → 전체 접근
```

### 2.1 내 할일 & 대시보드

```txt
/admin/
├── /                           ✅ 통합 대시보드
├── /tasks/                     ✅ 내 할일
│   ├── /pending/               ❌ 승인 대기
│   └── /completed/             ❌ 완료
└── /notifications/             ❌ 알림
```

### 2.2 서비스 모듈 (플러그인)

```txt
/admin/stars/       ✅ 프리랜서
/admin/studio/      ✅ AI 스튜디오
/admin/marketing/   ✅ 마케팅 대행
/admin/education/   ✅ AI 교육
/admin/contests/    ✅ AI 공모전
/admin/[new]/       ❌ 추가 모듈
```

### 2.3 통합 관리

```txt
/admin/talent/      ✅ 인재 허브 (150명+)
/admin/clients/     ✅ 클라이언트 (대행업체, 상담사 500명)
/admin/content/     ❌ 콘텐츠 (영상, 배너, 공지)
/admin/resources/   ❌ 자료실 (디자인, 영상소스, 문서)
```

### 2.4 정산/회계 (Finance)

```txt
/admin/finance/
├── /                   ✅ 재무 대시보드
├── /revenue/           ❌ 매출 (교육, 스튜디오, 마케팅)
├── /payouts/           ❌ 지급 (프리랜서, 강사, 상금)
├── /invoices/          ❌ 청구서 (클라이언트)
├── /expense/           ❌ 비용
├── /tax/               ❌ 세금
└── /reports/           ❌ 재무 리포트
```

### 2.5 분석 & 설정

```txt
/admin/analytics/   ✅ 통합 분석
/admin/settings/    ✅ 시스템 설정 (권한, 모듈 ON/OFF)
```

---

## 3️⃣ 프리랜서 (별들에게 물어봐)

> **경로**: `/stars/`  
> **대상**: 영상 제작 프리랜서

```txt
/stars/
├── /dashboard/                 ✅ 대시보드
├── /project-board/             ✅ 제작요청 게시판 ⭐
├── /requests/{id}/             ✅ 제작요청 상세
├── /my-projects/               ✅ 내 프로젝트
│   ├── /                       ✅ 목록
│   ├── /{id}/                  ✅ 상세 (다중버전 UI)
│   └── /calendar/              ✅ 캘린더
├── /upload/                    ✅ 영상 업로드 ⭐
├── /feedback/                  ✅ 받은 피드백
├── /earnings/                  ✅ 수입 관리
│   ├── /                       ✅ 개요
│   ├── /primary/               ✅ 1차 정산
│   ├── /secondary/             ✅ 2차 정산
│   └── /tax/                   ✅ 세금 문서
├── /performance/               ✅ 내 성과
├── /profile/                   ✅ 내 프로필
├── /portfolio/                 ✅ 포트폴리오 관리
└── /resources/                 ✅ 자료실
```

---

## 4️⃣ AI 스튜디오

> **경로**: `/studio/`  
> **대상**: B2B 클라이언트 (영상 제작만 필요)

```txt
/studio/
├── /                           ❌ 스튜디오 메인
├── /creators/                  ❌ AI 크리에이터
│   ├── /                       ❌ 목록
│   └── /{id}/                  ❌ 프로필
├── /portfolio/                 ❌ 작품 갤러리
├── /services/                  ❌ 서비스 안내
├── /pricing/                   ❌ 요금 안내
├── /request/                   ❌ 제작 의뢰
├── /my-projects/               ❌ 내 프로젝트
├── /blog/                      ❌ 📰 블로그 (SEO)
└── /faq/                       ❌ FAQ
```

---

## 5️⃣ 마케팅 대행 🆕

> **경로**: `/marketing/`  
> **대상**: 대행업체, 종합 마케팅 필요 클라이언트

```txt
/marketing/
├── /                           ❌ 마케팅 대행 메인
├── /services/                  ❌ 서비스 안내
├── /cases/                     ❌ 성공 사례
├── /request/                   ❌ 의뢰
├── /client-portal/             ❌ 클라이언트 포털
├── /insight/                   ❌ 📰 인사이트 (SEO)
└── /faq/                       ❌ FAQ
```

---

## 6️⃣ 교육

> **경로**: `/education/`  
> **대상**: 예비 수강생, 수강생 (핵심 모집 채널 ⭐)

```txt
/education/
├── /                           ✅ 교육 메인
├── /courses/                   ❌ 강좌 목록
├── /apply/                     ❌ 수강 신청
├── /my-courses/                ❌ 내 수강
├── /certificates/              ❌ 수료증
├── /instructors/               ❌ 강사 소개
├── /reviews/                   ❌ 수강 후기
├── /blog/                      ❌ 📰 블로그 (SEO)
└── /faq/                       ❌ FAQ
```

---

## 7️⃣ 공모전

> **경로**: `/contests/`  
> **대상**: 공모전 참가자

```txt
/contests/
├── /                           ✅ 공모전 메인
├── /ongoing/                   ❌ 진행 중
├── /past/                      ❌ 지난 공모전
├── /my-entries/                ❌ 내 출품작
├── /winners/                   ❌ 수상작 갤러리
├── /news/                      ❌ 📰 뉴스 (SEO)
└── /faq/                       ❌ FAQ
```

---

## 🔐 공통: 인증

> 모든 서브 사이트 공유

```txt
/auth/
├── /login/                     ✅ 로그인
├── /signup/                    ✅ 회원가입
│   ├── /                       ✅ 일반
│   ├── /stars/                 ❌ 프리랜서
│   ├── /student/               ❌ 수강생
│   ├── /contestant/            ❌ 공모전 참가자
│   ├── /client/                ❌ 스튜디오 클라이언트
│   └── /marketing/             ❌ 마케팅 클라이언트
├── /forgot-password/           ✅ 비밀번호 찾기
├── /reset-password/            ✅ 비밀번호 재설정
└── /verify-email/              ❌ 이메일 인증
```

---

## 📁 관리자 자료실 상세

```txt
/admin/resources/
├── /                           자료실 메인
├── /design/                    🎨 디자인 자료
│   ├── /templates/             템플릿
│   ├── /fonts/                 폰트
│   ├── /logos/                 로고/브랜드
│   └── /assets/                아이콘, 일러스트
├── /video/                     🎬 영상 자료
│   ├── /stock/                 스톡 영상
│   ├── /music/                 배경음악/효과음
│   ├── /transitions/           전환 효과
│   └── /luts/                  색보정 LUT
├── /docs/                      📄 문서 자료
│   ├── /guides/                제작 가이드라인
│   ├── /contracts/             계약서 템플릿
│   ├── /sop/                   SOP
│   └── /checklists/            체크리스트
├── /education/                 📚 교육 자료
│   ├── /curriculum/            커리큘럼
│   ├── /slides/                강의 자료
│   └── /samples/               샘플 영상
├── /marketing/                 📣 마케팅 자료
│   ├── /banners/               배너
│   ├── /social/                SNS 콘텐츠
│   └── /campaigns/             캠페인 자료
└── /upload/                    ❌ 자료 업로드
```

---

## 🔗 관련 문서

- [PERMISSIONS.md](./PERMISSIONS.md) - 권한 상세
- [WORKFLOW.md](./WORKFLOW.md) - 업무 프로세스
- [API.md](./API.md) - API 엔드포인트
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - 데이터베이스 스키마

---

## 8️⃣ 영상 브라우저 (Netflix Style)

> **경로**: `/videos/`  
> **대상**: 모든 방문자  
> **컨셉**: 넷플릭스 스타일 영상 탐색 (필터, 무한스크롤, 호버 프리뷰)

```txt
/videos/
├── /                           ✅ 영상 탐색 (VibrantHero + AdvancedVideoGrid)
└── /{id}/                      ✅ 영상 상세 (플레이어)
```

### 주요 컴포넌트

| 컴포넌트 | 설명 |
|----------|------|
| `VibrantHero` | 히어로 배너 섹션 |
| `AdvancedVideoGrid` | 필터 + 썸네일 그리드 (무한스크롤) |
| `CompactVideoCard` | 호버 시 확대 + 미리보기 카드 |
