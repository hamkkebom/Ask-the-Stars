import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateFeedbackDto, UpdateFeedbackDto } from './dto';

@ApiTags('feedback')
@ApiBearerAuth('Bearer')
@ApiResponse({ status: 500, description: 'Internal server error' })
@Controller({ path: 'feedback', version: '1' })
@UseGuards(JwtAuthGuard)
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @ApiOperation({ summary: 'Create feedback' })
  @ApiResponse({ status: 201, description: 'Feedback created' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(
    @Request() req: any,
    @Body() createFeedbackDto: CreateFeedbackDto
  ): Promise<any> {
    return this.feedbackService.create(req.user.id, createFeedbackDto);
  }

  @Get()
  @ApiOperation({ summary: 'List feedback' })
  @ApiQuery({
    name: 'submissionId',
    required: false,
    example: 'submission_123',
  })
  @ApiResponse({ status: 200, description: 'Feedback list retrieved' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll(@Query('submissionId') submissionId?: string): Promise<any> {
    return this.feedbackService.findAll(submissionId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get feedback by id' })
  @ApiParam({ name: 'id', example: 'feedback_123' })
  @ApiResponse({ status: 200, description: 'Feedback retrieved' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Feedback not found' })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.feedbackService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update feedback' })
  @ApiParam({ name: 'id', example: 'feedback_123' })
  @ApiResponse({ status: 200, description: 'Feedback updated' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Feedback not found' })
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateFeedbackDto: UpdateFeedbackDto
  ): Promise<any> {
    return this.feedbackService.update(id, req.user.id, updateFeedbackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete feedback' })
  @ApiParam({ name: 'id', example: 'feedback_123' })
  @ApiResponse({ status: 200, description: 'Feedback removed' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Feedback not found' })
  async remove(@Request() req: any, @Param('id') id: string): Promise<any> {
    return this.feedbackService.remove(id, req.user.id);
  }
}
