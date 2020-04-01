import React from "react";
import styled, { keyframes } from "styled-components";
import { ReactComponent as logo } from "./logo.svg";

const goUp = keyframes`
    50% {
        transform: translateX(50%);
    }

    100% {
        transform: translateX(0);
    }
`;

const goLeft = keyframes`
  100% {
        transform: translate(0);
    }
`;

const StyledLogo = styled(logo)`
    rect {
        opacity: 1;
        animation: ${goUp} 2s forwards;
        transform: translateX(-100px);
    }

    path {
        transform: translateY(200px);
        animation: ${goLeft} 1s forwards 2s;
    }
`;

const Logo = () => {
    return (
        <div>
            <StyledLogo />
        </div>
    );
};

export default Logo;
