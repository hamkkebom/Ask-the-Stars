const https = require('https');

const baseUrl = 'https://pub-25e37d58ff1f4c298682981396337b7a.r2.dev';
const rawPath = '/uploads/Education/0000/00/[Education] 날짜미상_[별님] 별님의 소개영상(수정).mp4';
// Note: filename from DB sample 0ad1e3cc... was: "[Vlog] 날짜미상_[별님] 별님의 소개영상_v1.0.mp4"
// Let's use the explicit one from db verify output:
// Filename: [Vlog] 날짜미상_[별님] 별님의 소개영상_v1.0.mp4
// Key: uploads/Vlog/0000/00/[Vlog]%20%EB%82%A0%EC%A7%9C%EB%AF%B8%EC%83%81_%5B%EB%B3%84%EB%8B%98%5D%20%EB%B3%84%EB%8B%98%EC%9D%98%20%EC%86%8C%EA%B0%9C%EC%98%81%EC%83%81_v1.0.mp4
// My script derived: ..._v1.0_thumb.avif

// The key in DB (from verify script) seemed to have %20 etc.
// Let's take the EXACT string printed in verify log for AvifKey.
const dbKeyFromLog = "uploads/Education/0000/00/[Education]%20%EB%82%A0%EC%A7%9C%EB%AF%B8%EC%83%81_%5B%EC%BC%EC%83%81%EB%8B%B4%20%EC%98%81%EC%83%81%5D%20%EB%A9%8D%EB%95%8C%EB%A6%AC%EB%8A%94%20%EA%B0%9C%20%EA%B0%99%EC%9D%B4%20%EC%B0%BE%EA%B8%B0%20%ED%9E%98%EB%93%A0%20%EB%82%98%EC%9D%98%20%EC%A0%95%EC%B2%B4%EC%84%B1%20ft.%20%EC%A7%84%EB%A1%9C%20%EA%B3%A0%EB%AF%BC_v1.0_thumb.avif";

const variants = [
    { name: 'Raw DB Key', url: `${baseUrl}/${dbKeyFromLog}` },
];

try {
    variants.push({ name: 'Decoded then Path Encoded', url: `${baseUrl}/${dbKeyFromLog.split('/').map(p => encodeURIComponent(decodeURIComponent(p))).join('/')}` });
} catch (e) { console.log('Variant 2 failed construction:', e.message); }

try {
    variants.push({ name: 'Fully Decoded', url: `${baseUrl}/${decodeURIComponent(dbKeyFromLog)}` });
} catch (e) { console.log('Variant 3 failed construction:', e.message); }

try {
    variants.push({ name: 'Fixed Escape (Manual)', url: `${baseUrl}/${dbKeyFromLog}`.replace(/\[/g, '%5B').replace(/\]/g, '%5D') });
} catch (e) { console.log('Variant 4 failed construction:', e.message); }

async function check(variant) {
    return new Promise(resolve => {
        https.request(variant.url, { method: 'HEAD' }, res => {
            console.log(`[${res.statusCode}] ${variant.name}`);
            resolve();
        }).on('error', e => {
            console.log(`[ERR] ${variant.name}: ${e.message}`);
            resolve();
        }).end();
    });
}

async function run() {
    console.log('Testing URL variants...');
    for (const v of variants) {
        await check(v);
    }
}

run();
