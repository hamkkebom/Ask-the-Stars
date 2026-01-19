#!/bin/bash
set -e

# Configuration
PROJECT_ID="ask-the-stars-484712"
REGION="asia-northeast3"
IMAGE_NAME="asia-northeast3-docker.pkg.dev/${PROJECT_ID}/ask-the-stars/api:latest"

echo "🚀 Starting Cloud Run Deployment..."

# 1. Build locally first (Required for Dockerfile injection)
echo "📦 Building local artifacts (pnpm build)..."
pnpm --filter @ask-the-stars/api build

# 2. Build Docker Image
echo "🐳 Building Docker image..."
docker build -t $IMAGE_NAME -f apps/api/Dockerfile .

# 3. Push to Artifact Registry
echo "⬆️ Pushing Docker image..."
docker push $IMAGE_NAME

# 4. Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy ask-the-stars-api \
  --image $IMAGE_NAME \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --env-vars-file apps/api/deploy-env.yaml

echo "✅ Deployment Complete!"
