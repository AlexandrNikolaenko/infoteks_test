import { Form } from "antd";
import styled from "styled-components";
import React from "react";

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: end;
    width: 100%;
    .ant-form-item {
        padding-bottom: 0;
    }
`;

export default function FormComponent(props: React.ComponentProps<typeof Form>) {
  return (
    <StyledForm {...props} />
  );
}

export function FormItemComponent(props: React.ComponentProps<typeof Form.Item>) {
  return (
    <Form.Item
        style={{
            paddingBottom: '0',
            width: '100%'
        }} {...props} />
  );
}