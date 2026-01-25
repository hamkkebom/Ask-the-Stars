
require('dotenv').config();
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME || 'hamkkebom-uploads';

async function testSign() {
    console.log('--- Testing R2 URL Signing ---');
    console.log('Account ID:', CLOUDFLARE_ACCOUNT_ID);
    console.log('Bucket:', BUCKET_NAME);

    if (!ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
        console.error('❌ Missing R2 Credentials in .env');
        return;
    }

    const s3Client = new S3Client({
        region: 'auto',
        endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: ACCESS_KEY_ID,
            secretAccessKey: SECRET_ACCESS_KEY,
        },
    });

    try {
        const key = 'uploads/Vlog/0000/00/[Vlog] 날짜미상_[별님] 별님의 소개영상_v1.0.mp4';
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        });

        console.log('Signing URL for key:', key);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        console.log('✅ Success! Signed URL:');
        console.log(url);
    } catch (e) {
        console.error('❌ Signing Failed:', e);
    }
}

testSign();
