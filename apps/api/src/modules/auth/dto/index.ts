import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
  email!: string;

  @IsString()
  @MinLength(1, { message: '비밀번호를 입력해주세요.' })
  password!: string;
}

export class SignupDto {
  @IsEmail({}, { message: '유효한 이메일 주소를 입력해주세요.' })
  email!: string;

  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  password!: string;

  @IsString()
  @MinLength(2, { message: '이름은 최소 2자 이상이어야 합니다.' })
  name!: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  role?: string;
}

export class RefreshTokenDto {
  @IsString()
  refresh_token!: string;
}
