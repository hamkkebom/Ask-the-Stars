
const { PrismaClient } = require('../apps/api/node_modules/@prisma/client');
const prisma = new PrismaClient();

async function checkDuplicates() {
  console.log('Checking for duplicates...');

  // 1. Check by TechnicalSpec r2Key
  const specs = await prisma.videoTechnicalSpec.findMany({
    select: { r2Key: true, video_id: true }
  });

  const keyMap = new Map();
  let duplicateKeys = 0;

  specs.forEach(s => {
      const k = s.r2Key;
      if (keyMap.has(k)) {
          duplicateKeys++;
          keyMap.get(k).push(s.video_id);
      } else {
          keyMap.set(k, [s.video_id]);
      }
  });

  console.log(`Total Specs: ${specs.length}`);
  console.log(`Duplicate R2 Keys Found: ${duplicateKeys}`);

  if (duplicateKeys > 0) {
      console.log('Example Duplicates (R2 Key):');
      let count = 0;
      for (const [key, ids] of keyMap.entries()) {
          if (ids.length > 1) {
              console.log(`Key: ${key} -> IDs: ${ids.join(', ')}`);
              count++;
              if (count > 5) break;
          }
      }
  }

  // 2. Check by Project Title (if R2 keys differed slightly)
  const videos = await prisma.video.findMany({
      include: {
          project: true,
          technicalSpec: true
      }
  });

  const titleMap = new Map();
  let duplicateTitles = 0;

  videos.forEach(v => {
      const t = v.project?.title || v.versionLabel;
      // Use filename as a better proxy for "same content" if title is generic
      const uniqueId = v.technicalSpec?.filename || t;

      if (titleMap.has(uniqueId)) {
          duplicateTitles++;
          titleMap.get(uniqueId).push(v.id);
      } else {
          titleMap.set(uniqueId, [v.id]);
      }
  });

  console.log(`\nDuplicate Filenames/Titles Found: ${duplicateTitles}`);
  if (duplicateTitles > 0) {
       let count = 0;
      for (const [key, ids] of titleMap.entries()) {
          if (ids.length > 1) {
              console.log(`File: ${key} -> Count: ${ids.length}`);
              count++;
              if (count > 5) break;
          }
      }
  }
}

checkDuplicates()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
