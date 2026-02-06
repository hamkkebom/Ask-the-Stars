#!/usr/bin/env tsx
/**
 * Cleanup Cloudflare Stream migration data
 *
 * Usage:
 *   pnpm tsx scripts/cleanup-migration-data.ts --dry-run
 *   pnpm tsx scripts/cleanup-migration-data.ts --execute
 */

import { PrismaClient } from '../packages/database/node_modules/@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../apps/api/.env') });

const prisma = new PrismaClient();

const DUMMY_PROJECT_ID = 'cml7qdy9h0001txlwpaeg9jc5';
const OWNER_ID = 'e2e-admin-test-001';
const BATCH_SIZE = 10;
const DELAY_MS = 500;
const PROGRESS_INTERVAL = 50;

const EXECUTE = process.argv.includes('--execute');
const DRY_RUN = !EXECUTE;

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL missing in apps/api/.env');
  process.exit(1);
}

const SKIP_COUNSELOR_NAMES = new Set([
  '대상없음',
  '상담코너',
  '별님',
  '콕콕상담',
  '새해운세',
  '종교',
  '대상아님',
]);

interface ParsedFilename {
  decodedFilename: string;
  basename: string;
  title: string;
  categoryName: string;
  counselorName: string | null;
}

interface ParsedVideo extends ParsedFilename {
  id: string;
  originalFilename: string;
}

type ParseResult =
  | { ok: true; value: ParsedFilename }
  | { ok: false; reason: string };

type ProcessResult =
  | { status: 'updated' }
  | { status: 'dry-run' }
  | { status: 'failed'; error: string };

const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const categoryCache = new Map<string, string | null>();
const counselorCache = new Map<string, string | null>();
const categoryLocks = new Map<string, Promise<string | null>>();
const counselorLocks = new Map<string, Promise<string | null>>();

const categoriesCreated = new Set<string>();
const counselorsCreated = new Set<string>();
const categoriesPlanned = new Set<string>();
const counselorsPlanned = new Set<string>();

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'Unknown error';
};

const decodeFilename = (value: string): string => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const stripExtension = (value: string): string =>
  value.replace(/\.[^/.]+$/, '');

const normalizeCounselorName = (value?: string): string | null => {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (SKIP_COUNSELOR_NAMES.has(trimmed)) {
    return null;
  }

  return trimmed;
};

const isParseFailure = (
  result: ParseResult
): result is { ok: false; reason: string } => result.ok === false;

const parseFilename = (filename: string): ParseResult => {
  const decodedFilename = decodeFilename(filename);
  const basename = path.posix.basename(decodedFilename);
  const title = stripExtension(basename).trim();
  const matches: string[] = [];
  const bracketPattern = /\[([^\]]+)\]/g;
  let bracketMatch = bracketPattern.exec(basename);

  while (bracketMatch) {
    matches.push(bracketMatch[1]);
    bracketMatch = bracketPattern.exec(basename);
  }

  const categoryName = matches[0]?.trim();
  const counselorName = normalizeCounselorName(matches[1]);

  if (!categoryName) {
    return { ok: false, reason: 'Missing category bracket' };
  }

  if (!title) {
    return { ok: false, reason: 'Missing title' };
  }

  return {
    ok: true,
    value: {
      decodedFilename,
      basename,
      title,
      categoryName,
      counselorName,
    },
  };
};

const preloadCaches = async (): Promise<void> => {
  const [categories, counselors] = await Promise.all([
    prisma.category.findMany({ select: { id: true, name: true } }),
    prisma.counselor.findMany({ select: { id: true, name: true } }),
  ]);

  for (const category of categories) {
    categoryCache.set(category.name, category.id);
  }

  for (const counselor of counselors) {
    if (!counselorCache.has(counselor.name)) {
      counselorCache.set(counselor.name, counselor.id);
    }
  }
};

