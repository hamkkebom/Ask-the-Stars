import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateSubmissionDto, UpdateSubmissionDto } from './dto';

@Controller('submissions')
@UseGuards(JwtAuthGuard)
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Post()
  async create(@Request() req: any, @Body() createSubmissionDto: CreateSubmissionDto): Promise<any> {
    return this.submissionsService.create(req.user.id, createSubmissionDto);
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
    return this.submissionsService.update(id, req.user.id, updateSubmissionDto);
  }

  @Delete(':id')
  async remove(@Request() req: any, @Param('id') id: string): Promise<any> {
    return this.submissionsService.remove(id, req.user.id);
  }
}
