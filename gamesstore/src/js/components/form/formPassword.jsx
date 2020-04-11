import React, { useState } from "react";
import styled from "styled-components";

import { styles, icons, colors } from "../../constant/";
const { noBorderAndOutline, maxHeightWidth, borderR2, flexBetween } = styles;

const PasswordContainer = styled.div`
    ${maxHeightWidth}
    ${flexBetween}    
    ${borderR2}  
    box-sizing: border-box;
    padding: 7px 10px;
    background: ${colors.divBackground[4]};    
    transition: 0.2s;
    &:focus-within {
        transform: scale(1.02);
    }
`;

const PasswordStyle = styled.input`
    font-size: 14px;

    height: 100%;
    background: none;
    ${maxHeightWidth}
    ${noBorderAndOutline}
  

    ${(props) => props.addStyle}
`;

function FormPassword({ track, ...rest }) {
    const [seen, setSeen] = useState(false);

    return (
        <PasswordContainer>
            <PasswordStyle
                type={seen ? "text" : "password"}
                {...rest}
                ref={track}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
            />

            <img
                src={seen ? icons.visibilityOn : icons.visibilityOff}
                alt="see"
                onClick={() => setSeen(!seen)}
            />
        </PasswordContainer>
    );
}

export default FormPassword;
