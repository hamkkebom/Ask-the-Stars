import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from '../auth.service';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: { get: jest.fn().mockReturnValue('secret') },
        },
        {
          provide: AuthService,
          useValue: { validateUser: jest.fn() },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    authService = module.get<AuthService>(AuthService);
  });

  it('returns user payload when valid', async () => {
    (authService.validateUser as jest.Mock).mockResolvedValue({ id: 'user-1' });

    const result = await strategy.validate({
      sub: 'user-1',
      email: 'test@example.com',
    });

    expect(result).toEqual({ id: 'user-1', email: 'test@example.com' });
  });

  it('throws when user not found', async () => {
    (authService.validateUser as jest.Mock).mockResolvedValue(null);

    await expect(
      strategy.validate({ sub: 'user-1', email: 'test@example.com' })
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
