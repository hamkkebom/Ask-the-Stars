import { z } from 'zod';

/**
 * Reusable base schemas for form validation
 */

/**
 * Email validation schema
 * - Must be valid email format
 */
export const emailSchema = z
  .string()
  .min(1, '이메일을 입력해주세요')
  .email('유효한 이메일 주소를 입력해주세요');

/**
 * Password validation schema
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one number
 * - At least one special character (@$!%*?&)
 */
export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
  .regex(
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    '비밀번호는 대문자, 숫자, 특수문자(@$!%*?&)를 포함해야 합니다'
  );

/**
 * Phone validation schema (Korean format)
 * - Format: 01X-XXXX-XXXX or 01XXXXXXXXX
 * - Optional field
 */
export const phoneSchema = z
  .string()
  .regex(/^01[0-9]{7,9}$/, '유효한 휴대폰 번호를 입력해주세요')
  .optional()
  .or(z.literal(''));

/**
 * Name validation schema
 * - Minimum 2 characters
 * - Maximum 50 characters
 */
export const nameSchema = z
  .string()
  .min(2, '이름은 최소 2자 이상이어야 합니다')
  .max(50, '이름은 50자 이하여야 합니다');

/**
 * Form-specific schemas
 */

/**
 * Login form schema
 * - Email and password required
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

/**
 * Signup form schema
 * - Email, password, name required
 * - Phone optional
 */
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  phone: phoneSchema,
});

export type SignupFormData = z.infer<typeof signupSchema>;

/**
 * Password reset schema
 * - Email required
 */
export const passwordResetSchema = z.object({
  email: emailSchema,
});

export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;

/**
 * Password confirm schema
 * - Password and confirmPassword must match
 */
export const passwordConfirmSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다',
    path: ['confirmPassword'],
  });

export type PasswordConfirmFormData = z.infer<typeof passwordConfirmSchema>;
