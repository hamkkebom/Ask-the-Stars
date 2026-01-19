import { Controller, Get, Post, Body, Param, Patch, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { SettlementsService } from './settlements.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CreateSettlementDto, UpdateSettlementDto } from './dto';

// TODO: Implement RoleGuard for Admin-only routes
@Controller('settlements')
@UseGuards(JwtAuthGuard)
export class SettlementsController {
  constructor(private readonly settlementsService: SettlementsService) {}

  @Post()
  async create(@Body() createSettlementDto: CreateSettlementDto): Promise<any> {
    // Temporary: Only allow if logic implemented (e.g. check if req.user.role === 'MOON')
    // For now, let's assume valid
    return this.settlementsService.create(createSettlementDto);
  }

  @Get()
  async findAll(@Request() req: any): Promise<any> {
    // If not admin, return only own settlements
    // Mocking role check: if role !== MOON, pass userId
    // logic: return this.settlementsService.findAll(req.user.role === 'MOON' ? undefined : req.user.id);
    // Safe default for MVP: return own
    return this.settlementsService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Request() req: any, @Param('id') id: string): Promise<any> {
    const settlement = await this.settlementsService.findOne(id);
    if (settlement.userId !== req.user.id) {
        // Allow if Admin (TODO)
        throw new ForbiddenException('접근 권한이 없습니다.');
    }
    return settlement;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSettlementDto: UpdateSettlementDto,
  ): Promise<any> {
    // TODO: Verify Admin role
    return this.settlementsService.update(id, updateSettlementDto);
  }
}
