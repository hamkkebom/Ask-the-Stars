import { Test, TestingModule } from '@nestjs/testing';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateFeedbackDto } from './dto';
import { validateDto } from '../../../test/utils/validation';

describe('FeedbackController', () => {
  let controller: FeedbackController;
  let service: FeedbackService;

  beforeEach(async () => {
    const moduleBuilder = Test.createTestingModule({
      controllers: [FeedbackController],
      providers: [
        {
          provide: FeedbackService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
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

    controller = module.get<FeedbackController>(FeedbackController);
    service = module.get<FeedbackService>(FeedbackService);
  });

  it('uses JwtAuthGuard', () => {
    const guards = Reflect.getMetadata(GUARDS_METADATA, FeedbackController) as
      | Array<new (...args: never[]) => unknown>
      | undefined;

    expect(guards?.some((guard) => guard === JwtAuthGuard)).toBe(true);
  });

  it('creates feedback', async () => {
    (service.create as jest.Mock).mockResolvedValue({ id: 'fb-1' });
    const dto: CreateFeedbackDto = { submissionId: 'sub-1', content: 'text' };

    const result = await controller.create({ user: { id: 'user-1' } }, dto);

    expect(service.create).toHaveBeenCalledWith('user-1', dto);
    expect(result.id).toBe('fb-1');
  });

  it('lists feedback', async () => {
    (service.findAll as jest.Mock).mockResolvedValue([{ id: 'fb-1' }]);

    const result = await controller.findAll('sub-1');

    expect(service.findAll).toHaveBeenCalledWith('sub-1');
    expect(result).toHaveLength(1);
  });

  it('updates feedback', async () => {
    (service.update as jest.Mock).mockResolvedValue({ id: 'fb-1' });

    const result = await controller.update({ user: { id: 'user-1' } }, 'fb-1', {
      content: 'new',
    });

    expect(service.update).toHaveBeenCalledWith('fb-1', 'user-1', {
      content: 'new',
    });
    expect(result.id).toBe('fb-1');
  });

  it('returns feedback by id', async () => {
    (service.findOne as jest.Mock).mockResolvedValue({ id: 'fb-1' });

    const result = await controller.findOne('fb-1');

    expect(service.findOne).toHaveBeenCalledWith('fb-1');
    expect(result.id).toBe('fb-1');
  });

  it('removes feedback', async () => {
    (service.remove as jest.Mock).mockResolvedValue({ id: 'fb-1' });

    const result = await controller.remove({ user: { id: 'user-1' } }, 'fb-1');

    expect(service.remove).toHaveBeenCalledWith('fb-1', 'user-1');
    expect(result.id).toBe('fb-1');
  });

  describe('dto validation', () => {
    it('validates create feedback dto', async () => {
      const dto = new CreateFeedbackDto();
      dto.submissionId = '';
      dto.content = '';

      const errors = await validateDto(dto);

      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
