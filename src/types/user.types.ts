export const UserType = {
  STUDENT: 'student',
  ADVISOR: 'advisor',
  ADMIN: 'admin',
} as const;
export type UserType = (typeof UserType)[keyof typeof UserType];

export interface User {
  id: number;
  name: string;
  email: string;
  user_type: UserType;
  is_active: boolean;
  created_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  user_type: UserType;
}

export type CreateUserData = RegisterData;

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  user_type?: UserType;
  is_active?: boolean;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

export type AdvisorOption = Pick<User, 'id' | 'name'>;
