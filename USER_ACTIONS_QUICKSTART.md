# 🚀 User Actions Quick Start Guide

**Estimated Time**: 15-20 minutes  
**Purpose**: Complete all required manual setup steps to activate full project infrastructure

---

## 📋 What Needs To Be Done?

You need to complete **2 high-priority tasks**:

1. ✅ **E2E Test Accounts** (10 min) - Enable Playwright E2E tests (6 tests currently skipped)
2. ✅ **Cloudflare Image Variants** (5 min) - Enable image optimization (30-50% size reduction)

**Why these are manual**: They require external service access (Supabase Dashboard, Cloudflare Dashboard) that can't be automated.

---

## 🎯 Three Ways to Complete Setup

### Option 1: Interactive Wizard (Recommended) ⭐

**Best for**: First-time users who want step-by-step guidance

```bash
pnpm setup:wizard
```

The wizard will:
- Generate password hashes for you
- Guide you through Supabase SQL execution
- Update your `.env` file automatically
- Verify setup when complete

**Time**: 15 minutes (includes guidance)

---

### Option 2: Manual Step-by-Step

**Best for**: Users who want full control

#### Step 1: Generate Password Hashes (2 min)

```bash
# STAR account (default password: TestPassword123!)
pnpm setup:hash TestPassword123!

# ADMIN account (default password: AdminPassword456!)
pnpm setup:hash AdminPassword456!

# Copy the output hashes for next step
```

#### Step 2: Create Database Accounts (5 min)

📖 **Detailed Guide**: `scripts/setup-e2e-accounts.md`

**Quick Version**:

1. Open Supabase Dashboard → SQL Editor
2. Run this SQL (replace `<HASH>` with hashes from Step 1):

```sql
INSERT INTO "User" (id, email, "passwordHash", name, role, "emailVerified", "createdAt", "updatedAt")
VALUES
  ('e2e-star-test-001', 'test-star@hamkkebom.com', '<STAR_HASH>', 'Test Star', 'STAR', TRUE, NOW(), NOW()),
  ('e2e-admin-test-001', 'test-admin@hamkkebom.com', '<ADMIN_HASH>', 'Test Admin', 'ADMIN', TRUE, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;
```

3. Verify:
```sql
SELECT id, email, name, role FROM "User" WHERE email LIKE '%test-%@hamkkebom.com';
```

#### Step 3: Update .env File (1 min)

Add to `.env`:

```bash
# E2E Test Accounts
E2E_STAR_EMAIL="test-star@hamkkebom.com"
E2E_STAR_PASSWORD="TestPassword123!"
E2E_ADMIN_EMAIL="test-admin@hamkkebom.com"
E2E_ADMIN_PASSWORD="AdminPassword456!"
```

#### Step 4: Create Cloudflare Image Variants (5 min)

📖 **Detailed Guide**: `scripts/setup-cloudflare-variants.md`

**Quick Version**:

1. Open Cloudflare Dashboard → Images → Variants
2. Create 3 variants:

| Name | Width | Quality | Format |
|------|-------|---------|--------|
| `thumbnail-sm` | 320px | 80% | Auto |
| `thumbnail-md` | 640px | 80% | Auto |
| `thumbnail-lg` | 1280px | 85% | Auto |

3. Add to `.env`:

```bash
# Cloudflare Image Variants
CLOUDFLARE_IMAGES_VARIANT_SM="thumbnail-sm"
CLOUDFLARE_IMAGES_VARIANT_MD="thumbnail-md"
CLOUDFLARE_IMAGES_VARIANT_LG="thumbnail-lg"
```

#### Step 5: Verify Setup (1 min)

```bash
# Check if all env vars are set correctly
pnpm setup:verify

# Run E2E tests
pnpm e2e

# Expected: 12 tests pass (previously 6 were skipped)
```

**Total Time**: 15-20 minutes

---

### Option 3: Copy Template

**Best for**: Quick setup with default values

```bash
# Copy template to .env
cat .env.user-actions-template >> .env

# Then complete external steps:
# 1. Create database accounts (Supabase)
# 2. Create image variants (Cloudflare)
# 3. Verify with: pnpm setup:verify
```

**Time**: 10 minutes + external tasks

---

## 🔍 Verification

After completing setup, verify everything works:

```bash
# 1. Check environment variables
pnpm setup:verify

# Expected output:
# ✅ All required variables are set!

# 2. Run E2E tests
pnpm e2e

# Expected output:
# 12 passed (25s)

# 3. Test Cloudflare variants (optional, requires CLOUDFLARE_ACCOUNT_ID)
node scripts/test-thumbnail-variants.js

# Expected output:
# ✅ All variants working correctly!
```

