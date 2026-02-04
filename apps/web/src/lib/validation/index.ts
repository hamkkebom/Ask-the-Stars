/**
 * Form validation utilities
 * Zod-based schemas and error formatting
 */

export {
  emailSchema,
  passwordSchema,
  phoneSchema,
  nameSchema,
  loginSchema,
  signupSchema,
  passwordResetSchema,
  passwordConfirmSchema,
  type LoginFormData,
  type SignupFormData,
  type PasswordResetFormData,
  type PasswordConfirmFormData,
} from './schemas';

import { ZodError } from 'zod';

/**
 * Format Zod validation errors into a user-friendly object
 * @param error - ZodError instance
 * @returns Object with field names as keys and error messages as values
 *
 * @example
 * ```ts
 * try {
 *   loginSchema.parse(formData);
 * } catch (error) {
 *   if (error instanceof ZodError) {
 *     const formatted = formatValidationErrors(error);
 *     // { email: "유효한 이메일 주소를 입력해주세요", password: "..." }
 *   }
 * }
 * ```
 */
export function formatValidationErrors(
  error: ZodError
): Record<string, string> {
  const formatted: Record<string, string> = {};

  error.errors.forEach((err) => {
    const path = err.path.join('.');
    formatted[path] = err.message;
  });

  return formatted;
}

/**
 * Get first validation error message
 * @param error - ZodError instance
 * @returns First error message or empty string
 *
 * @example
 * ```ts
 * try {
 *   loginSchema.parse(formData);
 * } catch (error) {
 *   if (error instanceof ZodError) {
 *     const message = getFirstValidationError(error);
 *     // "유효한 이메일 주소를 입력해주세요"
 *   }
 * }
 * ```
 */
export function getFirstValidationError(error: ZodError): string {
  return error.errors[0]?.message || '';
}
