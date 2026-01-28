
// Try to require from the local package if node resolution fails for the workspace package
let PrismaClient;
try {
  // Try standard require (works if hoisted or linked)
  ({ PrismaClient } = require('@prisma/client'));
} catch (e) {
  try {
     // Fallback to direct path in monorepo
     ({ PrismaClient } = require('../packages/database/node_modules/@prisma/client'));
  } catch (e2) {
      console.error("❌ Could not load @prisma/client. Ensure 'pnpm install' and 'pnpm db:generate' have been run.");
      process.exit(1);
  }
}

const prisma = new PrismaClient();

async function auditVideos() {
  console.log('🔍 Auditing videos for R2 -> Stream Migration...');
  console.log('🔌 Connecting to Database...');

  try {
      // Log connection info (masked)
      const dbUrl = process.env.DATABASE_URL || 'UNDEFINED';
      console.log(`INFO: DATABASE_URL is ${dbUrl.substring(0, 15)}...`);

    // 1. Count total videos
    const totalVideos = await prisma.video.count();
    console.log(`Total Videos in DB: ${totalVideos}`);

    // If 0, stop early but provide help
    if (totalVideos === 0) {
        console.warn('⚠️ No videos found in the database. Are you connected to the correct environment?');
        return;
    }

    // 2. Count videos needing migration
    // Fix: Simplify query to avoid validation errors if 'not: null' is tricky
    // Find all specs first (if small enough) or use safe query
    const eligibleSpecs = await prisma.videoTechnicalSpec.findMany({
      where: {
        AND: [
            { r2Key: { not: null } },     // Has R2 Key
            { streamUid: null }           // No Stream UID
        ]
      },
      select: {
          id: true,
          r2Key: true,
          fileSize: true,
      }
    });

    const count = eligibleSpecs.length;
    console.log(`\n📋 Videos Eligible for Migration: ${count}`);

    if (count === 0) {
        console.log('✅ No videos need migration.');
        return;
    }

    // 3. Estimate Cost
    const assumedDurationMinutes = 10; // Assumption: Average 10 mins per video
    const totalMinutes = count * assumedDurationMinutes;
    const costPer1000Mins = 5.00;
    const estimatedCost = (totalMinutes / 1000) * costPer1000Mins;

    console.log('\n💰 Estimated Monthly Storage Cost (Cloudflare Stream)');
    console.log('------------------------------------------------');
    console.log(`Assumed Avg Duration: ${assumedDurationMinutes} minutes`);
    console.log(`Total Minutes:        ${totalMinutes.toLocaleString()} minutes`);
    console.log(`Estimated Cost:       $${estimatedCost.toFixed(2)} / month`);
    console.log('------------------------------------------------');
    console.log('* Note: Actual cost depends on exact video duration.');

    // 4. Sample check
    console.log(`\nSample R2 Keys to be migrated:`);
    eligibleSpecs.slice(0, 5).forEach(spec => console.log(`- ${spec.r2Key}`));

  } catch (error) {
    console.error('❌ Audit failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

auditVideos();
