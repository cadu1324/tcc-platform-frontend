import { apiPost } from './httpClient';
import type { AuthResponse, LoginCredentials, RegisterData } from '../types';

export const authService = {
  login: (credentials: LoginCredentials) => apiPost<AuthResponse>('/auth/login', credentials),
  register: (payload: RegisterData) => apiPost<AuthResponse>('/auth/register', payload),
};
