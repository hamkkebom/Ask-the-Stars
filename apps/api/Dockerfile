# Build stage - Full node image for reliability
FROM node:22 AS builder

RUN npm install -g pnpm@9.15.2
# Install build tools just in case
RUN apt-get update -y && apt-get install -y openssl build-essential python3

WORKDIR /app

# Copy ALL files
COPY . .

# CRITICAL: Use the REAL schema.prisma
ENV DATABASE_URL="postgresql://dummy:5432/db"

# 1. Install dependencies FILTERED for API, but WITH scripts
RUN pnpm install --frozen-lockfile --filter @ask-the-stars/api...

# 2. Generate Prisma client (for build)
RUN npx prisma generate --schema=packages/database/prisma/schema.prisma

# 3. Build the NestJS application
RUN pnpm --filter @ask-the-stars/api build

# ---------------------------------------------------------
# SKIP PRODUCTION STAGE FOR NOW
# We use the builder image directly to guarantee it works
# ---------------------------------------------------------

ENV NODE_ENV=production
ENV PORT=8080

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["node", "apps/api/dist/main.js"]
