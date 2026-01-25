
require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();

const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_STREAM_TOKEN = process.env.CLOUDFLARE_STREAM_TOKEN;
const R2_PUBLIC_URL = process.env.CLOUDFLARE_PUBLIC_Url || process.env.NEXT_PUBLIC_R2_PUBLIC_URL || 'https://pub-270030d34237d6ec.r2.dev';

async function copyToStream(url, meta) {
    if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_STREAM_TOKEN) {
        throw new Error('Missing Cloudflare credentials in .env');
    }

    try {
        console.log(`☁️ Sending copy request to Stream: ${url}`);
        const response = await axios.post(
            `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream/copy`,
            {
                url: url,
                meta: meta || {},
                requireSignedURLs: false
            },
            {
                headers: {
                    Authorization: `Bearer ${CLOUDFLARE_STREAM_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (response.data.success) {
            return response.data.result.uid;
        }
        throw new Error('Stream Error: ' + JSON.stringify(response.data.errors));
    } catch (e) {
        console.error('API Call Failed:', e.response?.data || e.message);
        return null;
    }
}

async function main() {
    console.log('🚀 Starting Migration: R2 -> Cloudflare Stream');

    // 1. Find videos with R2 Key but NO Stream UID
    const videosToMigrate = await prisma.videoTechnicalSpec.findMany({
        where: {
            r2Key: { not: null },
            streamUid: null
        },
        include: {
            video: {
                include: {
                    project: true
                }
            }
        }
    });

    console.log(`📋 Found ${videosToMigrate.length} videos to migrate.`);

    for (const spec of videosToMigrate) {
        const fullUrl = `${R2_PUBLIC_URL}/${spec.r2Key}`;
        console.log(`\nProcessing: ${spec.filename} (ID: ${spec.id})`);

        const meta = {
            name: spec.video?.project?.title || spec.filename
        };

        const streamUid = await copyToStream(fullUrl, meta);

        if (streamUid) {
            console.log(`✅ Copy Started! Stream UID: ${streamUid}`);
            await prisma.videoTechnicalSpec.update({
                where: { id: spec.id },
                data: { streamUid: streamUid }
            });
            console.log(`💾 DB Updated.`);
        } else {
            console.log(`❌ Skipped due to error.`);
        }
    }

    console.log('\n🎉 Migration Complete.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
