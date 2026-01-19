#!/bin/bash

# Configuration
PROJECT_ID="ask-the-stars-484712"
REGION="asia-northeast3"
SERVICE_NAME="ask-the-stars-api"
IMAGE_TAG="gcr.io/$PROJECT_ID/$SERVICE_NAME:latest"

# 1. Build and Push Image to Google Container Registry
echo "🐳 Building Docker image..."
docker build -t $IMAGE_TAG .

echo "🚀 Pushing image to GCR..."
docker push $IMAGE_TAG

# 2. Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
  --image $IMAGE_TAG \
  --platform managed \
  --region $REGION \
  --allow-unauthenticated \
  --set-env-vars="NODE_ENV=production,PORT=8080" \
  --description="Ask the Stars API (Supabase + R2 Stack)"

echo "✅ Deployment complete!"
