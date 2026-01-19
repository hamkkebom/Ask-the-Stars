import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateSettlementDto, UpdateSettlementDto } from './dto';
import { SettlementStatus } from '@ask-the-stars/database';

@Injectable()
export class SettlementsService {
  constructor(private readonly prisma: PrismaService) {}

  // Admin creating a settlement record for a user
  async create(createSettlementDto: CreateSettlementDto): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: createSettlementDto.userId },
    });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return this.prisma.settlement.create({
      data: {
        userId: createSettlementDto.userId,
        amount: createSettlementDto.amount,
        type: createSettlementDto.type,
        status: SettlementStatus.PENDING,
        description: createSettlementDto.description,
      },
    });
  }

  async findAll(userId?: string): Promise<any> {
    // If userId provided, return user's settlements
    // If not (Admin), return all
    return this.prisma.settlement.findMany({
      where: {
        ...(userId && { userId }),
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findOne(id: string): Promise<any> {
    const settlement = await this.prisma.settlement.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    if (!settlement) {
      throw new NotFoundException('정산 내역을 찾을 수 없습니다.');
    }

    return settlement;
  }

  async update(id: string, updateSettlementDto: UpdateSettlementDto): Promise<any> {
    // Usually only Admin updates status
    const settlement = await this.prisma.settlement.findUnique({
      where: { id },
    });

    if (!settlement) {
        throw new NotFoundException('정산 내역을 찾을 수 없습니다.');
    }

    const updatedData: any = { ...updateSettlementDto };

    // If status is changed to COMPLETED, set processedAt
    if (updateSettlementDto.status === SettlementStatus.COMPLETED && settlement.status !== SettlementStatus.COMPLETED) {
        updatedData.processedAt = new Date();
    }

    return this.prisma.settlement.update({
      where: { id },
      data: updatedData,
    });
  }
}
