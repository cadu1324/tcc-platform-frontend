import { useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { setToken, getToken, getStoredUser, setStoredUser, clearSession } from '../utils/storage';
import { AuthContext } from './authContext';

function loadInitialUser(): User | null {
  const storedUser = getStoredUser();
  const token = getToken();
  return storedUser && token ? storedUser : null;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(loadInitialUser);

  function setSession(newUser: User, token: string): void {
    setToken(token);
    setStoredUser(newUser);
    setUser(newUser);
  }

  function logout(): void {
    clearSession();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading: false, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
