const { PrismaClient } = require('../apps/api/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function verify() {
  try {
    const videos = await prisma.video.findMany({
      where: { status: 'FINAL' },
      take: 3,
      include: { technicalSpec: true },
      orderBy: { createdAt: 'desc' }
    });

    console.log('--- Verification Sample ---');
    videos.forEach(v => {
      const spec = v.technicalSpec;
      console.log(`Video ID: ${v.id}`);
      console.log(`  Filename: ${spec?.filename}`);
      console.log(`  R2 Key:   ${spec?.r2Key}`);
      console.log(`  ThumbUrl: ${spec?.thumbnailUrl}`);
      console.log(`  AvifKey:  ${spec?.r2KeyThumbAvif}`);
      console.log('---');
    });

  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
