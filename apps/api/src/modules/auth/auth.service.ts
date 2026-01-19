import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../database/prisma.service';
import * as argon2 from 'argon2';
import { LoginDto, SignupDto } from './dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { email, password, name, phone } = signupDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await argon2.hash(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        role: 'STAR', // Default role
      },
    });

    return this.generateTokens(user.id, user.email);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    return this.generateTokens(user.id, user.email);
  }

  async validateUser(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  async refresh(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
      });

      if (!user) {
        throw new UnauthorizedException('존재하지 않는 사용자입니다.');
      }

      const access_token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      });

      return {
        access_token,
        expires_in: 3600,
        token_type: 'Bearer',
      };
    } catch {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }
  }

  private generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    return {
      access_token,
      refresh_token,
      expires_in: 3600,
      token_type: 'Bearer',
    };
  }

  async requestPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return { message: '비밀번호 재설정 이메일을 전송했습니다.' };

    const payload = { sub: user.id, email: user.email, type: 'reset' };
    const token = this.jwtService.sign(payload, { expiresIn: '15m' });

    await this.mailService.sendPasswordResetEmail(user.email, token);
    return { message: '비밀번호 재설정 이메일을 전송했습니다.' };
  }

  async confirmPasswordReset(token: string, newPassword: string) {
    try {
      const payload = this.jwtService.verify(token);
      if (payload.type !== 'reset') throw new UnauthorizedException('유효하지 않은 토큰입니다.');

      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user) throw new UnauthorizedException('사용자를 찾을 수 없습니다.');

      const hashedPassword = await argon2.hash(newPassword);
      await this.prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
      });

      return { message: '비밀번호가 성공적으로 변경되었습니다.' };
    } catch (e) {
      throw new UnauthorizedException('토큰이 만료되었거나 유효하지 않습니다.');
    }
  }
}
