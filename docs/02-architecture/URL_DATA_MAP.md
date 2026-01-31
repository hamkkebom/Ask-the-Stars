# URL Functional Specs & Data Map

> **문서 버전**: 2026-01-29
> **플랫폼 비전**: 영상 갤러리 + 프리랜서 + 관리자

## Overview
This document maps every major Sitemap URL to its required **User Inputs**, **Database Models**, and **Output Metrics**.

---

## 🎬 1. Videos (Public) (`/videos/`)

| URL | Function | Input | DB Models | Output |
|---|---|---|---|---|
| `/videos/` | Gallery | Search, Filter | `Video` | Video Grid, View Count |
| `/videos/{id}` | Detail | Play | `Video`, `VideoTechnicalSpec` | Stream Player, Metadata |
| `/videos/category/{slug}` | Category Filter | Select Category | `Video`, `Category` | Filtered List |

---

## 🔐 2. Admin (`/admin/`)

| URL | Function | Input | DB Models | Output |
|---|---|---|---|---|
| `/admin/` | Dashboard | - | `User`, `Project`, `Settlement` | Revenue, Active Stars |
| `/admin/videos/` | Video Assets | Filter | `Video`, `VideoTechnicalSpec` | R2/Stream Status |
| `/admin/stars/` | Freelancer Mgmt | Filter | `User`, `StarProfile` | Star List, Grades |
| `/admin/stars/projects/` | Projects | Filter | `Project`, `ProjectAssignment` | Project Status |
| `/admin/stars/requests/` | Requests | Assign | `ProjectRequest` | Pending Requests |
| `/admin/stars/reviews/{id}` | Review/Approve | **Approve/Reject** | `Submission` | → **Triggers Payout** |
| `/admin/finance/` | Finance | Approve Payout | `Settlement` | Payout Amount |
| `/admin/activity-log/` | Activity Log | Filter | `ActivityLog` | System Events |
| `/admin/clients/` | Clients | View | `User` (role=CLIENT) | Client List |

---

## 🌟 3. Stars (Freelancer) (`/stars/`)

| URL | Function | Input | DB Models | Output |
|---|---|---|---|---|
| `/stars/` | Dashboard | - | `ProjectAssignment`, `Settlement` | Active Projects, Pending Earnings |
| `/stars/project-board/` | Find Work | Search/Filter | `ProjectRequest` (status=OPEN) | Available Requests |
| `/stars/projects/{id}` | Project Detail | Accept/Reject | `ProjectAssignment` | Project Info |
| `/stars/upload/` | **Upload Video** | **File Upload (MP4)**, Meta | `Submission`, `Video`, `R2` | **Stream UID**, Progress |
| `/stars/my-videos/` | My Videos | View | `Video` | Video List |
| `/stars/my-videos/{id}` | **Edit Video** | **Title/Thumb/File** | `Video` | Update Confirmation |
| `/stars/earnings/` | Earnings | Date Filter | `Settlement` | Income Chart |
| `/stars/feedback/` | Feedback | View | `Feedback` | Feedback List |
| `/stars/work-journal/` | Work Journal | Create Entry | `WorkJournal` | Entry Saved |

---

## 🔄 Key Workflow: Approval → Payout

```
/stars/upload/ → Submission Created
       ↓
/admin/stars/reviews/{id} → Admin Review
       ↓
    Approve → Triggers:
       ↓
┌──────┴──────┐
↓             ↓
Video.status  Settlement.status
= PUBLISHED   = APPROVED
```

---

## 🔐 4. Auth (`/auth/`)

| URL | Function | Input | DB Models | Output |
|---|---|---|---|---|
| `/auth/login` | Login | Email, Password | `User` | Access Token |
| `/auth/signup/stars` | Star Signup | Profile, Portfolio | `User`, `StarProfile` | Account Created |
| `/auth/signup/client` | Client Signup | Basic Info | `User` | Account Created |
