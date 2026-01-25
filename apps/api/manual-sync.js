const { PrismaClient } = require('@prisma/client');
const { VideosService } = require('./dist/modules/videos/videos.service');
const { UploadsService } = require('./dist/modules/uploads/uploads.service');
const { CloudflareStreamService } = require('./dist/modules/cloudflare/cloudflare-stream.service');
const { ConfigService } = require('@nestjs/config');

// Mock ConfigService
class MockConfigService {
  get(key, defaultValue) {
    return process.env[key] || defaultValue;
  }
}

async function run() {
  const prisma = new PrismaClient();
  const config = new MockConfigService();
  const uploads = new UploadsService(config);
  const cloudflare = new CloudflareStreamService(config);
  const service = new VideosService(prisma, uploads, cloudflare, config);

  try {
    console.log('--- STARTING MANUAL SYNC ---');
    const result = await service.syncWithStorage();
    console.log('Sync Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Sync Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
