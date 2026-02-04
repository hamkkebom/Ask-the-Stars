# Deployment Configuration Required

## Current Status

### ✅ What's Working
- Code pushed to GitHub: commit `b3c51d1`
- All lint errors fixed
- Frontend deployment workflow configured (Vercel)
- Backend Docker configuration ready

### ❌ What's Blocked
- **Backend deployment failing**: Missing Google Cloud Workload Identity Federation secrets
- CI pipeline failing: Now fixed with lint corrections

## Required Actions

### 1. Configure Google Cloud Workload Identity Federation

Your `.github/workflows/cd-api.yml` expects these secrets:

```yaml
secrets:
  WIF_PROVIDER          # Required
  WIF_SERVICE_ACCOUNT   # Required
  GCP_PROJECT_ID        # Required
```

**Current Error:**
```
the GitHub Action workflow must specify exactly one of "workload_identity_provider" or "credentials_json"
```

### 2. Setup Options

#### Option A: Workload Identity Federation (Recommended - Most Secure)

1. **Create Workload Identity Pool**:
   ```bash
   gcloud iam workload-identity-pools create "github-actions" \
     --location="global" \
     --display-name="GitHub Actions Pool"
   ```

2. **Create Workload Identity Provider**:
   ```bash
   gcloud iam workload-identity-pools providers create-oidc "github-provider" \
     --location="global" \
     --workload-identity-pool="github-actions" \
     --display-name="GitHub Provider" \
     --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
     --issuer-uri="https://token.actions.githubusercontent.com"
   ```

3. **Get Provider Name** (use this for `WIF_PROVIDER` secret):
   ```bash
   gcloud iam workload-identity-pools providers describe "github-provider" \
     --location="global" \
     --workload-identity-pool="github-actions" \
     --format="value(name)"
   ```

   Output format: `projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-actions/providers/github-provider`

4. **Create Service Account**:
   ```bash
   gcloud iam service-accounts create github-actions-sa \
     --display-name="GitHub Actions Service Account"
   ```

5. **Grant Permissions**:
   ```bash
   # Cloud Run Admin
   gcloud projects add-iam-policy-binding PROJECT_ID \
     --member="serviceAccount:github-actions-sa@PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/run.admin"

   # Artifact Registry Writer
   gcloud projects add-iam-policy-binding PROJECT_ID \
     --member="serviceAccount:github-actions-sa@PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/artifactregistry.writer"

   # Service Account User (to deploy as service account)
   gcloud projects add-iam-policy-binding PROJECT_ID \
     --member="serviceAccount:github-actions-sa@PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/iam.serviceAccountUser"
   ```

6. **Allow GitHub to Impersonate Service Account**:
   ```bash
   gcloud iam service-accounts add-iam-policy-binding \
     github-actions-sa@PROJECT_ID.iam.gserviceaccount.com \
     --role="roles/iam.workloadIdentityUser" \
     --member="principalSet://iam.googleapis.com/projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-actions/attribute.repository/hamkkebom/Ask-the-Stars"
   ```

7. **Add GitHub Secrets**:
   ```bash
   gh secret set GCP_PROJECT_ID --body="YOUR_PROJECT_ID"
   gh secret set WIF_PROVIDER --body="projects/PROJECT_NUMBER/locations/global/workloadIdentityPools/github-actions/providers/github-provider"
   gh secret set WIF_SERVICE_ACCOUNT --body="github-actions-sa@PROJECT_ID.iam.gserviceaccount.com"
   ```

#### Option B: Service Account JSON Key (Simpler, Less Secure)

1. **Create Service Account**:
   ```bash
   gcloud iam service-accounts create github-actions-sa \
     --display-name="GitHub Actions Service Account"
   ```

2. **Grant Permissions** (same as Option A step 5)

3. **Create JSON Key**:
   ```bash
   gcloud iam service-accounts keys create github-sa-key.json \
     --iam-account=github-actions-sa@PROJECT_ID.iam.gserviceaccount.com
   ```

4. **Update Workflow** (`.github/workflows/cd-api.yml`):
   ```yaml
   - name: Authenticate to Google Cloud
     uses: google-github-actions/auth@v2
     with:
       credentials_json: ${{ secrets.GCP_SERVICE_ACCOUNT_KEY }}
   ```

5. **Add GitHub Secret**:
   ```bash
   gh secret set GCP_SERVICE_ACCOUNT_KEY < github-sa-key.json
   gh secret set GCP_PROJECT_ID --body="YOUR_PROJECT_ID"
   ```

6. **Delete local key** (security):
   ```bash
   rm github-sa-key.json
   ```

### 3. Additional Required Secrets

Your workflow also expects these Cloud Run secrets to be configured in **Google Cloud Secret Manager**:

```yaml
secrets:
  DATABASE_URL
  JWT_SECRET
  SUPABASE_URL
  SUPABASE_SERVICE_ROLE_KEY
  UPSTASH_REDIS_REST_URL
  UPSTASH_REDIS_REST_TOKEN
  REDIS_URL
  SENTRY_DSN
  BETTERSTACK_SOURCE_TOKEN
  CLOUDFLARE_ACCOUNT_ID
  CLOUDFLARE_R2_ACCESS_KEY_ID
  CLOUDFLARE_R2_SECRET_ACCESS_KEY
```

**Create secrets** (example):
```bash
echo -n "postgresql://..." | gcloud secrets create DATABASE_URL --data-file=-
echo -n "your-jwt-secret" | gcloud secrets create JWT_SECRET --data-file=-
# ... repeat for all secrets
```

**Grant access to Cloud Run service**:
```bash
gcloud secrets add-iam-policy-binding DATABASE_URL \
  --member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
# ... repeat for all secrets
```

### 4. Verify Configuration

Once secrets are configured:

```bash
# Trigger deployment
git commit --allow-empty -m "chore: trigger deployment after secret configuration"
git push origin main

# Watch deployment
gh run watch

# Check Cloud Run service
gcloud run services describe ask-the-stars-api \
  --region=asia-northeast3 \
  --format="value(status.url)"
```

## Current Workflow Status

| Workflow | Status | Issue |
|----------|--------|-------|
| CI | ❌ Failed | Lint errors (NOW FIXED) |
| Security Audit | ✅ Success | No issues |
| Deploy API | ❌ Failed | Missing WIF secrets |
| Deploy Web | ❌ Failed | (Likely dependency on CI) |

## Next Steps

1. Choose Option A or Option B above
2. Follow the setup steps
3. Configure GitHub secrets
4. Push a new commit to trigger deployment
5. Verify backend is accessible at: `https://ask-the-stars-api-976887569664.asia-northeast3.run.app`

## Reference

- Current commit: `b3c51d1`
- Workflow file: `.github/workflows/cd-api.yml`
- Backend Dockerfile: `apps/api/Dockerfile`
- Migration script: `scripts/migrate-cloudflare-to-db.ts`

---

**Status**: Awaiting Google Cloud configuration
**Blocker**: WIF_PROVIDER and WIF_SERVICE_ACCOUNT secrets not configured
**Impact**: Backend cannot deploy to Cloud Run
