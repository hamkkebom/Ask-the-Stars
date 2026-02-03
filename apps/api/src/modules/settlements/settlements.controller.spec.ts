import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException } from '@nestjs/common';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { SettlementsController } from './settlements.controller';
import { SettlementsService } from './settlements.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';
import { SettlementStatus, UserRole } from '@ask-the-stars/database';
import { UpdateSettlementDto } from './dto';

describe('SettlementsController', () => {
  let controller: SettlementsController;
  let service: SettlementsService;

  beforeEach(async () => {
    const moduleBuilder = Test.createTestingModule({
      controllers: [SettlementsController],
      providers: [
        {
          provide: SettlementsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn().mockReturnValue(true) });

    const module: TestingModule = await moduleBuilder.compile();

    controller = module.get<SettlementsController>(SettlementsController);
    service = module.get<SettlementsService>(SettlementsService);
  });

  it('uses JwtAuthGuard and RolesGuard', () => {
    const guards = Reflect.getMetadata(
      GUARDS_METADATA,
      SettlementsController
    ) as Array<new (...args: never[]) => unknown> | undefined;

    expect(guards?.some((guard) => guard === JwtAuthGuard)).toBe(true);
    expect(guards?.some((guard) => guard === RolesGuard)).toBe(true);
  });

  it('requires roles for create', () => {
    const roles = Reflect.getMetadata(
      ROLES_KEY,
      SettlementsController.prototype.create
    ) as UserRole[];

    expect(roles).toEqual(
      expect.arrayContaining([
        UserRole.ADMIN,
        UserRole.MOON_MANAGER,
        UserRole.MOON_SETTLEMENT,
      ])
    );
  });

  it('returns all settlements for admin roles', async () => {
    (service.findAll as jest.Mock).mockResolvedValue([{ id: 'set-1' }]);

    const result = await controller.findAll({
      user: { id: 'user-1', role: UserRole.ADMIN },
    });

    expect(service.findAll).toHaveBeenCalledWith(undefined);
    expect(result).toHaveLength(1);
  });

  it('returns only own settlements for non-admin roles', async () => {
    (service.findAll as jest.Mock).mockResolvedValue([{ id: 'set-1' }]);

    const result = await controller.findAll({
      user: { id: 'user-1', role: UserRole.STAR },
    });

    expect(service.findAll).toHaveBeenCalledWith('user-1');
    expect(result).toHaveLength(1);
  });

  it('throws when user cannot access settlement', async () => {
    (service.findOne as jest.Mock).mockResolvedValue({
      id: 'set-1',
      userId: 'owner',
    });

    await expect(
      controller.findOne(
        { user: { id: 'user-1', role: UserRole.STAR } },
        'set-1'
      )
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('updates settlement when role allowed', async () => {
    (service.update as jest.Mock).mockResolvedValue({ id: 'set-1' });
    const dto: UpdateSettlementDto = { status: SettlementStatus.COMPLETED };

    const result = await controller.update('set-1', dto);

    expect(service.update).toHaveBeenCalledWith('set-1', dto);
    expect(result.id).toBe('set-1');
  });
});
