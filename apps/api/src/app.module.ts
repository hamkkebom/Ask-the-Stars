import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { SubmissionsModule } from './modules/submissions/submissions.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import { SettlementsModule } from './modules/settlements/settlements.module';
import { UploadsModule } from './modules/uploads/uploads.module';
import { DatabaseModule } from './database/database.module';
import { MailModule } from './modules/mail/mail.module';
import { HealthController } from './common/health.controller';

@Module({
  imports: [
    // Global configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Database
    DatabaseModule,

    // Feature modules
    AuthModule,
    UsersModule,
    ProjectsModule,
    SubmissionsModule,
    FeedbackModule,
    SettlementsModule,
    SettlementsModule,
    UploadsModule,
    MailModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}

