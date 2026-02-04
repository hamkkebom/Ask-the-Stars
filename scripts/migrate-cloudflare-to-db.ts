#!/usr/bin/env tsx
/**
 * Cloudflare Stream → PostgreSQL DB Migration Script
 *
 * Migrates 300 videos from Cloudflare Stream to PostgreSQL database.
 * - Video files STAY in Cloudflare Stream (no file movement)
 * - Only creates DB metadata records (Video + VideoTechnicalSpec)
 * - Preserves streamUid for playback integration
 *
 * Usage:
 *   pnpm tsx scripts/migrate-cloudflare-to-db.ts [--limit=5] [--dry-run]
 *
 * Environment Requirements:
 *   - DATABASE_URL (PostgreSQL connection string)
 *   - CLOUDFLARE_ACCOUNT_ID
 *   - CLOUDFLARE_STREAM_TOKEN
 */

import { PrismaClient } from '../packages/database/node_modules/@prisma/client';
import axios from '../apps/api/node_modules/axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load env from apps/api
dotenv.config({ path: path.resolve(__dirname, '../apps/api/.env') });

const prisma = new PrismaClient();

// Cloudflare Credentials
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_STREAM_TOKEN = process.env.CLOUDFLARE_STREAM_TOKEN;

if (!CLOUDFLARE_ACCOUNT_ID || !CLOUDFLARE_STREAM_TOKEN) {
  console.error('❌ Cloudflare Credentials Missing in apps/api/.env');
  console.error('   Required: CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_STREAM_TOKEN');
  process.exit(1);
}

// Config
const BATCH_SIZE = 10;
const DELAY_MS = 2000; // 2 seconds delay between batches
const DRY_RUN = process.argv.includes('--dry-run');
const LIMIT = parseInt(
  process.argv.find((arg) => arg.startsWith('--limit='))?.split('=')[1] ||
    '300',
  10
);

// Helper: Delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// Cloudflare Stream API Types
interface CloudflareStreamVideo {
  uid: string;
  duration?: number;
  input?: {
    width?: number;
    height?: number;
  };
  size?: number;
  meta?: {
    filename?: string;
    name?: string;
  };
  created?: string;
}

interface CloudflareStreamResponse {
  success: boolean;
  result: CloudflareStreamVideo[];
  result_info?: {
    count: number;
    page: number;
    per_page: number;
    total_count: number;
  };
}

/**
 * Fetch all videos from Cloudflare Stream API with pagination
 */
