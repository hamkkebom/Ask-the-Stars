import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateProjectDto, UpdateProjectDto } from './dto';

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
