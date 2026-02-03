import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { SettlementType, SettlementStatus } from '@ask-the-stars/database';

export class CreateSettlementDto {
  @ApiProperty({ example: 'user_123', description: 'User ID' })
  @IsString()
  @IsNotEmpty()
  userId!: string;

  @ApiProperty({ example: 250000, description: 'Settlement amount' })
  @IsNumber()
  @IsNotEmpty()
  amount!: number;

  @ApiProperty({
    enum: SettlementType,
    example: SettlementType.PAYOUT,
    description: 'Settlement type',
  })
  @IsEnum(SettlementType)
  @IsNotEmpty()
  type!: SettlementType;

  @ApiPropertyOptional({
    example: '1차 정산',
    description: 'Settlement description',
  })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateSettlementDto {
  @ApiPropertyOptional({
    enum: SettlementStatus,
    example: SettlementStatus.COMPLETED,
    description: 'Settlement status',
  })
  @IsOptional()
  @IsEnum(SettlementStatus)
  status?: SettlementStatus;

  @ApiPropertyOptional({
    example: '정산 완료 처리',
    description: 'Settlement description',
  })
  @IsOptional()
  @IsString()
  description?: string;
}
