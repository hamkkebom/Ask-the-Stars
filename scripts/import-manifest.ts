
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function run() {
  console.log('🚀 Starting Professional Manifest JSON Import...');

  const manifestPath = path.resolve(process.cwd(), '슈퍼베이스/professional_manifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('❌ professional_manifest.json not found at:', manifestPath);
    return;
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const projects = manifest.projects || [];

  console.log(`📊 Found ${projects.length} projects in manifest.`);

  // Get System User
  const systemUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!systemUser) {
    console.error('❌ Admin user not found. Please create one first or run sync script with existing user.');
    return;
  }

  console.log('🧹 Cleaning up existing data (VAMS related only)...');
  await prisma.$transaction([
    prisma.videoTechnicalSpec.deleteMany(),
    prisma.videoEventLog.deleteMany(),
    prisma.video.deleteMany(),
    prisma.project.deleteMany(),
  ]);

  let importCount = 0;

  for (const projData of projects) {
    try {
      const pInfo = projData.info;

      // 1. Reference Data (Category, Counselor, Channel)
      const category = pInfo.category ? await prisma.category.upsert({
        where: { name: pInfo.category },
        update: {},
        create: { name: pInfo.category }
      }) : null;

      const counselor = pInfo.counselor ? await prisma.counselor.upsert({
        where: { name: pInfo.counselor },
        update: {},
        create: { name: pInfo.counselor }
      }) : null;

      // Handle channel (can be string or array)
      let channelName: string | null = null;
      if (Array.isArray(pInfo.channel) && pInfo.channel.length > 0) {
        channelName = pInfo.channel[0];
      } else if (typeof pInfo.channel === 'string' && pInfo.channel.trim() !== '') {
        channelName = pInfo.channel;
      }

      const channel = channelName ? await prisma.channel.upsert({
        where: { name: channelName },
        update: {},
        create: { name: channelName }
      }) : null;

      // 2. Create Project
      // We'll use the FIRST version's data for project-level info if possible
      const firstVer = projData.versions?.[0];

      const project = await prisma.project.create({
        data: {
          projectNo: projData.project_id,
          title: pInfo.title || 'Untitled Project',
          description: firstVer?.collaboration?.description || '',
          lyrics: firstVer?.collaboration?.lyrics || '',
          status: 'COMPLETED', // Default to completed since it's from manifest
          startedAt: firstVer?.startedAt ? new Date(firstVer.startedAt) : null,
          ownerId: systemUser.id,
          categoryId: category?.id,
          counselorId: counselor?.id,
          channelId: channel?.id,
        }
      });

      // 3. Create Videos (Versions)
      for (const ver of projData.versions || []) {
        // Find or create Maker if exists
        // ver.maker is an array of IDs (likely Airtable record IDs)
        // For now, let's skip makers as we don't have a mapping yet, or create a placeholder

        await prisma.video.create({
          data: {
            id: ver.id, // Using the UUID from JSON
            projectId: project.id,
            versionLabel: ver.version?.label || 'v1.0',
            versionNumber: ver.version?.number || '',
            status: 'FINAL', // Force FINAL for all manifest items to ensure visibility
            isRevised: ver.version?.isRevised || false,
            isAdminConfirmed: ver.version?.isAdminConfirmed || false,
            feedback: ver.collaboration?.feedback || '',
            internalComment: ver.collaboration?.internalComment || '',
            completedAt: (ver.completedAt && ver.completedAt !== '날짜미상') ? new Date(ver.completedAt) : null,
            technicalSpec: {
              create: {
                filename: ver.media?.filename?.split('/').pop() || '',
                format: ver.media?.format || 'mp4',
                fileSize: ver.media?.fileSize ? BigInt(ver.media.fileSize) : null,
                duration: ver.media?.duration || null,
                overallBitrate: ver.media?.overallBitrate || null,
                videoCodec: ver.media?.video?.codec || null,
                width: ver.media?.video?.width || null,
                height: ver.media?.video?.height || null,
                fps: ver.media?.video?.fps || null,
                aspectRatio: ver.media?.video?.aspectRatio || null,
                pixelFormat: ver.media?.video?.pixelFormat || null,
                audioCodec: ver.media?.audio?.codec || null,
                audioChannels: ver.media?.audio?.channels || null,
                sampleRate: ver.media?.audio?.sampleRate || null,
                originalUrl: ver.delivery?.originalUrl || null,
                thumbnailUrl: ver.delivery?.thumbnailUrl || null,
                thumbnailAlt: ver.delivery?.thumbnailAlt || null,
                thumbnailWidth: ver.media?.thumbnailWidth || null,
                thumbnailHeight: ver.media?.thumbnailHeight || null,
                r2Key: ver.delivery?.recommendedR2Key || '',
                r2KeyThumbAvif: ver.delivery?.recommendedThumbnailAvifR2Key || null,
                r2KeyThumbWebp: ver.delivery?.recommendedThumbnailWebpR2Key || null,
                r2KeyThumbOg: ver.delivery?.recommendedThumbnailOgR2Key || null,
              } as any
            }
          }
        });
      }

      importCount++;
      if (importCount % 50 === 0) console.log(`⏳ Imported ${importCount} projects...`);
    } catch (err: any) {
      console.error(`❌ Failed to import project ${projData.project_id}:`, err.message);
    }
  }

  console.log(`✅ Professional Manifest Import Completed. Total: ${importCount} projects synced.`);
}

run()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
