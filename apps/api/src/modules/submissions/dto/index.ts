import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum, Min, Max } from 'class-validator';
import { SubmissionStatus } from '@ask-the-stars/database';

export class CreateSubmissionDto {
  @IsOptional()
  @IsString()
  projectId?: string;

  @IsOptional()
  @IsString()
  assignmentId?: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  versionSlot!: number;

  @IsOptional()
  @IsString()
  versionTitle?: string;

  @IsNotEmpty()
  @IsString()
  videoUrl!: string;

  @IsOptional()
  @IsString()
  streamUid?: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  fileKey?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateSubmissionDto {
  @IsOptional()
  @IsEnum(SubmissionStatus)
  status?: SubmissionStatus;

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsOptional()
  @IsString()
  versionTitle?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}

export * from './generate-upload-url.dto';
