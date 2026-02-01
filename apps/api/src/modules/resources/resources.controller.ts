import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ResourceCategory } from '@prisma/client';
import { CreateResourceDto, UpdateResourceDto } from './dto';

@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  // ==================== Public ====================

  @Get()
  async findAll(@Query('category') category?: string): Promise<any> {
    const categoryEnum = category as ResourceCategory | undefined;
    return this.resourcesService.findAll(categoryEnum, true);
  }

  @Get('popular')
  async getPopular(@Query('limit') limit?: number): Promise<any> {
    return this.resourcesService.getPopularResources(limit);
  }

  @Get('categories')
  async getCategories(): Promise<any> {
    return this.resourcesService.getResourcesByCategory();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.resourcesService.findOne(id);
  }

  @Post(':id/download')
  async download(@Param('id') id: string): Promise<any> {
    return this.resourcesService.incrementDownloadCount(id);
  }

  // ==================== Admin ====================

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createResourceDto: CreateResourceDto): Promise<any> {
    return this.resourcesService.create(createResourceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateResourceDto: UpdateResourceDto
  ): Promise<any> {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.resourcesService.remove(id);
  }
}
