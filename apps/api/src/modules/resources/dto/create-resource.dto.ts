import {
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { ResourceCategory } from '@prisma/client';

export class CreateResourceDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(ResourceCategory)
  category!: ResourceCategory;

  @IsString()
  fileUrl!: string;

  @IsOptional()
  @IsNumber()
  fileSize?: number;

  @IsOptional()
  @IsString()
  fileType?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
