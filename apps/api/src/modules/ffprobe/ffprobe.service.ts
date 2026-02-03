import { Injectable, Logger } from '@nestjs/common';
import ffmpeg = require('fluent-ffmpeg');
import * as path from 'path';
import * as fs from 'fs';
import * as os from 'os';

export interface VideoMetadata {
  width: number;
  height: number;
  duration: number; // seconds
  fps: number;
  videoCodec: string;
  audioCodec: string | null;
  audioChannels: number | null;
  sampleRate: number | null;
  overallBitrate: number; // bps
  format: string;
  aspectRatio: string;
  pixelFormat: string | null;
}

@Injectable()
export class FfprobeService {
  private readonly logger = new Logger(FfprobeService.name);

  /**
   * Extract video metadata from a file buffer
   * @param buffer - Video file buffer
   * @param originalFilename - Original filename for format detection
   */
  async extractMetadata(
    buffer: Buffer,
    originalFilename: string
  ): Promise<VideoMetadata | null> {
    // Write buffer to temp file (ffprobe needs a file path)
    const tempDir = os.tmpdir();
    const ext = path.extname(originalFilename) || '.mp4';
    const tempPath = path.join(tempDir, `ffprobe_${Date.now()}${ext}`);

    try {
      fs.writeFileSync(tempPath, buffer);

      const metadata = await this.probeFile(tempPath);
      return metadata;
    } catch (error: any) {
      this.logger.error(`Failed to extract metadata: ${error.message}`);
      return null;
    } finally {
      // Cleanup temp file
      try {
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      } catch (_cleanupError) {
        this.logger.warn(`Failed to cleanup temp file: ${tempPath}`);
      }
    }
  }

  /**
   * Probe a file path and extract metadata
   */
  private probeFile(filePath: string): Promise<VideoMetadata> {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(filePath, (err, data) => {
        if (err) {
          return reject(err);
        }

        try {
          const videoStream = data.streams.find(
            (s) => s.codec_type === 'video'
          );
          const audioStream = data.streams.find(
            (s) => s.codec_type === 'audio'
          );
          const format = data.format;

          if (!videoStream) {
            return reject(new Error('No video stream found'));
          }

          // Parse FPS from avg_frame_rate (e.g., "30000/1001" -> 29.97)
          let fps = 0;
          if (videoStream.avg_frame_rate) {
            const [num, den] = videoStream.avg_frame_rate
              .split('/')
              .map(Number);
            fps = den ? Math.round((num / den) * 100) / 100 : num;
          }

          // Build aspect ratio string
          let aspectRatio = '';
          if (videoStream.width && videoStream.height) {
            const gcd = this.gcd(videoStream.width, videoStream.height);
            aspectRatio = `${videoStream.width / gcd}:${videoStream.height / gcd}`;
          }

          const metadata: VideoMetadata = {
            width: videoStream.width || 0,
            height: videoStream.height || 0,
            duration: parseFloat(String(format.duration ?? '0')),
            fps,
            videoCodec: videoStream.codec_name || 'unknown',
            audioCodec: audioStream?.codec_name || null,
            audioChannels: audioStream?.channels || null,
            sampleRate: audioStream?.sample_rate
              ? parseInt(String(audioStream.sample_rate), 10)
              : null,
            overallBitrate: format.bit_rate
              ? parseInt(String(format.bit_rate), 10)
              : 0,
            format: format.format_name?.split(',')[0] || 'unknown',
            aspectRatio,
            pixelFormat: videoStream.pix_fmt || null,
          };

          resolve(metadata);
        } catch (parseError: any) {
          reject(
            new Error(`Failed to parse ffprobe output: ${parseError.message}`)
          );
        }
      });
    });
  }

  /**
   * Greatest common divisor for aspect ratio calculation
   */
  private gcd(a: number, b: number): number {
    return b === 0 ? a : this.gcd(b, a % b);
  }
}
