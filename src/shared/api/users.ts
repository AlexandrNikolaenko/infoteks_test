import { api } from './axios';

export interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

// Заглушки для API пользователей
export const getUsers = async (): Promise<User[]> => {
  // Заглушка - возвращаем моковые данные
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
          name: 'Иван Иванов',
          avatar: 'https://via.placeholder.com/100',
          createdAt: '2023-01-15T10:00:00Z',
        },
        {
          id: '2',
          name: 'Мария Петрова',
          avatar: 'https://via.placeholder.com/100',
          createdAt: '2023-02-20T14:30:00Z',
        },
        {
          id: '3',
          name: 'Алексей Сидоров',
          avatar: 'https://via.placeholder.com/100',
          createdAt: '2023-03-10T09:15:00Z',
        },
      ]);
    }, 500);
  });
  
  // Реальный запрос будет выглядеть так:
  // const response = await api.get('/users');
  // return response.data;
};

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  // Заглушка
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now().toString(),
        ...user,
      });
    }, 1000);
  });
  
  // Реальный запрос:
  // const response = await api.post('/users', user);
  // return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  // Заглушка
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(user);
    }, 1000);
  });
  
  // Реальный запрос:
  // const response = await api.put(`/users/${user.id}`, user);
  // return response.data;
};