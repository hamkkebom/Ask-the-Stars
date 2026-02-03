import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PresignedUrlDto {
  @ApiProperty({
    description: '파일 경로 (경로 순회 공격 방지)',
    example: 'videos/project-123/video.mp4',
    pattern: '^(?!.*\\.\\.)(?!.*\\\\\\\\)[a-zA-Z0-9/_.-]+$',
  })
  @IsString({ message: '파일 경로는 문자열이어야 합니다' })
  @Matches(/^(?!.*\.\.)(?!.*\\\\)[a-zA-Z0-9/_.-]+$/, {
    message:
      '파일 경로는 영문, 숫자, 슬래시, 언더스코어, 하이픈, 점만 포함할 수 있으며 ".." 또는 백슬래시를 포함할 수 없습니다',
  })
  key!: string;

  @ApiProperty({
    description: '파일 MIME 타입 (화이트리스트)',
    example: 'video/mp4',
    pattern: '^(video|image)/[a-z0-9+\\-]+$',
  })
  @IsString({ message: 'MIME 타입은 문자열이어야 합니다' })
  @Matches(/^(video|image)\/[a-z0-9+\-]+$/, {
    message: 'MIME 타입은 video/* 또는 image/*만 허용됩니다',
  })
  contentType!: string;
}
