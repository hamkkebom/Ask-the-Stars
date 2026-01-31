const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, '../apps/web/src/app');
const OUTPUT_FILE = path.join(
  __dirname,
  '../docs/04-development/LOCAL_SITEMAP.md'
);
const BASE_URL = 'http://localhost:3000';

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file));
    }
  });

  return arrayOfFiles;
}

function generateSitemap() {
  console.log('🔍 Scanning pages in:', APP_DIR);
  const files = getAllFiles(APP_DIR);

  const pages = files
    .filter((file) => file.endsWith('page.tsx') || file.endsWith('page.js'))
    .map((file) => {
      let relativePath = path.relative(APP_DIR, file);
      let routePath = relativePath
        .replace(/\\/g, '/') // Ensure forward slashes
        .replace(/\/page\.(tsx|js)/, '') // Remove page.tsx
        .replace(/page\.(tsx|js)/, '') // Remove root page.tsx
        .replace(/\/\([^\)]+\)/g, '') // Remove route groups like (admin), (public)
        .replace(/^\([^\)]+\)\//, '') // Remove root route groups
        .replace(/\/$/, '') // Remove trailing slash
        .replace(/^/, '/'); // Ensure leading slash

      // Clean up multiple slashes aimed involved with group removals
      routePath = routePath.replace(/\/\//g, '/');
      if (routePath === '') routePath = '/';

      // Handle dynamic routes for display
      let displayPath = routePath;
      let clickablePath = routePath.replace(/\[([^\]]+)\]/g, '1'); // Default dynamic params to '1' for testability

      // Comprehensive title mapping for clear page names
      const titleMap = {
        // Home
        '/': '🏠 메인 홈페이지',

        // About
        '/about': '📖 회사 소개',
        '/about/contact': '📞 연락처',
        '/about/culture': '🎯 기업문화',
        '/about/history': '📅 연혁',
        '/about/vision': '🔭 비전',

        // Admin Dashboard
        '/admin': '🛠️ 관리자 대시보드',
        '/admin/analytics': '📊 관리자 - 분석',
        '/admin/clients': '👥 관리자 - 클라이언트',
        '/admin/contests': '🏆 관리자 - 공모전',
        '/admin/education': '🎓 관리자 - 교육',
        '/admin/finance': '💰 관리자 - 재무 대시보드',
        '/admin/finance/payouts': '💳 관리자 - 지급 관리',
        '/admin/finance/revenue': '📈 관리자 - 매출 관리',
        '/admin/marketing': '📣 관리자 - 마케팅',
        '/admin/notifications': '🔔 관리자 - 알림',
        '/admin/settings': '⚙️ 관리자 - 설정',
        '/admin/stars': '⭐ 관리자 - 프리랜서',
        '/admin/stars/payouts': '💳 관리자 - 프리랜서 정산',
        '/admin/stars/projects': '📁 관리자 - 프리랜서 프로젝트',
        '/admin/stars/requests': '📨 관리자 - 제작 요청',
        '/admin/stars/reviews': '📝 관리자 - 리뷰',
        '/admin/studio': '🎬 관리자 - 스튜디오',
        '/admin/talent': '🌟 관리자 - 인재 허브',
        '/admin/tasks': '✅ 관리자 - 할일',
        '/admin/videos': '📺 관리자 - 영상 관리',

        // Auth
        '/auth/forgot-password': '🔑 비밀번호 찾기',
        '/auth/login': '🔐 로그인',
        '/auth/reset-password': '🔄 비밀번호 재설정',
        '/auth/signup': '📝 회원가입',
        '/auth/signup/client': '📝 회원가입 - 클라이언트',
        '/auth/signup/contestant': '📝 회원가입 - 공모전 참가자',
        '/auth/signup/marketing': '📝 회원가입 - 마케팅',
        '/auth/signup/stars': '⭐ 회원가입 - 프리랜서',
        '/auth/signup/student': '📝 회원가입 - 수강생',
        '/auth/verify-email': '✉️ 이메일 인증',

        // Contests
        '/contests': '🏆 공모전 메인',

        // Counselor Dashboard
        '/counselor/dashboard': '💼 상담사 - 대시보드',
        '/counselor/feedback': '💬 상담사 - 피드백',
        '/counselor/my-videos': '🎥 상담사 - 내 영상',
        '/counselor/profile': '👤 상담사 - 프로필',
        '/counselor/requests': '📨 상담사 - 요청',

        // Counselors (Public)
        '/counselors': '👨‍⚕️ 상담사 소개',

        // Dashboard
        '/dashboard': '📊 통합 대시보드',

        // Education
        '/education': '🎓 AI 교육 메인',
        '/education/certification': '🏅 자격증/데뷔',
        '/education/courses': '📚 교육 과정',
        '/education/courses/advanced': '🎯 심화반 (1급)',
        '/education/courses/basic': '📖 기초반 (2급)',
        '/education/lms': '💻 수강생 강의실',
        '/education/lms/assignments': '📝 과제 제출',
        '/education/lms/curriculum': '📅 커리큘럼/일정',
        '/education/session': '📣 설명회 신청',

        // Help
        '/help': '❓ 고객센터',
        '/help/faq': '💬 자주 묻는 질문',

        // Marketing
        '/marketing': '📣 마케팅 대행 메인',
        '/marketing/cases': '📊 성공 사례',
        '/marketing/request': '📨 마케팅 의뢰',
        '/marketing/services': '🛎️ 서비스 안내',

        // Moon (Advertiser) Dashboard
        '/moon/advertising/analytics': '📈 광고주 - 광고 분석',
        '/moon/advertising/campaigns': '🎯 광고주 - 캠페인',
        '/moon/feedback/review-queue': '📋 광고주 - 리뷰 대기열',
        '/moon/feedback/templates': '📄 광고주 - 피드백 템플릿',
        '/moon/feedback/video-review': '🎬 광고주 - 영상 리뷰',
        '/moon/management/dashboard': '💼 광고주 - 관리 현황',
        '/moon/management/freelancers': '👥 광고주 - 프리랜서 관리',
        '/moon/management/project-requests': '📨 광고주 - 프로젝트 요청',
        '/moon/management/project-requests/create': '➕ 광고주 - 요청 생성',
        '/moon/settlement/primary-settlement': '💰 광고주 - 1차 정산',
        '/moon/settlement/secondary-settlement': '💳 광고주 - 2차 정산',

        // News
        '/news': '📰 뉴스룸',
        '/news/[slug]': '📰 뉴스 상세',
        '/news/category/[slug]': '📰 뉴스 카테고리',

        // Legal
        '/privacy': '🔒 개인정보처리방침',
        '/terms': '📋 이용약관',

        // Requests
        '/requests': '📨 요청 목록',
        '/requests/[id]': '📨 요청 상세',
        '/requests/new': '➕ 새 요청',

        // Search
        '/search': '🔍 통합 검색',

        // Stars (Freelancer) Dashboard
        '/stars': '⭐ 프리랜서 메인',
        '/stars/dashboard': '⭐ 프리랜서 - 대시보드',
        '/stars/dashboard/analytics': '📊 프리랜서 - 상세 분석',
        '/stars/direct-upload': '⬆️ 프리랜서 - 다이렉트 업로드',
        '/stars/earnings': '💰 프리랜서 - 수입 관리',
        '/stars/feedback': '💬 프리랜서 - 피드백',
        '/stars/my-projects': '📁 프리랜서 - 내 프로젝트',
        '/stars/my-projects/detail/[id]': '📁 프리랜서 - 프로젝트 상세',
        '/stars/open-projects': '📋 프리랜서 - 오픈 프로젝트',
        '/stars/performance': '📊 프리랜서 - 성과',
        '/stars/portfolio': '🖼️ 프리랜서 - 포트폴리오',
        '/stars/profile': '👤 프리랜서 - 프로필',
        '/stars/project-board': '📋 프리랜서 - 제작요청 게시판',
        '/stars/request-detail/[id]': '📨 프리랜서 - 요청 상세',
        '/stars/requests/create': '➕ 프리랜서 - 요청 생성',
        '/stars/resources': '📚 프리랜서 - 자료실',
        '/stars/settings': '⚙️ 프리랜서 - 설정',
        '/stars/upload': '⬆️ 프리랜서 - 업로드',

        // Studio
        '/studio': '🎬 AI 스튜디오 메인',
        '/studio/contests': '🏆 스튜디오 - 공모전',
        '/studio/contests/contests': '🏆 스튜디오 - 공모전 목록',
        '/studio/contests/my-entries': '📝 스튜디오 - 내 출품작',
        '/studio/contests/ongoing': '🔥 스튜디오 - 진행중 공모전',
        '/studio/contests/past': '📜 스튜디오 - 지난 공모전',
        '/studio/creators': '👥 스튜디오 - AI 크리에이터',
        '/studio/my-projects': '📁 스튜디오 - 내 프로젝트',
        '/studio/portfolio': '🖼️ 스튜디오 - 작품 갤러리',
        '/studio/pricing': '💎 스튜디오 - 요금 안내',
        '/studio/request': '📨 스튜디오 - 제작 의뢰',
        '/studio/services': '🛎️ 스튜디오 - 서비스 안내',

        // Videos (Netflix-like)
        '/videos': '🎬 영상 갤러리',
        '/videos/[id]': '🎬 영상 상세',
      };

      // Get title from map or generate from path
      let title = titleMap[routePath];
      if (!title) {
        // Handle dynamic routes
        const basePath = routePath.replace(/\/\[[^\]]+\]/g, '');
        title = titleMap[basePath];
        if (!title) {
          // Fallback: generate title from path
          const lastSegment = routePath.split('/').filter(Boolean).pop() || '';
          title = lastSegment ? `📄 ${lastSegment}` : '📄 페이지';
        } else {
          title += ' (상세)';
        }
      }

      return {
        original: file,
        route: routePath,
        url: `${BASE_URL}${clickablePath === '/' ? '' : clickablePath}`,
        title: title,
      };
    })
    .sort((a, b) => a.route.localeCompare(b.route));

  // Grouping logic (simplified)
  const content = `# 🗺️ 로컬 사이트맵 (자동 생성됨)

> 이 파일은 \`scripts/generate-local-sitemap.js\` 스크립트에 의해 자동 생성되었습니다.
> **Ctrl + 클릭** (또는 Cmd + 클릭)하시면 브라우저에서 열립니다.

## 📌 주요 페이지 바로가기

${pages.map((p) => `- [**${p.title}**](${p.url}) \`(${p.route})\``).join('\n')}
`;

  fs.writeFileSync(OUTPUT_FILE, content);
  console.log(
    `✅ Automatically generated sitemap with ${pages.length} pages at ${OUTPUT_FILE}`
  );
}

generateSitemap();
