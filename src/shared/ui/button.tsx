import {Button} from 'antd';
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled(Button)`
    background-color: #226290;
    color: #EAFFFF;
    border: none;
    letter-spacing: -1%;
    width: min-content;
    padding: 7px 15.5px;
    line-height: 18px;
    &:hover {
        background-color: #1A4E7A;
        color: #EAFFFF;
    }
`;

export default function ButtonComponent(props: React.ComponentProps<typeof Button>) {
  return (
    <StyledButton {...props} />
  );
}