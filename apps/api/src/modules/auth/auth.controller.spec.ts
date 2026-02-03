import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dto';
import { validateDto } from '../../../test/utils/validation';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            signup: jest.fn(),
            refresh: jest.fn(),
            requestPasswordReset: jest.fn(),
            confirmPasswordReset: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('delegates login', async () => {
    (service.login as jest.Mock).mockResolvedValue({ access_token: 'token' });

    const result = await controller.login({
      email: 'test@example.com',
      password: 'password',
    });

    expect(service.login).toHaveBeenCalled();
    expect(result.access_token).toBe('token');
  });

  it('delegates signup', async () => {
    (service.signup as jest.Mock).mockResolvedValue({ access_token: 'token' });

    const result = await controller.signup({
      email: 'test@example.com',
      password: 'password123',
      name: 'Tester',
    });

    expect(service.signup).toHaveBeenCalled();
    expect(result.access_token).toBe('token');
  });

  it('delegates refresh', async () => {
    (service.refresh as jest.Mock).mockResolvedValue({ access_token: 'token' });

    const result = await controller.refresh({ refresh_token: 'refresh' });

    expect(service.refresh).toHaveBeenCalledWith('refresh');
    expect(result.access_token).toBe('token');
  });

  it('returns logout message', async () => {
    const result = await controller.logout();

    expect(result).toEqual({ message: '로그아웃되었습니다.' });
  });

  it('delegates password reset request', async () => {
    (service.requestPasswordReset as jest.Mock).mockResolvedValue({
      message: 'ok',
    });

    const result = await controller.requestPasswordReset('test@example.com');

    expect(service.requestPasswordReset).toHaveBeenCalledWith(
      'test@example.com'
    );
    expect(result.message).toBe('ok');
  });

  it('delegates password reset confirmation', async () => {
    (service.confirmPasswordReset as jest.Mock).mockResolvedValue({
      message: 'ok',
    });

    const result = await controller.confirmPasswordReset('token', 'newPass');

    expect(service.confirmPasswordReset).toHaveBeenCalledWith(
      'token',
      'newPass'
    );
    expect(result.message).toBe('ok');
  });

  describe('dto validation', () => {
    it('validates login dto', async () => {
      const dto = new LoginDto();
      dto.email = 'bad';
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
  });
});
