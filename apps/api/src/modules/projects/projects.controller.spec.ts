import { Test, TestingModule } from '@nestjs/testing';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateProjectDto } from './dto';
import { validateDto } from '../../../test/utils/validation';

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const moduleBuilder = Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findAllRequests: jest.fn(),
            getMyAssignments: jest.fn(),
            acceptRequest: jest.fn(),
            createRequest: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: jest.fn().mockReturnValue(true),
      });

    const module: TestingModule = await moduleBuilder.compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('uses JwtAuthGuard', () => {
    const guards = Reflect.getMetadata(GUARDS_METADATA, ProjectsController) as
      | Array<new (...args: never[]) => unknown>
      | undefined;

    expect(guards?.some((guard) => guard === JwtAuthGuard)).toBe(true);
  });

  it('creates a project', async () => {
    (service.create as jest.Mock).mockResolvedValue({ id: 'project-1' });
    const dto: CreateProjectDto = { title: 'Project' };

    const result = await controller.create({ user: { id: 'user-1' } }, dto);

    expect(service.create).toHaveBeenCalledWith('user-1', dto);
    expect(result.id).toBe('project-1');
  });

  it('returns project requests', async () => {
    (service.findAllRequests as jest.Mock).mockResolvedValue([{ id: 'req-1' }]);

    const result = await controller.getProjectRequests();

    expect(result).toHaveLength(1);
  });

  it('returns projects for user', async () => {
    (service.findAll as jest.Mock).mockResolvedValue([{ id: 'project-1' }]);

    const result = await controller.findAll({ user: { id: 'user-1' } });

    expect(service.findAll).toHaveBeenCalledWith({ id: 'user-1' });
    expect(result).toHaveLength(1);
  });

  it('returns my assignments', async () => {
    (service.getMyAssignments as jest.Mock).mockResolvedValue([
      { id: 'assign-1' },
    ]);

    const result = await controller.getMyAssignments({
      user: { id: 'user-1' },
    });

    expect(service.getMyAssignments).toHaveBeenCalledWith('user-1');
    expect(result).toHaveLength(1);
  });

  it('creates project request', async () => {
    (service.createRequest as jest.Mock).mockResolvedValue({ id: 'request-1' });

    const result = await controller.createRequest(
      { user: { id: 'user-1' } },
      {
        title: 'Request',
        categories: ['A'],
        deadline: new Date().toISOString(),
      }
    );

    expect(service.createRequest).toHaveBeenCalled();
    expect(result.id).toBe('request-1');
  });

  it('returns project by id', async () => {
    (service.findOne as jest.Mock).mockResolvedValue({ id: 'project-1' });

    const result = await controller.findOne('project-1');

    expect(service.findOne).toHaveBeenCalledWith('project-1');
    expect(result.id).toBe('project-1');
  });

  it('accepts project request', async () => {
    (service.acceptRequest as jest.Mock).mockResolvedValue({ id: 'assign-1' });

    const result = await controller.acceptRequest('req-1', {
      user: { id: 'user-1' },
    });

    expect(service.acceptRequest).toHaveBeenCalledWith('req-1', 'user-1');
    expect(result.id).toBe('assign-1');
  });

  it('updates project', async () => {
    (service.update as jest.Mock).mockResolvedValue({ id: 'project-1' });

    const result = await controller.update(
      { user: { id: 'user-1' } },
      'project-1',
      { title: 'Updated' }
    );

    expect(service.update).toHaveBeenCalledWith('project-1', 'user-1', {
      title: 'Updated',
    });
    expect(result.id).toBe('project-1');
  });

  it('removes project', async () => {
    (service.remove as jest.Mock).mockResolvedValue({ id: 'project-1' });

    const result = await controller.remove(
      { user: { id: 'user-1' } },
      'project-1'
    );

    expect(service.remove).toHaveBeenCalledWith('project-1', 'user-1');
    expect(result.id).toBe('project-1');
  });

  describe('dto validation', () => {
    it('validates create project dto', async () => {
      const dto = new CreateProjectDto();

      const errors = await validateDto(dto);

      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
