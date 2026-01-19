const fs = require('fs');
const path = require('path');

// Define paths
const ROOT_DIR = path.resolve(__dirname, '..');
const WEB_PKG_PATH = path.join(ROOT_DIR, 'apps/web/package.json');
const API_PKG_PATH = path.join(ROOT_DIR, 'apps/api/package.json');
const ROOT_PKG_PATH = path.join(ROOT_DIR, 'package.json');
const TECH_STACK_DOC = path.join(ROOT_DIR, 'docs/TECH_STACK.md');

// Define tech to look for and their package names
const TARGET_STACK = [
    { name: 'Next.js', pkg: 'next', source: WEB_PKG_PATH },
    { name: 'React', pkg: 'react', source: WEB_PKG_PATH },
    { name: 'TypeScript', pkg: 'typescript', source: ROOT_PKG_PATH },
    { name: 'TailwindCSS', pkg: 'tailwindcss', source: WEB_PKG_PATH },
    { name: 'Zustand', pkg: 'zustand', source: WEB_PKG_PATH },
    { name: 'TanStack Query', pkg: '@tanstack/react-query', source: WEB_PKG_PATH },
    { name: 'Plyr', pkg: 'plyr', source: WEB_PKG_PATH },
    { name: 'HLS.js', pkg: 'hls.js', source: WEB_PKG_PATH },
    { name: 'Fabric.js', pkg: 'fabric', source: WEB_PKG_PATH },
    { name: 'Socket.io Client', pkg: 'socket.io-client', source: WEB_PKG_PATH },
    { name: 'Lucide React', pkg: 'lucide-react', source: WEB_PKG_PATH },
    { name: 'NestJS', pkg: '@nestjs/core', source: API_PKG_PATH },
    { name: 'Prisma', pkg: 'prisma', source: ROOT_PKG_PATH },
    { name: 'BullMQ', pkg: 'bullmq', source: API_PKG_PATH },
    { name: 'Socket.io', pkg: 'socket.io', source: API_PKG_PATH },
    { name: 'class-validator', pkg: 'class-validator', source: API_PKG_PATH },
    { name: 'Passport', pkg: 'passport', source: API_PKG_PATH },
];

function getVersion(pkgPath, pkgName) {
    if (!fs.existsSync(pkgPath)) return null;
    try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        const deps = { ...pkg.dependencies, ...pkg.devDependencies };
        return deps[pkgName] ? deps[pkgName].replace(/^[\^~]/, '') : null;
    } catch (e) {
        return null;
    }
}

function getNodeVersion() {
    try {
        const pkg = JSON.parse(fs.readFileSync(ROOT_PKG_PATH, 'utf8'));
        return pkg.engines?.node || null;
    } catch (e) {
        return null;
    }
}

function sync() {
    console.log('🔄 Syncing Tech Stack Documentation...');
    let docContent = fs.readFileSync(TECH_STACK_DOC, 'utf8');
    let changes = 0;

    // 1. Update Package Versions
    TARGET_STACK.forEach(tech => {
        const version = getVersion(tech.source, tech.pkg);
        if (version) {
            // Regex to find: | [Name](...) | VERSION |
            // Captures: 1=NameLink, 2=OldVersion, 3=Rest
            // We look for the exact name in the link text or just the name column
            const regex = new RegExp(`(\\| \\[${tech.name.replace('.','\\.')}\\]\\(.*?\\) \\| )(.+?)( \\|)`, 'g');

            if (docContent.match(regex)) {
                docContent = docContent.replace(regex, (match, prefix, oldVer, suffix) => {
                    if (oldVer.trim() !== version) {
                        console.log(`✅ Updated ${tech.name}: ${oldVer.trim()} -> ${version}`);
                        changes++;
                        return `${prefix}${version}${suffix}`;
                    }
                    return match;
                });
            }
        }
    });

    // 2. Update Node.js Version
    const nodeVer = getNodeVersion();
    if (nodeVer) {
        const nodeRegex = /(\| \[Node\.js\]\(.*?\) \| )(.+?)( \|)/;
        docContent = docContent.replace(nodeRegex, (match, prefix, oldVer, suffix) => {
             if (!oldVer.includes(nodeVer)) { // Allow "22.x (Pinned)" formatting
                 // Only update if strictly different and not just a suffix difference
                 // Ideally we keep the (Pinned) text if it exists, or just replace number.
                 // For now, let's just log it.
                 console.log(`ℹ️ Node.js version in code: ${nodeVer}. Doc has: ${oldVer.trim()}`);
                 return match;
             }
             return match;
        });
    }

    // 3. Update "Last Updated" Date
    if (changes > 0) {
        const today = new Date().toISOString().split('T')[0];
        const dateRegex = /> \*\*적용 현황 업데이트\*\*: \d{4}-\d{2}-\d{2}/;
        docContent = docContent.replace(dateRegex, `> **적용 현황 업데이트**: ${today}`);
        console.log(`📅 Updated timestamp to ${today}`);
    }

    // Write back
    if (changes > 0) {
        fs.writeFileSync(TECH_STACK_DOC, docContent, 'utf8');
        console.log(`✨ Successfully updated ${changes} items in TECH_STACK.md`);
    } else {
        console.log('✨ Documentation is already up to date.');
    }
}

sync();
