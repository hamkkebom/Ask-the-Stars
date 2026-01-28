
const fs = require('fs');
const path = require('path');
const { S3Client, GetBucketCorsCommand, GetBucketLocationCommand } = require('@aws-sdk/client-s3');

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

async function fetchR2Config() {
    const env = loadEnv();
    const accountId = env['CLOUDFLARE_ACCOUNT_ID'];
    const accessKeyId = env['CLOUDFLARE_R2_ACCESS_KEY_ID'];
    const secretAccessKey = env['CLOUDFLARE_R2_SECRET_ACCESS_KEY'];
    const bucketName = env['CLOUDFLARE_R2_BUCKET_NAME'];

    if (!accessKeyId || !secretAccessKey || !accountId || !bucketName) {
        console.error('❌ Missing R2 Credentials/Bucket in .env');
        return;
    }

    console.log(`🔍 Checking R2 Configuration for Bucket: ${bucketName}\n`);

    const S3 = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId,
            secretAccessKey,
        },
    });

    try {
        // 1. Check Bucket CORS
        console.log('📡 Fetching CORS Configuration...');
        const corsData = await S3.send(new GetBucketCorsCommand({ Bucket: bucketName }));

        console.log('✅ CORS Configuration Found:');
        console.log(JSON.stringify(corsData.CORSRules, null, 2));

        // Simple validation
        const hasAllowedOrigin = corsData.CORSRules.some(r =>
            (r.AllowedOrigins.includes('*') || r.AllowedOrigins.some(o => o.includes('localhost'))) &&
            r.AllowedMethods.includes('PUT')
        );

        if (hasAllowedOrigin) {
            console.log('\n✅ OK: CORS allows PUT from (localhost or *). Valid for Browser Uploads.');
        } else {
            console.warn('\n⚠️ WARNING: CORS might be too restrictive for Browser Uploads. Check AllowedOrigins/AllowedMethods.');
        }

    } catch (error) {
        if (error.name === 'NoSuchCORSConfiguration') {
            console.warn('⚠️ No CORS Configuration found on this bucket.');
            console.warn('   Browser uploads (PutObject) will FAIL.');
            console.warn('   You should configure CORS rules allowing PUT from your domain.');
        } else {
            console.error('❌ Failed to fetch R2 Config:', error.message);
        }
    }
}

fetchR2Config();
