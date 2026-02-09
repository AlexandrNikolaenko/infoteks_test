import React from "react";
import { Modal, Form, Input, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser, updateUser, deleteUser, User } from "shared/api/users";
import ModalComponent from "shared/ui/modal";
import styled from "styled-components";
import ButtonComponent from "shared/ui/button";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  user: User | null;
}

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;
// const StyledModal = styled(Modal)`
//   .ant-modal-body {
//     padding: 24px;
//   }
// `;

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
      message.success("Пользователь успешно создан");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess();
    },
    onError: () => {
      message.error("Ошибка при создании пользователя");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      message.success("Пользователь успешно обновлен");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess();
    },
    onError: () => {
      message.error("Ошибка при обновлении пользователя");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      message.success("Пользователь успешно удален");
      queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccess();
    },
    onError: () => {
      message.error("Ошибка при удалении пользователя");
    },
  })

  const isEditing = !!user;
  const isLoading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  const handleDelete = () => {
    if (user) {
      deleteMutation.mutate(user.id);
    }
  };

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
          registeredAt: user.createdAt,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, user, form]);

  return (
    <ModalComponent
      title={isEditing ? "Редактировать пользователя" : "Создать пользователя"}
      open={open}
      onOk={onClose}
      onCancel={onClose}
      okText={isEditing ? "Сохранить" : "Создать"}
      cancelText="Отмена"
      footer={
        <ModalFooter>
          {
            isEditing ? (
            <ButtonComponent
              type="primary"
              onClick={handleDelete}
              disabled={isLoading}
            >
              Удалить
            </ButtonComponent>
          ) : (
            <div></div>
            )
          }
          <div style={{display: 'flex', gap: '8px'}}>
            <ButtonComponent
              key="submit"
              type="primary"
              onClick={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
            >
              {isEditing ? "Сохранить" : "Создать"}
            </ButtonComponent>,
            <ButtonComponent key="cancel" onClick={handleCancel} disabled={isLoading}>
              Отмена
            </ButtonComponent>
          </div>
        </ModalFooter>
      }
      maskClosable={!isLoading}
      closable={!isLoading}
    >
      <Form form={form} layout="vertical" autoComplete="off">
        {isEditing && (
          <Form.Item name="id" label="ID">
            <Input disabled />
          </Form.Item>
        )}

        <Form.Item
          name="name"
          label="Имя"
          rules={[{ required: true, message: "Введите имя пользователя" }]}
        >
          <Input placeholder="Введите имя" />
        </Form.Item>

        <Form.Item
          name="avatar"
          label="Аватар (URL)"
          rules={[
            { required: true, message: "Введите URL аватара" },
            {
              type: "url",
              message: "Введите корректный URL",
            },
          ]}
        >
          <Input placeholder="https://example.com/avatar.jpg" />
        </Form.Item>

        {isEditing && (
          <Form.Item name="registeredAt" label="Дата регистрации">
            <Input disabled />
          </Form.Item>
        )}
      </Form>
    </ModalComponent>
  );
};
