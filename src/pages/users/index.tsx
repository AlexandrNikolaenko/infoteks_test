import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getUsers, User } from "shared/api/users";
import { useAuth } from "shared/lib/hooks/useAuth";
import { UserModal } from "widgets/user-modal";
import UserRow from "./ui/user-row";
import ButtonComponent from "shared/ui/button";

const Container = styled.div`
  padding: 17px 34px;
  display: flex;
  max-width: 1200px;
  flex-direction: column;
  gap: 30px;
  margin: 0 auto;
`;

const UsersBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 40px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const UsersTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 882px;
  width: 100%;
`;

export const UsersPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
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

  return (
    <Container>
      <UsersBlock>
        {isLoading ? (
          <Spin
            size="large"
            style={{ display: "block", textAlign: "center", marginTop: 50 }}
          />
        ) : (
          <UsersTable>
            {users.map((user) => (
              <UserRow key={user.id} {...user} handleEditUser={handleEditUser} />
            ))}
          </UsersTable>
        )}
        <ButtonComponent onClick={handleLogout}>Выход</ButtonComponent>
      </UsersBlock>

      <ButtonComponent onClick={handleCreateUser}>
        Создать пользователя
      </ButtonComponent>

      <UserModal
        open={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
        user={editingUser}
      />
    </Container>
  );
};
