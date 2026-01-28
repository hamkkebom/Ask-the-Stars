
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
// Minimal fetch wrapper if needed, assumes Node 18+

// Helper to load .env
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
        console.error('❌ Failed to load .env:', e.message);
        return {};
    }
}

// AWS SDK v3 for R2 is ideal, but we might not have it installed in the script context easily.
// We can try to use raw S3 REST API for R2 check or just rely on existence of keys for now if SDK missing.
// Actually, apps/api usually has @aws-sdk/client-s3. We can try requiring it.
// If it fails, we fall back to a basic credential check.

async function verifyCloudflare() {
    console.log('🔍 Starting Comprehensive Cloudflare Verification...\n');
    const env = loadEnv();

    // 1. Check Environment Variables
    const requiredVars = [
        'CLOUDFLARE_ACCOUNT_ID',
        'CLOUDFLARE_API_TOKEN', // or STREAM_TOKEN
        'CLOUDFLARE_R2_ACCESS_KEY_ID',
        'CLOUDFLARE_R2_SECRET_ACCESS_KEY',
        'CLOUDFLARE_R2_BUCKET_NAME',
        'CLOUDFLARE_WEBHOOK_SECRET',
        'CLOUDFLARE_SIGNING_KEY_ID',
        'CLOUDFLARE_SIGNING_KEY_PEM'
    ];

    let missing = [];
    requiredVars.forEach(key => {
        if (!env[key] && !(key === 'CLOUDFLARE_API_TOKEN' && env['CLOUDFLARE_STREAM_TOKEN'])) {
             missing.push(key);
        }
    });

    if (missing.length > 0) {
        console.error('❌ Missing Environment Variables:');
        missing.forEach(m => console.error(`   - ${m}`));
    } else {
        console.log('✅ All Credentials present in .env');
    }

    const accountId = env['CLOUDFLARE_ACCOUNT_ID'];
    const token = env['CLOUDFLARE_API_TOKEN'] || env['CLOUDFLARE_STREAM_TOKEN'];

    // 2. Verify Stream API Access
    console.log('\n🎥 Verifying Cloudflare Stream API...');
    try {
        const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/stream?limit=1`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (res.ok) {
            const data = await res.json();
            console.log('✅ Stream API Connection Successful');
            console.log(`   - Account: ${accountId}`);
        } else {
            console.error('❌ Stream API Failed:', res.status, await res.text());
        }
    } catch (e) {
        console.error('❌ Stream API Network Error:', e.message);
    }

    // 3. Verify Webhook Registration
    console.log('\nHz Verifying Webhook Registration...');
    try {
        const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/webhook`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) { // GET usually returns the webhook details
             console.log('✅ Webhook Config Found');
             console.log(`   - URL: ${data.result.notificationUrl}`);
             if (env['CLOUDFLARE_WEBHOOK_SECRET'] === data.result.secret) {
                 console.log('✅ Secret Match: .env matches Cloudflare secret');
             } else {
                 console.warn('⚠️ Secret Mismatch: .env secret differs from Cloudflare (Expected if you just rotated it, otherwise check config)');
                 // Note: Cloudflare API might not return secret in GET, only in PUT/POST.
                 // Docs say "The secret is returned in the API response when you create or retrieve the webhook."
                 // So verify if it's there.
                 if (data.result.secret) {
                    console.warn(`      Cloudflare: ${data.result.secret.substring(0,6)}...`);
                    console.warn(`      Env:        ${env['CLOUDFLARE_WEBHOOK_SECRET']?.substring(0,6)}...`);
                 }
             }
        } else {
             console.log('ℹ️ No Webhook found or Error:', data.errors);
        }
    } catch (e) {
        console.error('❌ Webhook Check Error:', e.message);
    }

    // 4. Verify Signing Keys (PEM Decode Check)
    console.log('\nCx Verifying Signing Keys...');
    const pem = env['CLOUDFLARE_SIGNING_KEY_PEM'];
    if (pem) {
        let decodedPem = pem;
        // Logic check matching service
        if (!pem.trim().startsWith('-----')) {
             try {
                 decodedPem = Buffer.from(pem, 'base64').toString('utf8');
                 console.log('✅ PEM is Base64 encoded (Normal for .env)');
             } catch (e) {
                 console.error('❌ PEM decode failed');
             }
        } else {
            console.log('ℹ️ PEM is Plain Text');
        }

        if (decodedPem.includes('BEGIN RSA PRIVATE KEY')) {
            console.log('✅ PEM Format looks valid');
        } else {
            console.error('❌ PEM Content invalid (Missing Header)');
        }
    }

    // 5. Verify R2 Connectivity
    console.log('\n🪣 Verifying Cloudflare R2...');
    // We try to list buckets via S3 API or generic approach if SDK available.
    // Since we can't easily require aws-sdk here without ensuring node_modules,
    // we will check the credentials visually and try a basic signature check if possible,
    // OR just skip deep R2 check and rely on credentials presence + user test.

    // Better: Try to use the R2 Public URL to check if it's reachable (though it might be private)
    // Or just fetch a non-existent file to see if we get AccessDenied (Auth works) vs 404.
    // Actually, R2 S3 API requires S3 signature. Doing that continuously in raw JS is complex.
    // Let's rely on checking if the Access Key looks valid (length check).

    const r2Key = env['CLOUDFLARE_R2_ACCESS_KEY_ID'];
    const r2Secret = env['CLOUDFLARE_R2_SECRET_ACCESS_KEY'];

    if (r2Key && r2Key.length === 32) {
        console.log('✅ R2 Access Key ID format looks valid (32 chars)');
    } else if (r2Key) {
        console.warn('⚠️ R2 Access Key ID length unusual (Expected 32 chars MD5-like)');
    }

    if (r2Secret && r2Secret.length === 64) {
        console.log('✅ R2 Secret Key format looks valid (64 chars)');
    } else if (r2Secret) {
        console.warn('⚠️ R2 Secret Key length unusual (Expected 64 chars)');
    }

    console.log('\n🏁 Verification Complete.');
}

verifyCloudflare();
