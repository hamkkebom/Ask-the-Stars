// Local type definitions to replace @ask-the-stars/types package

// UserRole as const object for runtime checks
export const UserRole = {
  ADMIN: 'ADMIN',
  COUNSELOR: 'COUNSELOR',
  STAR: 'STAR',
  CLIENT: 'CLIENT',
} as const;

export type UserRoleType = (typeof UserRole)[keyof typeof UserRole];

// AssignmentType as const object
export const AssignmentType = {
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE',
  GROUP: 'GROUP',
} as const;

export type AssignmentTypeType =
  (typeof AssignmentType)[keyof typeof AssignmentType];

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRoleType;
  createdAt: string;
  updatedAt: string;
}

export interface SignupDto {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: UserRoleType;
  // Allow additional role-specific fields
  [key: string]: unknown;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
