
const fs = require('fs');

try {
    const raw = fs.readFileSync('sync_final_response.json', 'utf-16le').replace(/^\uFEFF/, '');
    const data = JSON.parse(raw);
    console.log('--- SYNC RESULT ---');
    console.log(`Updated Thumbnails: ${data.updatedThumbnailsCount}`);
    console.log(`Debug Log Length: ${data.debugLog ? data.debugLog.length : 0}`);
    if (data.debugLog && data.debugLog.length > 0) {
        console.log('--- Last 5 Log Lines ---');
        console.log(data.debugLog.slice(-5).join('\n'));
    }
} catch (e) {
    console.error('Failed to read:', e);
}
