
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Checking for Stream UIDs...');
  try {
      const total = await prisma.videoTechnicalSpec.count();
      const withStream = await prisma.videoTechnicalSpec.count({
        where: { streamUid: { not: null } }
      });

      console.log(`Total TechnicalSpecs: ${total}`);
      console.log(`With StreamUID: ${withStream}`);

      if (withStream > 0) {
          const sample = await prisma.videoTechnicalSpec.findFirst({
              where: { streamUid: { not: null } }
          });
          console.log('Sample StreamUID:', sample.streamUid);
      }
  } catch(e) {
      console.error(e);
  } finally {
      await prisma.$disconnect();
  }
}

main();
