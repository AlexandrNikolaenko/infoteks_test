import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, updateUser, User } from 'shared/api/users';
import styled from 'styled-components';

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User | null;
}

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 24px;
  }
`;

export const UserModal: React.FC<UserModalProps> = ({
  open,
  onClose,
  user,
  onSuccess,
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      message.success('Пользователь успешно создан');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onSuccess();
    },
    onError: () => {
      message.error('Ошибка при создании пользователя');
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      message.success('Пользователь успешно обновлен');
      queryClient.invalidateQueries({ queryKey: ['users'] });
      onSuccess();
    },
    onError: () => {
      message.error('Ошибка при обновлении пользователя');
    },
  });

  const isEditing = !!user;
  const isLoading = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (isEditing) {
        updateMutation.mutate({ ...values, id: user.id });
      } else {
        createMutation.mutate({
          ...values,
          registeredAt: new Date().toISOString(),
        });
      }
    });
  };

  const handleCancel = () => {
    if (!isLoading) {
      form.resetFields();
      onClose();
    }
  };

  React.useEffect(() => {
    if (open) {
      if (user) {
        form.setFieldsValue({
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          registeredAt: user.registeredAt,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, user, form]);

  return (
    <StyledModal
      title={isEditing ? 'Редактировать пользователя' : 'Создать пользователя'}
      open={open}
      onOk={handleSubmit}
      onCancel={handleCancel}
      okText={isEditing ? 'Сохранить' : 'Создать'}
      cancelText="Отмена"
      okButtonProps={{ loading: isLoading, disabled: isLoading }}
      cancelButtonProps={{ disabled: isLoading }}
      maskClosable={!isLoading}
      closable={!isLoading}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
      >
        {isEditing && (
          <Form.Item
            name="id"
            label="ID"
          >
            <Input disabled />
          </Form.Item>
        )}

        <Form.Item
          name="name"
          label="Имя"
          rules={[
            { required: true, message: 'Введите имя пользователя' },
          ]}
        >
          <Input placeholder="Введите имя" />
        </Form.Item>

        <Form.Item
          name="avatar"
          label="Аватар (URL)"
          rules={[
            { required: true, message: 'Введите URL аватара' },
            {
              type: 'url',
              message: 'Введите корректный URL',
            },
          ]}
        >
          <Input placeholder="https://example.com/avatar.jpg" />
        </Form.Item>

        {isEditing && (
          <Form.Item
            name="registeredAt"
            label="Дата регистрации"
          >
            <Input disabled />
          </Form.Item>
        )}
      </Form>
    </StyledModal>
  );
};

