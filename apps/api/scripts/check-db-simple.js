
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const dbUrl = process.env.DATABASE_URL || 'UNDEFINED';
        console.log(`Checking DB: ${dbUrl.substring(0, 15)}...`);

        const allSpecs = await prisma.videoTechnicalSpec.findMany({ take: 5 });
        console.log(`Total Specs Found (limit 5): ${allSpecs.length}`);

        if (allSpecs.length > 0) {
            console.log('Sample Spec:', allSpecs[0]);
        } else {
             console.log('⚠️ Table is EMPTY.');
        }

    } catch (e) {
        console.error('Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
