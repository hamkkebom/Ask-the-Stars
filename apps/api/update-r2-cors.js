
const { S3Client, PutBucketCorsCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from current directory .env
dotenv.config({ path: path.join(__dirname, '.env') });

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'hankaebom-star-uploads';

if (!accountId || !accessKeyId || !secretAccessKey) {
  console.error('❌ Missing Cloudflare R2 credentials in environment variables.');
  console.error('Debug:', { accountId, hasAccessKey: !!accessKeyId, hasSecret: !!secretAccessKey });
  process.exit(1);
}

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function updateCors() {
  console.log(`🔧 Updating CORS for bucket: ${bucketName}...`);

  const command = new PutBucketCorsCommand({
    Bucket: bucketName,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ['*'],
          AllowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
          AllowedOrigins: [
            'http://localhost:3000',
            'https://ask-the-stars-api-w3nn3v2ejq-du.a.run.app',
            'https://hamkkebom.com',
            'https://www.hamkkebom.com',
            'https://ask-the-stars-kappa.vercel.app'
          ],
          ExposeHeaders: ['ETag'],
          MaxAgeSeconds: 3600,
        },
      ],
    },
  });

  try {
    await s3Client.send(command);
    console.log('✅ R2 Bucket CORS configuration updated successfully!');
  } catch (error) {
    console.error('❌ Failed to update CORS configuration:', error);
    process.exit(1);
  }
}

updateCors();
