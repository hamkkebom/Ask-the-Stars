import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface LogMeta {
  [key: string]: unknown;
}

@Injectable()
export class BetterStackLogger {
  private readonly sourceToken: string | undefined;
  private readonly logsUrl = 'https://in.logs.betterstack.com';

  constructor() {
    this.sourceToken = process.env.BETTERSTACK_SOURCE_TOKEN;
  }

  private async sendLog(level: string, message: string, meta?: LogMeta) {
    if (!this.sourceToken) return;

    try {
      await axios.post(
        this.logsUrl,
        {
          dt: new Date().toISOString(),
          level,
          message,
          service: 'ask-the-stars-api',
          environment: process.env.NODE_ENV || 'development',
          ...meta,
        },
        {
          headers: {
            Authorization: `Bearer ${this.sourceToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      // Silently fail to not break the application
      console.error('BetterStack log failed:', error);
    }
  }

  async info(message: string, meta?: LogMeta) {
    await this.sendLog('info', message, meta);
  }

  async warn(message: string, meta?: LogMeta) {
    await this.sendLog('warn', message, meta);
  }

  async error(message: string, meta?: LogMeta) {
    await this.sendLog('error', message, meta);
  }

  async debug(message: string, meta?: LogMeta) {
    if (process.env.NODE_ENV === 'development') {
      await this.sendLog('debug', message, meta);
    }
  }
}
