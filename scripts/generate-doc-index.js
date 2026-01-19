const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();
const docsDir = path.join(rootDir, 'docs');
const outputFile = path.join(docsDir, 'README.md');

// Configuration: Category Titles Mapping
const categoryTitles = {
    '01-getting-started': '🚀 시작하기 (Getting Started)',
    '02-architecture': '🏗️ 아키텍처 (Architecture)',
    '03-api': '🔌 API (Developers)',
    '04-development': '💻 개발 가이드 (Contributing)',
    '05-operations': '⚙️ 운영 및 배포 (Operations)',
    '06-security': '🔐 보안 (Security)',
    '07-user-guides': '📖 사용자 가이드 (User Guides)',
    '08-adr': '📝 의사결정 기록 (Architecture Decisions)',
    '09-planning': '🗺️ 기획 및 로드맵 (Planning)',
    '10-logs': '📅 작업 일지 (Daily Logs)'
};

// --- Helper Functions ---

function getSortedFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    const files = fs.readdirSync(dir);

    return files
        .filter(f => f.endsWith('.md') && f !== 'README.md') // Exclude README inside subfolders (usually index)
        .map(f => {
            const fullPath = path.join(dir, f);
            const stat = fs.statSync(fullPath);
            return {
                name: f,
                relativePath: path.relative(docsDir, fullPath).replace(/\\/g, '/'),
                mtime: stat.mtime
            };
        })
        .sort((a, b) => b.mtime - a.mtime); // Sort by recent
}

function getSubDirectories(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir)
        .map(f => ({ name: f, path: path.join(dir, f) }))
        .filter(d => fs.statSync(d.path).isDirectory() && /^\d{2}-/.test(d.name)) // Match 01-, 10-
        .sort((a, b) => a.name.localeCompare(b.name));
}

// --- Main Generation Logic ---

let content = `# 📚 프로젝트 문서 인덱스 (Project Documentation)

> **마지막 업데이트**: ${new Date().toLocaleString('ko-KR')}
> **위치**: \`docs/README.md\`
>
> 이 프로젝트의 문서는 **Context7 표준 10단계 계층 구조**를 따릅니다.

---

`;

// 1. Scan Numbered Categories
const subDirs = getSubDirectories(docsDir);

subDirs.forEach(dir => {
    const title = categoryTitles[dir.name] || dir.name;
    let files = getSortedFiles(dir.path);

    // Hardcoded overrides for GitHub-aligned files
    if (dir.name === '04-development') {
        files.push({
            name: 'CONTRIBUTING.md',
            relativePath: '../.github/CONTRIBUTING.md',
            mtime: fs.statSync(path.join(rootDir, '.github/CONTRIBUTING.md')).mtime
        });
    }
    if (dir.name === '06-security') {
        files.push({
            name: 'SECURITY.md',
            relativePath: '../SECURITY.md',
            mtime: fs.statSync(path.join(rootDir, 'SECURITY.md')).mtime
        });
    }

    files.sort((a, b) => b.mtime - a.mtime);

    content += `## ${title}\n\n`;

    // Check if the folder has its own README
    if (fs.existsSync(path.join(dir.path, 'README.md'))) {
        content += `> 👉 **[섹션 메인으로 이동](./${dir.name}/README.md)**\n\n`;
    }

    if (files.length > 0) {
        content += `| 문서 (Document) | 업데이트 (Modified) |\n`;
        content += `|---|---|\n`;
        files.forEach(f => {
            const date = f.mtime.toISOString().substring(0, 10);
            content += `| [${f.name}](./${f.relativePath}) | ${date} |\n`;
        });
        content += `\n`;
    } else {
        content += `_(문서 준비 중)_\n\n`;
    }
});

// 2. Scan Uncategorized (Root of docs/)
const rootFiles = getSortedFiles(docsDir).filter(f => f.name !== 'README.md' && f.name !== 'DOC_INDEX.md'); // Exclude self

if (rootFiles.length > 0) {
    content += `## 📂 기타 문서 (General)\n\n`;
    content += `| 문서 (Document) | 업데이트 (Modified) |\n`;
    content += `|---|---|\n`;
    rootFiles.forEach(f => {
        const date = f.mtime.toISOString().substring(0, 10);
        content += `| [${f.name}](./${f.relativePath}) | ${date} |\n`;
    });
    content += `\n`;
}

// Write File
fs.writeFileSync(outputFile, content);
console.log(`✅ Generated index at: ${outputFile}`);
