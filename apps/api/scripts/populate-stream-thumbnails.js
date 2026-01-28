const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🖼️ Starting Thumbnail Backfill...');

    // Find videos with streamUid but NO thumbnailUrl
    const specs = await prisma.videoTechnicalSpec.findMany({
        where: {
            streamUid: { not: null },
            thumbnailUrl: null
        },
        select: { video_id: true, streamUid: true }
    });

    console.log(`Found ${specs.length} videos needing thumbnails.`);

    let updated = 0;
    for (const spec of specs) {
        // Standard Cloudflare Stream Thumbnail URL
        // Docs: https://developers.cloudflare.com/stream/viewing-videos/displaying-thumbnails/
        const thumbUrl = `https://videodelivery.net/${spec.streamUid}/thumbnails/thumbnail.jpg`;

        await prisma.videoTechnicalSpec.update({
            where: { video_id: spec.video_id },
            data: { thumbnailUrl: thumbUrl }
        });

        process.stdout.write('.');
        updated++;
    }

    console.log(`\n✅ Successfully updated ${updated} thumbnails!`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
