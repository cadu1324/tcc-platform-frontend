import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { getToken, setToken, removeToken } from '../lib/tokenStorage';
import { getStoredUser, setStoredUser, removeStoredUser } from '../utils/localStorage';
import { AuthContext } from './authContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    const token = getToken();

    if (storedUser && token) {
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  function setSession(newUser: User, token: string): void {
    setToken(token);
    setStoredUser(newUser);
    setUser(newUser);
  }

  function logout(): void {
    removeToken();
    removeStoredUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
