
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const total = await prisma.videoTechnicalSpec.count();
        console.log(`Total TechnicalSpecs: ${total}`);

        const nullStream = await prisma.videoTechnicalSpec.count({
            where: { streamUid: null }
        });
        console.log(`Specs with streamUid == null: ${nullStream}`);

        const emptyStream = await prisma.videoTechnicalSpec.count({
            where: { streamUid: '' } // Just in case
        });
        console.log(`Specs with streamUid == "": ${emptyStream}`);

        const withR2 = await prisma.videoTechnicalSpec.count({
            where: { NOT: { r2Key: null } }
        });
        console.log(`Specs with r2Key != null: ${withR2}`);

        const eligible = await prisma.videoTechnicalSpec.count({
             where: {
                 AND: [
                    { streamUid: null },
                    { NOT: { r2Key: null } }
                 ]
             }
        });
        console.log(`Eligible for migration (DB count): ${eligible}`);

        // Sample
        const samples = await prisma.videoTechnicalSpec.findMany({ take: 3 });
        console.log('Sample Data:', JSON.stringify(samples, null, 2));

    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}
main();
