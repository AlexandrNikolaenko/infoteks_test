import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://mockapi.io/api/v1', // Заглушка, будет заменена на реальный URL mockapi
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

