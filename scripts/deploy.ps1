$ErrorActionPreference = "Stop"

# Configuration
$PROJECT_ID = "ask-the-stars-484712"
$REGION = "asia-northeast3"
$REPO_NAME = "ask-the-stars"
$SERVICE_NAME = "ask-the-stars-api"
$IMAGE_TAG = "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/api:latest"

# 1. Build Docker Image
Write-Host "🐳 Building Docker image..." -ForegroundColor Cyan
# Execute from project root
docker build -t $IMAGE_TAG -f apps/api/Dockerfile .

# 2. Push to Artifact Registry
Write-Host "🚀 Pushing image to Artifact Registry..." -ForegroundColor Cyan
docker push $IMAGE_TAG

# 3. Deploy to Cloud Run
Write-Host "🚀 Deploying to Cloud Run..." -ForegroundColor Cyan
gcloud run deploy $SERVICE_NAME `
  --image $IMAGE_TAG `
  --platform managed `
  --region $REGION `
  --allow-unauthenticated `
  --env-vars-file="apps/api/deploy-env.yaml" `
  --description="Ask the Stars API (Live Launch)"

Write-Host "✅ Deployment initiated!" -ForegroundColor Green
