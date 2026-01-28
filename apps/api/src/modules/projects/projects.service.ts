import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { AssignmentType } from '@prisma/client';
import { CreateProjectDto, UpdateProjectDto, CreateProjectRequestDto } from './dto';

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

  // --- Project Requests (Board) ---

  async createRequest(userId: string, createDto: CreateProjectRequestDto) {
      return this.prisma.projectRequest.create({
          data: {
              ...createDto,
              createdById: userId,
              status: 'OPEN',
              currentAssignees: 0,
              assignmentType: createDto.assignmentType || AssignmentType.MULTIPLE,
          }
      });
  }

  async findAllRequests(): Promise<any> {
      return this.prisma.projectRequest.findMany({
          // where: { status: 'OPEN' }, // Start can view FULL/CLOSED too? Maybe filters on frontend.
          orderBy: { createdAt: 'desc' },
          include: {
              createdBy: { select: { id: true, name: true } }
          }
      });
  }

  async getMyAssignments(userId: string): Promise<any> {
      return this.prisma.projectAssignment.findMany({
          where: { freelancerId: userId },
          orderBy: { createdAt: 'desc' },
          include: {
              request: {
                  include: {
                      createdBy: { select: { id: true, name: true, profileImage: true } } // Project Owner (Agency/Admin)
                  }
              },
              submissions: {
                  orderBy: { version: 'desc' },
                  take: 1 // Get latest submission to show status
              }
          }
      });
  }

  async getRequest(id: string): Promise<any> {
      const request = await this.prisma.projectRequest.findUnique({
          where: { id },
          include: {
              assignments: true // Check current assignees
          }
      });
      if (!request) throw new NotFoundException('요청을 찾을 수 없습니다.');
      return request;
  }

  async acceptRequest(requestId: string, userId: string): Promise<any> {
      const request = await this.getRequest(requestId);

      if (request.status !== 'OPEN') {
          throw new ForbiddenException('마감된 요청입니다.');
      }

      // Check duplications
      const existing = await this.prisma.projectAssignment.findUnique({
          where: {
              requestId_freelancerId: {
                  requestId,
                  freelancerId: userId
              }
          }
      });

      if (existing) {
          throw new ForbiddenException('이미 지원/수락한 요청입니다.');
      }

      // Check Capacity
      if (request.currentAssignees >= request.maxAssignees) {
          throw new ForbiddenException('정원이 초과되었습니다.');
      }

      // Create Assignment (Transaction to update count)
      return this.prisma.$transaction(async (tx) => {
          const assignment = await tx.projectAssignment.create({
              data: {
                  requestId,
                  freelancerId: userId,
                  status: 'ACCEPTED'
              }
          });

          // Update count
          await tx.projectRequest.update({
              where: { id: requestId },
              data: {
                  currentAssignees: { increment: 1 },
                  // Close if full
                  status: (request.currentAssignees + 1) >= request.maxAssignees ? 'FULL' : 'OPEN'
              }
          });

          return assignment;
      });
  }
}
