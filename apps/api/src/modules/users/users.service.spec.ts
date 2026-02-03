import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from '../../database/prisma.service';
import { UpdateUserDto } from './dto';
import { createPrismaMock } from '../../../test/utils/prisma.mock';
import { validateDto } from '../../../test/utils/validation';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: ReturnType<typeof createPrismaMock>;

  beforeEach(async () => {
    prisma = createPrismaMock(() => jest.fn());

    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, { provide: PrismaService, useValue: prisma }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('returns all users', async () => {
    prisma.user.findMany.mockResolvedValue([{ id: 'user-1' }]);

    const result = await service.findAll();

    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it('throws when user not found', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing')).rejects.toBeInstanceOf(
      NotFoundException
    );
  });

  it('excludes password from user', async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 'user-1',
      email: 'test@example.com',
      password: 'secret',
    });

    const result = await service.findOne('user-1');

    expect(result).not.toHaveProperty('password');
  });

  it('updates user and excludes password', async () => {
    prisma.user.update.mockResolvedValue({
      id: 'user-1',
      name: 'Updated',
      password: 'secret',
    });

    const result = await service.update('user-1', { name: 'Updated' });

    expect(result).not.toHaveProperty('password');
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
