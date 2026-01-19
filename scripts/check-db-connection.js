
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkDb() {
  try {
    await prisma.$connect();
    console.log('✅ Database connection successful');
    const userCount = await prisma.user.count();
    console.log(`📊 Current user count: ${userCount}`);
    await prisma.$disconnect();
  } catch (e) {
    console.error('❌ Database connection failed:', e.message);
    process.exit(1);
  }
}

checkDb();
