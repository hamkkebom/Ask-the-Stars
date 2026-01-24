import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import axios from 'axios';
import FormData from 'form-data';

@Injectable()
export class UploadsService {
  private s3Client: S3Client;
  private bucketName: string;
  private cloudflareAccountId: string;
  private cloudflareStreamToken: string;

  constructor(private readonly configService: ConfigService) {
    this.cloudflareAccountId = this.configService.get<string>('CLOUDFLARE_ACCOUNT_ID', '');
    this.cloudflareStreamToken = this.configService.get<string>('CLOUDFLARE_STREAM_TOKEN', '');
    const accessKeyId = this.configService.get<string>('CLOUDFLARE_R2_ACCESS_KEY_ID', '');
    const secretAccessKey = this.configService.get<string>('CLOUDFLARE_R2_SECRET_ACCESS_KEY', '');

    this.bucketName = this.configService.get<string>('CLOUDFLARE_R2_BUCKET_NAME', 'hamkkebom-uploads');

    const endpoint = `https://${this.cloudflareAccountId}.r2.cloudflarestorage.com`;

    this.s3Client = new S3Client({
      region: 'auto',
      endpoint,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(file: any, folder: string = 'misc'): Promise<{ url: string; key: string; streamId?: string }> {
    try {
      const isVideo = file.mimetype.startsWith('video/');
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = file.originalname.split('.').pop();
      const key = `${folder}/${uniqueSuffix}.${extension}`;

      // 1. R2 원본 저장 (백업용)
      try {
        await this.s3Client.send(
          new PutObjectCommand({
            Bucket: this.bucketName,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
          }),
        );
      } catch (r2Error) {
        console.warn('⚠️ R2 Upload failed (Proceeding to Stream):', (r2Error as any).message);
      }

      const publicUrl = this.configService.get<string>('CLOUDFLARE_PUBLIC_Url');
      let url = publicUrl ? `${publicUrl}/${key}` : `https://${this.bucketName}.r2.cloudflarestorage.com/${key}`;
      let streamId: string | undefined;

      // 2. 비디오인 경우 Cloudflare Stream 업로드
      if (isVideo && this.cloudflareStreamToken) {
        streamId = await this.uploadToStream(file);
        // Stream ID가 있으면 기본 URL을 Stream용으로 사용할 수도 있음 (선택 사항)
      }

      return { url, key, streamId };
    } catch (error) {
      console.error('Upload Error:', error);
      throw new InternalServerErrorException('파일 업로드에 실패했습니다.');
    }
  }

  private async uploadToStream(file: any): Promise<string> {
    const formData = new FormData();
    formData.append('file', file.buffer, { filename: file.originalname });

    const response = await axios.post(
      `https://api.cloudflare.com/client/v4/accounts/${this.cloudflareAccountId}/stream`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${this.cloudflareStreamToken}`,
          ...formData.getHeaders(),
        },
      },
    );

    if (response.data.success) {
      return response.data.result.uid;
    }
    throw new Error('Cloudflare Stream upload failed');
  }

  async getSignedStreamUrl(streamId: string): Promise<string> {
    // 유료 콘텐츠를 위한 서명된 URL 생성 로직 (현재는 기본 시청 URL 반환)
    // 실제 구현 시 Cloudflare Signing Key를 사용하여 JWT 토큰을 발행해야 함
    return `https://customer-${this.cloudflareAccountId}.cloudflarestream.com/${streamId}/manifest/video.m3u8`;
  }

  async listFiles(prefix?: string): Promise<any[]> {
    try {
      let allFiles: any[] = [];
      let continuationToken: string | undefined;

      const publicUrl = this.configService.get<string>('CLOUDFLARE_PUBLIC_Url');
      const r2Url = `https://${this.bucketName}.r2.cloudflarestorage.com`;
      const baseUrl = publicUrl || r2Url;

      do {
        const command = new ListObjectsV2Command({
          Bucket: this.bucketName,
          Prefix: prefix,
          ContinuationToken: continuationToken,
        });

        const response = await this.s3Client.send(command);
        const contents = (response.Contents || []).map((file) => ({
          key: file.Key,
          size: file.Size,
          lastModified: file.LastModified,
          url: `${baseUrl}/${file.Key}`,
          folder: file.Key?.split('/')[0] || 'root',
        }));

        allFiles = allFiles.concat(contents);
        continuationToken = response.NextContinuationToken;
      } while (continuationToken);

      return allFiles;
    } catch (error) {
      console.error('List Files Error details:', error);
      throw error;
    }
  }
}
