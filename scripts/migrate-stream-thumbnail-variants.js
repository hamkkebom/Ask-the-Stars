const {
  PrismaClient,
} = require('../packages/database/node_modules/@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function getStreamThumbnailBaseUrl(accountId, uid) {
  return `https://customer-${accountId}.cloudflarestream.com/${uid}/thumbnails/thumbnail.jpg`;
}

async function main() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!accountId) {
    throw new Error('CLOUDFLARE_ACCOUNT_ID is required');
  }

  const batchSize = Number(process.env.MIGRATE_THUMB_BATCH || 50);
  const delayMs = Number(process.env.MIGRATE_THUMB_DELAY_MS || 150);
  const maxUpdates = Number(process.env.MIGRATE_THUMB_LIMIT || 0);

  console.log('🔧 Starting Stream thumbnail migration');
  console.log(
    `Config: batchSize=${batchSize}, delayMs=${delayMs}, limit=${maxUpdates || 'none'}`
  );

  const specs = await prisma.videoTechnicalSpec.findMany({
    where: {
      streamUid: { not: null },
      OR: [{ thumbnailUrl: null }, { thumbnailUrl: '' }],
    },
    select: { video_id: true, streamUid: true, thumbnailUrl: true },
  });

  console.log(`Found ${specs.length} specs missing thumbnails.`);

  let updated = 0;
  for (const spec of specs) {
    if (!spec.streamUid) continue;
    if (maxUpdates && updated >= maxUpdates) break;

    const thumbnailUrl = getStreamThumbnailBaseUrl(accountId, spec.streamUid);
    await prisma.videoTechnicalSpec.update({
      where: { video_id: spec.video_id },
      data: { thumbnailUrl },
    });

    updated += 1;
    if (delayMs > 0) {
      await sleep(delayMs);
    }
  }

  console.log(`✅ Migration complete. Updated ${updated} records.`);
}

main()
  .catch((error) => {
    console.error('❌ Migration failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
