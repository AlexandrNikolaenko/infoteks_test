import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, Button, Card, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginApi } from 'shared/api/auth';
import { useAuth } from 'shared/lib/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
`;

const LoginCard = styled(Card)`
  width: 400px;
`;

export const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: ({ username, password }: { username: string; password: string }) =>
      loginApi(username, password),
    onSuccess: (token) => {
      login(token);
      notification.success({
        message: 'Успешная авторизация',
        description: 'Вы успешно вошли в систему',
      });
      navigate('/users');
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка авторизации',
        description: error.message,
      });
    },
  });

  const onFinish = (values: { username: string; password: string }) => {
    loginMutation.mutate(values);
  };

  return (
    <LoginContainer>
      <LoginCard title="Авторизация">
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Введите логин' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Логин"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Введите пароль' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Пароль"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              loading={loginMutation.isPending}
              disabled={loginMutation.isPending}
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </LoginCard>
    </LoginContainer>
  );
};

