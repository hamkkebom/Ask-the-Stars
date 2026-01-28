
const path = require('path');
const dotenv = require('dotenv');

// Load env from apps/api/.env or root
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

// Fallback to root .env if GEMINI_API_KEY not found
if (!process.env.GEMINI_API_KEY) {
    dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
}

const { PrismaClient } = require('@prisma/client');
const { GoogleGenerativeAI } = require('../node_modules/@google/generative-ai');

const prisma = new PrismaClient();
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY Missing. Please add it to your .env file.');
    // process.exit(1); // Don't exit yet, maybe passed via CLI env
}

const DELAY_MS = 1000; // Rate limit 15 RPM for free tier, 1s might be too fast?
// Gemini Free/Pay-as-you-go limits: 15 RPM (free), 1500 RPM (paid).
// Let's use 4000ms delay to be safe on free tier (15 RPM = 1 req / 4 sec)
const RATE_LIMIT_DELAY = 4500;

const DRY_RUN = process.argv.includes('--dry-run');
const LIMIT = Number(process.env.LIMIT) || 100;

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function generateEmbedding(text) {
    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

        const result = await model.embedContent(text);
        const embedding = result.embedding;
        return embedding.values;
    } catch (error) {
        console.error('Gemini Error:', error.message);
        throw error;
    }
}

async function backfill() {
    console.log('🧠 Starting AI Embedding Backfill (Gemini-004)... ' + (DRY_RUN ? '(DRY RUN)' : ''));

    try {
        // Find videos without embeddings
        // Since we changed schema to 768 dim, existing 1536 vectors (if any) are invalid/incompatible.
        // We should probably check if we need to Wipe old vectors first?
        // But table migration likely handled it or threw error.

        const videos = await prisma.video.findMany({
            where: {
                embedding: null
            },
            include: {
                project: {
                    select: { title: true }
                }
            },
            take: LIMIT
        });

        console.log(`Found ${videos.length} videos needing embeddings.`);

        if (videos.length === 0) {
            console.log('✅ All videos have embeddings (or DB empty).');
            return;
        }

        let successCount = 0;
        let failCount = 0;

        for (const video of videos) {
            console.log(`Processing: ${video.id} (${video.project?.title})`);

            if (DRY_RUN) {
                console.log(`[DRY RUN] Would generate embedding.`);
                continue;
            }

            try {
                const title = video.project?.title || 'Untitled';
                const desc = video.description || '';
                const text = `Title: ${title}\nDescription: ${desc}`;

                const vector = await generateEmbedding(text);
                const vectorString = `[${vector.join(',')}]`;

                const { v4: uuidv4 } = require('uuid');
                let newId = uuidv4();

                await prisma.$executeRawUnsafe(
                    `INSERT INTO "video_embeddings" ("id", "video_id", "embedding", "updated_at") VALUES ($1, $2, $3::vector, NOW())
                     ON CONFLICT ("video_id") DO UPDATE SET "embedding" = $3::vector, "updated_at" = NOW()`,
                    newId, video.id, vectorString
                );

                successCount++;
                console.log('  ✅ Saved.');
            } catch (error) {
                console.error(`❌ Failed for ${video.id}:`, error.message);
                failCount++;
            }

            await delay(RATE_LIMIT_DELAY);
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
