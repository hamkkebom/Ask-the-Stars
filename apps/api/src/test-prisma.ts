import { PrismaClient } from '@ask-the-stars/database';

async function test() {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log('✅ Prisma connected successfully');
    const userCount = await prisma.user.count();
    console.log('User count:', userCount);
  } catch (err) {
    console.error('❌ Prisma connection failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
