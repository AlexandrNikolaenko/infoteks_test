import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, Button, Card, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginApi } from 'shared/api/auth';
import { useAuth } from 'shared/lib/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CardComponent from 'shared/ui/card';
import InputComponent from 'shared/ui/input';
import ButtonComponent from 'shared/ui/button';
import FormComponent, { FormItemComponent } from 'shared/ui/form';
import FormItem from 'antd/es/form/FormItem';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
`;

const LoginCard = styled(Card)`
  width: 100%;
  max-width: 439px;
  border-radius: 0;
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
      navigate(-1);
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
      <CardComponent title="Авторизация">
      <Form
        style={{
          display: 'flex',
          gap: '16px',
          flexDirection: 'column',
          alignItems: 'end',
          width: '100%',
        }}
        form={form}
        name="login"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <FormItemComponent
          name="username"
          rules={[{ required: true, message: 'Введите логин' }]}
        >
          <InputComponent
            // prefix={<UserOutlined />}
            placeholder="Логин"
            size="large"
          />
        </FormItemComponent>

        <FormItemComponent
          name="password"
          rules={[{ required: true, message: 'Введите пароль' }]}
        >
          <InputComponent
            type="password"
            // prefix={<LockOutlined />}
            placeholder="Пароль"
            size="large"
          />
        </FormItemComponent>

        <ButtonComponent
          type="primary"
          htmlType="submit"
          loading={loginMutation.isPending}
          disabled={loginMutation.isPending}
        >
          Войти
        </ButtonComponent>
      </Form>
      {/* <LoginCard title="Авторизация">
      </LoginCard> */}
      </CardComponent >
    </LoginContainer>
  );
};

