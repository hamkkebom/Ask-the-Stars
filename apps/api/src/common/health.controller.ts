import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({ version: VERSION_NEUTRAL })
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
      version: '1.0.4',
      status: 'running',
    };
  }
}
