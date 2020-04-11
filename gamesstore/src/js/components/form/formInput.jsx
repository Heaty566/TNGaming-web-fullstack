import React from "react";
import styled from "styled-components";

import { styles } from "../../constant/";
const { noBorderAndOutline, maxHeightWidth, borderR2 } = styles;

const InputStyled = styled.input`
    box-sizing: border-box;
    padding: 10px 10px;
    font-size: 14px;
    transition: 0.2s;
    ${borderR2}
    ${maxHeightWidth}
    ${noBorderAndOutline}
    &:focus {
        transform: scale(1.02);
    }
    
    ${(props) => props.addStyle}
`;

const FormInput = ({ type = "text", track, ...rest }) => {
    return (
        <InputStyled
            type={type}
            ref={track}
            {...rest}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
        />
    );
};

export default FormInput;
