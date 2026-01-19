# 📊 별들에게 물어봐 - 사이트맵 & 권한 시스템 최종 요약

## 🎯 핵심 정보

### 프로젝트명
**별들에게 물어봐 (Ask the Stars)**  
사주천궁 영상 제작 협업 B2B2C 하이브리드 플랫폼

### 총 페이지 수
**150+ 페이지**

### 사용자 그룹
- 🔴 **Admin**: 1명 (시스템 관리자)
- 🌙 **달님 (Moon)**: 4개 부서
  - 관리팀: ~30 페이지
  - 광고팀: ~25 페이지
  - 피드백팀: ~20 페이지
  - 정산팀: ~25 페이지
- ⭐ **별님 (Stars)**: 50명 프리랜서 (~25 페이지)
- 🔮 **상담사 (Counselor)**: 300명 (~10 페이지)
- 🌐 **일반 사용자 (Public)**: 무제한 (~15 페이지)

---

## 🗺️ 사이트맵 핵심 구조

```
별들에게 물어봐
│
├── 🔐 인증 (/auth)
│   ├── 로그인/회원가입
│   └── 비밀번호 찾기
│
├── 🌙 달님 (/moon)
│   ├── 관리팀 (/management)
│   │   ├── 제작요청 게시판 관리 ⭐
│   │   ├── 프로젝트 관리
│   │   └── 프리랜서 관리
│   │
│   ├── 광고팀 (/advertising)
│   │   ├── 캠페인 관리
│   │   ├── 성과 분석
│   │   └── 예산 관리
│   │
│   ├── 피드백팀 (/feedback)
│   │   ├── 검수 대기열
│   │   ├── 영상 검수 ⭐
│   │   └── 타임스탬프 피드백
│   │
│   └── 정산팀 (/settlement)
│       ├── 1차 정산 (제작비)
│       ├── 2차 정산 (인센티브)
│       └── 프리랜서별 정산
│
├── ⭐ 별님 (/stars)
│   ├── 제작요청 게시판 ⭐
│   ├── 내 프로젝트
│   ├── 영상 업로드 (1~5개 버전) ⭐⭐⭐
│   ├── 피드백 조회
│   └── 수입 관리
│
├── 🔮 상담사 (/counselor)
│   ├── 내 홍보 영상
│   ├── 프로필 관리
│   └── 영상 제작 요청
│
└── 🌐 공개 (/)
    ├── 메인 홈
    ├── 영상 라이브러리 ⭐ (넷플릭스 스타일)
    ├── 상담사 목록
    └── 통합 검색
```

---

## ⭐⭐⭐ 핵심 신규 기능: 프리랜서 다중 버전 제출

### 개념
**한 프리랜서가 한 제작요청에 대해 최대 5개의 다른 버전을 제작할 수 있습니다.**

### 예시
```
제작요청: "신년운세 × 신규 상담사 김태희 홍보"
프리랜서: 박건우

제출 가능한 버전 (1~5개):
├── 버전 1: "경쾌한 톤" (v1.0) ✅ 승인됨
├── 버전 2: "차분한 톤" (v1.0) 🔄 검수중
├── 버전 3: "감성적 톤" (v1.1) ⏳ 수정중
├── 버전 4: "유머러스 톤" (v1.0) ❌ 반려됨
└── 버전 5: [ + 추가 가능 ]
```

### 각 버전별 특징
- **독립적인 컨셉**: 각 버전은 다른 톤/스타일
- **별도의 검수**: 각 버전마다 독립적으로 검수
- **별도의 피드백**: 각 버전별 타임스탬프 피드백
- **버전 히스토리**: 각 버전 내에서도 수정본 관리 (v1.0 → v1.1 → v1.2...)

### 중복 제작과의 차이

| 구분 | 중복 제작 | 다중 버전 제출 |
|------|-----------|----------------|
| **주체** | 여러 프리랜서 | 한 프리랜서 |
| **목적** | 다양한 프리랜서의 해석 | 한 프리랜서가 다양한 스타일 시도 |
| **최대 수** | 제작요청별 설정 (예: 3명) | 프리랜서당 5개 |
| **예시** | 프리랜서 A, B, C가 각각 1개씩 | 프리랜서 A가 5가지 버전 제작 |

