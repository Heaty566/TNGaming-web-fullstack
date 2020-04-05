import React from "react";
import { colors, animations } from "../../constant";
import styled from "styled-components";

const SpinnerStyle = styled.div`
    span {
        display: block;
        height: ${(props) => props.height};
        width: ${(props) => props.height};
        border-radius: 50%;
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
