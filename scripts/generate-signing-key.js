const fs = require('fs');
const path = require('path');
const https = require('https');

// Read .env file
const envPath = path.join(__dirname, '../apps/api/.env');
const envContent = fs.readFileSync(envPath, 'utf8');

const getEnvValue = (key) => {
  const match = envContent.match(new RegExp(`${key}="?([^"\\n]+)"?`));
  return match ? match[1] : null;
};

const ACCOUNT_ID = getEnvValue('CLOUDFLARE_ACCOUNT_ID');
const API_TOKEN = getEnvValue('CLOUDFLARE_STREAM_TOKEN'); // Assuming this has Stream:Edit permission

if (!ACCOUNT_ID || !API_TOKEN) {
  console.error('❌ Error: CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_STREAM_TOKEN not found in .env');
  process.exit(1);
}

console.log(`🔑 Generating Signing Key for Account: ${ACCOUNT_ID}...`);

const options = {
  hostname: 'api.cloudflare.com',
  path: `/client/v4/accounts/${ACCOUNT_ID}/stream/keys`,
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode !== 200 && res.statusCode !== 201) {
      console.error(`❌ API Request Failed: ${res.statusCode}`);
      console.error(data);
      return;
    }

    try {
      const response = JSON.parse(data);
      if (!response.success) {
        console.error('❌ API Error:', response.errors);
        return;
      }

      const keyData = response.result;
      const keyId = keyData.id;
      const pem = keyData.pem; // Private Key in PEM format

      console.log(`✅ Key Generated Successfully! ID: ${keyId}`);

      // Encode PEM to base64 to avoid line break issues in .env (or keep as multi-line string if handled)
      // Standard practice: Base64 encode the PEM for .env storage
      const pemBase64 = Buffer.from(pem).toString('base64');

      // Append to .env
      const currentEnv = fs.readFileSync(envPath, 'utf8');

      // Check if keys already exist
      if (currentEnv.includes('CLOUDFLARE_SIGNING_KEY_ID')) {
          console.log('⚠️ Signing keys already exist in .env. Skipping update to prevent overwrite.');
          console.log('\n--- NEW KEY DETAILS (Save manually if needed) ---');
          console.log(`ID: ${keyId}`);
          console.log(`PEM (Base64): ${pemBase64}`);
          return;
      }

      const newEnvContent = currentEnv + `\nCLOUDFLARE_SIGNING_KEY_ID="${keyId}"\nCLOUDFLARE_SIGNING_KEY_PEM="${pemBase64}"\n`;

      fs.writeFileSync(envPath, newEnvContent);
      console.log('✅ .env updated with CLOUDFLARE_SIGNING_KEY_ID and CLOUDFLARE_SIGNING_KEY_PEM');

    } catch (e) {
      console.error('❌ Failed to parse response:', e);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Request Error: ${e.message}`);
});

req.end();
