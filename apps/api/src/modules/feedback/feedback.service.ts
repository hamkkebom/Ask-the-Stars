import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto';

@Injectable()
export class FeedbackService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Check if user can update feedback
   * - Author can update everything
   * - Submission owner can update status only
   * - Project owner can update status only
   */
  private async canUpdateFeedback(
    feedbackId: string,
    userId: string,
    isStatusUpdate: boolean
  ): Promise<boolean> {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id: feedbackId },
      include: {
        submission: {
          include: {
            project: true,
          },
        },
      },
    });

    if (!feedback) return false;

    // Author can update everything
    if (feedback.userId === userId) return true;

    // For status updates only, check if user is submission/project owner
    if (isStatusUpdate) {
      const isSubmissionOwner = feedback.submission?.userId === userId;
      const isProjectOwner = feedback.submission?.project?.ownerId === userId;
      return isSubmissionOwner || isProjectOwner;
    }

    return false;
  }

  async create(
    userId: string,
    createFeedbackDto: CreateFeedbackDto
  ): Promise<any> {
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

  async update(
    id: string,
    userId: string,
    updateFeedbackDto: UpdateFeedbackDto
  ): Promise<any> {
    // Determine if this is a status-only update
    const isStatusUpdate =
      Object.keys(updateFeedbackDto).length === 1 &&
      'status' in updateFeedbackDto;

    // Check permission using refined logic
    const canUpdate = await this.canUpdateFeedback(id, userId, isStatusUpdate);

    if (!canUpdate) {
      throw new ForbiddenException('수정 권한이 없습니다.');
    }

    return this.prisma.feedback.update({
      where: { id },
      data: updateFeedbackDto,
    });
  }

  async remove(id: string, userId: string): Promise<any> {
    const feedback = await this.findOne(id);

    // Only author can delete
    if (feedback.userId !== userId) {
      throw new ForbiddenException('삭제 권한이 없습니다.');
    }

    return this.prisma.feedback.delete({
      where: { id },
    });
  }
}
