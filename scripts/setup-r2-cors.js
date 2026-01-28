
const fs = require('fs');
const path = require('path');
const { S3Client, PutBucketCorsCommand } = require('@aws-sdk/client-s3');

// Helper to load .env
function loadEnv() {
    try {
        const envPath = path.join(__dirname, '../apps/api/.env');
        const envContent = fs.readFileSync(envPath, 'utf8');
        const env = {};
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, '');
                env[key] = value;
            }
        });
        return env;
    } catch (e) {
        return {};
    }
}

async function setupR2Cors() {
    const env = loadEnv();
    const accountId = env['CLOUDFLARE_ACCOUNT_ID'];
    const accessKeyId = env['CLOUDFLARE_R2_ACCESS_KEY_ID'];
    const secretAccessKey = env['CLOUDFLARE_R2_SECRET_ACCESS_KEY'];
    const bucketName = env['CLOUDFLARE_R2_BUCKET_NAME'];

    if (!accessKeyId || !secretAccessKey || !accountId || !bucketName) {
        console.error('❌ Missing R2 Credentials/Bucket in .env');
        return;
    }

    console.log(`🛠️ Configuring CORS for Bucket: ${bucketName}\n`);

    const S3 = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    const corsRules = [
        {
            AllowedHeaders: ['*'],
            AllowedMethods: ['PUT', 'POST', 'GET', 'HEAD'], // PUT is critical for direct uploads
            AllowedOrigins: [
                'http://localhost:3000', // Local Dev
                'https://hamkkebom.com', // Production
                'https://www.hamkkebom.com',
                'https://ask-the-stars-kappa.vercel.app' // Vercel Preview
            ],
            ExposeHeaders: ['ETag'],
            MaxAgeSeconds: 3000
        }
    ];

    try {
        console.log('📡 Sending PutBucketCors Command...');
        console.log('   Rules:', JSON.stringify(corsRules, null, 2));

        await S3.send(new PutBucketCorsCommand({
            Bucket: bucketName,
            CORSConfiguration: {
                CORSRules: corsRules
            }
        }));

        console.log('\n✅ R2 CORS Configuration Applied Successfully!');
        console.log('   Browser uploads should now work.');

    } catch (error) {
        console.error('❌ Failed to set R2 CORS:', error.message);
    }
}

setupR2Cors();
