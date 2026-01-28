import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateSubmissionDto, UpdateSubmissionDto } from './dto';
import { CloudflareStreamService } from '../cloudflare/cloudflare-stream.service';
import { SubmissionStatus } from '@prisma/client';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly cloudflare: CloudflareStreamService
  ) {}

  async create(userId: string, dto: CreateSubmissionDto): Promise<any> {
    const { assignmentId, projectId, versionSlot, videoUrl, streamUid, thumbnailUrl, duration, notes, versionTitle, fileKey } = dto;

    // 1. Logic for Assignment
    if (!assignmentId) {
       // Allow projectId-only submissions if legacy/admin? For now enforce assignment for Freelancers.
       if (!projectId) throw new NotFoundException('Assignment ID or Project ID is required.');
    }

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
    }

    // 2. Check for existing submission in this slot (for Assignment context)
    let existingSubmission = null;
    if (assignmentId) {
        existingSubmission = await this.prisma.submission.findUnique({
            where: {
                assignmentId_versionSlot: {
                    assignmentId,
                    versionSlot
                }
            }
        });
    }

    if (existingSubmission) {
        // REVISION: Update existing slot
        return this.prisma.submission.update({
            where: { id: existingSubmission.id },
            data: {
                version: { increment: 1 }, // Increment version counter (v1 -> v2)
                videoUrl,
                streamUid,
                fileKey,
                thumbnailUrl,
                duration,
                notes,
                versionTitle: versionTitle || existingSubmission.versionTitle,
                status: SubmissionStatus.PENDING, // Reset status to PENDING for review
            }
        });
    } else {
        // NEW SLOT: Create new submission
        return this.prisma.submission.create({
            data: {
                projectId,
                assignmentId,
                userId,
                versionSlot,
                versionTitle,
                version: 1, // Start at version 1
                videoUrl,
                streamUid,
                fileKey,
                thumbnailUrl,
                duration,
                notes,
                status: SubmissionStatus.PENDING
            },
        });
    }
  }

  async findAll(projectId?: string): Promise<any> {
    const submissions = await this.prisma.submission.findMany({
      where: {
        ...(projectId && { projectId }),
        ...(projectId && { assignmentId: projectId }), // Handle the case where projectId param is actually assignmentId (implied by frontend usage)
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

    // Enrich with Signed Tokens & Analytics
    return Promise.all(submissions.map(async sub => {
        let signedToken = null;
        let views = 0;

        // @ts-ignore
        if (sub.streamUid) {
             // @ts-ignore
             const [token, analytics, signedThumb] = await Promise.all([
                 this.cloudflare.generateSignedToken(sub.streamUid),
                 this.cloudflare.getVideoAnalytics(sub.streamUid),
                 this.cloudflare.getSignedThumbnailUrl(sub.streamUid)
             ]);
             signedToken = token;
             views = analytics.views;
             // @ts-ignore
             if (signedThumb) sub.thumbnailUrl = signedThumb;
        }

        return {
            ...sub,
            signedToken,
            views
        };
    }));
  }

  async findAllByUser(userId: string): Promise<any> {
    const submissions = await this.prisma.submission.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { id: true, name: true, email: true } },
        project: { select: { title: true } },
      },
    });

    // Reuse enrichment logic
    return Promise.all(submissions.map(async sub => {
        let signedToken = null;
        let views = 0;

        // @ts-ignore
        if (sub.streamUid) {
             // @ts-ignore
             const [token, analytics, signedThumb] = await Promise.all([
                 this.cloudflare.generateSignedToken(sub.streamUid),
                 this.cloudflare.getVideoAnalytics(sub.streamUid),
                 this.cloudflare.getSignedThumbnailUrl(sub.streamUid)
             ]);
             signedToken = token;
             views = analytics.views;
             // @ts-ignore
             if (signedThumb) sub.thumbnailUrl = signedThumb;
        }

        return {
            ...sub,
            signedToken,
            views
        };
    }));
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
        },
        // video relation doesn't exist on Submission model
        feedbacks: true, // Include feedbacks relation (plural)
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
  async generateUploadUrl(userId: string, uploadLength: number, metadata: Record<string, string> = {}): Promise<any> {
      const uploadUrl = await this.cloudflare.getDirectUploadUrl(userId, uploadLength, metadata);
      // Retrieve the uid from the uploadUrl? Or Cloudflare returns it?
      // Cloudflare's direct_upload V2 returns uploadURL. The UID is part of the response usually,
      // but getDirectUploadUrl only returns string.
      // Wait, let's check getDirectUploadUrl again. It returns string (uploadUrl).
      // The frontend needs the UID to save it.
      // Actually, TUS upload url is usually https://api.cloudflare.com/client/v4/accounts/.../stream
      // The UID is returned in the 'Stream-Media-ID' header of the Creation response (which happens on frontend).
      // BUT, Cloudflare Direct Upload V2 might return the UID in the response body of the creation request?
      // No, the creation request happens here on the server.
      // Ah, getDirectUploadUrl implementation returns response.data.result.uploadURL.
      // We might want to return the UID too if available.
      // Let's modify this service to just return the uploadUrl for now,
      // Frontend TUS client gets the UID from the 'Stream-Media-ID' header or the upload URL itself.

      return { uploadUrl };
  }

  async generateCaptions(id: string) {
      const submission = await this.findOne(id);
      // @ts-ignore
      if (!submission.streamUid) {
          throw new NotFoundException('No stream UID found for this submission');
      }
      // @ts-ignore
      return this.cloudflare.generateCaptions(submission.streamUid);
  }

  async uploadCaption(id: string, language: string, fileBuffer: Buffer) {
      const submission = await this.findOne(id);
      // @ts-ignore
      if (!submission.streamUid) {
          throw new NotFoundException('No stream UID found for this submission');
      }
      // @ts-ignore
      return this.cloudflare.uploadCaption(submission.streamUid, language, fileBuffer);
  }
}
