
async function triggerSync() {
    try {
        console.log('🔄 Triggering R2 to Database Synchronization...');
        // Try local development URL first, then production if needed
        const apiUrl = 'http://localhost:4000/videos/sync';

        console.log(`POST ${apiUrl}`);
        const response = await fetch(apiUrl, { method: 'POST' });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log('✅ Sync Completed Successfully!');
        console.log('--- Result ---');
        console.log(JSON.stringify(data, null, 2));

    } catch (error) {
        console.error('❌ Sync Failed:', error.message);
        if (error.cause && error.cause.code === 'ECONNREFUSED') {
            console.log('Tip: Ensure the Backend API is running locally (likely on port 4000 or 3001).');
            // Try fallback port 3001 if 4000 fails
             try {
                console.log('Retrying on port 3001...');
                const response = await fetch('http://localhost:3001/videos/sync', { method: 'POST' });
                 if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('✅ Sync Completed Successfully on port 3001!');
                console.log(JSON.stringify(data, null, 2));
            } catch (retryError) {
                 console.error('❌ Retry failed:', retryError.message);
            }
        }
    }
}

triggerSync();
