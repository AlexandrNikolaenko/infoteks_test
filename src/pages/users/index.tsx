import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button, Table, Avatar, Space, Typography, Spin } from 'antd';
import { LogoutOutlined, UserAddOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getUsers, User } from 'shared/api/users';
import { useAuth } from 'shared/lib/hooks/useAuth';
import { UserModal } from 'widgets/user-modal';
import dayjs from 'dayjs';

const Container = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const UsersPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  // if (!isAuthenticated) {
  //   navigate('/login');
  // }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSuccess = () => {
    handleModalClose();
    refetch();
  };

  const columns = [
    {
      title: 'Аватар',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string, record: User) => (
        <Avatar
          src={avatar}
          size={64}
          style={{ cursor: 'pointer' }}
          onClick={() => handleEditUser(record)}
        />
      ),
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: User) => (
        <Typography.Link onClick={() => handleEditUser(record)}>
          {name}
        </Typography.Link>
      ),
    },
    {
      title: 'Зарегистрирован',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
      render: (date: string) => dayjs(date).format('DD.MM.YYYY'),
    },
  ];

  return (
    <Container>
      <Header>
        <Typography.Title level={2}>Список пользователей</Typography.Title>
        <Space>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={handleCreateUser}
          >
            Создать пользователя
          </Button>
          <Button icon={<LogoutOutlined />} onClick={handleLogout}>
            Выход
          </Button>
        </Space>
      </Header>

      {isLoading ? (
        <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: 50 }} />
      ) : (
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      )}

      <UserModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
        user={editingUser}
      />
    </Container>
  );
};

