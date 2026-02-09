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

const StyledFormItem = styled(Form.Item)`
  width: 100%;
  padding-bottom: 0;

  input {
    border-radius: 4px;
  }  
`;

export default function FormComponent(
  props: React.ComponentProps<typeof Form>,
) {
  return <StyledForm {...props} />;
}

export function FormItemComponent(
  props: React.ComponentProps<typeof Form.Item>,
) {
  return (
    <StyledFormItem
      {...props}
    />
  );
}
