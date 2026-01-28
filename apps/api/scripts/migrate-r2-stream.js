
const path = require('path');
const dotenv = require('dotenv');

// Load env from apps/api/.env
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

// Standard Requires
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const prisma = new PrismaClient();

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_STREAM_TOKEN;

console.log('--- Credential Check ---');
console.log('Account ID:', CLOUDFLARE_ACCOUNT_ID);
console.log('API Token:', CLOUDFLARE_API_TOKEN ? '***' : 'MISSING');

if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    console.error('❌ Cloudflare Credentials Missing');
    process.exit(1);
}

const DELAY_MS = 2000;
const DRY_RUN = process.argv.includes('--dry-run');
const LIMIT = Number(process.env.LIMIT) || 100;

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function getPresignedDownloadUrl(r2Key) {
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
        const potentials = await prisma.videoTechnicalSpec.findMany({
            where: {
                streamUid: null
            },
            take: LIMIT,
            include: {
                video: {
                    select: {
                        project: { select: { ownerId: true } }
                    }
                }
            }
        });

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
            console.log(`\nProcessing: ${r2Key} (ID: ${spec.video_id})`);

            if (DRY_RUN) {
                console.log(`[DRY RUN] Would copy to Stream.`);
                continue;
            }

            try {
                const sourceUrl = await getPresignedDownloadUrl(r2Key);
                const ownerId = spec.video?.project?.ownerId || 'system_fallback';

                console.log(`☁️ Sending Copy Request to Cloudflare...`);

                const response = await axios.post(
                    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/copy`,
                    {
                        url: sourceUrl,
                        meta: { filename: r2Key, name: r2Key },
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
                        where: { video_id: spec.video_id },
                        data: {
                            streamUid: uid,
                            thumbnailUrl: `https://videodelivery.net/${uid}/thumbnails/thumbnail.jpg`
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