---

## 📊 What You Get

### Before Setup
- ❌ 6 E2E tests skipped (authentication tests)
- ❌ Image optimization disabled
- ⚠️  Missing required environment variables

### After Setup
- ✅ 12 E2E tests passing (full coverage)
- ✅ Image optimization enabled (30-50% size reduction)
- ✅ All infrastructure activated
- ✅ Production-ready configuration

---

## 🆘 Troubleshooting

### ❌ "User not found" error during E2E tests

**Cause**: Database accounts not created

**Fix**:
```sql
-- Check if accounts exist
SELECT * FROM "User" WHERE email LIKE '%test-%@hamkkebom.com';

-- If not, run the INSERT statement from Step 2
```

### ❌ "Invalid credentials" error

**Cause**: Password hash mismatch

**Fix**:
```bash
# Regenerate hash
pnpm setup:hash TestPassword123!

# Update database
UPDATE "User" SET "passwordHash" = '<new_hash>' WHERE email = 'test-star@hamkkebom.com';
```

### ❌ "Variant not found" (404) for images

**Cause**: Variant names don't match Cloudflare Dashboard

**Fix**:
1. Check variant names in Cloudflare Dashboard → Images → Variants
2. Update `.env` to match exactly (case-sensitive)

### ❌ "Environment variable not set"

**Cause**: `.env` file missing variables

**Fix**:
```bash
# Check what's missing
pnpm setup:verify

# Add missing variables to .env
# Template: .env.user-actions-template
```

---

## 📚 Detailed Documentation

| Document | Purpose |
|----------|---------|
| `scripts/setup-e2e-accounts.md` | E2E accounts setup (detailed) |
| `scripts/setup-cloudflare-variants.md` | Cloudflare variants setup (detailed) |
| `docs/09-planning/USER_ACTION_REQUIRED.md` | Complete user actions checklist |
| `.env.user-actions-template` | Environment variable template |

---

## 🎓 Available Commands

```bash
# Interactive wizard
pnpm setup:wizard           # Step-by-step guided setup

# Utilities
pnpm setup:verify           # Check environment variables
pnpm setup:hash <password>  # Generate bcrypt hash

# Testing
pnpm e2e                    # Run E2E tests
pnpm e2e:headed             # Run E2E tests with UI

# Verification scripts
node scripts/verify-env-setup.js               # Check env vars
node scripts/test-thumbnail-variants.js        # Test Cloudflare variants
```

---

## ⏭️ Optional Next Steps

After completing required user actions:

### Medium Priority (30 min)

1. **Install k6** (10 min)
   ```bash
   scoop install k6  # Windows
   pnpm load:videos  # Run load tests
   ```

2. **Turborepo Remote Caching** (15 min)
   ```bash
   pnpx turbo login
   pnpx turbo link
   # Add TURBO_TOKEN and TURBO_TEAM to GitHub Secrets
   ```

### Low Priority (Verification)

3. **Lighthouse Re-measurement** (5 min)
   ```bash
   pnpm build --filter=web
   pnpm lighthouse
   ```

4. **CI/CD Verification** (10 min)
   - Create test PR
   - Verify all GitHub Actions pass
   - Check Lighthouse report comment

---

## 📞 Need Help?

1. **Check troubleshooting section** above
2. **Run verification**: `pnpm setup:verify`
3. **Check detailed guides**: `scripts/setup-*.md`
4. **Review original plan**: `docs/09-planning/USER_ACTION_REQUIRED.md`

---

## ✅ Completion Checklist

**High Priority** (Required):
- [ ] E2E test accounts created in Supabase
- [ ] E2E credentials added to `.env`
- [ ] Cloudflare Image Variants created
- [ ] Cloudflare variant names added to `.env`
- [ ] `pnpm setup:verify` passes
- [ ] `pnpm e2e` shows 12 tests passing

**Medium Priority** (Recommended):
- [ ] k6 installed
- [ ] Load tests executed successfully
- [ ] Turborepo Remote Caching activated
- [ ] GitHub Secrets configured

**Low Priority** (Optional):
- [ ] Lighthouse re-measurement completed
- [ ] CI/CD workflows verified with test PR

---

**Total Time**: 15-20 minutes for high priority items

**Status**: Once high priority items are complete, your infrastructure is **100% production-ready**! 🎉
