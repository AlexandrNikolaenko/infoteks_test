import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://67dc4306e00db03c406778bd.mockapi.io/api',
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

