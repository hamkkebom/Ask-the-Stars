import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AiService {
  private openai: OpenAI;
  private readonly logger = new Logger(AiService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const apiKey = this.configService.get<string>('OPENAI_API_KEY');
    if (!apiKey) {
      this.logger.warn('OPENAI_API_KEY is not set. AI features will be disabled.');
    }
    this.openai = new OpenAI({
      apiKey: apiKey || 'dummy-key', // Prevent crash if key is missing, handle errors at runtime
    });
  }

  async generateEmbedding(text: string): Promise<number[]> {
    if (!text || !text.trim()) {
      return [];
    }

    try {
      const response = await this.openai.embeddings.create({
        model: 'text-embedding-3-small',
        input: text.replace(/\n/g, ' '), // Remove newlines for better normalization
      });

      return response.data[0].embedding;
    } catch (error) {
      const err = error instanceof Error ? error : new Error(String(error));
      this.logger.error(`Failed to generate embedding: ${err.message}`);
      throw error;
    }
  }

  async createVideoEmbedding(videoId: string, text: string) {
    const embedding = await this.generateEmbedding(text);
    if (!embedding.length) return;

    // Convert embedding array to string format for vector casting in raw SQL
    // Format: '[0.1, 0.2, ...]'
    const vectorString = `[${embedding.join(',')}]`;

    // Use executeRaw to insert using vector syntax
    // We use ON CONFLICT to update if exists
    await this.prisma.$executeRaw`
      INSERT INTO "video_embeddings" ("id", "video_id", "embedding", "updated_at", "created_at")
      VALUES (gen_random_uuid(), ${videoId}, ${vectorString}::vector, NOW(), NOW())
      ON CONFLICT ("video_id")
      DO UPDATE SET "embedding" = ${vectorString}::vector, "updated_at" = NOW();
    `;
  }

  async searchSimilarVideos(queryText: string, limit: number = 5) {
    const embedding = await this.generateEmbedding(queryText);
    if (!embedding.length) return [];

    const vectorString = `[${embedding.join(',')}]`;

    // 1 - (a <=> b) is cosine similarity (if normalized).
    // <=> is cosine distance. 0 means identical.
    // We want smallest distance.
    const results = await this.prisma.$queryRaw<any[]>`
      SELECT
        v.id,
        v.version_label as "title",
        p.title as "projectTitle",
        ve.embedding <=> ${vectorString}::vector as distance
      FROM "video_embeddings" ve
      JOIN "videos" v ON v.id = ve.video_id
      LEFT JOIN "projects" p ON p.id = v.project_id
      ORDER BY distance ASC
      LIMIT ${limit};
    `;

    return results;
  }

  async searchSimilarVideosById(videoId: string, limit: number = 5) {
    // 1. Get embedding of source video
    const source = await this.prisma.$queryRaw<{ embedding: unknown }[]>`
       SELECT embedding FROM "video_embeddings" WHERE video_id = ${videoId}
    `;

    if (!source || source.length === 0) return [];

    // Check if embedding exists
    // The driver might return it as string or specific object depending on postgres driver
    // pgvector-pg returns string usually?
    // Prisma Unsupported type usually returns string or object.
    // However, in raw query param, we passed string.
    // In result, it might be string.

    // We can just use the returned embedding in the next query if we can cast it?
    // Or we can use a subquery JOIN.

    // Optimization: Subquery
    const results = await this.prisma.$queryRaw<any[]>`
      SELECT
        v.id,
        v.version_label as "title",
        p.title as "projectTitle",
        ve.embedding <=> (SELECT embedding FROM "video_embeddings" WHERE video_id = ${videoId}) as distance
      FROM "video_embeddings" ve
      JOIN "videos" v ON v.id = ve.video_id
      LEFT JOIN "projects" p ON p.id = v.project_id
      WHERE ve.video_id != ${videoId}
      ORDER BY distance ASC
      LIMIT ${limit};
    `;

    return results;
  }
}
