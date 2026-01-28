import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request, Query, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateSubmissionDto, UpdateSubmissionDto, GenerateUploadUrlDto } from './dto';

@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post('upload-url')
  async generateUploadUrl(@Request() req: any, @Body() dto: GenerateUploadUrlDto): Promise<any> {
    return this.submissionsService.generateUploadUrl(req.user.id, dto.uploadLength, dto.metadata);
  }

  @Post(':id/captions')
  async triggerCaptions(@Param('id') id: string) {
      const result = await this.submissionsService.generateCaptions(id);
      return { success: result };
  }

  @Put(':id/captions/:language')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCaption(
      @Param('id') id: string,
      @Param('language') language: string,
      @UploadedFile() file: any // Avoid Multer type
  ) {
      if (!file) throw new Error('File is required');
      const success = await this.submissionsService.uploadCaption(id, language, file.buffer);
      return { success };
  }

  @Post()
  async create(@Request() req: any, @Body() createSubmissionDto: CreateSubmissionDto): Promise<any> {
    return this.submissionsService.create(req.user.id, createSubmissionDto);
  }

  @Get('my')
  async findMySubmissions(@Request() req: any): Promise<any> {
      return this.submissionsService.findAllByUser(req.user.id);
  }

  @Get()
  async findAll(@Query('projectId') projectId?: string): Promise<any> {
    return this.submissionsService.findAll(projectId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.submissionsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
  ): Promise<any> {
    return this.submissionsService.update(id, req.user, updateSubmissionDto);
  }

  @Delete(':id')
  async remove(@Request() req: any, @Param('id') id: string): Promise<any> {
    return this.submissionsService.remove(id, req.user);
  }
}