### UI/UX
```
/stars/my-projects/detail/:id

┌────────────────────────────────────────┐
│ 프로젝트: 신년운세 × 신규 상담사 홍보 │
├────────────────────────────────────────┤
│                                        │
│ 제출한 버전 (3/5개)                    │
│                                        │
│ ┌──────────────────────────────────┐  │
│ │ 버전 1: "경쾌한 톤"              │  │
│ │ • v1.0 (최초 제출)               │  │
│ │ • v1.1 (자막 수정)               │  │
│ │ • v2.0 (최종) ✅ 승인됨          │  │
│ │ [ 피드백 보기 ]                  │  │
│ └──────────────────────────────────┘  │
│                                        │
│ ┌──────────────────────────────────┐  │
│ │ 버전 2: "차분한 톤"              │  │
│ │ • v1.0 (최초 제출)               │  │
│ │ 🔄 검수중                        │  │
│ │ [ 피드백 대기 ]                  │  │
│ └──────────────────────────────────┘  │
│                                        │
│ ┌──────────────────────────────────┐  │
│ │ 버전 3: "감성적 톤"              │  │
│ │ • v1.0 (최초 제출)               │  │
│ │ • v1.1 (수정중) ⏳               │  │
│ │ [ 피드백 보기 ] [ 수정 업로드 ]  │  │
│ └──────────────────────────────────┘  │
│                                        │
│ [ + 새 버전 추가 (최대 5개) ]          │
│                                        │
└────────────────────────────────────────┘
```

---

## 🔐 권한 시스템 요약

### 권한 범례
- ✅ = 전체 조회 가능
- 👁️ = 본인 데이터만 조회
- ⚙️ = 관련 데이터만 조회
- ❌ = 조회 불가

### 핵심 권한 규칙

#### 1. 제작요청 게시판
| 기능 | 관리팀 | 프리랜서 | 일반인 |
|------|--------|----------|--------|
| 등록 | ✅ | ❌ | ❌ |
| 조회 | ✅ | ✅ (open만) | ❌ |
| 수락 | ❌ | ✅ | ❌ |

#### 2. 영상 업로드 (다중 버전)
| 기능 | 프리랜서 | 피드백팀 | 관리팀 |
|------|----------|----------|--------|
| 업로드 (1~5개) | 👁️ | ❌ | ❌ |
| 검수 | ❌ | ✅ | ⚙️ |
| 승인 | ❌ | ✅ | ❌ |

#### 3. 피드백
| 기능 | 피드백팀 | 프리랜서 | 관리팀 |
|------|----------|----------|--------|
| 작성 | ✅ | ❌ | ❌ |
| 조회 | ✅ | 👁️ | ⚙️ |

#### 4. 정산
| 기능 | 정산팀 | 프리랜서 | 관리팀 |
|------|--------|----------|--------|
| 1차 정산 승인 | ✅ | ❌ | ⚙️ |
| 2차 정산 계산 | ✅ | ❌ | ⚙️ |
| 내역 조회 | ✅ | 👁️ | ⚙️ |

#### 5. 광고 캠페인
| 기능 | 광고팀 | 정산팀 | 관리팀 |
|------|--------|--------|--------|
| 캠페인 생성 | ✅ | ❌ | ❌ |
| 성과 조회 | ✅ | ⚙️ (2차 정산용) | ⚙️ |

#### 6. 공개 페이지
| 페이지 | 모든 사용자 |
|--------|-------------|
| 영상 라이브러리 | ✅ |
| 영상 상세 | ✅ |
| 상담사 목록 | ✅ |
| 검색 | ✅ |

---

## 🔄 워크플로우 (9단계) - 다중 버전 반영

