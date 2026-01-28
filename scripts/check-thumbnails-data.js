
const { PrismaClient } = require('../apps/api/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function checkThumbnails() {
  const specs = await prisma.videoTechnicalSpec.findMany({
    where: { thumbnailUrl: { not: null } },
    take: 5,
    orderBy: { video: { createdAt: 'desc' } }, // Check latest ones
    select: {
        filename: true,
        r2Key: true,
        thumbnailUrl: true
    }
  });

  console.log('--- Verification: Latest 5 Thumbnails ---');
  specs.forEach((s, i) => {
      console.log(`[${i+1}] File: ${s.filename}`);
      console.log(`    Thumbnail: ${s.thumbnailUrl}`);
  });
}

checkThumbnails()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
