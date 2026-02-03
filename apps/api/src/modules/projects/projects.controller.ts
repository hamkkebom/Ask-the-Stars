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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  CreateProjectDto,
  UpdateProjectDto,
  CreateProjectRequestDto,
} from './dto';

@ApiTags('projects')
@ApiBearerAuth('Bearer')
@ApiResponse({ status: 500, description: 'Internal server error' })
@Controller({ path: 'projects', version: '1' })
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Create project' })
  @ApiResponse({ status: 201, description: 'Project created' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async create(
    @Request() req: any,
    @Body() createProjectDto: CreateProjectDto
  ): Promise<any> {
    return this.projectsService.create(req.user.id, createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'List projects' })
  @ApiResponse({ status: 200, description: 'Projects retrieved' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll(@Request() req: any): Promise<any> {
    // Pass the full user object (id, role, etc.)
    return this.projectsService.findAll(req.user);
  }

  // --- Project Board Endpoints ---

  @Get('requests/board')
  @ApiOperation({ summary: 'Get project request board' })
  @ApiResponse({ status: 200, description: 'Project requests retrieved' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getProjectRequests(): Promise<any> {
    // Publicly available to authenticated Starts?
    return this.projectsService.findAllRequests();
  }

  @Get('my-assignments')
  @ApiOperation({ summary: 'Get my assignments' })
  @ApiResponse({ status: 200, description: 'Assignments retrieved' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async getMyAssignments(@Request() req: any): Promise<any> {
    return this.projectsService.getMyAssignments(req.user.id);
  }

  @Post('requests/:id/accept')
  @ApiOperation({ summary: 'Accept project request' })
  @ApiParam({ name: 'id', example: 'request_123' })
  @ApiResponse({ status: 200, description: 'Request accepted' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Request not found' })
  async acceptRequest(
    @Param('id') id: string,
    @Request() req: any
  ): Promise<any> {
    return this.projectsService.acceptRequest(id, req.user.id);
  }

  @Post('requests')
  @ApiOperation({ summary: 'Create project request' })
  @ApiResponse({ status: 201, description: 'Project request created' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async createRequest(
    @Request() req: any,
    @Body() createDto: CreateProjectRequestDto
  ): Promise<any> {
    return this.projectsService.createRequest(req.user.id, createDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project by id' })
  @ApiParam({ name: 'id', example: 'project_123' })
  @ApiResponse({ status: 200, description: 'Project retrieved' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  async findOne(@Param('id') id: string): Promise<any> {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project' })
  @ApiParam({ name: 'id', example: 'project_123' })
  @ApiResponse({ status: 200, description: 'Project updated' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto
  ): Promise<any> {
    return this.projectsService.update(id, req.user.id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project' })
  @ApiParam({ name: 'id', example: 'project_123' })
  @ApiResponse({ status: 200, description: 'Project removed' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  async remove(@Request() req: any, @Param('id') id: string): Promise<any> {
    return this.projectsService.remove(id, req.user.id);
  }
}
