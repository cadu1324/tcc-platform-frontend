import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { User } from '../types';
import { getStoredToken, setStoredToken, removeStoredToken, getStoredUser, setStoredUser, removeStoredUser } from '../utils/localStorage';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  user_type: 'student' | 'advisor';
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Recupera dados do usuário do localStorage ao carregar
    const storedUser = getStoredUser();
    const storedToken = getStoredToken();

    if (storedUser && storedToken) {
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials) => {
    // TODO: Implementar chamada real à API
    console.log('Login com:', credentials);

    // Simulação de login - será substituído pela chamada real
    const mockUser: User = {
      id: '1',
      name: 'Usuário Teste',
      email: credentials.email,
      user_type: 'student',
      is_active: true,
      created_at: new Date().toISOString(),
    };

    const mockToken = 'mock-jwt-token';

    setStoredToken(mockToken);
    setStoredUser(mockUser);
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    removeStoredToken();
    removeStoredUser();
    setUser(null);
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    // TODO: Implementar chamada real à API
    console.log('Registro com:', data);

    // Após registro bem-sucedido, faz login automaticamente
    await login({ email: data.email, password: data.password });
  }, [login]);

  const updateUser = useCallback((updatedUser: User) => {
    setStoredUser(updatedUser);
    setUser(updatedUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext deve ser usado dentro de um AuthProvider');
  }

  return context;
}
