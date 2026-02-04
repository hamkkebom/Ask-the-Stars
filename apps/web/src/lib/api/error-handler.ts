'use client';

import { AxiosError } from 'axios';
import { captureError } from '@/lib/sentry';

/**
 * Options for error handling behavior
 */
export interface ErrorHandlerOptions {
  /**
   * Whether to throw the error after handling
   * @default false
   */
  shouldThrow?: boolean;

  /**
   * Default value to return if error occurs and shouldThrow is false
   * @default undefined
   */
  defaultValue?: unknown;

  /**
   * Additional context to log with Sentry
   */
  context?: Record<string, unknown>;

  /**
   * Custom error message to use instead of extracting from response
   */
  customMessage?: string;

  /**
   * Whether to log to console in development
   * @default true
   */
  logToConsole?: boolean;
}

/**
 * Extracted error information
 */
export interface ExtractedError {
  message: string;
  status?: number;
  code?: string;
  data?: unknown;
}

/**
 * Extracts error message from Axios error response
 *
 * @param error - The Axios error to extract from
 * @returns Extracted error information
 *
 * @example
 * try {
 *   await api.get('/users');
 * } catch (error) {
 *   const extracted = extractErrorMessage(error as AxiosError);
 *   console.log(extracted.message); // "User not found"
 * }
 */
export function extractErrorMessage(error: AxiosError): ExtractedError {
  const status = error.response?.status;
  const responseData = error.response?.data as
    | Record<string, unknown>
    | undefined;

  // Try to extract message from response
  let message = responseData?.message as string | undefined;

  // Fallback to error property
  if (!message && responseData?.error) {
    message = responseData.error as string;
  }

  // Fallback to status text
  if (!message && error.response?.statusText) {
    message = error.response.statusText;
  }

  // Fallback to error message
  if (!message) {
    message = error.message || 'An unexpected error occurred';
  }

  return {
    message,
    status,
    code: error.code,
    data: responseData,
  };
}

/**
 * Handles API errors with Sentry logging and user-friendly messages
 *
 * Standardizes error handling across all API clients by:
 * - Extracting user-friendly error messages
 * - Logging to Sentry with context
 * - Supporting both throw and return modes
 * - Providing default values for graceful degradation
 *
 * @param error - The error to handle (typically AxiosError)
 * @param options - Error handling options
 * @returns User-friendly error message or default value
 * @throws Error if shouldThrow is true
 *
 * @example
 * // Return mode (default)
 * const message = handleApiError(error, {
 *   defaultValue: 'Failed to load data',
 *   context: { endpoint: '/users' }
 * });
 *
 * @example
 * // Throw mode
 * try {
 *   handleApiError(error, {
 *     shouldThrow: true,
 *     context: { action: 'fetchUser' }
 *   });
 * } catch (err) {
 *   // Handle error
 * }
 *
 * @example
 * // With custom message
 * const message = handleApiError(error, {
 *   customMessage: 'Could not save your changes',
 *   context: { form: 'userProfile' }
 * });
 */
export function handleApiError(
  error: unknown,
  options: ErrorHandlerOptions = {}
): string | unknown {
  const {
    shouldThrow = false,
    defaultValue = undefined,
    context = {},
    customMessage,
    logToConsole = true,
  } = options;

  // Handle non-Axios errors
  if (!(error instanceof AxiosError)) {
    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred';

    // Log to Sentry
    captureError(error instanceof Error ? error : new Error(message), {
      error_type: 'non_axios_error',
      ...context,
    });

    // Log to console in development
    if (logToConsole && process.env.NODE_ENV === 'development') {
      console.error('[API Error]', message, error);
    }

    if (shouldThrow) {
      throw error;
    }

    return customMessage || message || defaultValue;
  }

  // Extract error information
  const extracted = extractErrorMessage(error);
  const userMessage = customMessage || extracted.message;

  // Prepare Sentry context
  const sentryContext = {
    api_error: true,
    status: extracted.status,
    code: extracted.code,
    url: error.config?.url,
    method: error.config?.method?.toUpperCase(),
    ...context,
  };

  // Log to Sentry
  captureError(error, sentryContext);

  // Log to console in development
  if (logToConsole && process.env.NODE_ENV === 'development') {
    console.error('[API Error]', {
      message: userMessage,
      status: extracted.status,
      code: extracted.code,
      url: error.config?.url,
      data: extracted.data,
    });
  }

  if (shouldThrow) {
    throw error;
  }

  return userMessage || defaultValue;
}

/**
 * Creates a reusable error handler for a specific API endpoint
 *
 * Useful for consistent error handling across multiple calls to the same endpoint
 *
 * @param endpointName - Name of the endpoint for logging
 * @param defaultOptions - Default options for all errors from this endpoint
 * @returns Error handler function bound to the endpoint
 *
 * @example
 * const handleUserError = createErrorHandler('getUserProfile', {
 *   context: { module: 'user' },
 *   logToConsole: true
 * });
 *
 * try {
 *   const user = await api.get('/users/me');
 * } catch (error) {
 *   const message = handleUserError(error, {
 *     defaultValue: 'Could not load profile'
 *   });
 * }
 */
export function createErrorHandler(
  endpointName: string,
  defaultOptions: ErrorHandlerOptions = {}
) {
  return (error: unknown, options: ErrorHandlerOptions = {}) => {
    return handleApiError(error, {
      ...defaultOptions,
      ...options,
      context: {
        endpoint: endpointName,
        ...defaultOptions.context,
        ...options.context,
      },
    });
  };
}
