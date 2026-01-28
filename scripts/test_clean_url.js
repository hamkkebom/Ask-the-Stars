const https = require('https');

const baseUrl = 'https://pub-25e37d58ff1f4c298682981396337b7a.r2.dev';
const prefix = 'uploads/Education/0000/00';
const filename = '[Education] 날짜미상_[별님] 별님의 소개영상(수정).mp4'; // From previous log, but let's try the one from code
// Wait, the DB sample was "[Vlog] 날짜미상_[별님] 별님의 소개영상_v1.0.mp4" (Video ID: 0ad1e3cc...)
// And the key reported in verifies was: uploads/Education/0000/00/[Education]%20%EB%82%A0%EC%A7%9C%EB%AF%B8%EC%83%81_%5B%EC%BC%EC%83%81%EB%8B%B4%20%EC%98%81%EC%83%81%5D%20%EB...
// It seems the key prefix and content mismatched (Vlog vs Education).
// Let's use the filename from the specific video I inspected earlier: 0ad1e3cc...
// Filename: [Vlog] 날짜미상_[별님] 별님의 소개영상_v1.0.mp4
// But the R2 key in DB was: uploads/Vlog/0000/00/... ??
// Wait, the log earlier showed:
// Video ID: 0ad1e3cc...
// Filename: [Vlog] ...
// R2 Key: ...
// Let's retry fetching the RAW data for this video to be 100% sure what the filename and key are.

const variants = [];

// 1. Clean Construction
// Assuming prefix 'uploads/Vlog/0000/00/' and filename '[Vlog] 날짜미상_[별님] 별님의 소개영상_v1.0.mp4'
// Target: '[Vlog] 날짜미상_[별님] 별님의 소개영상_v1.0_thumb.avif'
const rawFilename = '[Vlog] 날짜미상_[별님] 별님의 소개영상_v1.0.mp4';
const thumbFilename = rawFilename.replace('.mp4', '_thumb.avif');
const cleanPath = `uploads/Vlog/0000/00/${thumbFilename}`;

// Variant A: Encode each segment
// 'uploads', 'Vlog', '0000', '00', encodedFilename
variants.push({
    name: 'Constructed from Filename (encodeURIComponent)',
    url: `${baseUrl}/uploads/Vlog/0000/00/${encodeURIComponent(thumbFilename)}`
});

// Variant B: Encode Path logic
variants.push({
    name: 'Constructed Path (split/encoded)',
    url: `${baseUrl}/${cleanPath.split('/').map(encodeURIComponent).join('/')}`
});

async function check(variant) {
    console.log(`Checking: ${variant.url}`);
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
    for (const v of variants) {
        await check(v);
    }
}

run();
