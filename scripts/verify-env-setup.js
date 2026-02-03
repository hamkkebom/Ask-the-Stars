#!/usr/bin/env node
/**
 * Environment Variables Verification Script
 *
 * Checks if all required user action environment variables are set correctly.
 *
 * Usage:
 *   node scripts/verify-env-setup.js
 */

require('dotenv').config();

const REQUIRED_VARS = {
  'E2E Test Accounts': [
    'E2E_STAR_EMAIL',
    'E2E_STAR_PASSWORD',
    'E2E_ADMIN_EMAIL',
    'E2E_ADMIN_PASSWORD',
  ],
  'Cloudflare Image Variants': [
    'CLOUDFLARE_IMAGES_VARIANT_SM',
    'CLOUDFLARE_IMAGES_VARIANT_MD',
    'CLOUDFLARE_IMAGES_VARIANT_LG',
  ],
};

const OPTIONAL_VARS = {
  'Cloudflare Account (for variant testing)': [
    'CLOUDFLARE_ACCOUNT_ID',
    'CLOUDFLARE_IMAGES_ACCOUNT_HASH',
  ],
};

function checkEnvVars() {
  console.log('🔍 Verifying Environment Variables...\n');

  let allRequired = true;
  let hasOptional = true;

  // Check required variables
  for (const [category, vars] of Object.entries(REQUIRED_VARS)) {
    console.log(`📋 ${category}:`);

    let categoryComplete = true;
    vars.forEach((varName) => {
      const value = process.env[varName];
      if (value) {
        // Mask passwords for security
        const displayValue = varName.includes('PASSWORD')
          ? '***' + value.slice(-3)
          : value.slice(0, 30) + (value.length > 30 ? '...' : '');
        console.log(`  ✅ ${varName}: ${displayValue}`);
      } else {
        console.log(`  ❌ ${varName}: NOT SET`);
        categoryComplete = false;
        allRequired = false;
      }
    });

    if (categoryComplete) {
      console.log(`  ✅ ${category} - All set!\n`);
    } else {
      console.log(`  ⚠️  ${category} - Missing variables!\n`);
    }
  }

  // Check optional variables
  console.log('\n📋 Optional Variables:');
  for (const [category, vars] of Object.entries(OPTIONAL_VARS)) {
    console.log(`\n  ${category}:`);

    vars.forEach((varName) => {
      const value = process.env[varName];
      if (value) {
        const displayValue =
          value.slice(0, 20) + (value.length > 20 ? '...' : '');
        console.log(`    ✅ ${varName}: ${displayValue}`);
      } else {
        console.log(`    ℹ️  ${varName}: Not set (optional)`);
        hasOptional = false;
      }
    });
  }

  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  console.log('='.repeat(60));

  if (allRequired) {
    console.log('✅ All required variables are set!');
    console.log('\n🎉 You can now run:');
    console.log('   pnpm e2e                           # E2E tests');
    if (hasOptional) {
      console.log(
        '   node scripts/test-thumbnail-variants.js  # Image variants test'
      );
    }
  } else {
    console.log('❌ Some required variables are missing!');
    console.log('\n📖 Setup guides:');
    console.log('   scripts/setup-e2e-accounts.md      # E2E test accounts');
    console.log(
      '   scripts/setup-cloudflare-variants.md  # Cloudflare variants'
    );
    console.log('\n📝 Template file:');
    console.log('   .env.user-actions-template         # Copy to .env');
  }

  console.log('='.repeat(60) + '\n');

  // Exit code
  process.exit(allRequired ? 0 : 1);
}

checkEnvVars();