async function fetchCloudflareVideos(): Promise<CloudflareStreamVideo[]> {
  const videos: CloudflareStreamVideo[] = [];
  let page = 1;
  const perPage = 100; // Max per page

  console.log('📡 Fetching videos from Cloudflare Stream API...\n');

  while (true) {
    try {
      const response = await axios.get<CloudflareStreamResponse>(
        `https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/stream`,
        {
          headers: {
            Authorization: `Bearer ${CLOUDFLARE_STREAM_TOKEN}`,
          },
          params: {
            per_page: perPage,
            page,
          },
        }
      );

      if (!response.data.success) {
        throw new Error('Cloudflare API returned success: false');
      }

      const { result, result_info } = response.data;
      videos.push(...result);

      console.log(
        `   Page ${page}: Fetched ${result.length} videos (Total: ${videos.length}/${result_info?.total_count || '?'})`
      );

      // Break if:
      // 1. No more results
      // 2. Reached limit
      // 3. Last page
      if (
        result.length === 0 ||
        videos.length >= LIMIT ||
        (result_info && videos.length >= result_info.total_count)
      ) {
        break;
      }

      page++;
      await delay(500); // Rate limit: 500ms between requests
    } catch (error: any) {
      console.error(
        `❌ Failed to fetch page ${page}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  }

  return videos.slice(0, LIMIT);
}

/**
 * Create or find dummy project for videos
 */
async function ensureDummyProject(): Promise<string> {
  const dummyProjectTitle = '[Migration] Cloudflare Stream Videos';

  let project = await prisma.project.findFirst({
    where: { title: dummyProjectTitle },
  });

  if (!project) {
    // Find or create a dummy user (ADMIN role)
    let dummyUser = await prisma.user.findFirst({
      where: { role: 'ADMIN' },
    });

    if (!dummyUser) {
      console.log('   Creating dummy ADMIN user...');
      dummyUser = await prisma.user.create({
        data: {
          email: 'migration@hankaebom-star.com',
          name: 'Migration Bot',
          password: 'N/A',
          role: 'ADMIN',
        },
      });
    }

    console.log('   Creating dummy project...');
    project = await prisma.project.create({
      data: {
        title: dummyProjectTitle,
        description: 'Auto-created project for Cloudflare Stream migration',
        status: 'COMPLETED',
        ownerId: dummyUser.id,
      },
    });
  }

  return project.id;
}

/**
 * Migrate a single video to DB
 */
async function migrateVideo(
  video: CloudflareStreamVideo,
  projectId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const filename =
      video.meta?.filename || video.meta?.name || `video-${video.uid}.mp4`;
    const versionLabel = 'v1.0'; // Default version

    // Check if already exists
    const existing = await prisma.videoTechnicalSpec.findFirst({
      where: { streamUid: video.uid },
    });

    if (existing) {
      return { success: false, error: 'Already exists (skipped)' };
    }

    // Create Video record
    const videoRecord = await prisma.video.create({
      data: {
        projectId,
        versionLabel,
        status: 'FINAL',
        completedAt: video.created ? new Date(video.created) : new Date(),
      },
    });

    // Create VideoTechnicalSpec record
    await prisma.videoTechnicalSpec.create({
      data: {
        video_id: videoRecord.id,
        streamUid: video.uid,
        r2Key: `cloudflare-stream/${video.uid}`, // Dummy R2 key (not used for Stream)
        filename,
        duration: video.duration,
        width: video.input?.width,
        height: video.input?.height,
        fileSize: video.size ? BigInt(video.size) : null,
      },
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

/**
 * Main migration function
 */
async function migrate() {
  console.log(
    `\n🚀 Cloudflare Stream → PostgreSQL Migration ${DRY_RUN ? '(DRY RUN)' : ''}\n`
  );
  console.log(`   Limit: ${LIMIT} videos`);
  console.log(`   Batch Size: ${BATCH_SIZE}`);
  console.log(`   Delay: ${DELAY_MS}ms between batches\n`);

  try {
    // 1. Fetch videos from Cloudflare
    const videos = await fetchCloudflareVideos();

    if (videos.length === 0) {
      console.log('✅ No videos found in Cloudflare Stream.');
      return;
    }

    console.log(`\n✅ Found ${videos.length} videos to migrate.\n`);

    if (DRY_RUN) {
      console.log('[DRY RUN] Preview of first 5 videos:');
      videos.slice(0, 5).forEach((v, i) => {
        console.log(
          `   ${i + 1}. ${v.meta?.filename || v.uid} (${v.duration}s)`
        );
      });
      console.log(
        '\n[DRY RUN] Would create records for all videos. Exiting.\n'
      );
      return;
    }

    // 2. Ensure dummy project exists
    console.log('🔧 Preparing database...\n');
    const projectId = await ensureDummyProject();
    console.log(`   ✅ Using project ID: ${projectId}\n`);

    // 3. Migrate videos in batches
    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;

    console.log('📦 Starting migration...\n');

    for (let i = 0; i < videos.length; i += BATCH_SIZE) {
      const batch = videos.slice(i, i + BATCH_SIZE);
      const batchNum = Math.floor(i / BATCH_SIZE) + 1;
      const totalBatches = Math.ceil(videos.length / BATCH_SIZE);

      console.log(
        `   Batch ${batchNum}/${totalBatches} (${batch.length} videos):`
      );

      for (const video of batch) {
        const filename = video.meta?.filename || video.uid;
        process.stdout.write(`      • ${filename.substring(0, 50)}... `);

        const result = await migrateVideo(video, projectId);

        if (result.success) {
          console.log('✅');
          successCount++;
        } else if (result.error?.includes('Already exists')) {
          console.log('⏭️  (skipped)');
          skipCount++;
        } else {
          console.log(`❌ (${result.error})`);
          failCount++;
        }
      }

      // Delay between batches
      if (i + BATCH_SIZE < videos.length) {
        console.log(`   ⏳ Waiting ${DELAY_MS}ms...\n`);
        await delay(DELAY_MS);
      }
    }

    console.log('\n🎉 Migration Complete!\n');
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ⏭️  Skipped: ${skipCount}`);
    console.log(`   ❌ Failed: ${failCount}`);
    console.log(`   📊 Total: ${videos.length}\n`);
  } catch (error: any) {
    console.error('\n❌ Migration Failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute
migrate();