const getOrCreateCategoryId = async (name: string): Promise<string | null> => {
  const normalized = name.trim();

  if (!normalized) {
    return null;
  }

  if (categoryCache.has(normalized)) {
    return categoryCache.get(normalized) ?? null;
  }

  const existingLock = categoryLocks.get(normalized);
  if (existingLock) {
    return existingLock;
  }

  const lock = (async () => {
    const existing = await prisma.category.findFirst({
      where: { name: normalized },
    });

    if (existing) {
      categoryCache.set(normalized, existing.id);
      return existing.id;
    }

    if (DRY_RUN) {
      categoriesPlanned.add(normalized);
      categoryCache.set(normalized, null);
      return null;
    }

    const created = await prisma.category.create({
      data: { name: normalized },
    });

    categoriesCreated.add(normalized);
    categoryCache.set(normalized, created.id);
    return created.id;
  })();

  categoryLocks.set(normalized, lock);

  try {
    return await lock;
  } finally {
    categoryLocks.delete(normalized);
  }
};

const getOrCreateCounselorId = async (name: string): Promise<string | null> => {
  const normalized = name.trim();

  if (!normalized) {
    return null;
  }

  if (counselorCache.has(normalized)) {
    return counselorCache.get(normalized) ?? null;
  }

  const existingLock = counselorLocks.get(normalized);
  if (existingLock) {
    return existingLock;
  }

  const lock = (async () => {
    const existing = await prisma.counselor.findFirst({
      where: { name: normalized },
    });

    if (existing) {
      counselorCache.set(normalized, existing.id);
      return existing.id;
    }

    if (DRY_RUN) {
      counselorsPlanned.add(normalized);
      counselorCache.set(normalized, null);
      return null;
    }

    const created = await prisma.counselor.create({
      data: { name: normalized },
    });

    counselorsCreated.add(normalized);
    counselorCache.set(normalized, created.id);
    return created.id;
  })();

  counselorLocks.set(normalized, lock);

  try {
    return await lock;
  } finally {
    counselorLocks.delete(normalized);
  }
};

const processVideo = async (video: ParsedVideo): Promise<ProcessResult> => {
  try {
    const categoryId = await getOrCreateCategoryId(video.categoryName);
    const counselorId = video.counselorName
      ? await getOrCreateCounselorId(video.counselorName)
      : null;

    if (DRY_RUN) {
      return { status: 'dry-run' };
    }

    if (!categoryId) {
      return {
        status: 'failed',
        error: `${video.id}: Missing category id`,
      };
    }

    await prisma.$transaction(async (tx) => {
      const transactionClient = tx as typeof prisma;
      const project = await transactionClient.project.create({
        data: {
          title: video.title,
          status: 'COMPLETED',
          ownerId: OWNER_ID,
          categoryId,
          counselorId,
        },
      });

      await transactionClient.video.update({
        where: { id: video.id },
        data: { projectId: project.id },
      });
    });

    return { status: 'updated' };
  } catch (error: unknown) {
    return {
      status: 'failed',
      error: `${video.id}: ${getErrorMessage(error)}`,
    };
  }
};

const printSet = (label: string, values: Set<string>): void => {
  if (values.size === 0) {
    console.log(`${label}: 0`);
    return;
  }

  console.log(`${label}: ${values.size}`);
  const items: string[] = [];
  values.forEach((value) => {
    items.push(value);
  });
  items.sort();
  console.log(`  ${items.join(', ')}`);
};

