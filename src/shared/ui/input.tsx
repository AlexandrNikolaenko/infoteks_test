import styled from "styled-components";
import { Input } from "antd";
import React from "react";

const StyledInput = styled(Input)`
  border-radius: 4px;
  border: 1px solid #A4A4A4;
  padding: 8px 11px;
`;

export default function InputComponent(props: React.ComponentProps<typeof Input>) {
  return <StyledInput {...props} />;
}

export function InputPasswordComponent(props: React.ComponentProps<typeof Input.Password>) {
    return (<Input.Password
        {...props}
        style={{
            borderRadius: '4px',
            border: '1px solid #A4A4A4',
            padding: '8px 11px',
        }}
    />);
}