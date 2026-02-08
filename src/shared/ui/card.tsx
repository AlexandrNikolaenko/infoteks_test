import { Card } from "antd";
import styled from "styled-components";
import React from "react";

const StyledCard = styled(Card)`
  border-radius: 0;
  padding: 44px 32px;
  width: 100%;
  max-width: 439px;
  font-size: 14px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  gap: 26px;
  display: flex;

  .ant-card-head {
    border-bottom: none;
    padding: 0;
    gap: 0;
    min-height: 0;
  }
  .ant-card-body {
    padding: 0;
  }
`;

export default function CardComponent(
  props: React.ComponentProps<typeof Card>,
) {
  return <StyledCard {...props} />;
}
