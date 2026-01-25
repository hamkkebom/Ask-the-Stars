const { S3Client, ListObjectsV2Command, ListBucketsCommand } = require('@aws-sdk/client-s3');
require('dotenv').config({ path: '../../apps/api/.env' });

async function testR2() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

  const accessKeyId = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;


  console.log('--- R2 CONFIG ---');
  console.log('Account ID:', accountId);
  console.log('Bucket Name:', bucketName);

  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  try {
    console.log('\nListing available buckets...');
    const listBuckets = await client.send(new ListBucketsCommand({}));
    console.log('✅ Buckets found:', listBuckets.Buckets.map(b => b.Name));

    for (const bucket of listBuckets.Buckets) {
      console.log(`\n--- Files in bucket: ${bucket.Name} ---`);
      try {
        const command = new ListObjectsV2Command({ Bucket: bucket.Name });
        const response = await client.send(command);
        console.log('Files count:', response.Contents ? response.Contents.length : 0);
        if (response.Contents) {
          response.Contents.slice(0, 3).forEach(c => console.log(' -', c.Key));
        }
      } catch (listErr) {
        console.error(` ❌ Could not list files in ${bucket.Name}:`, listErr.message);
      }
    }
  } catch (err) {
    console.error('❌ FAILED to list buckets:');
    console.error(err.message);

    // Fallback: Try the specific bucket directly again
    console.log(`\nRetrying specific bucket: ${bucketName}...`);
    try {
        const command = new ListObjectsV2Command({ Bucket: bucketName });
        const response = await client.send(command);
        console.log('✅ SUCCESS for specific bucket!');
        console.log('Files count:', response.Contents ? response.Contents.length : 0);
    } catch (retryErr) {
        console.error('❌ STILL FAILED:', retryErr.message);
    }
  }
}

testR2();

