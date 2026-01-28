const crypto = require('crypto');
const path = require('path');
const dotenv = require('dotenv');

// Load env explicitly
const envPath = path.resolve(__dirname, '../.env');
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error('❌ Failed to load .env file:', result.error);
    process.exit(1);
}

const keyId = process.env.CLOUDFLARE_SIGNING_KEY_ID;
let pem = process.env.CLOUDFLARE_SIGNING_KEY_PEM || '';
const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

console.log('=== Signing Key Diagnostic ===');
console.log('Env Path:', envPath);
console.log('Key ID:', keyId ? `✅ Present (${keyId.substring(0, 5)}...)` : '❌ Missing');
console.log('Account ID:', accountId ? `✅ Present` : '❌ Missing');
console.log('PEM Length:', pem.length);

if (!pem) {
    console.error('❌ PEM Key is missing');
    process.exit(1);
}

// Handle PEM formatting (Base64 or raw)
if (!pem.includes('BEGIN RSA PRIVATE KEY')) {
    console.log('ℹ️ Parsing potential Base64 PEM...');
    try {
        pem = Buffer.from(pem, 'base64').toString('utf8');
        console.log('✅ Base64 decoding successful');
    } catch (e) {
        console.error('❌ Base64 decoding failed:', e.message);
    }
}

// Ensure correct line breaks
pem = pem.replace(/\\n/g, '\n');

console.log('PEM Header Check:', pem.includes('BEGIN RSA PRIVATE KEY') ? '✅ Valid Header' : '❌ Invalid Header');
console.log('PEM Preview (hex):', Buffer.from(pem.substring(0, 40)).toString('hex'));
console.log('PEM Preview (raw):', JSON.stringify(pem.substring(0, 60)));

if (!keyId || !pem.includes('BEGIN RSA PRIVATE KEY')) {
    console.error('❌ Invalid Configuration: Key ID or PEM format is incorrect.');
    // Don't exit yet, try to sign anyway to see specific error
}

try {
    const testUid = 'test-video-uid';
    // Standard JWT Header
    const header = {
        alg: 'RS256',
        kid: keyId,
        typ: 'JWT',
    };

    // JWT Payload
    const payload = {
        sub: testUid,
        kid: keyId,
        exp: Math.floor(Date.now() / 1000) + 3600,
        nbf: Math.floor(Date.now() / 1000) - 5,
        accessRules: [
            {
                type: 'any',
                action: 'allow',
            },
        ],
    };

    // Helper for base64url
    const base64url = (str) => {
        return Buffer.from(str)
            .toString('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');
    };

    const encodedHeader = base64url(JSON.stringify(header));
    const encodedPayload = base64url(JSON.stringify(payload));
    const signatureInput = `${encodedHeader}.${encodedPayload}`;

    console.log('\nTesting key with crypto.createPrivateKey...');
    const privateKey = crypto.createPrivateKey({
        key: pem,
        format: 'pem',
        type: 'pkcs1'
    });
    console.log('✅ Key object created successfully');

    const signer = crypto.createSign('RSA-SHA256');
    signer.update(signatureInput);
    const signature = signer.sign(privateKey, 'base64url');

    const token = `${signatureInput}.${signature}`;


    console.log('\n✅ Token Generation Successful!');
    console.log('Token:', token.substring(0, 20) + '...');
    console.log('To verify, use https://jwt.io/');
} catch (error) {
    console.error('\n❌ Token Generation Failed:', error.message);
    if (error.message.includes('error:04075070')) {
        console.error('Hint: PEM key format might be wrong (check newlines).');
    }
}
