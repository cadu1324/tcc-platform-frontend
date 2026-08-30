import axios from 'axios';
import type { AxiosError } from 'axios';
import { getToken, clearSession } from '../utils/storage';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api';

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

interface ApiErrorBody {
  success: false;
  error: string;
}

export const httpClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
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
    if (error.response?.status === 401) {
      clearSession();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    const message = error.response?.data?.error ?? 'Erro inesperado. Tente novamente.';
    return Promise.reject(new Error(message));
  },
);

export async function apiGet<T>(url: string): Promise<T> {
  const { data } = await httpClient.get<ApiEnvelope<T>>(url);
  return data.data;
}

export async function apiPost<T>(url: string, body?: unknown): Promise<T> {
  const { data } = await httpClient.post<ApiEnvelope<T>>(url, body);
  return data.data;
}

export async function apiPut<T>(url: string, body?: unknown): Promise<T> {
  const { data } = await httpClient.put<ApiEnvelope<T>>(url, body);
  return data.data;
}

export async function apiDelete<T>(url: string): Promise<T> {
  const { data } = await httpClient.delete<ApiEnvelope<T>>(url);
  return data.data;
}
