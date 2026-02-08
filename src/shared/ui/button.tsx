import { Button } from "antd";
import React from "react";
import styled from "styled-components";

const StyledButton = styled(Button)`
  background-color: #226290;
  color: #eaffff;
  border: none;
  letter-spacing: -1%;
  width: min-content;
  padding: 7px 15.5px;
  line-height: 18px;
  &:hover {
    background-color: #1a4e7a !important;
    color: #eaffff !important;
  }
  &:disabled,
  &:disabled:hover {
    background-color: #a4a4a4 !important;
    color: #ffffff !important;
  }
`;

export default function ButtonComponent(
  props: React.ComponentProps<typeof Button>,
) {
  return <StyledButton {...props} />;
}
