import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<any> {
    return this.prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`사용자를 찾을 수 없습니다. (ID: ${id})`);
    }

    // Exclude password from the result
    return this.exclude(user, ['password']);
  }

  async findByEmail(email: string): Promise<any> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Helper to exclude keys
  private exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[]
  ): Omit<User, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }

  async update(id: string, data: any): Promise<any> {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return this.exclude(user, ['password']);
  }
}
