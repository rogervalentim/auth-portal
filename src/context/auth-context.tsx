import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (data: LoginUserFormData) => void;
  loginError: string;
  logout: () => void;
  token: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginUserFormData {
  email: string;
  password: string;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (data: LoginUserFormData) => {
    try {
      const response = await fetch('https://teste.reobote.tec.br/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const result = await response.json();
      const token  = result.access_token;
  

      localStorage.setItem('token', token);
      setToken(token);
      setIsAuthenticated(true);
      navigate('/dashboard'); 
    } catch (error) {
      console.error('Login error', error);
      setLoginError("Verifique as suas credenciais")
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    navigate('/'); 
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, loginError, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
