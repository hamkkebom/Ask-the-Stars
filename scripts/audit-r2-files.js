
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const fs = require('fs');
const path = require('path');

// Logic to load .env from apps/api/.env
const envPath = path.resolve(__dirname, '../apps/api/.env');
let envConfig = {};

if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
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
} else {
    // Fallback if .env not found in expected path, assume process.env is populated or hardcoded for test
    console.warn("⚠️  apps/api/.env not found, using process.env");
    envConfig = process.env;
}

const accountId = envConfig.CLOUDFLARE_ACCOUNT_ID;
const accessKeyId = envConfig.CLOUDFLARE_R2_ACCESS_KEY_ID;
const secretAccessKey = envConfig.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const bucketName = envConfig.CLOUDFLARE_R2_BUCKET_NAME || 'hamkkebom-uploads';

if (!accountId || !accessKeyId || !secretAccessKey) {
    console.error('❌ Missing R2 Credentials (CLOUDFLARE_ACCOUNT_ID, etc.)');
    process.exit(1);
}

const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
});

async function auditR2Files() {
    console.log(`🔍 Auditing R2 Bucket: ${bucketName}`);

    try {
        let allFiles = [];
        let continuationToken;
        let totalSize = 0;

        do {
            const command = new ListObjectsV2Command({
                Bucket: bucketName,
                ContinuationToken: continuationToken
            });
            const response = await s3Client.send(command);
            const contents = response.Contents || [];
            allFiles = allFiles.concat(contents);
            contents.forEach(f => totalSize += (f.Size || 0));
            continuationToken = response.NextContinuationToken;
            process.stdout.write('.');
        } while (continuationToken);

        console.log('\n');

        // Filter videos
        const videoExtensions = ['.mp4', '.mov', '.mkv', '.avi', '.webm'];
        const videoFiles = allFiles.filter(f => videoExtensions.some(ext => f.Key.toLowerCase().endsWith(ext)));

        const videoCount = videoFiles.length;
        const totalSizeGB = totalSize / (1024 * 1024 * 1024);

        if (videoCount === 0) {
            console.log('✅ No video files found in R2.');
            return;
        }

        // Cost Estimate
        // Assumption: 1GB ~ 60 mins for HD (very rough estimate)
        // Or user provided average 10 mins
        // Better to use file size to guess duration if possible, or just use the count * avg.

        const avgDurationMins = 10;
        const estimatedTotalMinutes = videoCount * avgDurationMins;
        const costPer1000Mins = 5.00;
        const estimatedStreamCost = (estimatedTotalMinutes / 1000) * costPer1000Mins;

        console.log('📊 R2 Audit Result');
        console.log('------------------------------------------------');
        console.log(`R2 Total Files:       ${allFiles.length}`);
        console.log(`Video Files:          ${videoCount}`);
        console.log(`Total Size:           ${totalSizeGB.toFixed(2)} GB`);
        console.log('------------------------------------------------');
        console.log(`\n💰 Cloudflare Stream Migration Estimated Cost`);
        console.log(`(Based on ${videoCount} videos, assumed ${avgDurationMins} mins/video)`);
        console.log(`Estimated Minutes:    ${estimatedTotalMinutes.toLocaleString()} mins`);
        console.log(`Estimated Cost:       $${estimatedStreamCost.toFixed(2)} / month`);
        console.log('------------------------------------------------');

    } catch (error) {
        console.error('❌ R2 Audit Error:', error);
    }
}

auditR2Files();
