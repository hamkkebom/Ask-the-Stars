#!/usr/bin/env node
/**
 * Interactive User Actions Setup Wizard
 *
 * Guides users through completing all required user actions step-by-step.
 *
 * Usage:
 *   node scripts/user-actions-wizard.js
 */

const readline = require('readline');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

function printHeader(title) {
  console.log('\n' + '='.repeat(60));
  console.log(`  ${title}`);
  console.log('='.repeat(60) + '\n');
}

function printStep(step, total, title) {
  console.log(`\n📍 Step ${step}/${total}: ${title}`);
  console.log('-'.repeat(60));
}

async function runWizard() {
  console.clear();
  printHeader('🚀 User Actions Setup Wizard');
  console.log(
    'This wizard will guide you through completing all required user actions.'
  );
  console.log('Estimated time: 15-20 minutes\n');

  const answer = await question('Ready to start? (y/n): ');
  if (answer.toLowerCase() !== 'y') {
    console.log('\n👋 Setup cancelled. Run this script again when ready!');
    rl.close();
    return;
  }

  // Step 1: Generate password hashes
  printStep(1, 5, 'Generate Password Hashes');
  console.log(
    '\nYou need to generate bcrypt hashes for 2 test account passwords.\n'
  );

  const starPassword = await question(
    'Enter STAR account password (default: TestPassword123!): '
  );
  const finalStarPassword = starPassword || 'TestPassword123!';

  const adminPassword = await question(
    'Enter ADMIN account password (default: AdminPassword456!): '
  );
  const finalAdminPassword = adminPassword || 'AdminPassword456!';

  console.log('\n🔐 Generating bcrypt hashes...\n');

  try {
    console.log('STAR account hash:');
    execSync(`node scripts/generate-bcrypt-hash.js "${finalStarPassword}"`, {
      stdio: 'inherit',
    });

    console.log('\nADMIN account hash:');
    execSync(`node scripts/generate-bcrypt-hash.js "${finalAdminPassword}"`, {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(
      '\n❌ Error generating hashes. Make sure bcrypt is installed:'
    );
    console.error('   cd apps/api && pnpm install');
    rl.close();
    return;
  }

  await question(
    '\n📋 Copy the hashes above. Press Enter when ready to continue...'
  );

  // Step 2: Create database accounts
  printStep(2, 5, 'Create Database Accounts');
  console.log(
    '\nYou need to create 2 test accounts in your Supabase database.\n'
  );
  console.log('📖 Detailed guide: scripts/setup-e2e-accounts.md\n');
  console.log('Quick steps:');
  console.log('  1. Open Supabase Dashboard → SQL Editor');
  console.log('  2. Run the INSERT statements with your generated hashes');
  console.log(
    '  3. Verify with: SELECT * FROM "User" WHERE email LIKE \'%test-%\';\n'
  );

  const dbCreated = await question(
    'Have you created the database accounts? (y/n): '
  );
  if (dbCreated.toLowerCase() !== 'y') {
    console.log('\n⏸️  Please complete Step 2 and run this wizard again.');
    console.log('📖 See: scripts/setup-e2e-accounts.md');
    rl.close();
    return;
  }

  // Step 3: Update .env file with E2E credentials
  printStep(3, 5, 'Update .env File (E2E Credentials)');
  console.log('\nAdding E2E test credentials to .env file...\n');

  const envPath = path.join(process.cwd(), '.env');
  const envContent = fs.existsSync(envPath)
    ? fs.readFileSync(envPath, 'utf8')
    : '';

  const e2eVars = `
# E2E Test Accounts (Added by user-actions-wizard.js)
E2E_STAR_EMAIL="test-star@hamkkebom.com"
E2E_STAR_PASSWORD="${finalStarPassword}"
E2E_ADMIN_EMAIL="test-admin@hamkkebom.com"
E2E_ADMIN_PASSWORD="${finalAdminPassword}"
`;

  // Check if vars already exist
  if (envContent.includes('E2E_STAR_EMAIL')) {
    console.log('ℹ️  E2E variables already exist in .env. Skipping...');
  } else {
    fs.appendFileSync(envPath, e2eVars);
    console.log('✅ E2E variables added to .env');
  }

  console.log('\n✅ E2E test accounts configured!');

  // Step 4: Cloudflare Image Variants
  printStep(4, 5, 'Create Cloudflare Image Variants');
  console.log(
    '\nYou need to create 3 image variants in Cloudflare Dashboard.\n'
  );
  console.log('📖 Detailed guide: scripts/setup-cloudflare-variants.md\n');
  console.log('Required variants:');
  console.log('  • thumbnail-sm  (320w, quality 80)');
  console.log('  • thumbnail-md  (640w, quality 80)');
  console.log('  • thumbnail-lg  (1280w, quality 85)\n');
  console.log('Quick steps:');
  console.log('  1. Open Cloudflare Dashboard → Images → Variants');
  console.log('  2. Create each variant with the settings above');
  console.log('  3. Copy variant names exactly as shown\n');

  const variantsCreated = await question(
    'Have you created the Cloudflare Image Variants? (y/n): '
  );
  if (variantsCreated.toLowerCase() !== 'y') {
    console.log('\n⏸️  Please complete Step 4 and run this wizard again.');
    console.log('📖 See: scripts/setup-cloudflare-variants.md');
    rl.close();
    return;
  }

  // Step 5: Update .env file with Cloudflare variants
  printStep(5, 5, 'Update .env File (Cloudflare Variants)');
  console.log('\nAdding Cloudflare Image Variants to .env file...\n');

  const variantVars = `
# Cloudflare Image Variants (Added by user-actions-wizard.js)
CLOUDFLARE_IMAGES_VARIANT_SM="thumbnail-sm"
CLOUDFLARE_IMAGES_VARIANT_MD="thumbnail-md"
CLOUDFLARE_IMAGES_VARIANT_LG="thumbnail-lg"
`;

  // Check if vars already exist
  const updatedEnvContent = fs.readFileSync(envPath, 'utf8');
  if (updatedEnvContent.includes('CLOUDFLARE_IMAGES_VARIANT_SM')) {
    console.log(
      'ℹ️  Cloudflare variant variables already exist in .env. Skipping...'
    );
  } else {
    fs.appendFileSync(envPath, variantVars);
    console.log('✅ Cloudflare variant variables added to .env');
  }

  // Final verification
  printHeader('🎉 Setup Complete!');
  console.log('All user actions have been completed.\n');
  console.log('📊 Running verification...\n');

  try {
    execSync('node scripts/verify-env-setup.js', { stdio: 'inherit' });
  } catch (error) {
    console.log('\n⚠️  Verification failed. Please check the output above.');
  }

  console.log('\n🚀 Next Steps:\n');
  console.log('  1. Run E2E tests:');
  console.log('     pnpm e2e\n');
  console.log('  2. Test Cloudflare variants:');
  console.log('     node scripts/test-thumbnail-variants.js\n');
  console.log('  3. (Optional) Install k6 for load testing:');
  console.log('     scoop install k6\n');
  console.log('  4. (Optional) Set up Turborepo Remote Caching:');
  console.log('     pnpx turbo login\n');

  console.log('📖 For detailed guides, see:');
  console.log('   docs/09-planning/USER_ACTION_REQUIRED.md\n');

  rl.close();
}

runWizard().catch((error) => {
  console.error('\n❌ Error:', error.message);
  rl.close();
  process.exit(1);
});
