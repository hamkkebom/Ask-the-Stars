#!/usr/bin/env node

/**
 * Swagger API Verification Script
 *
 * Verifies that Swagger UI is properly configured and accessible
 *
 * Usage:
 *   node scripts/verify-swagger.js [--port=4000]
 */

const http = require('http');

const PORT =
  process.argv.find((arg) => arg.startsWith('--port='))?.split('=')[1] || 4000;
const HOST = 'localhost';

console.log('🔍 Swagger API Verification');
console.log('━'.repeat(50));

// Check if API server is running
function checkServer() {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://${HOST}:${PORT}/health`, (res) => {
      if (res.statusCode === 200 || res.statusCode === 404) {
        resolve(true);
      } else {
        reject(new Error(`Server returned status ${res.statusCode}`));
      }
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Check Swagger UI
function checkSwagger() {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://${HOST}:${PORT}/api/docs`, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          // Check if response contains Swagger UI HTML
          if (data.includes('swagger-ui') || data.includes('Swagger UI')) {
            resolve({ status: 200, hasSwagger: true });
          } else {
            resolve({ status: 200, hasSwagger: false });
          }
        } else {
          reject(new Error(`Swagger UI returned status ${res.statusCode}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Check OpenAPI JSON
function checkOpenAPIJson() {
  return new Promise((resolve, reject) => {
    const req = http.get(`http://${HOST}:${PORT}/api/docs-json`, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const json = JSON.parse(data);
            const hasInfo = json.info && json.info.title;
            const hasPaths = json.paths && Object.keys(json.paths).length > 0;
            resolve({
              status: 200,
              isValid: hasInfo && hasPaths,
              pathCount: Object.keys(json.paths || {}).length,
              title: json.info?.title,
            });
          } catch (e) {
            resolve({ status: 200, isValid: false, error: 'Invalid JSON' });
          }
        } else {
          reject(new Error(`OpenAPI JSON returned status ${res.statusCode}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function main() {
  try {
    console.log(`📡 Checking API server at http://${HOST}:${PORT}...`);

    try {
      await checkServer();
      console.log('✅ API server is running\n');
    } catch (err) {
      console.error(`❌ API server is not running`);
      console.error(`   Error: ${err.message}`);
      console.error(
        `\n💡 Start the server with: pnpm dev --filter=@ask-the-stars/api\n`
      );
      process.exit(1);
    }

    console.log('📚 Checking Swagger UI...');
    const swaggerResult = await checkSwagger();

    if (swaggerResult.hasSwagger) {
      console.log('✅ Swagger UI is accessible');
      console.log(`   URL: http://${HOST}:${PORT}/api/docs\n`);
    } else {
      console.log('⚠️  Swagger UI endpoint exists but content seems incorrect');
      console.log(`   URL: http://${HOST}:${PORT}/api/docs\n`);
    }

    console.log('📄 Checking OpenAPI JSON...');
    const jsonResult = await checkOpenAPIJson();

    if (jsonResult.isValid) {
      console.log('✅ OpenAPI JSON is valid');
      console.log(`   Title: ${jsonResult.title}`);
      console.log(`   Endpoints: ${jsonResult.pathCount} paths documented`);
      console.log(`   URL: http://${HOST}:${PORT}/api/docs-json\n`);
    } else {
      console.log(`⚠️  OpenAPI JSON has issues: ${jsonResult.error}\n`);
    }

    console.log('━'.repeat(50));
    console.log('✅ Swagger verification complete!\n');
    console.log('📝 Next steps:');
    console.log('   1. Open http://localhost:4000/api/docs in your browser');
    console.log('   2. Click "Authorize" to test JWT authentication');
    console.log('   3. Try out endpoints with "Try it out" button');
    console.log('');

    process.exit(0);
  } catch (err) {
    console.error(`\n❌ Verification failed: ${err.message}\n`);
    process.exit(1);
  }
}

main();
