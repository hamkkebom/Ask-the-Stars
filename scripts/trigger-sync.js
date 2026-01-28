
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../apps/api/src/app.module');
const { VideosService } = require('../apps/api/src/modules/videos/videos.service');

async function runSync() {
  console.log('🚀 Initializing NestJS App Context for Sync...');

  // Create application context (no server listen)
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    const videosService = app.get(VideosService);
    console.log('✅ Service retrieved. Starting syncWithStorage()...');

    const result = await videosService.syncWithStorage();

    console.log('\n📊 Sync Result:', result);

  } catch (error) {
    console.error('❌ Sync Failed:', error);
  } finally {
    await app.close();
    console.log('👋 Context closed.');
  }
}

runSync();
