import { Modal } from "antd";
import styled from "styled-components";
import React from "react";

const StyledModal = styled(Modal)`
    .ant-modal-content {
        border-radius: 8px;
        padding: 30px 35px;
        display: flex;
        flex-direction: column;
        gap: 16px;

        .ant-modal-header {
            margin-bottom: 0;
        }

        form {
            display: flex;
            flex-direction: column;
           gap: 11px;

            .ant-form-item {
                margin-bottom: 0;
            }
        }

        .ant-modal-footer {
            margin-top: 26px;
        }
    }
`;

export default function ModalComponent(
  props: React.ComponentProps<typeof Modal>,
) {
  return <StyledModal {...props} />;
}
