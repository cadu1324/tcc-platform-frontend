import { httpClient } from '../lib/httpClient';
import type { AuthResponse, LoginCredentials, RegisterData } from '../types';

interface ApiSuccess<T> {
  success: true;
  data: T;
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<ApiSuccess<AuthResponse>>('/auth/login', credentials);
    return response.data.data;
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await httpClient.post<ApiSuccess<AuthResponse>>('/auth/register', data);
    return response.data.data;
  },
};
