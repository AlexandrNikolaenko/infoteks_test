import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Result
        status="404"
        title="404"
        subTitle="Извините, страница не найдена."
        extra={
          <Button type="primary" onClick={() => navigate('/users')}>
            Вернуться на главную
          </Button>
        }
      />
    </Container>
  );
};