```
1. 회사 관리팀 요구사항 분석
        ↓
2. 달님(관리팀) → 제작요청 게시판 업로드
   • 카테고리, 마감일, 제작 조건 설정
        ↓
3. 별님(프리랜서) → 제작요청 선택 & 수락
   ┌─────────────────────────────────────┐
   │ • 중복 제작 가능 (여러 명 동시)    │
   │ • 독점 제작 (1명만)                │
   │ • 마감일 확인 후 수락              │
   └─────────────────────────────────────┘
        ↓
4. 영상 제작 & 업로드 ⭐⭐⭐
   ┌─────────────────────────────────────┐
   │ 한 프리랜서가 1~5개 버전 제작 가능 │
   │ • 버전 1: "경쾌한 톤"              │
   │ • 버전 2: "차분한 톤"              │
   │ • 버전 3: "감성적 톤"              │
   │ • ...                              │
   │ • 각 버전별 독립적 검수            │
   └─────────────────────────────────────┘
   • 사이트 업로드 (프론트엔드)
   • 내부 로직: Cloudflare R2 자동 저장
   • 버전 관리 자동화
        ↓
5. 타임스탬프 피드백 (피드백팀)
   • 각 버전별로 독립적 피드백
   • "버전 2, 0:32~0:45 자막 수정"
   • WebSocket 실시간 알림
        ↓
6. 수정 또는 승인
   • 각 버전별로 승인/수정/반려
   • 버전 1 승인 ✅
   • 버전 2 수정 요청 ⏳
   • 버전 3 반려 ❌
        ↓
7. 1차 정산 자동 계산 (제작비)
   • 승인된 버전에 대해서만 정산
   • 매월 1일 자동 지급
   • 예: 버전 1 승인 → 1차 정산 대상
        ↓
8. 광고 집행 (광고팀)
   • 승인된 버전 중 선택하여 광고
   • 30일간 성과 추적
   • 조회수/클릭률/전환율 집계
        ↓
9. 2차 정산 (분기별 인센티브)
   • 광고 집행된 버전의 성과 기반
   • 3/31, 6/30, 9/30, 12/31
   • 성과 기반 보너스
```

---

## 📊 데이터베이스 스키마 (핵심 테이블)

### 1. project_requests (제작요청)
```sql
CREATE TABLE project_requests (
  id UUID PRIMARY KEY,
  title VARCHAR(200),
  categories TEXT[],
  deadline TIMESTAMP NOT NULL,
  assignment_type VARCHAR(20),  -- 'multiple' | 'single'
  max_assignees INT DEFAULT 1,
  current_assignees INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'open'
);
```

### 2. project_assignments (수락 내역)
```sql
CREATE TABLE project_assignments (
  id UUID PRIMARY KEY,
  project_request_id UUID,
  freelancer_id UUID,
  accepted_at TIMESTAMP,
  status VARCHAR(20),
  UNIQUE(project_request_id, freelancer_id)
);
```

### 3. project_submissions (제출물) ⭐ 핵심
```sql
CREATE TABLE project_submissions (
  id UUID PRIMARY KEY,
  assignment_id UUID,
  
  -- 다중 버전 지원 ⭐⭐⭐
  version_slot INT CHECK (version_slot BETWEEN 1 AND 5),
  version_title VARCHAR(100),  -- "경쾌한 톤", "차분한 톤"
  version_number VARCHAR(20),  -- "v1.0", "v1.1", "v2.0"
  
  -- R2 파일 정보
  file_key VARCHAR(500),
  r2_url TEXT,
  
  review_status VARCHAR(20),  -- pending/approved/rejected
  submitted_at TIMESTAMP,
  
  UNIQUE(assignment_id, version_slot)
);
```

### 4. feedback (피드백)
```sql
CREATE TABLE feedback (
  id UUID PRIMARY KEY,
  submission_id UUID,  -- 특정 버전의 특정 제출물
  start_time INT,      -- 초 단위 (32)
  end_time INT,        -- 초 단위 (45)
  feedback_type VARCHAR(50),
  priority VARCHAR(20),
  content TEXT,
  created_by UUID,
  created_at TIMESTAMP
);
```

---

## 🎯 API 엔드포인트 (핵심)

### 제작요청 관리
```
POST   /api/project-requests           # 제작요청 등록 (관리팀)
GET    /api/project-requests           # 제작요청 목록
POST   /api/project-requests/:id/accept # 수락 (프리랜서)
```

### 영상 업로드 (다중 버전) ⭐
```
POST   /api/uploads/presigned-url      # 업로드 URL 발급
POST   /api/project-submissions        # 제출물 등록
       Body: {
         assignmentId,
         versionSlot: 1-5,  ⭐
         versionTitle,
         versionNumber,
         fileKey
       }

GET    /api/project-submissions?assignmentId=xxx
       Response: {
         submissions: [
           { versionSlot: 1, versionTitle: "경쾌한 톤", ... },
           { versionSlot: 2, versionTitle: "차분한 톤", ... }
         ],
         availableSlots: [4, 5]  ⭐
       }
```

