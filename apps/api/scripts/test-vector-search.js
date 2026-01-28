const { PrismaClient } = require('@prisma/client');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const path = require('path');
const dotenv = require('dotenv');

// Load env
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

if (!process.env.GEMINI_API_KEY) {
    dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
}

const prisma = new PrismaClient();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function testSearch(query) {
    console.log(`🔎 Testing Vector Search for: "${query}"`);

    try {
        // 1. Generate Embedding for query
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
        const result = await model.embedContent(query);
        const vector = result.embedding.values;

        console.log(`✅ Generated Query Vector (dim: ${vector.length})`);

        // 2. Search in DB
        const vectorString = `[${vector.join(',')}]`;

        // Using raw SQL for vector similarity (cosine distance)
        // Adjust operator (<=>, <->, etc.) based on pgvector setup. <=> is cosine distance.
        const results = await prisma.$queryRawUnsafe(`
            SELECT
                ve.video_id,
                ve.updated_at,
                1 - (ve.embedding <=> $1::vector) as similarity
            FROM "video_embeddings" ve
            ORDER BY ve.embedding <=> $1::vector
            LIMIT 5;
        `, vectorString);

        console.log(`\n🎯 Search Results:`);
        results.forEach((r, i) => {
            console.log(`${i+1}. VideoID: ${r.video_id} (Similarity: ${r.similarity.toFixed(4)})`);
        });

    } catch (e) {
        console.error('❌ Search Test Failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

testSearch("상담사 소개 영상"); // Example query
