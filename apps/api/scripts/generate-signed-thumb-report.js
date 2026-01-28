const { PrismaClient } = require('@prisma/client');
const crypto = require('crypto');
const path = require('path');
const dotenv = require('dotenv');

// Load env
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const prisma = new PrismaClient();

const SIGNING_KEY_ID = process.env.CLOUDFLARE_SIGNING_KEY_ID;
let SIGNING_KEY_PEM = process.env.CLOUDFLARE_SIGNING_KEY_PEM || '';

if (SIGNING_KEY_PEM && !SIGNING_KEY_PEM.trim().startsWith('-----')) {
    try {
        SIGNING_KEY_PEM = Buffer.from(SIGNING_KEY_PEM, 'base64').toString('utf8');
    } catch (e) {
        console.error('Failed to decode PEM');
    }
}
SIGNING_KEY_PEM = SIGNING_KEY_PEM.replace(/\\n/g, '\n');

const base64url = (str) => {
    return Buffer.from(str)
        .toString('base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
};

function generateSignedToken(uid) {
    if (!SIGNING_KEY_ID || !SIGNING_KEY_PEM) return '';

    const header = { alg: 'RS256', kid: SIGNING_KEY_ID, typ: 'JWT' };
    const payload = {
        sub: uid,
        kid: SIGNING_KEY_ID,
        exp: Math.floor(Date.now() / 1000) + 3600 * 24,
        accessRules: [{ type: 'any', action: 'allow' }]
    };

    const encodedHeader = base64url(JSON.stringify(header));
    const encodedPayload = base64url(JSON.stringify(payload));
    const data = `${encodedHeader}.${encodedPayload}`;

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(data);
    const signature = signer.sign(SIGNING_KEY_PEM, 'base64url');

    return `${data}.${signature}`;
}

async function main() {
    // 1. Fetch specs first (no relation)
    const specs = await prisma.videoTechnicalSpec.findMany({
        where: { streamUid: { not: null } },
        take: 5,
        select: { video_id: true, streamUid: true }
    });

    console.log('# 📸 썸네일 자동 생성 확인 (Secure Report)');
    console.log('보안(Signed URL)이 적용된 썸네일 리포트입니다.\n');
    console.log('| 영상 제목 (Title) | 썸네일 미리보기 (Live Preview) | 식별자 (Stream UID) |');
    console.log('| :--- | :--- | :--- |');

    for (const spec of specs) {
        // 2. Fetch video title separately
        const video = await prisma.video.findUnique({
            where: { id: spec.video_id },
            select: { id: true }
            // Note: If 'title' is not on Video but on Project?
            // Checking schema: Video has no title, relation Project has title?
            // Wait, schema check needed.
            // Video model has 'relations' but no title field probably.
            // Let's assume title is on Project or we just use ID if title fails.
            // Wait, schema check:
            // model Video { id ... projectId ... project Project ... }
            // model Project { title ... }
        });

        let title = 'Untitled';
        if (video) {
             const project = await prisma.project.findUnique({
                 where: { id: (await prisma.video.findUnique({where: {id: spec.video_id}})).projectId },
                 select: { title: true }
             });
             title = project?.title || 'Untitled';
        }

        const token = generateSignedToken(spec.streamUid);
        const signedUrl = `https://videodelivery.net/${token}/thumbnails/thumbnail.jpg?width=300&height=169&fit=crop`;
        console.log(`| **${title}** | ![](${signedUrl}) | \`${spec.streamUid.substring(0, 8)}...\` |`);
    }
    console.log('\n> *이미지는 24시간 동안 유효한 보안 토큰으로 서명되었습니다.*');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
