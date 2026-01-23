import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  async listVideos(): Promise<any[]> {
    return this.videosService.listAllFinalVideos();
  }

  @Get('project/:projectNo')
  async getProjectVideo(@Param('projectNo', ParseIntPipe) projectNo: number): Promise<any> {
    return this.videosService.getVideoByProjectNo(projectNo);
  }

  @Get(':id')
  async getVideoDetails(@Param('id') id: string): Promise<any> {
    return this.videosService.getVideoById(id);
  }

  @Get('channel/:name')
  async getChannelVideos(@Param('name') name: string): Promise<any> {
      return this.videosService.listVideosByChannel(name);
  }

  @Get('database/keys')
  async getAllVideoKeys(): Promise<string[]> {
      return this.videosService.getAllRegisteredKeys();
  }
}
