import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  category: string; // 'GUIDE' | 'TEMPLATE' | 'DESIGN_ASSET' | 'SOUND_EFFECT' | 'MUSIC' | 'OTHER'

  @IsString()
  fileUrl: string;

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
