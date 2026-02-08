import { api } from './axios';

export interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

export const getUsers = async (): Promise<User[]> => {
  return api.get('/users').then((response) => response.data);
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  return api.post('/users', user).then((response) => response.data);
};

export const updateUser = async (user: User): Promise<User> => {
  return api.put(`/users/${user.id}`, user).then((response) => response.data);
};

export const deleteUser = async (userId: string): Promise<void> => {
  return api.delete(`/users/${userId}`).then(() => {});
}