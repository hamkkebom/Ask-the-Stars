
const crypto = require('crypto');

const secret = process.argv[2] || 'REPLACE_ME_WITH_REAL_SECRET'; // Must match .env
const payload = JSON.stringify({
    uid: "test-uid-123",
    status: { state: "ready" },
    duration: 60
});

async function testWebhook() {
    const timestamp = Math.floor(Date.now() / 1000);
    const source = `${timestamp}.${payload}`;

    // Create Signature
    const signature = crypto.createHmac('sha256', secret)
                            .update(source)
                            .digest('hex');

    const header = `time=${timestamp},sig1=${signature}`;

    console.log('Testing Webhook...');
    console.log('Payload:', payload);
    console.log('Header:', header);

    try {
        const response = await fetch('http://localhost:4000/api/videos/webhook/cloudflare', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'webhook-signature': header
            },
            body: payload
        });

        if (response.ok) {
            console.log('✅ Webhook Verified Successfully!');
        } else {
            console.error('❌ Webhook Failed:', response.status, await response.text());
        }
    } catch (err) {
        console.error('❌ Request Error:', err.message);
    }
}

testWebhook();
