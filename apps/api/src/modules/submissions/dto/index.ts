import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { SubmissionStatus } from '@ask-the-stars/database';

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  projectId!: string;

  @IsString()
  @IsNotEmpty()
  videoUrl!: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

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
  notes?: string;
}
