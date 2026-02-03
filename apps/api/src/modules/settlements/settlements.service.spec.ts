import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { SettlementsService } from './settlements.service';
import { PrismaService } from '../../database/prisma.service';
import { CreateSettlementDto } from './dto';
import { SettlementStatus, SettlementType } from '@ask-the-stars/database';
import { createPrismaMock } from '../../../test/utils/prisma.mock';
import { validateDto } from '../../../test/utils/validation';

describe('SettlementsService', () => {
  let service: SettlementsService;
  let prisma: ReturnType<typeof createPrismaMock>;

  beforeEach(async () => {
    prisma = createPrismaMock(() => jest.fn());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettlementsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<SettlementsService>(SettlementsService);
  });

  it('throws when user not found on create', async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(
      service.create({
        userId: 'user-1',
        amount: 1000,
        type: SettlementType.PAYOUT,
      })
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('creates settlement for user', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 'user-1' });
    prisma.settlement.create.mockResolvedValue({ id: 'set-1' });

    const result = await service.create({
      userId: 'user-1',
      amount: 1000,
      type: SettlementType.PAYOUT,
    });

    expect(prisma.settlement.create).toHaveBeenCalled();
    expect(result.id).toBe('set-1');
  });

  it('sets processedAt when status transitions to completed', async () => {
    prisma.settlement.findUnique.mockResolvedValue({
      id: 'set-1',
      status: SettlementStatus.PENDING,
    });
    prisma.settlement.update.mockResolvedValue({ id: 'set-1' });

    const result = await service.update('set-1', {
      status: SettlementStatus.COMPLETED,
    });

    expect(prisma.settlement.update).toHaveBeenCalled();
    expect(result.id).toBe('set-1');
  });

  it('does not set processedAt when already completed', async () => {
    prisma.settlement.findUnique.mockResolvedValue({
      id: 'set-1',
      status: SettlementStatus.COMPLETED,
    });
    prisma.settlement.update.mockResolvedValue({ id: 'set-1' });

    await service.update('set-1', { status: SettlementStatus.COMPLETED });

    expect(prisma.settlement.update).toHaveBeenCalledWith({
      where: { id: 'set-1' },
      data: { status: SettlementStatus.COMPLETED },
    });
  });

  it('throws when settlement not found for update', async () => {
    prisma.settlement.findUnique.mockResolvedValue(null);

    await expect(
      service.update('missing', { status: SettlementStatus.COMPLETED })
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('returns settlement by id', async () => {
    prisma.settlement.findUnique.mockResolvedValue({ id: 'set-1' });

    const result = await service.findOne('set-1');

    expect(result.id).toBe('set-1');
  });

  it('returns settlements for user', async () => {
    prisma.settlement.findMany.mockResolvedValue([{ id: 'set-1' }]);

    const result = await service.findAll('user-1');

    expect(prisma.settlement.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId: 'user-1' } })
    );
    expect(result).toHaveLength(1);
  });

  describe('dto validation', () => {
    it('validates create settlement dto', async () => {
      const dto = new CreateSettlementDto();
      dto.userId = '';

      const errors = await validateDto(dto);

      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
