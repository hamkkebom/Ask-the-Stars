
const fs = require('fs');
const path = require('path');
// Minimal fetch wrapper if not available (Node 18+ has crypto/fetch)
// We assume Node 20+ based on project

// Read .env manually to get credentials script-side
function loadEnv() {
    try {
        const envPath = path.join(__dirname, '../apps/api/.env');
        const envContent = fs.readFileSync(envPath, 'utf8');
        const env = {};
        envContent.split('\n').forEach(line => {
            const match = line.match(/^([^=]+)=(.*)$/);
            if (match) {
                const key = match[1].trim();
                const value = match[2].trim().replace(/^["']|["']$/g, '');
                env[key] = value;
            }
        });
        return env;
    } catch (e) {
        console.error('Failed to load .env from apps/api/.env', e);
        return {};
    }
}

async function registerWebhook() {
    const env = loadEnv();
    const accountId = env['CLOUDFLARE_ACCOUNT_ID'];
    const token = env['CLOUDFLARE_API_TOKEN'] || env['CLOUDFLARE_STREAM_TOKEN'];

    // CHANGE THIS TO YOUR PUBLIC URL (ngrok or prod)
    // For now we use a placeholder or ask user to provide it args
    const notificationUrl = process.argv[2] || 'https://api.hamkkebom.com/api/videos/webhook/cloudflare';

    if (!accountId || !token) {
        console.error('❌ Missing Cloudflare Credentials in .env');
        console.log('Account ID:', accountId);
        console.log('Token:', token ? '*******' : 'Missing');
        return;
    }

    console.log(`🚀 Registering Webhook for Account: ${accountId}`);
    console.log(`📡 URL: ${notificationUrl}`);

    try {
        const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/webhook`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ notificationUrl })
        });

        const data = await response.json();

        if (data.success) {
            console.log('\n✅ Webhook Registered Successfully!');
            console.log('------------------------------------------------');
            console.log('🔐 YOUR WEBHOOK SECRET:', data.result.secret);
            console.log('------------------------------------------------');
            console.log('\nPlease update apps/api/.env with:');
            console.log(`CLOUDFLARE_WEBHOOK_SECRET="${data.result.secret}"`);
        } else {
            console.error('❌ Registration Failed:', JSON.stringify(data.errors, null, 2));
        }

    } catch (error) {
        console.error('❌ Network Error:', error.message);
    }
}

registerWebhook();
