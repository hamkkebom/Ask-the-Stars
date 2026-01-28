
import { PrismaClient } from '../packages/database/node_modules/@prisma/client';
import axios from 'axios';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Note: We need AiService functionality.
// Since AiService is part of the NestJS module, importing it directly might be hard without Nest context.
// However, OpenAI logic is simple enough to replicate in a script for backfill purposes.
// Alternatively, we can use the NestJS Standalone Application pattern.
// For simplicity and speed, let's replicate the embedding call (it's just an API call).

dotenv.config({ path: path.resolve(__dirname, '../apps/api/.env') });

const prisma = new PrismaClient();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY Missing in apps/api/.env');
    process.exit(1);
}

// Config
const BATCH_SIZE = 5;
const DELAY_MS = 500; // 0.5s delay

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function generateEmbedding(text: string): Promise<number[]> {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/embeddings',
            {
                model: 'text-embedding-3-small',
                input: text,
            },
            {
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.data[0].embedding;
    } catch (error: any) {
        console.error('OpenAI Error:', error.response?.data || error.message);
        throw error;
    }
}

async function backfill() {
    console.log('🧠 Starting AI Embedding Backfill...');

    try {
        // 1. Find videos without embeddings
        // We look for Videos where VideoEmbedding is null
        // Note: Prisma Relation Filter
        const videos = await prisma.video.findMany({
            where: {
                embedding: null // Relation is null
            },
            include: {
                project: {
                    select: {
                        title: true,
                        // categories/counselors are related to Project.
                        // Wait, schema says Project has categoryId, counselorId.
                        category: true,
                        counselor: true,
                    }
                }
            },
            take: Number(process.env.LIMIT) || 100
        });

        console.log(`Found ${videos.length} videos needing embeddings.`);

        if (videos.length === 0) {
            console.log('✅ All videos have embeddings.');
            return;
        }

        let successCount = 0;
        let failCount = 0;

        for (const video of videos) {
            console.log(`Processing: ${video.id} (${video.project.title})`);

            try {
                // Construct Embedding Text
                // Format: "Title: ...\nDescription: ...\nCategory: ...\nCounselor: ..."
                const title = video.project.title;
                const desc = video.description || '';
                const category = video.project.category?.name || 'Unknown';
                const counselor = video.project.counselor?.name || 'Unknown';

                const text = `Title: ${title}\nDescription: ${desc}\nCategory: ${category}\nCounselor: ${counselor}`;

                // Generate Vector
                const vector = await generateEmbedding(text);

                // Save to DB
                // Use pgvector syntax if supported by Prisma Raw, or if Prisma Client supports it (previewFeatures).
                // With 'postgresqlExtensions' and 'vector', generic types might be tricky.
                // Safest way: Execute Raw SQL for the vector insert if standard create fails?
                // Let's try standard create first.
                // Note: The schema defines `embedding Unsupported("vector(1536)")`
                // So we MUST use $executeRaw.

                // Construct vector string '[0.1, 0.2, ...]'
                const vectorString = `[${vector.join(',')}]`;

                // UUID for new ID
                const { v4: uuidv4 } = require('uuid');
                const newId = uuidv4();

                await prisma.$executeRaw`
                    INSERT INTO "video_embeddings" ("id", "video_id", "embedding", "updated_at")
                    VALUES (${newId}, ${video.id}, ${vectorString}::vector, NOW())
                `;

                successCount++;
            } catch (error) {
                console.error(`❌ Failed for ${video.id}:`, error);
                failCount++;
            }

            await delay(DELAY_MS);
        }

        console.log(`\n🎉 Backfill Complete!`);
        console.log(`Success: ${successCount}`);
        console.log(`Failed: ${failCount}`);

    } catch (e) {
        console.error('Global Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

backfill();
