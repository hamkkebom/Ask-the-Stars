import { Test, TestingModule } from '@nestjs/testing';
import { FfprobeService } from './ffprobe.service';

describe('FfprobeService', () => {
  let service: FfprobeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FfprobeService],
    }).compile();

    service = module.get<FfprobeService>(FfprobeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return null when metadata extraction fails', async () => {
    // Empty buffer should fail gracefully
    const result = await service.extractMetadata(Buffer.from([]), 'test.mp4');
    expect(result).toBeNull();
  });

  it('should return null for invalid file content', async () => {
    // Invalid video data
    const result = await service.extractMetadata(
      Buffer.from('not a video file'),
      'test.mp4'
    );
    expect(result).toBeNull();
  });
});
