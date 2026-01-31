# 🧭 네비게이션 기획서 (Navigation Specification)

> **버전**: v1.0
> **작성일**: 2026-01-29
> **기반 문서**: SITEMAP.md (37페이지)

---

## 📋 목차

1. [네비게이션 구조](#-1-네비게이션-구조)
2. [헤더 네비게이션](#-2-헤더-네비게이션)
3. [사이드바 네비게이션](#-3-사이드바-네비게이션)
4. [모바일 네비게이션](#-4-모바일-네비게이션)
5. [권한별 분기](#-5-권한별-분기)
6. [구현 가이드](#-6-구현-가이드)

---

## 🏗️ 1. 네비게이션 구조

### 1.1 4개 영역 분리

```
┌────────────────────────────────────────────────────┐
│  🎬 영상 갤러리     │  ⭐ Stars    │  🛠️ Admin   │
│  /videos/          │  /stars/     │  /admin/    │
│  (Public)          │  (Freelancer)│  (Admin)    │
└────────────────────────────────────────────────────┘
                           │
                     🔐 /auth/ (인증)
```

### 1.2 네비게이션 패턴

| 영역 | 헤더 | 사이드바 | 대상 |
|------|:----:|:--------:|------|
| `/videos/*` | ✅ 공개 헤더 | ❌ | 방문자 |
| `/stars/*` | ✅ 프리랜서 헤더 | ✅ 사이드바 | 프리랜서 |
| `/admin/*` | ✅ 관리자 헤더 | ✅ 사이드바 | 관리자 |
| `/auth/*` | ✅ 최소 헤더 | ❌ | 모든 사용자 |

---

## 🔝 2. 헤더 네비게이션

### 2.1 공개 헤더 (영상 갤러리)

```
┌─────────────────────────────────────────────────────────────┐
│  🎬 함께봄    [전체 영상]  [카테고리▼]      🔍   [로그인]  │
└─────────────────────────────────────────────────────────────┘
```

| 항목 | 링크 | 동작 |
|------|------|------|
| 로고 | `/videos/` | 메인 갤러리 |
| 전체 영상 | `/videos/` | 전체 목록 |
| 카테고리 | Dropdown | 카테고리 목록 표시 |
| 검색 | 모달 | 영상 검색 |
| 로그인 | `/auth/login/` | 로그인 페이지 |

### 2.2 프리랜서 헤더

```
┌─────────────────────────────────────────────────────────────┐
│  ⭐ Stars    [갤러리로🎬]              🔔  [프로필▼]       │
└─────────────────────────────────────────────────────────────┘
```

| 항목 | 링크 | 동작 |
|------|------|------|
| 로고 | `/stars/` | 대시보드 |
| 갤러리로 | `/videos/` | 공개 갤러리 이동 |
| 알림 🔔 | Dropdown | 알림 목록 |
| 프로필 | Dropdown | 설정, 로그아웃 |

### 2.3 관리자 헤더

```
┌─────────────────────────────────────────────────────────────┐
│  🛠️ Admin   [갤러리🎬]  [Stars⭐]     🔔  [관리자▼]        │
└─────────────────────────────────────────────────────────────┘
```

| 항목 | 링크 | 동작 |
|------|------|------|
| 로고 | `/admin/` | 통합 대시보드 |
| 갤러리 | `/videos/` | 공개 갤러리 |
| Stars | `/stars/` | 프리랜서 대시보드 |
| 알림 🔔 | Dropdown | 시스템 알림 |
| 관리자 | Dropdown | 설정, 로그아웃 |

---

## 📑 3. 사이드바 네비게이션

### 3.1 프리랜서 사이드바 (`/stars/*`)

```
┌──────────────────┐
│  ⭐ 대시보드     │  /stars/
├──────────────────┤
│  📊 분석         │
│    └ 상세 분석   │  /stars/analytics/
├──────────────────┤
│  📋 프로젝트     │
│    ├ 의뢰 게시판 │  /stars/project-board/
│    └ 내 프로젝트 │  /stars/projects/{id}/
├──────────────────┤
│  🎬 영상 관리    │
│    ├ 업로드      │  /stars/upload/
│    └ 내 영상     │  /stars/my-videos/
├──────────────────┤
│  💬 피드백       │  /stars/feedback/
│  💰 수입 관리    │  /stars/earnings/
│  📝 작업 일지    │  /stars/work-journal/
├──────────────────┤
│  🏆 내 성과      │  /stars/performance/
│  👤 프로필       │  /stars/profile/
│  📁 포트폴리오   │  /stars/portfolio/
│  📂 자료실       │  /stars/resources/
│  ⚙️ 설정        │  /stars/settings/
└──────────────────┘
```

### 3.2 관리자 사이드바 (`/admin/*`)

```
┌──────────────────┐
│  🛠️ 대시보드     │  /admin/
│    └ 활동 로그   │  /admin/activity-log/
├──────────────────┤
│  🎬 영상 자산    │  /admin/videos/
├──────────────────┤
│  ⭐ 프리랜서     │
│    ├ 현황        │  /admin/stars/
│    ├ 프로젝트    │  /admin/stars/projects/
│    ├ 의뢰 관리   │  /admin/stars/requests/
│    └ 리뷰 관리   │  /admin/stars/reviews/{id}/
├──────────────────┤
│  💰 재무         │  /admin/finance/
│  👥 클라이언트   │  /admin/clients/
│  ⚙️ 설정        │  /admin/settings/
└──────────────────┘
```

---

## 📱 4. 모바일 네비게이션

### 4.1 모바일 레이아웃

```
┌─────────────────────┐
│  ☰   🎬 함께봄     │  ← 햄버거 메뉴
├─────────────────────┤
│                     │
│    [콘텐츠 영역]    │
│                     │
├─────────────────────┤
│  🏠  📋  ➕  💰  👤 │  ← 하단 탭바 (대시보드)
└─────────────────────┘
```

### 4.2 프리랜서 하단 탭바

| 아이콘 | 라벨 | 경로 |
|:------:|------|------|
| 🏠 | 홈 | `/stars/` |
| 📋 | 프로젝트 | `/stars/project-board/` |
| ➕ | 업로드 | `/stars/upload/` |
| 💰 | 수입 | `/stars/earnings/` |
| 👤 | 프로필 | `/stars/profile/` |

### 4.3 관리자 하단 탭바

| 아이콘 | 라벨 | 경로 |
|:------:|------|------|
| 🏠 | 홈 | `/admin/` |
| 🎬 | 영상 | `/admin/videos/` |
| ⭐ | 프리랜서 | `/admin/stars/` |
| 💰 | 재무 | `/admin/finance/` |
| ⚙️ | 설정 | `/admin/settings/` |

---

## 🔐 5. 권한별 분기

### 5.1 라우트 가드

```typescript
// 권한에 따른 리다이렉트
const routeGuards = {
  '/stars/*': {
    allowed: ['STAR', 'ADMIN'],
    redirect: '/auth/login/'
  },
  '/admin/*': {
    allowed: ['ADMIN'],
    redirect: '/stars/' // STAR인 경우
  }
}
```

### 5.2 로그인 후 리다이렉트

| 역할 | 로그인 후 이동 |
|------|---------------|
| ADMIN | `/admin/` |
| STAR | `/stars/` |
| CLIENT | `/videos/` |

### 5.3 헤더 분기 로직

```typescript
function getHeaderType(pathname: string, role: UserRole) {
  if (pathname.startsWith('/admin')) return 'AdminHeader'
  if (pathname.startsWith('/stars')) return 'StarsHeader'
  if (pathname.startsWith('/auth')) return 'MinimalHeader'
  return 'PublicHeader'
}
```

---

## 🔧 6. 구현 가이드

### 6.1 파일 구조

```
src/components/
├── layout/
│   ├── Header/
│   │   ├── PublicHeader.tsx      # 영상 갤러리용
│   │   ├── StarsHeader.tsx       # 프리랜서용
│   │   ├── AdminHeader.tsx       # 관리자용
│   │   └── MinimalHeader.tsx     # 인증 페이지용
│   ├── Sidebar/
│   │   ├── StarsSidebar.tsx      # 프리랜서용
│   │   └── AdminSidebar.tsx      # 관리자용
│   └── MobileNav/
│       ├── StarsTabBar.tsx       # 프리랜서 하단 탭
│       └── AdminTabBar.tsx       # 관리자 하단 탭
```

### 6.2 네비게이션 아이템 정의

```typescript
// 프리랜서 사이드바 메뉴
export const starsNavItems = [
  { label: '대시보드', href: '/stars/', icon: 'Home' },
  { 
    label: '프로젝트', 
    icon: 'Folder',
    children: [
      { label: '의뢰 게시판', href: '/stars/project-board/' },
    ]
  },
  { 
    label: '영상 관리', 
    icon: 'Video',
    children: [
      { label: '업로드', href: '/stars/upload/' },
      { label: '내 영상', href: '/stars/my-videos/' },
    ]
  },
  { label: '피드백', href: '/stars/feedback/', icon: 'MessageSquare' },
  { label: '수입 관리', href: '/stars/earnings/', icon: 'DollarSign' },
  // ...
]
```

### 6.3 활성 상태 표시

```typescript
// 현재 경로에 따른 활성 메뉴 표시
function isActiveLink(href: string, pathname: string) {
  if (href === '/stars/' || href === '/admin/') {
    return pathname === href
  }
  return pathname.startsWith(href)
}
```

---

## 📊 요약

| 구성요소 | 영상 갤러리 | 프리랜서 | 관리자 |
|----------|:-----------:|:--------:|:------:|
| 헤더 | 공개 | 프리랜서 | 관리자 |
| 사이드바 | ❌ | ✅ | ✅ |
| 하단 탭바 | ❌ | ✅ | ✅ |
| 알림 | ❌ | ✅ | ✅ |

---
*최종 업데이트: 2026-01-29*
