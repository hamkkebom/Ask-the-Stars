
const { PrismaClient } = require('../packages/database/node_modules/@prisma/client');
let axios;
let dotenv;

try {
    axios = require('axios');
    dotenv = require('dotenv');
} catch (e) {
    try {
        axios = require('../apps/api/node_modules/axios');
        dotenv = require('../apps/api/node_modules/dotenv');
    } catch (e2) {
        console.error('❌ Could not load axios/dotenv.');
        process.exit(1);
    }
}

const path = require('path');
dotenv.config({ path: path.resolve(__dirname, 'apps/api/.env') });

const prisma = new PrismaClient();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY Missing in apps/api/.env');
    dotenv.config();
}

const DELAY_MS = 500;
const DRY_RUN = process.argv.includes('--dry-run');

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function generateEmbedding(text) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/embeddings',
            {
                model: 'text-embedding-3-small',
                input: text,
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return response.data.data[0].embedding;
    } catch (error) {
        console.error('OpenAI Error:', error.response?.data || error.message);
        throw error;
    }
}

async function backfill() {
    console.log('🧠 Starting AI Embedding Backfill... ' + (DRY_RUN ? '(DRY RUN)' : ''));

    try {
        const videos = await prisma.video.findMany({
            where: {
                embedding: null
            },
            include: {
                project: {
                    select: {
                        title: true,
                    }
                }
            },
            take: Number(process.env.LIMIT) || 100
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

                // UUID shim
                const { v4: uuidv4 } = require('uuid'); // uuid might be in workspace root or nested
                // IF uuid fails, we'll need similar fallback or simple random shim for now
                // Actually uuid is devDependency in root, assume it works or use crypto

                let newId;
                try {
                     newId = uuidv4();
                } catch(e) {
                     newId = require('crypto').randomUUID();
                }

                await prisma.$executeRawUnsafe(
                    `INSERT INTO "video_embeddings" ("id", "video_id", "embedding", "updated_at") VALUES ($1, $2, $3::vector, NOW())`,
                    newId, video.id, vectorString
                );

                successCount++;
            } catch (error) {
                console.error(`❌ Failed for ${video.id}:`, error.message);
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
