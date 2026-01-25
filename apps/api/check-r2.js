const { PrismaClient } = require('@prisma/client');
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();

const prisma = new PrismaClient();

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

async function run() {
  try {
    console.log('--- R2 vs DB CHECK ---');

    // 1. Get DB keys
    const dbSpecs = await prisma.videoTechnicalSpec.findMany({ select: { r2Key: true } });
    const dbKeys = new Set(dbSpecs.map(s => s.r2Key));
    console.log('DB Video Count:', dbKeys.size);

    // 2. Get R2 keys
    const command = new ListObjectsV2Command({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME || 'hamkkebom-uploads',
    });
    const response = await s3Client.send(command);
    const r2Files = response.Contents || [];
    const videoFiles = r2Files.filter(f =>
      ['.mp4', '.mov', '.mkv', '.avi'].some(ext => f.Key.toLowerCase().endsWith(ext))
    );
    console.log('R2 Video Count:', videoFiles.length);

    // 3. Find missing
    const missingInDb = videoFiles.filter(f => !dbKeys.has(f.Key));
    console.log('Unsynced Videos (in R2 but not in DB):', missingInDb.length);

    if (missingInDb.length > 0) {
      console.log('Sample missing keys:', missingInDb.slice(0, 5).map(f => f.Key));
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
