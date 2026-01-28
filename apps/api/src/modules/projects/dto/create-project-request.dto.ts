import { IsString, IsNotEmpty, IsArray, IsDateString, IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { AssignmentType } from '@prisma/client';

export class CreateProjectRequestDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsString({ each: true })
  categories!: string[];

  @IsDateString()
  deadline!: string;

  @IsEnum(AssignmentType)
  @IsOptional()
  assignmentType?: AssignmentType;

  @IsNumber()
  @Min(1)
  @IsOptional()
  maxAssignees?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  estimatedBudget?: number;

  @IsString()
  @IsOptional()
  targetCounselorId?: string;
}
