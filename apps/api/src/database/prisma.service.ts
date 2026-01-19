import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@ask-the-stars/database';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      log: process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
      errorFormat: 'colorless',
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
