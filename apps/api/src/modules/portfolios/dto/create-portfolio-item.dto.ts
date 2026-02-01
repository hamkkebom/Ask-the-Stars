import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreatePortfolioItemDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  videoId?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  year?: number;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
