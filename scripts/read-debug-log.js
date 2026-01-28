
const fs = require('fs');

try {
    const raw = fs.readFileSync('sync_response.json', 'utf-16le').replace(/^\uFEFF/, '');
    const data = JSON.parse(raw);
    fs.writeFileSync('cleaned_log.txt', data.debugLog.join('\n'));
    console.log('Log extracted to cleaned_log.txt');
} catch (e) {
    console.error('Failed to read log:', e);
}
