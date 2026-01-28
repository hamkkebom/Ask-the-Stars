
const { PrismaClient } = require('../packages/database/node_modules/@prisma/client');
let axios;
let dotenv;

try {
    axios = require('axios');
    dotenv = require('dotenv');
} catch (e) {
    try {
        axios = require('../apps/api/node_modules/axios');
        dotenv = require('../apps/api/node_modules/dotenv');
    } catch (e2) {
        console.error('❌ Could not load axios/dotenv.');
        process.exit(1);
    }
}

const path = require('path');
// Fix path to .env: Go up one level from 'scripts' to root, then to apps/api
dotenv.config({ path: path.resolve(__dirname, '../apps/api/.env') });

const prisma = new PrismaClient();

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_STREAM_TOKEN;

console.log('--- Credential Check ---');
console.log('Account ID:', CLOUDFLARE_ACCOUNT_ID);
console.log('API Token:', CLOUDFLARE_API_TOKEN ? '***' : 'MISSING');

if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    console.error('❌ Cloudflare Credentials Missing. Checked: ' + path.resolve(__dirname, '../apps/api/.env'));
    // Fallback try root .env
    dotenv.config();
}

const DELAY_MS = 2000;
const DRY_RUN = process.argv.includes('--dry-run');

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function getPresignedDownloadUrl(r2Key) {
     const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
     const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

     // S3 Client needs params from env too
     const s3 = new S3Client({
        region: 'auto',
        endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
            secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
        }
     });

     const command = new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME || 'hamkkebom-uploads',
        Key: r2Key
     });

     return await getSignedUrl(s3, command, { expiresIn: 3600 });
}

async function migrate() {
    console.log(`🚀 Starting R2 -> Stream Migration ` + (DRY_RUN ? '(DRY RUN)' : ''));

    try {
        // Simplified Query: Just check if streamUid is null
        // We filter r2Key in JS to avoid Prisma validation edge cases with 'not: null'
        const potentials = await prisma.videoTechnicalSpec.findMany({
            where: {
                streamUid: null
            },
            take: Number(process.env.LIMIT) || 100,
            include: {
                video: {
                    select: {
                        project: { select: { ownerId: true } }
                    }
                }
            }
        });

        // Filter in JS
        const videosToMigrate = potentials.filter(v => v.r2Key != null && v.r2Key !== '');

        console.log(`found ${videosToMigrate.length} videos eligible for migration.`);

        if (videosToMigrate.length === 0) {
            console.log('✅ No videos need migration.');
            return;
        }

        let successCount = 0;
        let failCount = 0;

        for (const spec of videosToMigrate) {
            const r2Key = spec.r2Key;
            console.log(`\nProcessing: ${r2Key} (ID: ${spec.id})`);

            if (DRY_RUN) {
                console.log(`[DRY RUN] Would copy to Stream.`);
                continue;
            }

            try {
                const sourceUrl = await getPresignedDownloadUrl(r2Key);
                // Handle ownerId safely
                const ownerId = spec.video?.project?.ownerId || 'system_fallback';

                console.log(`☁️ Sending Copy Request to Cloudflare...`);

                const response = await axios.post(
                    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/copy`,
                    {
                        url: sourceUrl,
                        meta: {
                            filename: r2Key,
                            name: r2Key,
                        },
                        requireSignedURLs: true,
                        creator: ownerId
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${CLOUDFLARE_API_TOKEN}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (response.data.success) {
                    const uid = response.data.result.uid;
                    console.log(`✅ Copy Started! UID: ${uid}`);

                    await prisma.videoTechnicalSpec.update({
                        where: { id: spec.id },
                        data: {
                            streamUid: uid,
                        }
                    });
                    successCount++;
                } else {
                    throw new Error(JSON.stringify(response.data.errors));
                }

            } catch (error) {
                console.error(`❌ Failed:`, error.response?.data || error.message);
                failCount++;
            }

            await delay(DELAY_MS);
        }

        console.log(`\n🎉 Migration Batch Complete!`);
        console.log(`Success: ${successCount}`);
        console.log(`Failed: ${failCount}`);

    } catch (e) {
        console.error('Global Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

migrate();
