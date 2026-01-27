export type UserType = 'student' | 'advisor' | 'admin';

export interface User {
  id: string;
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

export interface AuthResponse {
  user: User;
  token: string;
}
