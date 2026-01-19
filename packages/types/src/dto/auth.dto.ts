import { UserRole } from '../enums';

export interface LoginDto {
  email: string;
  password: string;
}

export interface SignupDto {
  email: string;
  password: string;
  name: string;
  phone?: string;
  role?: UserRole;
  // Extended fields for specific roles
  portfolioUrl?: string;
  expertise?: string;
  careerYears?: number;
  interestedCourse?: string;
  learningGoal?: string;
  contestName?: string;
  teamName?: string;
  companyName?: string;
  companyIndustry?: string;
  contactPersonPosition?: string;
  marketingNeeds?: string;
}

export interface TokenResponseDto {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: 'Bearer';
}

export interface RefreshTokenDto {
  refresh_token: string;
}
