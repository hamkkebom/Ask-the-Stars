import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { PrismaService } from '../../database/prisma.service';
import { CreateProjectDto, CreateProjectRequestDto } from './dto';
import { createPrismaMock } from '../../../test/utils/prisma.mock';
import { validateDto } from '../../../test/utils/validation';

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prisma: ReturnType<typeof createPrismaMock>;

  beforeEach(async () => {
    prisma = createPrismaMock(() => jest.fn());
    prisma.$transaction.mockImplementation(
      async (callback: (tx: typeof prisma) => Promise<unknown> | unknown) =>
        callback(prisma)
    );

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
  });

  it('creates a project', async () => {
    const dto: CreateProjectDto = { title: 'Project' };
    prisma.project.create.mockResolvedValue({ id: 'project-1' });

    const result = await service.create('user-1', dto);

    expect(prisma.project.create).toHaveBeenCalledWith({
      data: { ...dto, ownerId: 'user-1' },
    });
    expect(result.id).toBe('project-1');
  });

  it('returns all projects for counselor', async () => {
    prisma.project.findMany.mockResolvedValue([{ id: 'project-1' }]);

    const result = await service.findAll({ id: 'user-1', role: 'COUNSELOR' });

    expect(prisma.project.findMany).toHaveBeenCalled();
    expect(result).toHaveLength(1);
  });

  it('returns own projects for star', async () => {
    prisma.project.findMany.mockResolvedValue([{ id: 'project-1' }]);

    const result = await service.findAll({ id: 'user-1', role: 'STAR' });

    expect(prisma.project.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { ownerId: 'user-1' } })
    );
    expect(result).toHaveLength(1);
  });

  it('throws when project not found', async () => {
    prisma.project.findUnique.mockResolvedValue(null);

    await expect(service.findOne('missing')).rejects.toBeInstanceOf(
      NotFoundException
    );
  });

  it('throws when updating without permission', async () => {
    prisma.project.findUnique.mockResolvedValue({
      id: 'project-1',
      ownerId: 'x',
    });

    await expect(
      service.update('project-1', 'user-1', { title: 'Updated' })
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('updates project when owner matches', async () => {
    prisma.project.findUnique.mockResolvedValue({
      id: 'project-1',
      ownerId: 'user-1',
    });
    prisma.project.update.mockResolvedValue({
      id: 'project-1',
      title: 'Updated',
    });

    const result = await service.update('project-1', 'user-1', {
      title: 'Updated',
    });

    expect(prisma.project.update).toHaveBeenCalledWith({
      where: { id: 'project-1' },
      data: { title: 'Updated' },
    });
    expect(result.title).toBe('Updated');
  });

  it('throws when removing without permission', async () => {
    prisma.project.findUnique.mockResolvedValue({
      id: 'project-1',
      ownerId: 'x',
    });

    await expect(service.remove('project-1', 'user-1')).rejects.toBeInstanceOf(
      ForbiddenException
    );
  });

  it('removes project when owner matches', async () => {
    prisma.project.findUnique.mockResolvedValue({
      id: 'project-1',
      ownerId: 'user-1',
    });
    prisma.project.delete.mockResolvedValue({ id: 'project-1' });

    const result = await service.remove('project-1', 'user-1');

    expect(prisma.project.delete).toHaveBeenCalledWith({
      where: { id: 'project-1' },
    });
    expect(result.id).toBe('project-1');
  });

  it('creates project request', async () => {
    prisma.projectRequest.create.mockResolvedValue({ id: 'request-1' });

    const result = await service.createRequest('user-1', {
      title: 'Request',
      categories: ['A'],
      deadline: new Date().toISOString(),
    } as CreateProjectRequestDto);

    expect(prisma.projectRequest.create).toHaveBeenCalled();
    expect(result.id).toBe('request-1');
  });

  it('returns project requests', async () => {
    prisma.projectRequest.findMany.mockResolvedValue([{ id: 'request-1' }]);

    const result = await service.findAllRequests();

    expect(result).toHaveLength(1);
  });

  it('returns assignments for user', async () => {
    prisma.projectAssignment.findMany.mockResolvedValue([{ id: 'assign-1' }]);

    const result = await service.getMyAssignments('user-1');

    expect(result).toHaveLength(1);
  });

  it('throws when request not found', async () => {
    prisma.projectRequest.findUnique.mockResolvedValue(null);

    await expect(service.getRequest('missing')).rejects.toBeInstanceOf(
      NotFoundException
    );
  });

  it('prevents accepting non-open request', async () => {
    prisma.projectRequest.findUnique.mockResolvedValue({
      id: 'request-1',
      status: 'FULL',
      currentAssignees: 0,
      maxAssignees: 1,
      assignments: [],
    });

    await expect(
      service.acceptRequest('request-1', 'user-1')
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('prevents accepting when capacity reached', async () => {
    prisma.projectRequest.findUnique.mockResolvedValue({
      id: 'request-1',
      status: 'OPEN',
      currentAssignees: 1,
      maxAssignees: 1,
      assignments: [],
    });
    prisma.projectAssignment.findUnique.mockResolvedValue(null);

    await expect(
      service.acceptRequest('request-1', 'user-1')
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('accepts request and updates counts', async () => {
    prisma.projectRequest.findUnique.mockResolvedValue({
      id: 'request-1',
      status: 'OPEN',
      currentAssignees: 0,
      maxAssignees: 1,
      assignments: [],
    });
    prisma.projectAssignment.findUnique.mockResolvedValue(null);
    prisma.projectAssignment.create.mockResolvedValue({ id: 'assign-1' });
    prisma.projectRequest.update.mockResolvedValue({ id: 'request-1' });

    const result = await service.acceptRequest('request-1', 'user-1');

    expect(result.id).toBe('assign-1');
    expect(prisma.projectRequest.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ currentAssignees: { increment: 1 } }),
      })
    );
  });

  it('prevents accepting duplicate request', async () => {
    prisma.projectRequest.findUnique.mockResolvedValue({
      id: 'request-1',
      status: 'OPEN',
      currentAssignees: 0,
      maxAssignees: 2,
      assignments: [],
    });
    prisma.projectAssignment.findUnique.mockResolvedValue({
      id: 'assignment-1',
    });

    await expect(
      service.acceptRequest('request-1', 'user-1')
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  describe('dto validation', () => {
    it('validates create project request dto', async () => {
      const dto = new CreateProjectRequestDto();
      dto.title = '';
      dto.categories = [];
      dto.deadline = 'invalid-date';

      const errors = await validateDto(dto);

      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
