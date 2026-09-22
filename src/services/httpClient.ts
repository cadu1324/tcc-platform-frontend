import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getToken, getRefreshToken, setToken, setRefreshToken, clearSession } from '../utils/storage';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333/api';

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

interface ApiErrorBody {
  success: false;
  error: string;
}

interface RefreshTokenBody {
  access_token: string;
  refresh_token: string;
}

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retried?: boolean;
}

const AUTH_ENDPOINTS = ['/auth/login', '/auth/register', '/auth/refresh', '/auth/logout'];

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

function redirectToLogin(): void {
  clearSession();
  if (window.location.pathname !== '/login') {
    window.location.href = '/login';
  }
}

let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken(): Promise<string> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await axios.post<ApiEnvelope<RefreshTokenBody>>(
    `${API_URL}/auth/refresh`,
    { refresh_token: refreshToken },
  );
  const { access_token, refresh_token } = response.data.data;
  setToken(access_token);
  setRefreshToken(refresh_token);
  return access_token;
}

httpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorBody>) => {
    const config = error.config as RetryableConfig | undefined;
    const isAuthEndpoint = AUTH_ENDPOINTS.some((path) => config?.url?.includes(path));

    if (error.response?.status === 401 && config && !config._retried && !isAuthEndpoint) {
      config._retried = true;
      try {
        refreshPromise ??= refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
        const newAccessToken = await refreshPromise;
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return httpClient(config);
      } catch {
        redirectToLogin();
        return Promise.reject(new Error('Sessão expirada. Faça login novamente.'));
      }
    }

    if (error.response?.status === 401) {
      redirectToLogin();
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

export async function apiPostForm<T>(url: string, form: FormData): Promise<T> {
  const { data } = await httpClient.post<ApiEnvelope<T>>(url, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data.data;
}

export interface DownloadedFile {
  blob: Blob;
  filename: string;
}

const FILENAME_FALLBACK = 'arquivo';

function parseFilename(disposition: string | undefined): string {
  if (!disposition) return FILENAME_FALLBACK;
  const utf8Match = /filename\*=UTF-8''([^;]+)/i.exec(disposition);
  if (utf8Match) return decodeURIComponent(utf8Match[1]);
  const asciiMatch = /filename="?([^";]+)"?/i.exec(disposition);
  return asciiMatch ? asciiMatch[1] : FILENAME_FALLBACK;
}

export async function apiGetBlob(url: string): Promise<DownloadedFile> {
  const response = await httpClient.get<Blob>(url, { responseType: 'blob' });
  return {
    blob: response.data,
    filename: parseFilename(response.headers['content-disposition']),
  };
}

export async function apiPut<T>(url: string, body?: unknown): Promise<T> {
  const { data } = await httpClient.put<ApiEnvelope<T>>(url, body);
  return data.data;
}

export async function apiPatch<T>(url: string, body?: unknown): Promise<T> {
  const { data } = await httpClient.patch<ApiEnvelope<T>>(url, body);
  return data.data;
}

export async function apiDelete<T>(url: string): Promise<T> {
  const { data } = await httpClient.delete<ApiEnvelope<T>>(url);
  return data.data;
}
