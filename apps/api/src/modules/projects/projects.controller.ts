import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateProjectDto, UpdateProjectDto, CreateProjectRequestDto } from './dto';

@Controller('projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Request() req: any, @Body() createProjectDto: CreateProjectDto): Promise<any> {
    return this.projectsService.create(req.user.id, createProjectDto);
  }

  @Get()
  async findAll(@Request() req: any): Promise<any> {
    // Pass the full user object (id, role, etc.)
    return this.projectsService.findAll(req.user);
  }

  // --- Project Board Endpoints ---

  @Get('requests/board')
  async getProjectRequests(): Promise<any> {
      // Publicly available to authenticated Starts?
      return this.projectsService.findAllRequests();
  }

  @Get('my-assignments')
  async getMyAssignments(@Request() req: any): Promise<any> {
      return this.projectsService.getMyAssignments(req.user.id);
  }

  @Post('requests/:id/accept')
  async acceptRequest(@Param('id') id: string, @Request() req: any): Promise<any> {
      return this.projectsService.acceptRequest(id, req.user.id);
  }

  @Post('requests')
  async createRequest(
    @Request() req: any,
    @Body() createDto: CreateProjectRequestDto
  ): Promise<any> {
    return this.projectsService.createRequest(req.user.id, createDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Request() req: any,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<any> {
    return this.projectsService.update(id, req.user.id, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Request() req: any, @Param('id') id: string): Promise<any> {
    return this.projectsService.remove(id, req.user.id);
  }
}
