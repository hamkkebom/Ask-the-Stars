const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
dotenv.config();

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
    const command = new ListObjectsV2Command({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME || 'hamkkebom-uploads',
    });
    const response = await s3Client.send(command);
    const files = response.Contents || [];
    console.log('Sample R2 Filenames:');
    files.slice(0, 20).forEach(f => console.log(`- ${f.Key}`));
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
