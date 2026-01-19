import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateSubmissionDto, UpdateSubmissionDto } from './dto';

@Injectable()
export class SubmissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createSubmissionDto: CreateSubmissionDto): Promise<any> {
    // Check if project exists
    const project = await this.prisma.project.findUnique({
      where: { id: createSubmissionDto.projectId },
    });

    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다.');
    }

    // Determine version: Count existing submissions for this project by this user
    const existingCount = await this.prisma.submission.count({
      where: {
        projectId: createSubmissionDto.projectId,
        userId: userId,
      },
    });

    return this.prisma.submission.create({
      data: {
        ...createSubmissionDto,
        userId,
        version: existingCount + 1,
      },
    });
  }

  async findAll(projectId?: string): Promise<any> {
    return this.prisma.submission.findMany({
      where: {
        ...(projectId && { projectId }),
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } },
        project: { select: { title: true } },
      },
    });
  }

  async findOne(id: string): Promise<any> {
    const submission = await this.prisma.submission.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        project: { select: { title: true, ownerId: true } },
      },
    });

    if (!submission) {
      throw new NotFoundException('제출물을 찾을 수 없습니다.');
    }

    return submission;
  }

  async update(id: string, userId: string, updateSubmissionDto: UpdateSubmissionDto): Promise<any> {
    const submission = await this.findOne(id);

    // Allow owner or project owner (if we had access to project info here) to update?
    // For now, let's strict it to the submitter.
    // In real app, Project Owner should be able to update Status (Approve/Reject).
    // Let's handle that:

    // Fetch project to check owner
    const project = await this.prisma.project.findUnique({
      where: { id: submission.projectId },
    });

    const isSubmitter = submission.userId === userId;
    const isProjectOwner = project?.ownerId === userId;

    if (!isSubmitter && !isProjectOwner) {
      throw new ForbiddenException('수정 권한이 없습니다.');
    }

    return this.prisma.submission.update({
      where: { id },
      data: updateSubmissionDto,
    });
  }

  async remove(id: string, userId: string): Promise<any> {
    const submission = await this.findOne(id);

    if (submission.userId !== userId) {
      throw new ForbiddenException('삭제 권한이 없습니다.');
    }

    return this.prisma.submission.delete({
      where: { id },
    });
  }
}
