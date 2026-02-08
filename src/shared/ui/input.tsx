import styled from "styled-components";
import { Input } from "antd";
import React from "react";

const StyledInput = styled(Input)`
  border-radius: 4px;
  border: 1px solid #A4A4A4;
  padding: 8px 11px;
  &:focus {
    border-color: #226290;
    box-shadow: 0 0 0 2px rgba(34, 98, 144, 0.2);
  }
`;

export default function InputComponent(props: React.ComponentProps<typeof Input>) {
  return <StyledInput {...props} />;
}