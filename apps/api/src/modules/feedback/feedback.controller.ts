import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto';

@Controller('feedback')
@UseGuards(JwtAuthGuard)
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  async create(@Request() req: any, @Body() createFeedbackDto: CreateFeedbackDto): Promise<any> {
    return this.feedbackService.create(req.user.id, createFeedbackDto);
  }

  @Get()
  async findAll(@Query('submissionId') submissionId?: string): Promise<any> {
    return this.feedbackService.findAll(submissionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.feedbackService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto,
  ): Promise<any> {
    return this.feedbackService.update(id, req.user.id, updateFeedbackDto);
  }

  @Delete(':id')
  async remove(@Request() req: any, @Param('id') id: string): Promise<any> {
    return this.feedbackService.remove(id, req.user.id);
  }
}
