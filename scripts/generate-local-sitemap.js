const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(__dirname, '../apps/web/src/app');
const OUTPUT_FILE = path.join(__dirname, '../docs/04-development/LOCAL_SITEMAP.md');
const BASE_URL = 'http://localhost:3000';

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
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
    .filter(file => file.endsWith('page.tsx') || file.endsWith('page.js'))
    .map(file => {
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

      // Special case titles based on path
      let title = '페이지';
      if (routePath === '/') title = '🏠 메인 홈페이지';
      else if (routePath.includes('/admin')) title = '🛠️ 관리자';
      else if (routePath.includes('/stars')) title = '🌟 프리랜서 (Stars)';
      else if (routePath.includes('/studio')) title = '🎬 스튜디오';
      else if (routePath.includes('/education')) title = '🎓 교육';
      else if (routePath.includes('/login')) title = '🔐 로그인';
      else if (routePath.includes('/signup')) title = '📝 회원가입';
      else if (routePath.includes('/videos')) title = '📺 영상 브라우저';

      // Add specific logic for your feedback pages
      if (routePath.includes('/feedback')) title = '💬 피드백';

      return {
        original: file,
        route: routePath,
        url: `${BASE_URL}${clickablePath === '/' ? '' : clickablePath}`,
        title: title
      };
    })
    .sort((a, b) => a.route.localeCompare(b.route));

  // Grouping logic (simplified)
  const content = `# 🗺️ 로컬 사이트맵 (자동 생성됨)

> 이 파일은 \`scripts/generate-local-sitemap.js\` 스크립트에 의해 자동 생성되었습니다.
> **Ctrl + 클릭** (또는 Cmd + 클릭)하시면 브라우저에서 열립니다.

## 📌 주요 페이지 바로가기

${pages.map(p => `- [**${p.title}**](${p.url}) \`(${p.route})\``).join('\n')}
`;

  fs.writeFileSync(OUTPUT_FILE, content);
  console.log(`✅ Automatically generated sitemap with ${pages.length} pages at ${OUTPUT_FILE}`);
}

generateSitemap();
