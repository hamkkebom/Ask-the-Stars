import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateSubmissionDto, UpdateSubmissionDto } from './dto';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudflare: CloudflareStreamService
  ) {}

  async create(userId: string, dto: CreateSubmissionDto): Promise<any> {
    let projectId = dto.projectId;
    let assignmentId = dto.assignmentId;

    // 1. Logic for Assignment
    if (assignmentId) {
        const assignment = await this.prisma.projectAssignment.findUnique({
            where: { id: assignmentId },
            include: { request: true }
        });
        if (!assignment) throw new NotFoundException('배정 내역을 찾을 수 없습니다.');

        // Ensure this user owns the assignment
        if (assignment.freelancerId !== userId) {
            throw new ForbiddenException('본인의 배정 건에만 제출할 수 있습니다.');
        }

        // Link to Project (if the request is linked to a project, or just use assignment info)
        // In our schema, ProjectRequest might not be directly linked to a Project model yet?
        // Let's check schema. prisma again? No, Project model has ProjectRequest relations... wait.
        // Actually, ProjectRequest is the "Job Post". Submission links to it via assignmentId.
    }

    // 2. Determine version: Count existing submissions for this context
    const existingCount = await this.prisma.submission.count({
      where: {
        userId: userId,
        ...(assignmentId ? { assignmentId } : { projectId }),
      },
    });

    return this.prisma.submission.create({
      data: {
        projectId,
        assignmentId,
        userId,
        videoUrl: dto.videoUrl,
        // @ts-ignore - In case Prisma client is not updated yet
        streamUid: dto.streamUid,
        thumbnailUrl: dto.thumbnailUrl,
        duration: dto.duration,
        notes: dto.notes,
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
        assignment: {
            include: {
                request: { select: { title: true } }
            }
        }
      },
    });
  }

  async findOne(id: string): Promise<any> {
    const submission = await this.prisma.submission.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, profileImage: true } },
        project: { select: { id: true, title: true, ownerId: true } },
        assignment: {
            include: {
                request: true
            }
        }
      },
    });

    if (!submission) {
      throw new NotFoundException('제출물을 찾을 수 없습니다.');
    }

    // Inject Signed Token if streamUid exists
    let signedToken = null;
    // @ts-ignore
    if (submission.streamUid) {
        // @ts-ignore
        signedToken = await this.cloudflare.generateSignedToken(submission.streamUid);
    }

    return {
        ...submission,
        signedToken
    };
  }

  async update(id: string, user: any, updateSubmissionDto: UpdateSubmissionDto): Promise<any> {
    const submission = await this.findOne(id);

    const isSubmitter = submission.userId === user.id;
    const isAdmin = ['ADMIN', 'MOON_MANAGER', 'MOON_FEEDBACK'].includes(user.role);
    const isProjectOwner = submission.project?.ownerId === user.id;

    if (!isSubmitter && !isProjectOwner && !isAdmin) {
      throw new ForbiddenException('수정 권한이 없습니다.');
    }

    return this.prisma.submission.update({
      where: { id },
      data: updateSubmissionDto,
    });
  }

  async remove(id: string, user: any): Promise<any> {
    const submission = await this.findOne(id);

    const isSubmitter = submission.userId === user.id;
    const isAdmin = user.role === 'ADMIN';

    if (!isSubmitter && !isAdmin) {
      throw new ForbiddenException('삭제 권한이 없습니다.');
    }

    return this.prisma.submission.delete({
      where: { id },
    });
  }
}
