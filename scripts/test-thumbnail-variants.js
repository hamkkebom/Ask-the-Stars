const https = require('https');
const dotenv = require('dotenv');

dotenv.config();

const args = process.argv.slice(2);
const uidArgIndex = args.findIndex((arg) => arg === '--uid');
const uid = uidArgIndex > -1 ? args[uidArgIndex + 1] : undefined;
const dryRun = args.includes('--dry-run');

const accountHash = process.env.CLOUDFLARE_IMAGE_DELIVERY_HASH;

if (!accountHash) {
  console.error('CLOUDFLARE_IMAGE_DELIVERY_HASH is required');
  process.exit(1);
}

if (!uid) {
  console.error(
    'Usage: node scripts/test-thumbnail-variants.js --uid <streamUid>'
  );
  process.exit(1);
}

const variants = [
  'thumbnail-sm-avif',
  'thumbnail-md-avif',
  'thumbnail-lg-avif',
  'thumbnail-sm-webp',
  'thumbnail-md-webp',
  'thumbnail-lg-webp',
  'thumbnail-sm-jpeg',
  'thumbnail-md-jpeg',
  'thumbnail-lg-jpeg',
];

const urls = variants.map(
  (variant) => `https://imagedelivery.net/${accountHash}/${uid}/${variant}`
);

async function head(url) {
  return new Promise((resolve) => {
    https
      .request(url, { method: 'HEAD' }, (res) => {
        resolve({
          url,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          contentLength: res.headers['content-length'],
        });
      })
      .on('error', (error) => {
        resolve({ url, error: error.message });
      })
      .end();
  });
}

async function main() {
  if (dryRun) {
    console.log('Dry run:');
    urls.forEach((url) => console.log(url));
    return;
  }

  console.log(`Checking ${urls.length} variant URLs...`);
  for (const url of urls) {
    // eslint-disable-next-line no-await-in-loop
    const result = await head(url);
    if (result.error) {
      console.log(`[ERR] ${result.url} -> ${result.error}`);
      continue;
    }
    console.log(
      `[${result.status}] ${result.url} | ${result.contentType} | ${result.contentLength || 'n/a'} bytes`
    );
  }
}

main().catch((error) => {
  console.error('Test failed:', error);
  process.exitCode = 1;
});
