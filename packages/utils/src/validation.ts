import { z } from 'zod';

// 이메일 스키마
export const emailSchema = z.string().email('유효한 이메일 주소를 입력해주세요');

// 비밀번호 스키마 (최소 8자, 영문+숫자)
export const passwordSchema = z
  .string()
  .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
  .regex(/[A-Za-z]/, '비밀번호에는 영문자가 포함되어야 합니다')
  .regex(/[0-9]/, '비밀번호에는 숫자가 포함되어야 합니다');

// 전화번호 스키마 (한국 형식)
export const phoneSchema = z
  .string()
  .regex(/^01[016789]-?\d{3,4}-?\d{4}$/, '유효한 전화번호 형식이 아닙니다');

// 이름 스키마
export const nameSchema = z
  .string()
  .min(2, '이름은 최소 2자 이상이어야 합니다')
  .max(50, '이름은 50자를 초과할 수 없습니다');

// 로그인 스키마
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, '비밀번호를 입력해주세요'),
});

// 회원가입 스키마
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: nameSchema,
  phone: phoneSchema.optional(),
});

// 프로젝트 생성 스키마
export const createProjectSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').max(200),
  description: z.string().optional(),
  client_notes: z.string().optional(),
  budget: z.number().positive('예산은 0보다 커야 합니다').optional(),
  deadline: z.date().optional(),
});

// 피드백 생성 스키마
export const createFeedbackSchema = z.object({
  timestamp_start: z.number().nonnegative(),
  timestamp_end: z.number().nonnegative(),
  comment: z.string().min(1, '피드백 내용을 입력해주세요'),
  category: z.enum(['subtitle', 'audio', 'video', 'other']).optional(),
  priority: z.number().min(0).max(1).optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type CreateFeedbackInput = z.infer<typeof createFeedbackSchema>;
