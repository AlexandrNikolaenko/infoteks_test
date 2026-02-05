import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from 'pages/login';
import { UsersPage } from 'pages/users';
import { NotFoundPage } from 'pages/not-found';
import { useAuth } from 'shared/lib/hooks/useAuth';

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/users" replace /> : <LoginPage />
        }
      />
      <Route
        path="/users"
        element={
          isAuthenticated ? <UsersPage /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="/" element={<Navigate to="/users" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

