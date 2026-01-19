import { UserRole } from '../enums';

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  is_active: boolean;
  email_verified: boolean;
  created_at: Date;
  updated_at: Date;
  last_login_at?: Date;
}

export interface UserProfile extends User {
  bio?: string;
  portfolio_url?: string;
  specialties?: string[];
  rating?: number;
  total_projects?: number;
  completed_projects?: number;
}
