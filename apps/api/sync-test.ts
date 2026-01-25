import { PrismaClient } from '@prisma/client';
import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY || '',
  },
  forcePathStyle: true,
});

async function run() {
  try {
    console.log('🔄 Checking R2 files for ', process.env.CLOUDFLARE_R2_BUCKET_NAME);

    // 1. List R2
    const command = new ListObjectsV2Command({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME || 'hamkkebom-uploads',
    });
    const response = await s3Client.send(command);
    const videoFiles = (response.Contents || []).filter(f =>
       ['.mp4', '.mov', '.mkv', '.avi'].some(ext => f.Key?.toLowerCase().endsWith(ext))
    );

    console.log(`Found ${videoFiles.length} videos in R2.`);

    // 2. Check DB
    const dbSpecs = await prisma.videoTechnicalSpec.findMany({ select: { r2Key: true } });
    const dbKeys = new Set(dbSpecs.map(s => s.r2Key));

    // 3. Sync Missing
    const missing = videoFiles.filter(f => !dbKeys.has(f.Key!));
    console.log(`Syncing ${missing.length} missing videos...`);

    const systemUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } }) || await prisma.user.findFirst();
    if (!systemUser) throw new Error('No user to assign projects');

    for (const orphan of missing) {
        const key = orphan.Key!;
        const fileName = decodeURIComponent(key).split('/').pop() || '';

        // Simple create logic (ignoring complex regex for now to just get them in)
        await prisma.project.create({
            data: {
                title: fileName.replace(/\.[^/.]+$/, ""),
                status: 'COMPLETED',
                ownerId: systemUser.id,
                videos: {
                    create: {
                        versionLabel: 'v1.0',
                        status: 'FINAL',
                        technicalSpec: {
                            create: {
                                filename: fileName,
                                r2Key: key,
                                fileSize: orphan.Size ? BigInt(orphan.Size) : null,
                            }
                        }
                    }
                }
            }
        });
        console.log(`Synced: ${fileName}`);
    }

    console.log('✅ Sync Completed.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
