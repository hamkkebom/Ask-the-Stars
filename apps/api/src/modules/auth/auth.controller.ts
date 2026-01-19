import { Controller, Post, Body, HttpCode, HttpStatus, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() body: { refresh_token: string }) {
    return this.authService.refresh(body.refresh_token);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return { message: '로그아웃되었습니다.' };
  }

  @Post('password-reset/request')
  @HttpCode(HttpStatus.OK)
  async requestPasswordReset(@Body('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }

  @Patch('password-reset/confirm')
  @HttpCode(HttpStatus.OK)
  async confirmPasswordReset(
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    return this.authService.confirmPasswordReset(token, newPassword);
  }
}
