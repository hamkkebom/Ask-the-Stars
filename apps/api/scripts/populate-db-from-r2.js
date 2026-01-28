
const path = require('path');
const dotenv = require('dotenv');

// Load env from current apps/api/.env (since we are in apps/api/scripts)
const envPath = path.resolve(__dirname, '../.env');
console.log('Loading env from:', envPath);
dotenv.config({ path: envPath });

// Standard Requires
const { PrismaClient } = require('@prisma/client');
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

const prisma = new PrismaClient();
console.log('DB URL:', (process.env.DATABASE_URL || '').substring(0, 20) + '...');

// R2 Setup
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'hamkkebom-uploads';

if (!accountId || !accessKeyId || !secretAccessKey) {
    console.error('❌ Missing R2 Credentials in apps/api/.env');
    process.exit(1);
}

const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
});

async function main() {
    console.log(`🚀 Starting Standalone Sync from R2 bucket: ${bucketName}`);

    // 1. Get System User
    let systemUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
    if (!systemUser) {
        systemUser = await prisma.user.findFirst();
        console.warn('⚠️ No ADMIN user found. Using first available user as owner.');
    }

    if (!systemUser) {
        console.warn('⚠️ No users found! Creating system admin...');
        try {
            systemUser = await prisma.user.create({
                data: {
                    email: 'system@hamkkebom.com',
                    password: '$2b$10$EpRnTzVlqHNP0.fKb.U9H.micro',
                    name: 'System Admin',
                    role: 'ADMIN'
                }
            });
            console.log('✅ Created System Admin User');
        } catch(e) {
             console.error('Failed to create system user:', e.message);
             // Verify if we can proceed without user? No, schemas usually require it.
             // Try to find ANY user again
             systemUser = await prisma.user.findFirst();
             if(!systemUser) {
                 console.error('❌ CRITICAL: No user found and creation failed.');
                 process.exit(1);
             }
        }
    }
    console.log(`👤 Using Owner: ${systemUser.name} (${systemUser.id})`);

    // 2. List Files from R2
    let allFiles = [];
    let continuationToken;
    console.log('📦 Listing files from R2...');

    try {
        do {
            const command = new ListObjectsV2Command({
                Bucket: bucketName,
                ContinuationToken: continuationToken
            });
            const response = await s3Client.send(command);
            allFiles = allFiles.concat(response.Contents || []);
            continuationToken = response.NextContinuationToken;
            process.stdout.write('.');
        } while (continuationToken);
    } catch(e) {
        console.error('\n❌ Error listing R2 objects:', e.message);
        process.exit(1);
    }

    const videoFiles = allFiles.filter(f =>  ['.mp4', '.mov', '.mkv', '.avi', '.webm'].some(ext => f.Key.toLowerCase().endsWith(ext)));
    const imageFiles = allFiles.filter(f =>  ['.jpg', '.jpeg', '.png', '.webp'].some(ext => f.Key.toLowerCase().endsWith(ext)));
    console.log(`\n📹 Found ${videoFiles.length} video files.`);
    console.log(`🖼️ Found ${imageFiles.length} image files.`);

    const imageMap = new Map();
    const publicUrl = process.env.CLOUDFLARE_PUBLIC_Url || process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

    imageFiles.forEach(img => {
      const baseName = img.Key.substring(0, img.Key.lastIndexOf('.'));
      imageMap.set(baseName, publicUrl ? `${publicUrl}/${img.Key}` : img.Key);
    });

    // 3. Sync to DB
    let createdCount = 0;

    const existingSpecs = await prisma.videoTechnicalSpec.findMany({ select: { r2Key: true } });
    const existingSet = new Set(existingSpecs.map(s => s.r2Key));

    for (const file of videoFiles) {
        if (existingSet.has(file.Key)) {
            continue;
        }

        try {
            const decodedKey = decodeURIComponent(file.Key);
            const fileName = decodedKey.split('/').pop() || '';

            const regex = /^\[(.+?)\]\s*(.+?)_\[(.+?)\]\s*(.+)$/;
            const match = fileName.match(regex);

            let categoryName = '기타';
            let startedAt = new Date();
            let counselorName = '대상없음';
            let refinedTitle = fileName.replace(/\.[^/.]+$/, "");
            let versionLabel = 'v1.0';

            if (match) {
                categoryName = match[1];
                const dateStr = match[2];
                counselorName = match[3];
                let rawTitle = match[4].replace(/\.[^/.]+$/, "");

                const versionMatch = rawTitle.match(/(.+)_([vV]\d+\.\d+)$/);
                if (versionMatch) {
                    refinedTitle = versionMatch[1];
                    versionLabel = versionMatch[2];
                } else {
                    refinedTitle = rawTitle;
                }

                if (dateStr && !isNaN(Date.parse(dateStr))) startedAt = new Date(dateStr);
            }

            const category = await prisma.category.upsert({
                where: { name: categoryName },
                update: {},
                create: { name: categoryName }
            });

            let counselor = await prisma.counselor.findFirst({ where: { name: counselorName } });
            if (!counselor) {
                counselor = await prisma.counselor.create({ data: { name: counselorName } });
            }

            try {
                // Check if project already exists?
                // Maybe duplications if run multiple times but different files?
                // Just create for now.

                await prisma.project.create({
                    data: {
                        title: refinedTitle,
                        status: 'COMPLETED',
                        startedAt: startedAt,
                        ownerId: systemUser.id,
                        categoryId: category.id,
                        counselorId: counselor.id,
                        videos: {
                            create: {
                                versionLabel: versionLabel,
                                status: 'FINAL',
                                completedAt: startedAt,
                                technicalSpec: {
                                    create: {
                                        filename: fileName,
                                        r2Key: file.Key,
                                        fileSize: file.Size ? BigInt(file.Size) : null,
                                        format: fileName.split('.').pop()?.toLowerCase() || 'unknown',
                                        thumbnailUrl: imageMap.get(fileName.substring(0, fileName.lastIndexOf('.'))) || null
                                    }
                                }
                            }
                        }
                    }
                });
                createdCount++;
                process.stdout.write('+');
            } catch(createError) {
                console.error(`\nFailed to create project for ${fileName}:`, createError.message);
            }

        } catch (e) {
            console.error(`\n❌ Failed to sync file (parsing/logic): ${file.Key}`, e.message);
        }
    }

    console.log(`\n🎉 Done! Imported ${createdCount} new videos from R2.`);

    // Verification
    const finalCount = await prisma.videoTechnicalSpec.count();
    console.log(`[VERIFY] Total VideoTechnicalSpec in DB: ${finalCount}`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
