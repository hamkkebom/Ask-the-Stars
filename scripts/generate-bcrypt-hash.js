#!/usr/bin/env node
/**
 * Bcrypt Password Hash Generator
 *
 * Usage:
 *   node scripts/generate-bcrypt-hash.js <password>
 *   node scripts/generate-bcrypt-hash.js TestPassword123!
 *
 * Default rounds: 10 (matches NestJS default)
 */

const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

async function generateHash() {
  const password = process.argv[2];

  if (!password) {
    console.error('❌ Error: Password is required\n');
    console.log('Usage:');
    console.log('  node scripts/generate-bcrypt-hash.js <password>\n');
    console.log('Example:');
    console.log('  node scripts/generate-bcrypt-hash.js TestPassword123!');
    process.exit(1);
  }

  try {
    console.log('🔐 Generating bcrypt hash...\n');
    console.log(`Password: ${password}`);
    console.log(`Rounds:   ${SALT_ROUNDS}\n`);

    const hash = await bcrypt.hash(password, SALT_ROUNDS);

    console.log('✅ Generated Hash:\n');
    console.log(hash);
    console.log('\n📋 Copy the hash above for your SQL INSERT statement');
    console.log('💡 Example: passwordHash: "$2a$10$..."\n');

    // Verify the hash works
    const isValid = await bcrypt.compare(password, hash);
    if (isValid) {
      console.log('✅ Hash verification successful!\n');
    } else {
      console.error('❌ Hash verification failed!\n');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error generating hash:', error.message);
    process.exit(1);
  }
}

generateHash();
