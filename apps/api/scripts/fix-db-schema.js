const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔄 Fixing Database Schema manually...');
    try {
        console.log('Dropping old embedding column...');
        await prisma.$executeRawUnsafe(`ALTER TABLE video_embeddings DROP COLUMN IF EXISTS embedding;`);
        await prisma.$executeRawUnsafe(`ALTER TABLE video_embeddings DROP COLUMN IF EXISTS embedding_gemini;`);

        console.log('re-creating embedding column with vector(768)...');
        await prisma.$executeRawUnsafe(`ALTER TABLE video_embeddings ADD COLUMN embedding vector(768);`);

        console.log('✅ Schema fixed!');
    } catch (e) {
        console.error('❌ Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
