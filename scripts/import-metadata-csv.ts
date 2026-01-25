
import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function run() {
  console.log('🚀 Starting CSV based metadata import...');

  const csvPath = path.resolve(process.cwd(), 'metadata.csv');
  if (!fs.existsSync(csvPath)) {
    console.error('❌ metadata.csv not found at:', csvPath);
    const files = fs.readdirSync(process.cwd());
    console.log('Current root files:', files.filter(f => f.toLowerCase().endsWith('.csv')));
    return;
  }

  const content = fs.readFileSync(csvPath, 'utf8');
  const lines = content.split('\n').filter(l => l.trim() !== '');
  const header = lines[0].split(',');

  // Column Map (based on observation)
  // NO,분류,상담사,제목,버전,상태,해상도,재생시간,코덱,로컬경로,썸네일(AVIF),썸네일(WebP),에어테이블ID
  // 0  1    2      3   4    5    6       7       8     9       10            11            12

  let count = 0;

  // Get System User
  const systemUser = await prisma.user.findFirst({ where: { role: 'ADMIN' } });
  if (!systemUser) {
    console.error('❌ Admin user not found. Please create one first.');
    return;
  }

  console.log('🧹 Cleaning up existing project/video data for a fresh start...');
  // We clean everything to ensure the CSV is the source of truth
  await prisma.$transaction([
    prisma.videoTechnicalSpec.deleteMany(),
    prisma.videoEventLog.deleteMany(),
    prisma.video.deleteMany(),
    prisma.project.deleteMany(),
  ]);

  for (let i = 1; i < lines.length; i++) {
    const row = parseCsvRow(lines[i]);
    if (row.length < 10) continue;

    const projectNo = parseInt(row[0]);
    const categoryName = row[1] || '기타';
    const counselorName = row[2] || '대상없음';
    const title = row[3] || '제목없음';
    const versionLabel = row[4] || 'v1.0';
    const videoStatus = (row[5] === 'FINAL' || row[5] === 'APPROVED') ? 'FINAL' : 'DRAFT';
    const resolution = row[6];
    const durationStr = row[7]?.replace('s', '');
    const duration = durationStr ? parseFloat(durationStr) : null;
    const codec = row[8];
    const r2Key = row[9];
    const thumbAvif = row[10];
    const thumbWebp = row[11];
    const airtableId = row[12];

    try {
      // 1. Category
      const category = await prisma.category.upsert({
        where: { name: categoryName },
        update: {},
        create: { name: categoryName }
      });

      // 2. Counselor
      const counselor = await prisma.counselor.upsert({
        where: { name: counselorName },
        update: {},
        create: { name: counselorName }
      });

      // 3. Project & Video & Spec
      await prisma.project.create({
        data: {
          projectNo: projectNo,
          title: title,
          ownerId: systemUser.id,
          categoryId: category.id,
          counselorId: counselor.id,
          status: videoStatus === 'FINAL' ? 'COMPLETED' : 'DRAFT',
          videos: {
            create: {
              airtableId: airtableId,
              versionLabel: versionLabel,
              status: videoStatus as any,
              technicalSpec: {
                create: {
                  filename: r2Key.split('/').pop() || '',
                  r2Key: r2Key,
                  r2KeyThumbAvif: thumbAvif,
                  r2KeyThumbWebp: thumbWebp,
                  resolution: resolution,
                  duration: duration,
                  videoCodec: codec,
                  format: r2Key.split('.').pop()?.toLowerCase() || 'mp4',
                } as any
              }
            }
          }
        }
      });
      count++;
      if (count % 50 === 0) console.log(`⏳ Imported ${count} videos...`);
    } catch (err) {
      console.error(`❌ Failed to import row ${i} (${title}):`, err.message);
    }
  }

  console.log(`✅ CSV Import Completed. Total: ${count} videos.`);
}

/**
 * Simple CSV parser that handles quoted values with commas
 */
function parseCsvRow(line: string): string[] {
  const result: string[] = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuote = !inQuote;
    } else if (char === ',' && !inQuote) {
      result.push(cur.trim());
      cur = '';
    } else {
      cur += char;
    }
  }
  result.push(cur.trim());
  return result;
}

run()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
