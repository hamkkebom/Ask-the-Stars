import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { FeedbackPriority, FeedbackStatus } from '@ask-the-stars/database';

export class CreateFeedbackDto {
  @IsString()
  @IsNotEmpty()
  submissionId!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsOptional()
  @IsNumber()
  timestamp?: number;

  @IsOptional()
  @IsEnum(FeedbackPriority)
  priority?: FeedbackPriority;

  @IsOptional()
  annotations?: any; // JSON
}

export class UpdateFeedbackDto {
  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsEnum(FeedbackPriority)
  priority?: FeedbackPriority;

  @IsOptional()
  @IsEnum(FeedbackStatus)
  status?: FeedbackStatus;

  @IsOptional()
  annotations?: any;
}
