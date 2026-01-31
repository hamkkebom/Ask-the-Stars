import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePortfolioDto, UpdatePortfolioDto, CreatePortfolioItemDto, UpdatePortfolioItemDto } from './dto';

@Injectable()
export class PortfoliosService {
  constructor(private readonly prisma: PrismaService) {}

  // ==================== Portfolio CRUD ====================

  async findOrCreate(userId: string): Promise<any> {
    let portfolio = await this.prisma.portfolio.findUnique({
      where: { userId },
      include: {
        items: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!portfolio) {
      portfolio = await this.prisma.portfolio.create({
        data: { userId },
        include: {
          items: true,
        },
      });
    }

    return portfolio;
  }

  async findByUserId(userId: string): Promise<any> {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { userId },
      include: {
        items: {
          orderBy: [{ isFeatured: 'desc' }, { order: 'asc' }],
        },
        user: { select: { id: true, name: true, profileImage: true, bio: true } },
      },
    });

    if (!portfolio) {
      throw new NotFoundException('포트폴리오를 찾을 수 없습니다.');
    }

    return portfolio;
  }

  async update(userId: string, updatePortfolioDto: UpdatePortfolioDto): Promise<any> {
    const portfolio = await this.findOrCreate(userId);

    return this.prisma.portfolio.update({
      where: { id: portfolio.id },
      data: updatePortfolioDto,
      include: {
        items: {
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  // ==================== Portfolio Item CRUD ====================

  async addItem(userId: string, createItemDto: CreatePortfolioItemDto): Promise<any> {
    const portfolio = await this.findOrCreate(userId);

    // Get max order
    const maxOrderItem = await this.prisma.portfolioItem.findFirst({
      where: { portfolioId: portfolio.id },
      orderBy: { order: 'desc' },
    });

    return this.prisma.portfolioItem.create({
      data: {
        ...createItemDto,
        portfolioId: portfolio.id,
        order: maxOrderItem ? maxOrderItem.order + 1 : 0,
      },
    });
  }

  async updateItem(userId: string, itemId: string, updateItemDto: UpdatePortfolioItemDto): Promise<any> {
    const item = await this.prisma.portfolioItem.findUnique({
      where: { id: itemId },
      include: { portfolio: true },
    });

    if (!item) {
      throw new NotFoundException('포트폴리오 항목을 찾을 수 없습니다.');
    }

    if (item.portfolio.userId !== userId) {
      throw new ForbiddenException('수정 권한이 없습니다.');
    }

    return this.prisma.portfolioItem.update({
      where: { id: itemId },
      data: updateItemDto,
    });
  }

  async removeItem(userId: string, itemId: string): Promise<any> {
    const item = await this.prisma.portfolioItem.findUnique({
      where: { id: itemId },
      include: { portfolio: true },
    });

    if (!item) {
      throw new NotFoundException('포트폴리오 항목을 찾을 수 없습니다.');
    }

    if (item.portfolio.userId !== userId) {
      throw new ForbiddenException('삭제 권한이 없습니다.');
    }

    return this.prisma.portfolioItem.delete({
      where: { id: itemId },
    });
  }

  async reorderItems(userId: string, itemIds: string[]): Promise<any> {
    const portfolio = await this.findOrCreate(userId);

    // Update order for each item
    await Promise.all(
      itemIds.map((id, index) =>
        this.prisma.portfolioItem.updateMany({
          where: { id, portfolioId: portfolio.id },
          data: { order: index },
        }),
      ),
    );

    return this.findByUserId(userId);
  }
}
