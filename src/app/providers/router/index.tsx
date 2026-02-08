import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "pages/login";
import { UsersPage } from "pages/users";
import { NotFoundPage } from "pages/not-found";
import { useAuth } from "shared/lib/hooks/useAuth";

export const AppRouter: React.FC = () => {
  useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="/" element={<Navigate to="/users" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
