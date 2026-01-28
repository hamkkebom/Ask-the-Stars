const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

// Load env vars if needed, or hardcode keys for this script (assuming they are in .env or passed)
// Actually, I can't see .env values due to security, but the app has them.
// I'll try to require the ConfigService or dotenv.
require('dotenv').config({ path: 'apps/api/.env' });

const s3 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function list() {
  const prefix = 'uploads/Vlog/0000/00/';
  console.log(`Listing prefix: ${prefix}`);

  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET_NAME,
      Prefix: prefix,
    });

    const response = await s3.send(command);
    if (response.Contents) {
      response.Contents.forEach(c => {
        if (c.Key.includes('thumb')) {
            console.log('THUMB:', c.Key);
        }
      });
    } else {
        console.log('No contents found.');
    }
  } catch (e) {
    console.error(e);
  }
}

list();
