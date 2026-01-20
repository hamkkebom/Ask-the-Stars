# Build stage
FROM node:22-slim AS builder

RUN npm install -g pnpm && npm install -g @nestjs/cli

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

# Overwrite schema with build version (hardcoded dummy URL to allow generation without DB)
RUN cp ./packages/database/prisma/schema.build.prisma ./packages/database/prisma/schema.prisma

# Generate Prisma Client inside Docker (ensures correct binary target)
RUN pnpm --filter @ask-the-stars/database exec prisma generate --schema=./packages/database/prisma/schema.prisma

# Build the API
RUN pnpm --filter @ask-the-stars/api build

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

# Copy built files
COPY --from=builder /app/apps/api/dist ./dist
# Copy generated Prisma client from builder
COPY --from=builder /app/node_modules/.pnpm/@prisma+client@6.3.1_prisma@6.3.1/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy packages/database for schema reference if needed
COPY --from=builder /app/packages/database ./packages/database

# Cloud Run uses port 8080 by default
EXPOSE 8080

# Health check for Cloud Run
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

CMD ["node", "dist/apps/api/src/main.js"]
