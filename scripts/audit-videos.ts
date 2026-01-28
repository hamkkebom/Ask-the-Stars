
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function auditVideos() {
  console.log('🔍 Auditing videos for R2 -> Stream Migration...');

  try {
    // 1. Count total videos
    const totalVideos = await prisma.video.count();
    console.log(`Total Videos in DB: ${totalVideos}`);

    // 2. Count videos needing migration
    // Condition: Has r2Key but NO streamUid
    const eligibleSpecs = await prisma.videoTechnicalSpec.findMany({
      where: {
        r2Key: { not: null },
        streamUid: null,
      },
      select: {
          id: true,
          r2Key: true,
          fileSize: true, // Optional: Estimate duration from size? Not accurate but helpful context
      }
    });

    const count = eligibleSpecs.length;
    console.log(`\n📋 Videos Eligible for Migration: ${count}`);

    if (count === 0) {
        console.log('✅ No videos need migration.');
        return;
    }

    // 3. Estimate Cost
    // Cloudflare Stream Pricing: ~$5.00 per 1,000 minutes stored / month
    // We don't know exact duration without probing files, so we assume scenarios.

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
