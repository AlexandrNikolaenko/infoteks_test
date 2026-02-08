import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Form, notification } from "antd";
import { loginApi } from "shared/api/auth";
import { useAuth } from "shared/lib/hooks/useAuth";
import styled from "styled-components";
import CardComponent from "shared/ui/card";
import InputComponent, { InputPasswordComponent } from "shared/ui/input";
import ButtonComponent from "shared/ui/button";
import { FormItemComponent } from "shared/ui/form";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f0f2f5;
`;

export const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => loginApi(username, password),
    onSuccess: (token) => {
      login(token);
      notification.success({
        message: "Успешная авторизация",
        description: "Вы успешно вошли в систему",
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: "Ошибка авторизации",
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
            display: "flex",
            gap: "16px",
            flexDirection: "column",
            alignItems: "end",
            width: "100%",
          }}
          form={form}
          name="login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <FormItemComponent
            name="username"
            rules={[{ required: true, message: "Введите логин" }]}
          >
            <InputComponent placeholder="Логин" size="large" />
          </FormItemComponent>

          <FormItemComponent
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <InputPasswordComponent placeholder="Пароль" size="large" />
          </FormItemComponent>

          <ButtonComponent
            type="primary"
            htmlType="submit"
            disabled={loginMutation.isPending}
          >
            Войти
          </ButtonComponent>
        </Form>
      </CardComponent>
    </LoginContainer>
  );
};
