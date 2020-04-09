import React from "react";
import styled from "styled-components";

import { styles, colors, animations } from "../../constant/";
const { flexCenter, maxHeightWidth, borderR2 } = styles;

const ErrorStyled = styled.div`
    padding: 7px 10px;
    font-size: 14px;
    transition: 0.2s;
    box-sizing: border-box;
    background-color: ${colors.color[9]};
    color: ${colors.fontColor[0]};
    ${borderR2};
    ${maxHeightWidth};
    ${flexCenter};
    animation: 1s ${animations.fadeIn} ease-out;
    p {
        margin: 0;
        font-weight: 500;
    }

    ${(props) => props.addStyle}
`;

const FormError = ({ value }) => {
    return (
        <ErrorStyled value={value}>
            <p>{value}</p>
        </ErrorStyled>
    );
};

export default FormError;
