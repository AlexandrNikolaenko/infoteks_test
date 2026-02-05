import { useState, useEffect } from 'react';

const TOKEN_KEY = 'auth_token';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    setIsAuthenticated(!!token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};

