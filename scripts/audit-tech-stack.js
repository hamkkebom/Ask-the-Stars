const fs = require('fs');
const path = require('path');

// Define paths
const ROOT_DIR = path.resolve(__dirname, '..');
const WEB_PKG_PATH = path.join(ROOT_DIR, 'apps/web/package.json');
const API_PKG_PATH = path.join(ROOT_DIR, 'apps/api/package.json');
const ROOT_PKG_PATH = path.join(ROOT_DIR, 'package.json');
const TECH_STACK_DOC = path.join(ROOT_DIR, 'docs/TECH_STACK.md');

// Define tech to look for
const TARGET_STACK = [
    { name: 'Next.js', pkg: 'next', source: WEB_PKG_PATH, category: 'Frontend' },
    { name: 'React', pkg: 'react', source: WEB_PKG_PATH, category: 'Frontend' },
    { name: 'TypeScript', pkg: 'typescript', source: ROOT_PKG_PATH, category: 'Frontend' },
    { name: 'TailwindCSS', pkg: 'tailwindcss', source: WEB_PKG_PATH, category: 'Frontend' },
    { name: 'Zustand', pkg: 'zustand', source: WEB_PKG_PATH, category: 'Frontend' },
    { name: 'TanStack Query', pkg: '@tanstack/react-query', source: WEB_PKG_PATH, category: 'Frontend' },
    { name: 'NestJS', pkg: '@nestjs/core', source: API_PKG_PATH, category: 'Backend' },
    { name: 'Prisma', pkg: 'prisma', source: ROOT_PKG_PATH, category: 'Backend' }, // Usually in root devDependencies or sub
    { name: 'Passport', pkg: '@nestjs/passport', source: API_PKG_PATH, category: 'Backend' },
    { name: 'Socket.io', pkg: 'socket.io', source: API_PKG_PATH, category: 'Backend' },
];

function getVersion(pkgPath, pkgName) {
    if (!fs.existsSync(pkgPath)) return 'Not Found';
    try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        return deps[pkgName] || 'Not Installed';
    } catch (e) {
        return 'Error';
    }
}

function getNodeVersion() {
    try {
        const pkg = JSON.parse(fs.readFileSync(ROOT_PKG_PATH, 'utf8'));
        return pkg.engines?.node || 'Not Specified';
    } catch (e) {
        return 'Error';
    }
}

function audit() {
    console.log('# 🔍 Tech Stack Audit Report');
    console.log(`> Generated on: ${new Date().toLocaleString()}`);
    console.log('\n## 📦 Dependency Versions (From package.json)\n');
    console.log('| Change | Category | Technology | Live Version (Code) |');
    console.log('| :---: | :--- | :--- | :--- |');

    TARGET_STACK.forEach(tech => {
        let version = getVersion(tech.source, tech.pkg);
        // Clean version (remove ^ or ~)
        version = version.replace(/^[\^~]/, '');
        console.log(`| 🔄 | ${tech.category} | ${tech.name} | ${version} |`);
    });

    // Add Node.js
    const nodeVer = getNodeVersion();
    console.log(`| 🔄 | Backend | Node.js | ${nodeVer} |`);

    console.log('\n## 💡 Recommendation');
    console.log('Use these specific versions to update `docs/TECH_STACK.md` if they differ.');
}

audit();
