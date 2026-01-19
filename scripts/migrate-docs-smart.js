const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

// --- 1. Configuration: The Move Matrix ---
// Defined based on docs/DOCUMENT_RESTRUCTURING_PLAN.md
const moves = [
    { from: 'docs/ARCHITECTURE.md', to: 'docs/02-architecture/OVERVIEW.md' },
    { from: 'docs/SITEMAP.md', to: 'docs/02-architecture/SITEMAP.md' },
    { from: 'docs/TECH_STACK.md', to: 'docs/02-architecture/TECH_STACK.md' },
    { from: 'docs/DATABASE_SCHEMA.md', to: 'docs/02-architecture/DATABASE_SCHEMA.md' },
    { from: 'docs/API.md', to: 'docs/03-api/README.md' },
    { from: 'docs/CONTRIBUTING.md', to: 'docs/04-development/CONTRIBUTING.md' },
    { from: 'docs/CODING_CONVENTION.md', to: 'docs/04-development/CODING_CONVENTION.md' },
    { from: 'docs/WORKFLOW.md', to: 'docs/04-development/GIT_WORKFLOW.md' },
    { from: 'docs/TEST_PLAN.md', to: 'docs/04-development/TESTING.md' },
    { from: 'docs/DEPLOYMENT.md', to: 'docs/05-operations/DEPLOYMENT.md' },
    { from: 'docs/RUNBOOK.md', to: 'docs/05-operations/RUNBOOK.md' },
    { from: 'docs/INCIDENT_RESPONSE.md', to: 'docs/05-operations/INCIDENT_RESPONSE.md' },
    { from: 'docs/ACCOUNT_MANAGEMENT.md', to: 'docs/05-operations/ACCOUNT_MANAGEMENT.md' },
    { from: 'docs/PERMISSIONS.md', to: 'docs/06-security/PERMISSIONS.md' },
    { from: 'docs/USER_GUIDE.md', to: 'docs/07-user-guides/USER_GUIDE.md' },
    { from: 'docs/TECH_STACK_COMPARISON.md', to: 'docs/08-adr/0001-tech-stack-selection.md' },
    { from: 'docs/GITHUB_SETUP.md', to: 'docs/01-getting-started/GITHUB_SETUP.md' },
    { from: 'docs/DOC_INDEX.md', to: 'docs/README.md' },
    { from: 'docs/CHANGELOG.md', to: 'CHANGELOG.md' }, // To specific Root
    // Special handling for logs (directory) done separately or manually
];

// Helper to ensure directory exists
function ensureDir(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// --- 2. Build Paths and Maps ---
const absMoves = moves.map(m => ({
    from: path.join(rootDir, m.from),
    to: path.join(rootDir, m.to),
    originalRel: m.from, // e.g. "docs/API.md"
    newRel: m.to         // e.g. "docs/03-api/README.md"
}));

// Map: Absolute Old Path -> Absolute New Path
const pathMap = new Map();
absMoves.forEach(m => pathMap.set(m.from, m.to));

// --- 3. Scan & Fix Links (Pre-Move) ---
// We read ALL markdown files in the project (including those not moving, like project root README)
// to fix links pointing TO files that are about to move.

function getAllMdFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        if (file === 'node_modules' || file === '.git' || file === '.gemini' || file === '.next') return;
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            getAllMdFiles(fullPath, fileList);
        } else if (file.endsWith('.md')) {
            fileList.push(fullPath);
        }
    });
    return fileList;
}

const allMdFiles = getAllMdFiles(rootDir);

console.log(`🔍 Scanning ${allMdFiles.length} markdown files for link updates...`);

allMdFiles.forEach(checkFile => {
    let content = fs.readFileSync(checkFile, 'utf8');
    let changed = false;

    // Determine the *future* location of this file
    // If it's in the update list, its location changes.
    const futureSelfPath = pathMap.get(checkFile) || checkFile;
    const futureSelfDir = path.dirname(futureSelfPath);

    // Regex to find links: [text](target)
    // We only touch relative links starting with ./ or ../ or just filenames
    content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, linkTarget) => {
        // Ignore external links
        if (linkTarget.startsWith('http') || linkTarget.startsWith('#') || linkTarget.startsWith('mailto:')) {
            return match;
        }

        // Resolve absolute path of the link target *currently*
        // linkTarget is relative to checkFile *currently*
        const currentCheckDir = path.dirname(checkFile);

        let absTarget;
        try {
             absTarget = path.resolve(currentCheckDir, linkTarget);
        } catch (e) {
            return match; // skip weird paths
        }

        // Is this target moving?
        // Note: We need to normalize paths to handle Windows backslashes
        // Let's rely on path.resolve which handles it, but key matching needs care.
        // We will loop through moves to find a match.
        const moveEntry = absMoves.find(m => m.from.toLowerCase() === absTarget.toLowerCase());

        if (moveEntry) {
            // Target IS moving.
            // We need to calculate the NEW relative path from FUTURE self to NEW target.
            const newTargetAbs = moveEntry.to;
            let newRelLink = path.relative(futureSelfDir, newTargetAbs);

            // Fix Windows backslashes to forward slashes for Markdown
            newRelLink = newRelLink.replace(/\\/g, '/');

            // Add ./ if needed (optional but good for consistency)
            if (!newRelLink.startsWith('.') && !newRelLink.startsWith('/')) {
                newRelLink = './' + newRelLink;
            }

            console.log(`   🔗 Fix in ${path.relative(rootDir, checkFile)}: ${linkTarget} -> ${newRelLink}`);
            changed = true;
            return `[${text}](${newRelLink})`;
        }

        // Target is NOT moving, but SELF might be moving.
        // If self moves, the relative link to static target must change.
        if (pathMap.has(checkFile)) {
             // Self is moving. Target is static (absTarget).
             // Relink from futureSelfDir to absTarget
             let newRelLink = path.relative(futureSelfDir, absTarget);
             newRelLink = newRelLink.replace(/\\/g, '/');
             if (!newRelLink.startsWith('.') && !newRelLink.startsWith('/')) {
                newRelLink = './' + newRelLink;
            }
             console.log(`   🔗 Fix (Self-Move) in ${path.relative(rootDir, checkFile)}: ${linkTarget} -> ${newRelLink}`);
             changed = true;
             return `[${text}](${newRelLink})`;
        }

        return match;
    });

    if (changed) {
        fs.writeFileSync(checkFile, content, 'utf8');
    }
});

// --- 4. Move Files (Physical Move) ---
console.log('🚚 Moving files...');
absMoves.forEach(m => {
    if (fs.existsSync(m.from)) {
        ensureDir(m.to);
        fs.renameSync(m.from, m.to);
        console.log(`   ✅ Moved: ${m.originalRel} -> ${m.newRel}`);
    } else {
        console.warn(`   ⚠️ Source not found (Skipped): ${m.originalRel}`);
    }
});

// --- 5. Clean up Empty Dirs ---
// Optional/Simplified

// --- 6. Regenerate Index ---
console.log('📚 Regenerating Document Index...');
try {
    // We can reuse the previous logic or call the script if it existed.
    // Since we just reorganized everything, the old script 'generate-doc-index.js' might break
    // if it hardcoded paths. But we will just let the user know to run it or update it.
    // Actually, let's just finish the migration script here.
} catch (e) {
    console.error('Failed to regenerate index', e);
}

console.log('🎉 Migration Complete!');
