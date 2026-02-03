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
import { PortfoliosService } from './portfolios.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import {
  CreatePortfolioItemDto,
  UpdatePortfolioDto,
  UpdatePortfolioItemDto,
} from './dto';

@Controller({ path: 'portfolios', version: '1' })
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  // ==================== Public ====================

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<any> {
    return this.portfoliosService.findByUserId(userId);
  }

  // ==================== Authenticated (My Portfolio) ====================

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMyPortfolio(@Request() req: any): Promise<any> {
    return this.portfoliosService.findOrCreate(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateMyPortfolio(
    @Request() req: any,
    @Body() updatePortfolioDto: UpdatePortfolioDto
  ): Promise<any> {
    return this.portfoliosService.update(req.user.id, updatePortfolioDto);
  }

  // ==================== Portfolio Items ====================

  @UseGuards(JwtAuthGuard)
  @Post('me/items')
  async addItem(
    @Request() req: any,
    @Body() createItemDto: CreatePortfolioItemDto
  ): Promise<any> {
    return this.portfoliosService.addItem(req.user.id, createItemDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/items/:itemId')
  async updateItem(
    @Request() req: any,
    @Param('itemId') itemId: string,
    @Body() updateItemDto: UpdatePortfolioItemDto
  ): Promise<any> {
    return this.portfoliosService.updateItem(
      req.user.id,
      itemId,
      updateItemDto
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me/items/:itemId')
  async removeItem(
    @Request() req: any,
    @Param('itemId') itemId: string
  ): Promise<any> {
    return this.portfoliosService.removeItem(req.user.id, itemId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/items/reorder')
  async reorderItems(
    @Request() req: any,
    @Body() body: { itemIds: string[] }
  ): Promise<any> {
    return this.portfoliosService.reorderItems(req.user.id, body.itemIds);
  }
}
