import React from "react";
import styled from "styled-components";

import { colors, animations } from "../../constant";

const SpinnerStyle = styled.div`
    span {
        display: block;
        border-radius: 50%;
        width: ${(props) => props.height};
        height: ${(props) => props.height};
        border: ${(props) => props.border} solid ${colors.color[9]};
        border-left: ${(props) => props.border} solid ${colors.color[0]};
        animation: ${animations.rotate} 0.5s infinite linear;
    }
`;

const Spinner = ({ height, border }) => {
    return (
        <SpinnerStyle height={height} border={border}>
            <span></span>
        </SpinnerStyle>
    );
};

export default Spinner;
