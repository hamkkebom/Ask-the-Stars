const https = require('https');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load env
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const token = process.env.CLOUDFLARE_API_TOKEN || process.env.CLOUDFLARE_STREAM_TOKEN;

if (!accountId || !token) {
    console.error('❌ Missing Account ID or Token in environment variables.');
    process.exit(1);
}

console.log(`Using Account ID: ${accountId}`);
console.log(`Using Token: ${token.substring(0, 5)}...`);

const options = {
    hostname: 'api.cloudflare.com',
    port: 443,
    path: `/client/v4/accounts/${accountId}/stream/keys`,
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
};

const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
                const response = JSON.parse(data);
                if (response.success) {
                    const result = response.result;
                    console.log('\n✅ Successfully generated new signing key!');
                    console.log(`KEY ID: ${result.id}`);

                    // Base64 encode the PEM for .env safety
                    const pemBase64 = Buffer.from(result.pem).toString('base64');

                    console.log(`PEM (Base64): ${pemBase64}`);

                    // Save to temporary file for manual update or automation
                    fs.writeFileSync(path.join(__dirname, 'new_signing_key.json'), JSON.stringify({
                        id: result.id,
                        pem: result.pem,
                        pemBase64: pemBase64
                    }, null, 2));

                    console.log('\nSaved to new_signing_key.json');
                } else {
                    console.error('❌ Cloudflare Error:', response.errors);
                }
            } catch (e) {
                console.error('❌ JSON Parse Error:', e.message);
                console.error('Raw Response:', data);
            }
        } else {
            console.error(`❌ HTTP Error: ${res.statusCode}`);
            console.error('Response:', data);
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Request Error:', error);
});

req.end();
