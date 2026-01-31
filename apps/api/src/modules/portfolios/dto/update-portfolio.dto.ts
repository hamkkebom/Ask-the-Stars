import { IsString, IsOptional } from 'class-validator';

export class UpdatePortfolioDto {
  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  showreel?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  socialLinks?: Record<string, string>;
}
