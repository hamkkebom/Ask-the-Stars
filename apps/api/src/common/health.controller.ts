import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthController {
  @Get('health')
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
    };
  }

  @Get()
  root() {
    return {
      name: 'Ask the Stars API',
      version: '1.0.0',
      status: 'running',
    };
  }
}
