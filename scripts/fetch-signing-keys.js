
const fs = require('fs');
const path = require('path');

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
        return {};
    }
}

async function fetchSigningKeys() {
    const env = loadEnv();
    const accountId = env['CLOUDFLARE_ACCOUNT_ID'];
    const token = env['CLOUDFLARE_API_TOKEN'] || env['CLOUDFLARE_STREAM_TOKEN'];

    if (!accountId || !token) {
        console.error('❌ Missing Cloudflare Credentials in .env');
        return;
    }

    console.log(`🔍 Checking Signing Keys for Account: ${accountId}`);

    try {
        // 1. List existing keys
        const listRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/keys`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const listData = await listRes.json();

        let key = null;

        if (listData.success && listData.result && listData.result.length > 0) {
            console.log('✅ Found existing signing keys.');
            // Note: The API usually does NOT return the PEM (private key) in the list response for security.
            // It only returns it upon creation.
            // So if we have keys but lost the PEM, we must create a new one.
            console.log('⚠️ Note: Existing keys found, but Private Key (PEM) cannot be retrieved once created.');
            console.log('   We will create a NEW key to ensure you have the PEM.');
        }

        // 2. Create a NEW key to get the PEM
        console.log('🚀 Creating a NEW Signing Key to retrieve PEM...');
        const createRes = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/stream/keys`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        const createData = await createRes.json();

        if (createData.success) {
            const newKey = createData.result;
            console.log('\n✅ New Signing Key Created Successfully!');
            console.log('------------------------------------------------');
            console.log('🔑 KEY ID:', newKey.id);
            console.log('------------------------------------------------');
            console.log('📜 PRIVATE KEY (.pem):');
            console.log(newKey.pem); // PEM is only returned here
            console.log('------------------------------------------------');
            console.log('\nPlease update apps/api/.env with:');
            console.log(`CLOUDFLARE_SIGNING_KEY_ID="${newKey.id}"`);
            // We need to handle newlines for .env. Usually we replace \n with \\n for single line env
            const flatPem = newKey.pem.replace(/\n/g, '\\n');
            console.log(`CLOUDFLARE_SIGNING_KEY_PEM="${flatPem}"`);
        } else {
            console.error('❌ Failed to create key:', JSON.stringify(createData.errors, null, 2));
        }

    } catch (error) {
        console.error('❌ Network Error:', error.message);
    }
}

fetchSigningKeys();
