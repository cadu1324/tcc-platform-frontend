import { useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { removeToken, setToken } from '../lib/tokenStorage';
import { AuthContext } from './authContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  function setSession(user: User, token: string) {
    setToken(token);
    setUser(user);
  }

  function logout() {
    removeToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, setSession, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
