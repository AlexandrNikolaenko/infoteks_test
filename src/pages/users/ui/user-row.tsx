import styled from "styled-components";
import React from "react";
import { User } from "shared/api/users";
import { Typography } from "antd";

const Row = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-size: cover;
  }

  .user__info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 14px;

    h5 {
      margin: 0;
      padding: 0;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
    }
  }
`;

export default function UserRow({  handleEditUser, ...user }: User & {handleEditUser: (user: User) => void}) {
  return (
    <Row>
      <div className="avatar" style={{ backgroundImage: `url(${user.avatar})` }} />
      <div className="user__info">
        <Typography.Title onClick={() => handleEditUser(user)} level={5}>{user.name}</Typography.Title>
        <Typography.Text type="secondary">
          Зарегистрирован {user.createdAt}
        </Typography.Text>
      </div>
    </Row>
  );
}
