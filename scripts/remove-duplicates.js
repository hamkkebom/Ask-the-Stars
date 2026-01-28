
const { PrismaClient } = require('../apps/api/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function removeDuplicates() {
  console.log('🧹 Starting cleanup of duplicate videos...');

  const videos = await prisma.video.findMany({
    include: {
      technicalSpec: true,
      project: true
    }
  });

  console.log(`Total Videos Scanned: ${videos.length}`);

  // Group by Normalized R2 Key (Decoded)
  const groups = new Map();

  for (const v of videos) {
    if (!v.technicalSpec?.r2Key) continue;

    // Normalize: Decode URI component to handle %20 vs space, etc.
    const normalizedKey = decodeURIComponent(v.technicalSpec.r2Key).normalize('NFC');

    if (!groups.has(normalizedKey)) {
      groups.set(normalizedKey, []);
    }
    groups.get(normalizedKey).push(v);
  }

  let deletedCount = 0;
  let keptCount = 0;

  for (const [key, list] of groups.entries()) {
    if (list.length > 1) {
      // Sort by ID (assume incremental) or CreatedAt
      // We want to keep the one that looks "best"?
      // Or just keep the latest one.
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      const [keep, ...remove] = list;
      keptCount++;

      // Delete the duplicates (Project and Video)
      for (const item of remove) {
        console.log(`Deleting duplicate for [${key}]: ID ${item.id}`);

        // Transaction to delete Video and Project
        try {
            await prisma.$transaction([
                // Delete Event Logs if any
                // prisma.videoEventLog.deleteMany({ where: { videoId: item.id } }), // Assuming relation exists
                // Delete Technical Spec (Unique constraint usually handles cascade, but explict is safer)
                prisma.videoTechnicalSpec.delete({ where: { video_id: item.id } }),
                // Delete Video
                prisma.video.delete({ where: { id: item.id } }),
                // Delete Project if 1:1 and no other videos?
                // For this system, Project:Video is 1:1.
                prisma.project.delete({ where: { id: item.projectId } })
            ]);
            deletedCount++;
        } catch (e) {
            console.error(`Failed to delete ${item.id}:`, e.message);
        }
      }
    } else {
        keptCount++;
    }
  }

  console.log(`\n🎉 Cleanup Complete.`);
  console.log(`Kept: ${keptCount}`);
  console.log(`Deleted: ${deletedCount}`);
}

removeDuplicates()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
