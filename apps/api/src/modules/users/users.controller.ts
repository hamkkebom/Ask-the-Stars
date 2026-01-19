import { Controller, Get, Param, UseGuards, Request, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UpdateUserDto } from './dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@Request() req: any): Promise<any> {
    return this.usersService.findOne(req.user.id);
  }

  @Patch('me')
  async updateProfile(@Request() req: any, @Body() updateUserDto: UpdateUserDto): Promise<any> {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.usersService.findOne(id);
  }
}
