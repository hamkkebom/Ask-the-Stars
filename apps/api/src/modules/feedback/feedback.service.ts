import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createFeedbackDto: CreateFeedbackDto): Promise<any> {
    // Verify submission exists
    const submission = await this.prisma.submission.findUnique({
      where: { id: createFeedbackDto.submissionId },
    });

    if (!submission) {
      throw new NotFoundException('제출물을 찾을 수 없습니다.');
    }

    return this.prisma.feedback.create({
      data: {
        ...createFeedbackDto,
        userId,
      },
    });
  }

  async findAll(submissionId?: string): Promise<any> {
    return this.prisma.feedback.findMany({
      where: {
        ...(submissionId && { submissionId }),
      },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, profileImage: true } },
      },
    });
  }

  async findOne(id: string): Promise<any> {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, profileImage: true } },
      },
    });

    if (!feedback) {
      throw new NotFoundException('피드백을 찾을 수 없습니다.');
    }

    return feedback;
  }

  async update(id: string, userId: string, updateFeedbackDto: UpdateFeedbackDto): Promise<any> {
    const feedback = await this.findOne(id);

    // Only allow author to update content/priority
    // But allow submission owner or project owner to update status (RESOLVED) - TODO: refinement
    // For now strict to author
    if (feedback.userId !== userId) {
      throw new ForbiddenException('수정 권한이 없습니다.');
    }

    return this.prisma.feedback.update({
      where: { id },
      data: updateFeedbackDto,
    });
  }

  async remove(id: string, userId: string): Promise<any> {
    const feedback = await this.findOne(id);

    if (feedback.userId !== userId) {
      throw new ForbiddenException('삭제 권한이 없습니다.');
    }

    return this.prisma.feedback.delete({
      where: { id },
    });
  }
}
