import React from "react";
import styled from "styled-components";

import { styles, colors } from "../../constant/";
import Loading from "../../components/loading/loading";
const { noBorderAndOutline, borderR2 } = styles;

const Button = styled.button`
    width: 90px;
    font-size: 14px;
    padding: 7px 10px;
    font-weight: bold;
    background: ${colors.buttonBackground[3]};
    color: ${colors.fontColor[0]};
    opacity: ${(props) => (props.disabled ? 0.7 : 1)};
    &:active {
        filter: brightness(1.2);
    }
    ${borderR2};
    ${noBorderAndOutline};
    ${(props) => props.addStyle};
`;

const FormBtn = ({ label, type = "submit", isLoading, isDisable }) => {
    return isLoading ? (
        <Loading height="24px" width="15px" color={colors.buttonBackground[3]} />
    ) : (
        <Button type={type} disabled={isDisable}>
            {label}
        </Button>
    );
};

export default FormBtn;
