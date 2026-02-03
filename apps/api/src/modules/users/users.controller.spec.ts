import { Test, TestingModule } from '@nestjs/testing';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto';
import { validateDto } from '../../../test/utils/validation';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const moduleBuilder = Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      });

    const module: TestingModule = await moduleBuilder.compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('uses JwtAuthGuard', () => {
    const guards = Reflect.getMetadata(GUARDS_METADATA, UsersController) as
      | Array<new (...args: never[]) => unknown>
      | undefined;

    expect(guards?.some((guard) => guard === JwtAuthGuard)).toBe(true);
  });

  it('returns current user profile', async () => {
    (service.findOne as jest.Mock).mockResolvedValue({ id: 'user-1' });

    const result = await controller.getProfile({ user: { id: 'user-1' } });

    expect(service.findOne).toHaveBeenCalledWith('user-1');
    expect(result.id).toBe('user-1');
  });

  it('updates current user profile', async () => {
    (service.update as jest.Mock).mockResolvedValue({ id: 'user-1' });

    const result = await controller.updateProfile(
      { user: { id: 'user-1' } },
      { name: 'Updated' }
    );

    expect(service.update).toHaveBeenCalledWith('user-1', { name: 'Updated' });
    expect(result.id).toBe('user-1');
  });

  it('returns user by id', async () => {
    (service.findOne as jest.Mock).mockResolvedValue({ id: 'user-2' });

    const result = await controller.findOne('user-2');

    expect(service.findOne).toHaveBeenCalledWith('user-2');
    expect(result.id).toBe('user-2');
  });

  describe('dto validation', () => {
    it('validates update user dto', async () => {
      const dto = new UpdateUserDto();
      dto.name = 'A';

      const errors = await validateDto(dto);

      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
