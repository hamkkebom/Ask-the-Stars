# Build stage
FROM node:22 AS builder

RUN npm install -g pnpm@9.15.2
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Copy the entire monorepo
COPY . .

# Install ALL dependencies (monorepo root)
RUN pnpm install --frozen-lockfile

# Generate Prisma client for the specific package
RUN npx prisma generate --schema=packages/database/prisma/schema.prisma

# Build the API
RUN pnpm --filter @ask-the-stars/api build

# ---------------------------------------------------------
# Production stage
FROM node:22-slim AS runner

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Copy EVERYTHING correctly at root level
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api/node_modules ./apps/api/node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/packages ./packages

ENV NODE_ENV=production

EXPOSE 8080

# Now move to the app dir for execution
WORKDIR /app/apps/api
CMD ["node", "dist/apps/api/src/main.js"]
