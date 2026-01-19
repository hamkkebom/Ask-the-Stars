# Build stage
FROM node:22-slim AS builder

RUN npm install -g pnpm && npm install -g @nestjs/cli && npm install -g prisma@6.3.1

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY packages/database/package.json ./packages/database/

# Install dependencies (requires openssl for Prisma)
RUN apt-get update -y && apt-get install -y openssl

RUN pnpm install --frozen-lockfile

# Copy source files
COPY apps/api ./apps/api
COPY packages/types ./packages/types
COPY packages/utils ./packages/utils
COPY packages/database ./packages/database


# Build
# Note: We skip Prisma generation in Docker and inject the locally generated client
# which contains the Linux binary (libquery_engine-debian-openssl-3.0.x.so.node)

# SKIP api build (using local artifacts)
# RUN pnpm --filter @ask-the-stars/api build

# Prune dev dependencies for production
RUN pnpm prune --prod

# Production stage
FROM node:22-slim AS production

RUN apt-get update -y && apt-get install -y openssl
RUN npm install -g pnpm

ENV NODE_ENV=production
ENV PORT=8080

WORKDIR /app

# Copy workspace configuration
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/types/package.json ./packages/types/
COPY packages/utils/package.json ./packages/utils/
COPY packages/database/package.json ./packages/database/

# Install production dependencies directly
RUN echo "shamefully-hoist=true" > .npmrc
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

# Copy built files (using local dist injected via builder matching)
COPY --from=builder /app/apps/api/dist ./dist

# Inject Locally Generated Prisma Client (Linux Binary included)
# Overwriting the symlink with the actual directory
COPY packages/database/generated/client ./node_modules/@prisma/client

# Copy packages/database just in case runtime needs schema references
COPY --from=builder /app/packages/database ./packages/database

# Cloud Run uses port 8080 by default
EXPOSE 8080

# Health check for Cloud Run
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["node", "dist/apps/api/src/main.js"]
