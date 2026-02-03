import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { PrismaService } from '../../database/prisma.service';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto';
import { createPrismaMock } from '../../../test/utils/prisma.mock';
import { validateDto } from '../../../test/utils/validation';
import { FeedbackStatus } from '@ask-the-stars/database';

describe('FeedbackService', () => {
  let service: FeedbackService;
  let prisma: ReturnType<typeof createPrismaMock>;

  beforeEach(async () => {
    prisma = createPrismaMock(() => jest.fn());

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FeedbackService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<FeedbackService>(FeedbackService);
  });

  it('throws when submission is missing', async () => {
    prisma.submission.findUnique.mockResolvedValue(null);

    await expect(
      service.create('user-1', {
        submissionId: 'sub-1',
        content: 'content',
      })
    ).rejects.toBeInstanceOf(NotFoundException);
  });

  it('creates feedback when submission exists', async () => {
    prisma.submission.findUnique.mockResolvedValue({ id: 'sub-1' });
    prisma.feedback.create.mockResolvedValue({ id: 'fb-1' });

    const result = await service.create('user-1', {
      submissionId: 'sub-1',
      content: 'content',
    });

    expect(prisma.feedback.create).toHaveBeenCalled();
    expect(result.id).toBe('fb-1');
  });

  it('allows author to update feedback', async () => {
    prisma.feedback.findUnique.mockResolvedValue({
      id: 'fb-1',
      userId: 'user-1',
      submission: { userId: 'other', project: { ownerId: 'other' } },
    });
    prisma.feedback.update.mockResolvedValue({ id: 'fb-1' });

    const result = await service.update('fb-1', 'user-1', { content: 'new' });

    expect(result.id).toBe('fb-1');
  });

  it('allows submission owner to update status only', async () => {
    prisma.feedback.findUnique.mockResolvedValue({
      id: 'fb-1',
      userId: 'author',
      submission: { userId: 'user-1', project: { ownerId: 'other' } },
    });
    prisma.feedback.update.mockResolvedValue({ id: 'fb-1' });

    const result = await service.update('fb-1', 'user-1', {
      status: FeedbackStatus.RESOLVED,
    });

    expect(result.id).toBe('fb-1');
  });

  it('allows project owner to update status only', async () => {
    prisma.feedback.findUnique.mockResolvedValue({
      id: 'fb-1',
      userId: 'author',
      submission: { userId: 'other', project: { ownerId: 'user-1' } },
    });
    prisma.feedback.update.mockResolvedValue({ id: 'fb-1' });

    const result = await service.update('fb-1', 'user-1', {
      status: FeedbackStatus.RESOLVED,
    });

    expect(result.id).toBe('fb-1');
  });

  it('rejects update when feedback missing', async () => {
    prisma.feedback.findUnique.mockResolvedValue(null);

    await expect(
      service.update('fb-1', 'user-1', { status: FeedbackStatus.RESOLVED })
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('rejects non-author content update', async () => {
    prisma.feedback.findUnique.mockResolvedValue({
      id: 'fb-1',
      userId: 'author',
      submission: { userId: 'other', project: { ownerId: 'user-2' } },
    });

    await expect(
      service.update('fb-1', 'user-1', { content: 'new' })
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('rejects delete by non-author', async () => {
    prisma.feedback.findUnique.mockResolvedValue({
      id: 'fb-1',
      userId: 'author',
    });

    await expect(service.remove('fb-1', 'user-1')).rejects.toBeInstanceOf(
      ForbiddenException
    );
  });

  it('removes feedback when author', async () => {
    prisma.feedback.findUnique.mockResolvedValue({
      id: 'fb-1',
      userId: 'user-1',
    });
    prisma.feedback.delete.mockResolvedValue({ id: 'fb-1' });

    const result = await service.remove('fb-1', 'user-1');

    expect(prisma.feedback.delete).toHaveBeenCalledWith({
      where: { id: 'fb-1' },
    });
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

    it('validates update feedback dto', async () => {
      const dto = new UpdateFeedbackDto();
      dto.status = 'INVALID' as never;

      const errors = await validateDto(dto);

      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
