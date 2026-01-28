import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { DatabaseModule } from '../../database/database.module'; // Assuming DatabaseModule exports PrismaService
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [AiService],
  exports: [AiService],
})
export class AiModule {}
