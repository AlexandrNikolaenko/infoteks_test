import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const TOKEN_KEY = 'auth_token';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY) && location.pathname !== '/login') {
      navigate('/login');
    } else if (localStorage.getItem(TOKEN_KEY) && location.pathname === '/login') {
      navigate('/users');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token && !isAuthenticated) {
      setIsAuthenticated(true);
    }
  }, []);  

  const login = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(TOKEN_KEY);
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
};