### 피드백
```
POST   /api/feedback                   # 피드백 작성 (피드백팀)
       Body: {
         submissionId,  # 특정 버전의 특정 제출물
         startTime,
         endTime,
         feedbackType,
         priority,
         content
       }

GET    /api/feedback?submissionId=xxx  # 특정 버전의 피드백 조회
```

### 정산
```
GET    /api/settlements/primary        # 1차 정산 (제작비)
POST   /api/settlements/primary/approve # 1차 정산 승인
GET    /api/settlements/secondary      # 2차 정산 (인센티브)
```

---

## 🔔 실시간 알림 (WebSocket)

```typescript
// 제작요청 관련
socket.emit('project-request:created')    // 새 요청 등록
socket.emit('project-request:accepted')   // 수락 완료
socket.emit('project-request:full')       // 정원 마감

// 영상 제출 관련 ⭐
socket.emit('video:submitted', {
  assignmentId,
  versionSlot: 1,
  versionTitle: "경쾌한 톤",
  freelancerName: "박건우"
})

// 피드백 관련
socket.emit('feedback:new', {
  submissionId,
  versionSlot: 2,
  feedbackCount: 3
})

// 정산 관련
socket.emit('settlement:primary')         // 1차 정산 완료
socket.emit('settlement:secondary')       // 2차 정산 완료
```

---

## 📈 통계 (2026-01 기준)

```
사용자:
├── 달님 (Moon): 4개 부서
├── 별님 (Stars): 50명 프리랜서
├── 상담사: 300명
└── 일반 사용자: 무제한

제작 현황:
├── 완료: 127건
├── 진행중: 45건
└── 대기: 12건

영상 버전 통계: ⭐
├── 평균 버전 수: 2.3개/프로젝트
├── 최대 버전 수: 5개
└── 총 제출 버전: 291개
   (127건 × 평균 2.3개)

광고 캠페인:
├── 진행중: 32건
├── 대기: 45건
└── 완료: 128건
```

---

## 📥 파일 다운로드

### 1. 전체 사이트맵
[📄 SITEMAP.md](computer:///home/user/SITEMAP.md)
- 150+ 페이지 상세 구조
- 사용자 그룹별 페이지 목록
- 페이지 설명 및 기능

### 2. 권한 시스템
[📄 PERMISSIONS.md](computer:///home/user/PERMISSIONS.md)
- 8개 사용자 역할 정의
- 페이지별 권한 테이블
- API 엔드포인트 권한
- 코드 예시

### 3. README (최신 버전)
[📄 README_FINAL_V5.md](computer:///home/user/README_FINAL_V5.md)
- 전체 프로젝트 개요
- 9단계 워크플로우
- 제작요청 게시판 시스템
- 기술 스택 및 아키텍처

### 4. 제작요청 시스템 가이드
[📄 PROJECT_REQUEST_SYSTEM.md](computer:///home/user/PROJECT_REQUEST_SYSTEM.md)
- 중복/독점 제작 시스템
- R2 업로드 플로우
- 데이터베이스 스키마
- UI/UX 컴포넌트

---

## ✅ 체크리스트 (점검용)

### 사이트맵
- [x] 전체 페이지 구조 (150+)
- [x] 사용자 그룹별 페이지 분류
- [x] 페이지 설명 및 기능 명세
- [x] 네비게이션 흐름

### 권한 시스템
- [x] 8개 사용자 역할 정의
- [x] 페이지별 권한 테이블
- [x] API 엔드포인트 권한
- [x] 권한 검증 로직

### 다중 버전 제출 (신규)
- [x] 개념 정의 (1~5개)
- [x] 데이터베이스 스키마
- [x] API 엔드포인트
- [x] UI/UX 설계
- [x] 워크플로우 통합

### 제작요청 게시판
- [x] 중복/독점 제작 시스템
- [x] 마감일 시스템
- [x] R2 업로드 플로우
- [x] WebSocket 실시간 알림

---

**이제 개발팀에 전달하고 실제 구현을 시작할 수 있는 완전한 설계 문서가 완성되었습니다!** 🎉
