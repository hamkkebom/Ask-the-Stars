# Dockerfile
# 기술 스택 결정 후 주석 해제 및 수정

# === Node.js 예시 ===
FROM node:20-alpine AS base
WORKDIR /app
# COPY package*.json ./
# RUN npm ci --only=production
# COPY . .
# EXPOSE 8080
# CMD ["npm", "start"]

# === Python 예시 ===
# FROM python:3.11-slim
# WORKDIR /app
# COPY requirements.txt .
# RUN pip install --no-cache-dir -r requirements.txt
# COPY . .
# EXPOSE 8080
# CMD ["python", "-m", "uvicorn", "src.api.main:app", "--host", "0.0.0.0", "--port", "8080"]
