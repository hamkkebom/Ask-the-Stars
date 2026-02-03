import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  IsDateString,
} from 'class-validator';
import { ProjectStatus } from '@ask-the-stars/database';

export class CreateProjectDto {
  @ApiProperty({ example: '브랜드 영상 제작', description: 'Project title' })
  @IsString()
  title!: string;

  @ApiPropertyOptional({
    example: '제품 소개용 60초 영상',
    description: 'Project description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: '2026-03-01T00:00:00.000Z',
    description: 'Deadline (ISO 8601)',
  })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiPropertyOptional({ example: 1500000, description: 'Budget amount' })
  @IsOptional()
  @IsNumber()
  budget?: number;
}

export class UpdateProjectDto {
  @ApiPropertyOptional({
    example: '브랜드 영상 제작',
    description: 'Project title',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    example: '수정된 상세 설명',
    description: 'Project description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    enum: ProjectStatus,
    example: ProjectStatus.IN_PROGRESS,
    description: 'Project status',
  })
  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @ApiPropertyOptional({
    example: '2026-03-01T00:00:00.000Z',
    description: 'Deadline (ISO 8601)',
  })
  @IsOptional()
  @IsDateString()
  deadline?: string;

  @ApiPropertyOptional({ example: 2000000, description: 'Budget amount' })
  @IsOptional()
  @IsNumber()
  budget?: number;
}

export * from './create-project-request.dto';
