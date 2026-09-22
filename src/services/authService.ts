import { apiPost } from './httpClient';
import type { AuthResponse, LoginCredentials, RefreshTokenResponse, RegisterData } from '../types';

interface MessageResponse {
  message: string;
}

export const authService = {
  login: (credentials: LoginCredentials) => apiPost<AuthResponse>('/auth/login', credentials),
  register: (payload: RegisterData) => apiPost<AuthResponse>('/auth/register', payload),
  forgotPassword: (email: string) =>
    apiPost<MessageResponse>('/auth/forgot-password', { email }),
  resetPassword: (payload: { token: string; password: string }) =>
    apiPost<MessageResponse>('/auth/reset-password', payload),
  refresh: (refreshToken: string) =>
    apiPost<RefreshTokenResponse>('/auth/refresh', { refresh_token: refreshToken }),
  logout: (refreshToken: string) =>
    apiPost<MessageResponse>('/auth/logout', { refresh_token: refreshToken }),
};
