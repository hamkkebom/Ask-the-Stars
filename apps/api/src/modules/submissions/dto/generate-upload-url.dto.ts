import { IsNumber, IsOptional, IsObject } from 'class-validator';

export class GenerateUploadUrlDto {
  @IsNumber()
  uploadLength!: number;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, string>;
}
