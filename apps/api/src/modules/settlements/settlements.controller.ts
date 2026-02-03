import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Request,
  ForbiddenException,
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
import { SettlementsService } from './settlements.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '@ask-the-stars/database';
import { CreateSettlementDto, UpdateSettlementDto } from './dto';

@ApiTags('settlements')
@ApiBearerAuth('Bearer')
@ApiResponse({ status: 500, description: 'Internal server error' })
@Controller({ path: 'settlements', version: '1' })
@UseGuards(JwtAuthGuard, RolesGuard)
export class SettlementsController {
  constructor(private readonly settlementsService: SettlementsService) {}

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MOON_MANAGER, UserRole.MOON_SETTLEMENT)
  @ApiOperation({ summary: 'Create settlement' })
  @ApiResponse({ status: 201, description: 'Settlement created' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  async create(@Body() createSettlementDto: CreateSettlementDto): Promise<any> {
    return this.settlementsService.create(createSettlementDto);
  }

  @Get()
  @ApiOperation({ summary: 'List settlements' })
  @ApiResponse({ status: 200, description: 'Settlements retrieved' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  async findAll(@Request() req: any): Promise<any> {
    // Admin/Managers can see all, others see only own
    const canSeeAll = [
      UserRole.ADMIN,
      UserRole.MOON_MANAGER,
      UserRole.MOON_SETTLEMENT,
    ].includes(req.user.role);

    return this.settlementsService.findAll(canSeeAll ? undefined : req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get settlement by id' })
  @ApiParam({ name: 'id', example: 'settlement_123' })
  @ApiResponse({ status: 200, description: 'Settlement retrieved' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Settlement not found' })
  async findOne(@Request() req: any, @Param('id') id: string): Promise<any> {
    const settlement = await this.settlementsService.findOne(id);

    // Check permission: owner or admin/manager
    const canAccess =
      settlement.userId === req.user.id ||
      [
        UserRole.ADMIN,
        UserRole.MOON_MANAGER,
        UserRole.MOON_SETTLEMENT,
      ].includes(req.user.role);

    if (!canAccess) {
      throw new ForbiddenException('접근 권한이 없습니다.');
    }

    return settlement;
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN, UserRole.MOON_MANAGER, UserRole.MOON_SETTLEMENT)
  @ApiOperation({ summary: 'Update settlement' })
  @ApiParam({ name: 'id', example: 'settlement_123' })
  @ApiResponse({ status: 200, description: 'Settlement updated' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiNotFoundResponse({ description: 'Settlement not found' })
  async update(
    @Param('id') id: string,
    @Body() updateSettlementDto: UpdateSettlementDto
  ): Promise<any> {
    return this.settlementsService.update(id, updateSettlementDto);
  }
}
