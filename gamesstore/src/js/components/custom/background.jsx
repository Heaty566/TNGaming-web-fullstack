import React from "react";
import styled from "styled-components";

import config from "../../../config/frontEndURL.json";

import { styles, colors } from "../../constant/";
const { inheritHeightWidth, maxHeightWidth } = styles;

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    ${maxHeightWidth}
    & > div {
        position: absolute;
        z-index: 1;
        background: ${colors.rbga};

        ${inheritHeightWidth}
    }

    img {
        object-fit: cover;

        ${inheritHeightWidth}
    }
`;

const Background = () => {
    return (
        <Container>
            <div></div>
            <img src={process.env.PUBLIC_URL + config.main.backgroundImagePC} alt="background" />
        </Container>
    );
};

export default Background;