const run = async (): Promise<void> => {
  console.log(`Cleanup migration data ${DRY_RUN ? '(DRY RUN)' : ''}`);
  console.log(`Dummy project: ${DUMMY_PROJECT_ID}`);
  console.log(`Batch size: ${BATCH_SIZE}`);
  console.log(`Delay between batches: ${DELAY_MS}ms`);
  console.log('');

  const rawVideos = await prisma.video.findMany({
    where: { projectId: DUMMY_PROJECT_ID },
    select: {
      id: true,
      technicalSpec: { select: { filename: true } },
    },
  });

  if (rawVideos.length === 0) {
    console.log('No videos found for dummy project.');
    return;
  }

  const parsedVideos: ParsedVideo[] = [];
  const parseFailures: Array<{ videoId: string; reason: string }> = [];

  for (const video of rawVideos) {
    if (!video.technicalSpec?.filename) {
      parseFailures.push({
        videoId: video.id,
        reason: 'Missing technicalSpec filename',
      });
      continue;
    }

    const parseResult = parseFilename(video.technicalSpec.filename);
    if (isParseFailure(parseResult)) {
      parseFailures.push({
        videoId: video.id,
        reason: parseResult.reason,
      });
      continue;
    }

    parsedVideos.push({
      id: video.id,
      originalFilename: video.technicalSpec.filename,
      ...parseResult.value,
    });
  }

  console.log(`Videos found: ${rawVideos.length}`);
  console.log(`Parsed for processing: ${parsedVideos.length}`);
  console.log(`Parse failures: ${parseFailures.length}`);
  console.log('');

  if (parsedVideos.length === 0) {
    console.log('No valid videos to process.');
    return;
  }

  if (parseFailures.length > 0) {
    const preview = parseFailures.slice(0, 10);
    console.log('Parse failure preview (first 10):');
    for (const failure of preview) {
      console.log(`  ${failure.videoId}: ${failure.reason}`);
    }
    console.log('');
  }

  await preloadCaches();

  let processedCount = 0;
  let updatedCount = 0;
  let dryRunCount = 0;
  let failedCount = 0;

  for (let i = 0; i < parsedVideos.length; i += BATCH_SIZE) {
    const batch = parsedVideos.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map(processVideo));

    for (const result of results) {
      processedCount++;

      if (result.status === 'updated') {
        updatedCount++;
      } else if (result.status === 'dry-run') {
        dryRunCount++;
      } else {
        failedCount++;
        console.log(`Failed video: ${result.error}`);
      }

      if (
        processedCount % PROGRESS_INTERVAL === 0 ||
        processedCount === parsedVideos.length
      ) {
        console.log(
          `Progress: ${processedCount}/${parsedVideos.length} processed`
        );
      }
    }

    if (i + BATCH_SIZE < parsedVideos.length) {
      await delay(DELAY_MS);
    }
  }

  let deletedDummyProject = false;
  let remainingDummyVideos = 0;

  if (!DRY_RUN) {
    remainingDummyVideos = await prisma.video.count({
      where: { projectId: DUMMY_PROJECT_ID },
    });

    if (remainingDummyVideos === 0) {
      await prisma.project.delete({ where: { id: DUMMY_PROJECT_ID } });
      deletedDummyProject = true;
    }
  }

  console.log('');
  console.log('Summary');
  if (DRY_RUN) {
    printSet('Categories to create', categoriesPlanned);
    printSet('Counselors to create', counselorsPlanned);
    console.log(`Projects to create: ${dryRunCount}`);
    console.log(`Videos to update: ${dryRunCount}`);
  } else {
    printSet('Categories created', categoriesCreated);
    printSet('Counselors created', counselorsCreated);
    console.log(`Projects created: ${updatedCount}`);
    console.log(`Videos updated: ${updatedCount}`);
  }

  console.log(`Failed: ${failedCount}`);
  console.log(`Parse failures: ${parseFailures.length}`);

  if (DRY_RUN) {
    console.log('Dummy project deletion skipped (dry run).');
  } else if (deletedDummyProject) {
    console.log('Dummy project deleted (no remaining videos).');
  } else {
    console.log(
      `Dummy project kept (remaining videos: ${remainingDummyVideos}).`
    );
  }
};

run()
  .catch((error: unknown) => {
    console.error('Cleanup failed:', getErrorMessage(error));
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
