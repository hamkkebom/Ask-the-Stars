import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // Strip BOM and whitespace from DATABASE_URL if present
    const rawUrl = process.env.DATABASE_URL ?? '';
    const cleanUrl = rawUrl.replace(/^\uFEFF/, '').trim();
    if (rawUrl !== cleanUrl) {
      console.warn(
        '⚠️ DATABASE_URL contained BOM or whitespace — stripped automatically'
      );
      process.env.DATABASE_URL = cleanUrl;
    }
    super({
      datasourceUrl: cleanUrl || undefined,
    });
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Prisma connected to database');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async cleanDatabase() {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Cannot clean database in production');
    }

    // Delete in order to handle foreign key constraints
    await this.$transaction([
      this.feedback.deleteMany(),
      this.submission.deleteMany(),
      this.settlement.deleteMany(),
      this.project.deleteMany(),
      this.user.deleteMany(),
    ]);
  }
}
