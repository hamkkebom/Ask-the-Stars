import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateProjectDto, UpdateProjectDto } from './dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createProjectDto: CreateProjectDto): Promise<any> {
    return this.prisma.project.create({
      data: {
        ...createProjectDto,
        ownerId: userId,
      },
    });
  }

  async findAll(user: any): Promise<any> {
    if (user.role === 'COUNSELOR') {
        // Counselors see all projects (or filtered by status if needed)
        return this.prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                owner: { select: { id: true, name: true, email: true } },
            },
        });
    }

    // Stars see only their own projects
    return this.prisma.project.findMany({
      where: {
        ownerId: user.id,
      },
      orderBy: { createdAt: 'desc' },
      include: {
        owner: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findOne(id: string): Promise<any> {
    const project = await this.prisma.project.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true, email: true } },
      },
    });

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다.');
    }

    return project;
  }

  async update(id: string, userId: string, updateProjectDto: UpdateProjectDto): Promise<any> {
    const project = await this.findOne(id);

    if (project.ownerId !== userId) {
      throw new ForbiddenException('프로젝트 수정 권한이 없습니다.');
    }

    return this.prisma.project.update({
      where: { id },
      data: updateProjectDto,
    });
  }

  async remove(id: string, userId: string): Promise<any> {
    const project = await this.findOne(id);

    if (project.ownerId !== userId) {
      throw new ForbiddenException('프로젝트 삭제 권한이 없습니다.');
    }

    return this.prisma.project.delete({
      where: { id },
    });
  }
}
