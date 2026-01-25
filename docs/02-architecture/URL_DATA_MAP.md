# URL Functional Specs & Data Map

## Overview
This document maps every major Sitemap URL to its required **User Inputs**, **Database Models**, and **Output Metrics**.

---

## 🏗️ 1. Main & Corporate (`/`)

| URL | Function | Input (User Action) | DB Models | Output / Metrics |
|---|---|---|---|---|
| `/` | Landing Page | Visit | - | Page Views, Lead Banner Clicks |
| `/contact/` | Inquiry | Form Submit (Name, Email, Message) | `Lead` (status=NEW) | "Success Message" |
| `/news/{slug}` | Read News | View Article | `Post` | Views Count, Rel. Articles |

---

## 🔐 2. Admin (`/admin/`)

| URL | Function | Input | DB Models | Output |
|---|---|---|---|---|
| `/admin/` | Overlord Dashboard | - | `User`, `Project`, `Settlement` | Total Revenue, Weekly Active Stars |
| `/admin/stars/projects` | Manage Projects | Filter (Status, Date) | `Project`, `ProjectAssignment` | Project List, Status Dist. |
| `/admin/finance/payouts` | Process Payouts | Select Users -> "Approve" | `Settlement` (update status) | Total Payout Amount, Bank Files |
| `/admin/marketing/` | Campaign Mgmt | Create Campaign (Target, Budget) | `Campaign` | ROAS, CTR, Spend |

---

## 🌟 3. Stars (Freelancer) (`/stars/`)

| URL | Function | Input | DB Models | Output |
|---|---|---|---|---|
| `/stars/dashboard` | Main View | - | `ProjectAssignment`, `Settlement` | Active Projects, Pending Earnings |
| `/stars/project-board` | Find Work | Search/Filter | `ProjectRequest` (status=OPEN) | Available Requests List |
| `/stars/request/{id}` | Apply/Accept | "Accept Request" Button | `ProjectAssignment` (create) | Confirmation, Project Slot -1 |
| `/stars/upload` | **Submit Video** | **File Upload (MP4)**, Note, Version | `Submission`, `Video`, `R2` | **Stream UID (Encoding)**, Upload Progress |
| `/stars/earnings` | Check Pay | Date Range Filter | `Settlement` | Monthly Income Chart |

---

## 🎬 4. Studio (B2B/Contests) (`/studio/`)

| URL | Function | Input | DB Models | Output |
|---|---|---|---|---|
| `/studio/request` | Request Production | Form (Budget, Ref, Deadline) | `ProjectRequest` | Estimate Range, Success Email |
| `/studio/contests/` | List Contests | - | `ProjectRequest` (type=CONTEST) | Active Contests, Prize Amounts |
| `/studio/contests/{id}` | **Submit Entry** | **File Upload**, Description | `Submission` | Entry ID, Participation Cert |

---

## 📢 5. Marketing (`/marketing/`)

| URL | Function | Input | DB Models | Output |
|---|---|---|---|---|
| `/marketing/request` | Request Agency | Form (Company, Goal, Budget) | `Lead` (type=AGENCY) | Consultation Slot |
| `/marketing/cases` | Case Studies | Filter (Industry) | `Post` (type=CASE), `Campaign` | Performance Graphs (Views/Sales) |

---

## 🎓 6. Education (`/education/`) 🆕

| URL | Function | Input | DB Models | Output |
|---|---|---|---|---|
| `/education/courses` | List Courses | Level Filter | `Course` | Available Courses, Prices |
| `/education/courses/{slug}` | Course Detail | "Enroll" Button (Payment) | `Enrollment`, `Payment` | **Access Granted**, Receipt |
| `/lms/curriculum` | **Watch Lecture** | Select Lesson | `Enrollment`, `Lesson` | **Stream UID + JWT Token** |
| `/lms/assignments` | Submit Homework | Text/File Upload | `Submission` (type=HOMEWORK) | Grades, Feedback |
