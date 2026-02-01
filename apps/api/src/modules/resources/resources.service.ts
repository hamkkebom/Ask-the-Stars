import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { ResourceCategory } from '@prisma/client';
import { CreateResourceDto, UpdateResourceDto } from './dto';

@Injectable()
export class ResourcesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createResourceDto: CreateResourceDto): Promise<any> {
    return this.prisma.resource.create({
      data: createResourceDto,
    });
  }

  async findAll(category?: ResourceCategory, isPublic?: boolean): Promise<any> {
    return this.prisma.resource.findMany({
      where: {
        ...(category && { category }),
        ...(isPublic !== undefined && { isPublic }),
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<any> {
    const resource = await this.prisma.resource.findUnique({
      where: { id },
    });

    if (!resource) {
      throw new NotFoundException('자료를 찾을 수 없습니다.');
    }

    return resource;
  }

  async update(id: string, updateResourceDto: UpdateResourceDto): Promise<any> {
    await this.findOne(id);

    return this.prisma.resource.update({
      where: { id },
      data: updateResourceDto,
    });
  }

  async remove(id: string): Promise<any> {
    await this.findOne(id);

    return this.prisma.resource.delete({
      where: { id },
    });
  }

  async incrementDownloadCount(id: string): Promise<any> {
    await this.findOne(id);

    return this.prisma.resource.update({
      where: { id },
      data: {
        downloadCount: { increment: 1 },
      },
    });
  }

  async getPopularResources(limit: number = 10): Promise<any> {
    return this.prisma.resource.findMany({
      where: { isPublic: true },
      orderBy: { downloadCount: 'desc' },
      take: limit,
    });
  }

  async getResourcesByCategory(): Promise<any> {
    const categories = await this.prisma.resource.groupBy({
      by: ['category'],
      _count: { id: true },
      where: { isPublic: true },
    });

    return categories.map((c) => ({
      category: c.category,
      count: c._count.id,
    }));
  }
}
