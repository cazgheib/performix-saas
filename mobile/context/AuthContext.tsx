import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import storage from '../utils/storage';
import { authService } from '../services/authService';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'coach' | 'athlete';
  gymId?: string;
  profileImage?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'coach' | 'athlete';
  gymId?: string;
  bio?: string;
  profileImage?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await storage.getItemAsync('authToken');
      if (storedToken) {
        setToken(storedToken);
        const userData = await authService.getMe(storedToken);
        setUser(userData);
      }
    } catch (error) {
      console.error('Error loading stored auth:', error);
      await logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      setToken(response.token);
      await storage.setItemAsync('authToken', response.token);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (userData: SignupData) => {
    try {
      const response = await authService.signup(userData);
      setUser(response.user);
      setToken(response.token);
      await storage.setItemAsync('authToken', response.token);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await storage.deleteItemAsync('authToken');
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
