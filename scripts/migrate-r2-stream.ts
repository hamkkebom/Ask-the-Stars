
import { PrismaClient } from '../packages/database/node_modules/@prisma/client';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env from apps/api
dotenv.config({ path: path.resolve(__dirname, '../apps/api/.env') });

const prisma = new PrismaClient();

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const R2_PUBLIC_URL = process.env.CLOUDFLARE_PUBLIC_Url || process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_API_TOKEN) {
    console.error('❌ Cloudflare Credentials Missing in apps/api/.env');
    process.exit(1);
}

// Config
const BATCH_SIZE = 10;
const DELAY_MS = 2000; // 2 seconds delay between requests
const DRY_RUN = process.argv.includes('--dry-run');

// Helper: Delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function getPresignedDownloadUrl(r2Key: string) {
     // For R2, if we have a custom domain/public URL, we might need a signed URL if bucket is private.
     // Assuming bucket is public-read for now OR we use the worker pattern.
     // However, Cloudflare Stream 'copy' needs a publicly accessible URL or a signed URL.
     // If the bucket is private, we should generate an R2 Presigned URL.

     // Note: Generating R2 Presigned URL requires AWS SDK.
     // Let's assume we can generate it using the S3 Client if needed.
     // importing AWS SDK here would be best practice.
     const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
     const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

     const s3 = new S3Client({
        region: 'auto',
        endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
            secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
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
        // 1. Find eligible videos
        const videosToMigrate = await prisma.videoTechnicalSpec.findMany({
            where: {
                 AND: [
                    { r2Key: { not: null } },
                    { streamUid: null }
                 ]
            },
            take: Number(process.env.LIMIT) || 100, // Safe limit by default
            include: {
                video: {
                    select: {
                        project: { select: { ownerId: true } }
                    }
                }
            }
        });

        console.log(`found ${videosToMigrate.length} videos eligible for migration.`);

        if (videosToMigrate.length === 0) {
            console.log('✅ No videos need migration.');
            return;
        }

        let successCount = 0;
        let failCount = 0;

        for (const spec of videosToMigrate) {
            const r2Key = spec.r2Key!;
            console.log(`\nProcessing: ${r2Key} (ID: ${spec.id})`);

            if (DRY_RUN) {
                console.log(`[DRY RUN] Would copy to Stream.`);
                continue;
            }

            try {
                // Generate Signed URL for R2 (Safety first)
                const sourceUrl = await getPresignedDownloadUrl(r2Key);
                const ownerId = spec.video.project.ownerId;

                // Call Cloudflare Stream Copy
                console.log(`☁️ Sending Copy Request to Cloudflare...`);
                // Use requireSignedURLs: true by default
                const response = await axios.post(
                    `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/copy`,
                    {
                        url: sourceUrl,
                        meta: {
                            filename: r2Key,
                            name: r2Key, // Set name to key initially
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

                    // Update DB immediately with UID
                    await prisma.videoTechnicalSpec.update({
                        where: { id: spec.id },
                        data: {
                            streamUid: uid,
                            // Optional: Update status to 'PROCESSING' if we had a status field on spec?
                            // Currently 'Video' status is 'FINAL', so we leave it.
                            // Stream Webhook will eventually update status if we decide to track encoding.
                        }
                    });
                    successCount++;
                } else {
                    throw new Error(JSON.stringify(response.data.errors));
                }

            } catch (error: any) {
                console.error(`❌ Failed:`, error.response?.data || error.message);
                failCount++;
            }

            // Rate Limit Delay
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
