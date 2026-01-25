const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  try {
    const v = await prisma.video.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: { technicalSpec: true, project: true }
    });
    console.log(JSON.stringify(v, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
