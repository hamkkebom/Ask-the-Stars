import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { FeedbackPriority, FeedbackStatus } from '@ask-the-stars/database';

export class CreateFeedbackDto {
  @ApiProperty({ example: 'submission_123', description: 'Submission ID' })
  @IsString()
  @IsNotEmpty()
  submissionId!: string;

  @ApiProperty({
    example: '인트로 구간 BGM 볼륨을 낮춰주세요.',
    description: 'Feedback content',
  })
  @IsString()
  @IsNotEmpty()
  content!: string;

  @ApiPropertyOptional({ example: 12.5, description: 'Start time in seconds' })
  @IsOptional()
  @IsNumber()
  startTime?: number;

  @ApiPropertyOptional({ example: 18.2, description: 'End time in seconds' })
  @IsOptional()
  @IsNumber()
  endTime?: number;

  @ApiPropertyOptional({
    example: 'BGM',
    description: 'Feedback type (e.g., BGM, 자막, 컷편집)',
  })
  @IsOptional()
  @IsString()
  feedbackType?: string; // 자막, BGM, 컷편집 등

  @ApiPropertyOptional({ example: 15.3, description: 'Timestamp in seconds' })
  @IsOptional()
  @IsNumber()
  timestamp?: number;

  @ApiPropertyOptional({
    enum: FeedbackPriority,
    example: FeedbackPriority.NORMAL,
    description: 'Feedback priority',
  })
  @IsOptional()
  @IsEnum(FeedbackPriority)
  priority?: FeedbackPriority;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    example: { x: 120, y: 80, width: 200, height: 100 },
    description: 'Annotation data (JSON)',
  })
  @IsOptional()
  annotations?: any; // JSON
}

export class UpdateFeedbackDto {
  @ApiPropertyOptional({
    example: '수정된 피드백 내용',
    description: 'Feedback content',
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiPropertyOptional({ example: 12.5, description: 'Start time in seconds' })
  @IsOptional()
  @IsNumber()
  startTime?: number;

  @ApiPropertyOptional({ example: 18.2, description: 'End time in seconds' })
  @IsOptional()
  @IsNumber()
  endTime?: number;

  @ApiPropertyOptional({
    example: 'BGM',
    description: 'Feedback type (e.g., BGM, 자막, 컷편집)',
  })
  @IsOptional()
  @IsString()
  feedbackType?: string;

  @ApiPropertyOptional({
    enum: FeedbackPriority,
    example: FeedbackPriority.LOW,
    description: 'Feedback priority',
  })
  @IsOptional()
  @IsEnum(FeedbackPriority)
  priority?: FeedbackPriority;

  @ApiPropertyOptional({
    enum: FeedbackStatus,
    example: FeedbackStatus.PENDING,
    description: 'Feedback status',
  })
  @IsOptional()
  @IsEnum(FeedbackStatus)
  status?: FeedbackStatus;

  @ApiPropertyOptional({
    type: 'object',
    additionalProperties: true,
    example: { x: 120, y: 80, width: 200, height: 100 },
    description: 'Annotation data (JSON)',
  })
  @IsOptional()
  annotations?: any;
}
