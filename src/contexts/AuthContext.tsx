'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  email: string;
  name?: string;
  role?: 'admin' | 'user';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string, remember?: boolean) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const userData = localStorage.getItem('userData');
      
      if (authStatus === 'true' && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Error parsing user data:', error);
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userData');
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Mock login function
  const login = async (email: string, password: string, remember: boolean = false): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'demo@qc.ai' && password === 'demo123!') {
          const userData: User = {
            email,
            name: 'Demo User',
            role: 'user'
          };

          // Store authentication data
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userData', JSON.stringify(userData));
          
          if (remember) {
            localStorage.setItem('rememberMe', 'true');
          }

          setUser(userData);
          setIsAuthenticated(true);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    localStorage.removeItem('rememberMe');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};