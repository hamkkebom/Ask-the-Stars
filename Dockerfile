# Build stage
FROM node:22-alpine AS builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@9.15.2

# Copy root workspace files
COPY package.json pnpm-lock.yaml ./
COPY turbo.json ./
COPY tsconfig.json ./

# Copy apps/api and packages
COPY apps/api ./apps/api
COPY packages ./packages

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Build the api project
RUN npx turbo run build --filter=@ask-the-stars/api

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built files and production node_modules
# We copy from the built app and the root node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

# EXPOSE is documented for Cloud Run, but it uses $PORT
EXPOSE 8080

CMD ["node", "apps/api/dist/main"]
