import axios, { AxiosError } from 'axios';
import { getToken } from './tokenStorage';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api';

interface ApiErrorBody {
  success: false;
  error: string;
}

export const httpClient = axios.create({
  baseURL: API_URL,
});

httpClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorBody>) => {
    const message = error.response?.data?.error ?? 'Erro inesperado. Tente novamente.';
    return Promise.reject(new Error(message));
  }
);
