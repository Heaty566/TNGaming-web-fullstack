import React from "react";
import styled from "styled-components";

import { colors } from "../../constant/";

const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    h2 {
        flex: 1;
        font-size: 24px;
        font-weight: bold;
        color: ${colors.color[7]};
        letter-spacing: 3px;
        text-align: center;
        margin: 0;
    }

    span {
        flex: 1;
        width: 100%;
        display: block;
        border-bottom: 1px solid ${colors.color[7]};
    }

    ${(props) => props.addStyle}
`;

const FormTittle = ({ tittle }) => {
    return (
        <TitleContainer>
            <span></span>
            <h2>{tittle}</h2>
            <span></span>
        </TitleContainer>
    );
};

export default FormTittle;
