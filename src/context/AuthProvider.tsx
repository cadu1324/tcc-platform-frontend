import { useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import {
  setToken,
  getToken,
  setRefreshToken,
  getRefreshToken,
  getStoredUser,
  setStoredUser,
  clearSession,
} from '../utils/storage';
import { authService } from '../services/authService';
import { AuthContext } from './authContext';

function loadInitialUser(): User | null {
  const storedUser = getStoredUser();
  const token = getToken();
  return storedUser && token ? storedUser : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadInitialUser);

  function setSession(newUser: User, accessToken: string, refreshToken: string): void {
    setToken(accessToken);
    setRefreshToken(refreshToken);
    setStoredUser(newUser);
    setUser(newUser);
  }

  async function logout(): Promise<void> {
    const refreshToken = getRefreshToken();
    clearSession();
    setUser(null);
    if (refreshToken) {
      try {
        await authService.logout(refreshToken);
      } catch {
        // Best-effort: the local session is already cleared either way.
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading: false, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
