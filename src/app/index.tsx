import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './providers/router';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ConfigProvider locale={ruRU}>
          <AppRouter />
        </ConfigProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

