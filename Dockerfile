# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy root workspace files
COPY package*.json ./
COPY turbo.json ./
COPY tsconfig.json ./

# Copy apps/api and packages
COPY apps/api ./apps/api
COPY packages ./packages

# Install all dependencies (including dev)
RUN npm install

# Build the api project
RUN npx turbo run build --filter=api

# Production stage
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built files and production node_modules
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/packages ./packages

# EXPOSE is documented for Cloud Run, but it uses $PORT
EXPOSE 8080

CMD ["node", "apps/api/dist/main"]
