import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/node';

/**
 * Standardized error response format
 */
interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
  timestamp: string;
  path: string;
}

/**
 * Global exception filter for standardized error responses
 *
 * Catches all exceptions (HttpException + unknown errors) and returns
 * a standardized error response format with Sentry integration.
 *
 * @example
 * // In main.ts:
 * app.useGlobalFilters(new AllExceptionsFilter());
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorType = 'InternalServerError';

    // Handle HttpException
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Extract message from HttpException response
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as any;
        message = responseObj.message || exception.message;
        errorType = responseObj.error || exception.name;
      } else {
        message = exception.message;
        errorType = exception.name;
      }
    } else if (exception instanceof Error) {
      // Handle standard Error objects
      message = exception.message || 'Unknown error occurred';
      errorType = exception.name || 'Error';
    } else {
      // Handle unknown exceptions
      message = String(exception) || 'Unknown error occurred';
      errorType = 'UnknownError';
    }

    // Log to Sentry
    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
      // Log server errors (5xx) to Sentry
      Sentry.captureException(exception, {
        tags: {
          statusCode: statusCode.toString(),
          errorType,
        },
        contexts: {
          http: {
            method: request.method,
            url: request.url,
            status_code: statusCode,
          },
        },
      });
    } else if (statusCode >= HttpStatus.BAD_REQUEST) {
      // Log client errors (4xx) as messages for debugging
      this.logger.warn(
        `[${request.method}] ${request.url} - ${statusCode} ${errorType}: ${message}`
      );
    }

    // Build standardized error response
    const errorResponse: ErrorResponse = {
      statusCode,
      message,
      error: errorType,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      this.logger.error(
        `Exception caught: ${JSON.stringify(errorResponse, null, 2)}`
      );
    }

    // Send response
    response.status(statusCode).json(errorResponse);
  }
}
