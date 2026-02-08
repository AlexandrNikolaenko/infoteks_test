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
  border-bottom: 1px solid #F0F0F0;

  &:last-child {
    border-bottom: none;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-fit: cover;
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
    }
}
`;

export default function UserRow({avatar, name, createdAt}: User) {
  return (
    <Row>
        <div className="avatar" style={{ backgroundImage: `url(${avatar})` }} />
        <div className="user__info">
            <Typography.Title level={5}>{name}</Typography.Title>
            <Typography.Text type="secondary">Зарегистрирован {createdAt}</Typography.Text>
        </div>
    </Row>
  );
}