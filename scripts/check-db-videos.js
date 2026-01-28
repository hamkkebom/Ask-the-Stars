
const { PrismaClient } = require('../packages/database/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Checking Database Videos...');

  const totalVideos = await prisma.video.count();
  console.log(`Total Videos: ${totalVideos}`);

  const finalVideos = await prisma.video.count({ where: { status: 'FINAL' } });
  console.log(`Final Videos (status='FINAL'): ${finalVideos}`);

  const videosWithSpec = await prisma.video.findMany({
    where: { status: 'FINAL' },
    take: 5,
    include: { technicalSpec: true, project: true }
  });

  console.log('\n--- Sample Videos ---');
  videosWithSpec.forEach(v => {
    console.log(`[${v.id}] ${v.project?.title || 'No Title'} (${v.status})`);
    console.log(`   R2 Key: ${v.technicalSpec?.r2Key}`);
    console.log(`   Thumb: ${v.technicalSpec?.thumbnailUrl}`);
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
