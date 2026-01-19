import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { SettlementType, SettlementStatus } from '@ask-the-stars/database';

export class CreateSettlementDto {
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @IsEnum(SettlementType)
  @IsNotEmpty()
  type!: SettlementType;

  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateSettlementDto {
  @IsOptional()
  @IsEnum(SettlementStatus)
  status?: SettlementStatus;

  @IsOptional()
  @IsString()
  description?: string;
}
