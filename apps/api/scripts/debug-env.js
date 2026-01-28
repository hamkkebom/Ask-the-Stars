
const fs = require('fs');
const path = require('path');

const report = {
    cwd: process.cwd(),
    prisma: {
        path: null,
        clientVersion: null,
        hasStreamUid: false,
        error: null
    },
    google: {
        path: null,
        error: null
    },
    env: {
        GEMINI_API_KEY_EXISTS: !!process.env.GEMINI_API_KEY,
        GEMINI_KEY_LENGTH: process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.length : 0
    }
};

try {
    report.prisma.path = require.resolve('@prisma/client');

    const { PrismaClient } = require('@prisma/client');
    const dmmf = PrismaClient.dmmf;
    if (dmmf && dmmf.datamodel) {
         const model = dmmf.datamodel.models.find(m => m.name === 'VideoTechnicalSpec');
         if (model) {
             const field = model.fields.find(f => f.name === 'streamUid');
             report.prisma.hasStreamUid = !!field;
         } else {
             report.prisma.error = 'VideoTechnicalSpec model not found in DMMF';
         }
    }
} catch (e) {
    report.prisma.error = e.message;
}

try {
    report.google.path = require.resolve('@google/generative-ai');
} catch (e) {
    report.google.error = e.message;
}

const outputPath = path.join(__dirname, 'env-debug.json');
fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
console.log('Report written to', outputPath);
