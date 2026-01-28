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
  startTime?: number;

  @IsOptional()
  @IsNumber()
  endTime?: number;

  @IsOptional()
  @IsString()
  feedbackType?: string; // 자막, BGM, 컷편집 등

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
  @IsNumber()
  startTime?: number;

  @IsOptional()
  @IsNumber()
  endTime?: number;

  @IsOptional()
  @IsString()
  feedbackType?: string;

  @IsOptional()
  @IsEnum(FeedbackPriority)
  priority?: FeedbackPriority;

  @IsOptional()
  @IsEnum(FeedbackStatus)
  status?: FeedbackStatus;

  @IsOptional()
  annotations?: any;
}
