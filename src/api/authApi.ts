import { httpClient } from '../lib/httpClient';
import type { AuthResponse, LoginCredentials } from '../types';

interface ApiSuccess<T> {
  success: true;
  data: T;
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await httpClient.post<ApiSuccess<AuthResponse>>('/auth/login', credentials);
    return response.data.data;
  },
};
