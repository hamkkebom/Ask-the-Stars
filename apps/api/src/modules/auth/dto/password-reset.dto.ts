import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, Matches } from 'class-validator';

export class RequestPasswordResetDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address for password reset',
  })
  @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
  email!: string;
}

export class ConfirmPasswordResetDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Password reset token (minimum 20 characters)',
    minLength: 20,
  })
  @IsString({ message: '토큰은 문자열이어야 합니다.' })
  @MinLength(20, { message: '토큰이 유효하지 않습니다.' })
  token!: string;

  @ApiProperty({
    example: 'NewPassword123!',
    description:
      'New password (minimum 8 characters, must contain uppercase, number, and special character)',
    minLength: 8,
  })
  @IsString({ message: '비밀번호는 문자열이어야 합니다.' })
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
    message: '비밀번호는 대문자, 숫자, 특수문자(@$!%*?&)를 포함해야 합니다.',
  })
  newPassword!: string;
}
