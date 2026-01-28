const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkThumbnails() {
    const specs = await prisma.videoTechnicalSpec.findMany({
        where: { streamUid: { not: null } },
        take: 5,
        select: { video_id: true, streamUid: true, thumbnailUrl: true }
    });
    console.log('Sample Migrated Videos:', specs);
    await prisma.$disconnect();
}
checkThumbnails();
