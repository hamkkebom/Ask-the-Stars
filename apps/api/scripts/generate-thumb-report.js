const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const specs = await prisma.videoTechnicalSpec.findMany({
        where: {
            thumbnailUrl: { not: null },
            streamUid: { not: null }
        },
        take: 6,
        orderBy: { createdAt: 'desc' }, // Get recent ones
        select: {
            video: { select: { title: true } },
            thumbnailUrl: true
        }
    });

    console.log('# 📸 Thumbnail Verification Gallery');
    console.log('Here are the thumbnails referenced directly from your database:\n');
    console.log('| Video Title | Thumbnail Preview |');
    console.log('| :--- | :--- |');

    for (const spec of specs) {
        // Use a smaller width for the preview in the table
        const previewUrl = spec.thumbnailUrl + '?width=300&height=169&fit=crop';
        console.log(`| **${spec.video?.title || 'Untitled'}** | ![](${previewUrl}) |`);
    }
    console.log('\n> *Images are served directly from Cloudflare Stream.*');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
