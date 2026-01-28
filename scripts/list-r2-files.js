
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Manually parse .env
const envPath = path.resolve(__dirname, '../apps/api/.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envConfig = {};
envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
        let value = match[2].trim();
        if (value.startsWith('"') && value.endsWith('"')) {
            value = value.slice(1, -1);
        }
        envConfig[match[1].trim()] = value;
    }
});

const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${envConfig.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: envConfig.CLOUDFLARE_R2_ACCESS_KEY_ID,
        secretAccessKey: envConfig.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
});

async function listFiles() {
    try {
        const bucketName = envConfig.CLOUDFLARE_R2_BUCKET_NAME || 'hamkkebom-uploads';
        console.log(`Listing files from bucket: ${bucketName}`);

        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            MaxKeys: 100 // Increased to see more variation
        });

        const response = await s3Client.send(command);

        console.log('--- Files in R2 ---');
        const files = response.Contents || [];
        if (files.length > 0) {
            console.log(JSON.stringify({key: files[0].Key}));
        } else {
            console.log("No files found");
        }
        console.log('-------------------');

    } catch (error) {
        console.error('Error listing files:', error);
    }
}

listFiles();
