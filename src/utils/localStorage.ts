import { User } from '../types';

const TOKEN_KEY = '@tcc-platform:token';
const USER_KEY = '@tcc-platform:user';

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeStoredToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function getStoredUser(): User | null {
  const stored = localStorage.getItem(USER_KEY);

  if (!stored) return null;

  try {
    return JSON.parse(stored) as User;
  } catch {
    removeStoredUser();
    return null;
  }
}

export function setStoredUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function removeStoredUser(): void {
  localStorage.removeItem(USER_KEY);
}

export function clearStorage(): void {
  removeStoredToken();
  removeStoredUser();
}
