import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from '../../database/prisma.service';
import { MailService } from '../mail/mail.service';
import { LoginDto, SignupDto, RefreshTokenDto } from './dto';
import { createPrismaMock } from '../../../test/utils/prisma.mock';
import { validateDto } from '../../../test/utils/validation';

jest.mock('argon2', () => ({
  hash: jest.fn(),
  verify: jest.fn(),
}));

const argon2 = jest.requireMock('argon2') as {
  hash: jest.Mock;
  verify: jest.Mock;
};

describe('AuthService', () => {
  let service: AuthService;
  let prisma: ReturnType<typeof createPrismaMock>;
  let jwtService: JwtService;
  let mailService: MailService;

  beforeEach(async () => {
    prisma = createPrismaMock(() => jest.fn());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verify: jest.fn(),
          },
        },
        {
          provide: MailService,
          useValue: {
            sendPasswordResetEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    mailService = module.get<MailService>(MailService);
  });

  describe('signup', () => {
    it('throws when email already exists', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });

      await expect(
        service.signup({
          email: 'test@example.com',
          password: 'password123',
          name: 'Tester',
        })
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it('creates user and returns tokens', async () => {
      prisma.user.findUnique.mockResolvedValue(null);
      argon2.hash.mockResolvedValue('hashed');
      prisma.user.create.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        role: 'STAR',
      });
      (jwtService.sign as jest.Mock)
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      const result = await service.signup({
        email: 'test@example.com',
        password: 'password123',
        name: 'Tester',
      });

      expect(prisma.user.create).toHaveBeenCalled();
      expect(result).toEqual({
        access_token: 'access-token',
        refresh_token: 'refresh-token',
        expires_in: 3600,
        token_type: 'Bearer',
      });
    });
  });

  describe('login', () => {
    it('throws when user does not exist', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({ email: 'missing@example.com', password: 'pass' })
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('throws when password is invalid', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        password: 'hashed',
      });
      argon2.verify.mockResolvedValue(false);

      await expect(
        service.login({ email: 'test@example.com', password: 'bad' })
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('returns tokens for valid credentials', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        password: 'hashed',
        role: 'STAR',
      });
      argon2.verify.mockResolvedValue(true);
      (jwtService.sign as jest.Mock)
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      const result = await service.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.refresh_token).toBe('refresh-token');
    });
  });

  describe('refresh', () => {
    it('returns new access and refresh tokens', async () => {
      (jwtService.verify as jest.Mock).mockReturnValue({ sub: 'user-1' });
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
        role: 'STAR',
      });
      (jwtService.sign as jest.Mock)
        .mockReturnValueOnce('access-token')
        .mockReturnValueOnce('refresh-token');

      const result = await service.refresh('refresh-token');

      expect(result.access_token).toBe('access-token');
      expect(result.expires_in).toBe(3600);
      expect(result.token_type).toBe('Bearer');
    });

    it('throws when user does not exist', async () => {
      (jwtService.verify as jest.Mock).mockReturnValue({ sub: 'user-1' });
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(service.refresh('refresh-token')).rejects.toBeInstanceOf(
        UnauthorizedException
      );
    });

    it('throws when refresh token is invalid', async () => {
      (jwtService.verify as jest.Mock).mockImplementation(() => {
        throw new Error('invalid');
      });

      await expect(service.refresh('bad-token')).rejects.toBeInstanceOf(
        UnauthorizedException
      );
    });
  });

  describe('requestPasswordReset', () => {
    it('returns success message when user not found', async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const result = await service.requestPasswordReset('missing@example.com');

      expect(result).toEqual({
        message: '비밀번호 재설정 이메일을 전송했습니다.',
      });
      expect(mailService.sendPasswordResetEmail).not.toHaveBeenCalled();
    });

    it('sends reset email when user exists', async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 'user-1',
        email: 'test@example.com',
      });
      (jwtService.sign as jest.Mock).mockReturnValue('reset-token');

      const result = await service.requestPasswordReset('test@example.com');

      expect(mailService.sendPasswordResetEmail).toHaveBeenCalledWith(
        'test@example.com',
        'reset-token'
      );
      expect(result.message).toContain('비밀번호 재설정');
    });
  });

  describe('confirmPasswordReset', () => {
    it('updates password when token is valid', async () => {
      (jwtService.verify as jest.Mock).mockReturnValue({
        sub: 'user-1',
        type: 'reset',
      });
      prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
      argon2.hash.mockResolvedValue('hashed');
      prisma.user.update.mockResolvedValue({ id: 'user-1' });

      const result = await service.confirmPasswordReset('token', 'newPass');

      expect(prisma.user.update).toHaveBeenCalled();
      expect(result.message).toContain('성공적으로 변경');
    });

    it('throws when token is invalid', async () => {
      (jwtService.verify as jest.Mock).mockImplementation(() => {
        throw new Error('invalid');
      });

      await expect(
        service.confirmPasswordReset('token', 'newPass')
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('throws when token type is invalid', async () => {
      (jwtService.verify as jest.Mock).mockReturnValue({
        sub: 'user-1',
        type: 'other',
      });

      await expect(
        service.confirmPasswordReset('token', 'newPass')
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('throws when user is missing', async () => {
      (jwtService.verify as jest.Mock).mockReturnValue({
        sub: 'user-1',
        type: 'reset',
      });
      prisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.confirmPasswordReset('token', 'newPass')
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });

  describe('dto validation', () => {
    it('validates login dto', async () => {
      const dto = new LoginDto();
      dto.email = 'invalid-email';
      dto.password = '';

      const errors = await validateDto(dto);

      expect(errors.length).toBeGreaterThan(0);
    });

    it('validates signup dto', async () => {
      const dto = new SignupDto();
      dto.email = 'test@example.com';
      dto.password = 'short';
      dto.name = 'A';

      const errors = await validateDto(dto);

      expect(errors.length).toBeGreaterThan(0);
    });

    it('validates refresh token dto', async () => {
      const dto = new RefreshTokenDto();

      const errors = await validateDto(dto);

      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
