import React from "react";
import styled, { keyframes } from "styled-components";

const loadingAnimation = (start, time) => {
    return keyframes`
    ${start}% {
        transform: scale(1.2);
        opacity: 0;
    }

   (${start} + 20)% {
        opacity: 1;
    }
`;
};

const LoadingContainer = styled.div`
    display: flex;

    span {
        margin: 0 2px;
        display: block;
        background: ${(props) => props.color};
        height: ${(props) => props.height};
        width: ${(props) => props.width};
    }

    span:nth-child(1) {
        animation: ${loadingAnimation(20)} 1s infinite;
    }

    span:nth-child(2) {
        animation: ${loadingAnimation(40)} 1s infinite;
    }

    span:nth-child(3) {
        animation: ${loadingAnimation(60)} 1s infinite;
    }
    span:nth-child(4) {
        animation: ${loadingAnimation(80)} 1s infinite;
    }
`;

const Loading = ({ height, width, color }) => {
    return (
        <LoadingContainer height={height} width={width} color={color}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </LoadingContainer>
    );
};

export default Loading;
