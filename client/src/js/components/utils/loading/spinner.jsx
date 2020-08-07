import React from "react";
import styled, { keyframes } from "styled-components";

const Rotate = keyframes`

    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(360deg);
    }
`;

const SpinnerStyle = styled.div`
    span {
        display: block;
        border-radius: 50%;
        width: ${(props) => props.height}px;
        height: ${(props) => props.height}px;
        border: ${(props) => props.border}px solid ${(props) => props.color};
        border-left: ${(props) => props.border}px solid ${(props) => props.borderColor};
        animation: ${Rotate} 0.5s infinite linear;
    }
`;

const Spinner = ({ height, border, color, borderColor }) => {
    return (
        <SpinnerStyle height={height} border={border} color={color} borderColor={borderColor}>
            <span></span>
        </SpinnerStyle>
    );
};

export default Spinner;
