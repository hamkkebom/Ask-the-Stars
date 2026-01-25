const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const totalCount = await prisma.video.count();
    const finalCount = await prisma.video.count({ where: { status: 'FINAL' } });
    console.log('--- DATABASE STATUS ---');
    console.log('Total Videos:', totalCount);
    console.log('Final Videos:', finalCount);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
