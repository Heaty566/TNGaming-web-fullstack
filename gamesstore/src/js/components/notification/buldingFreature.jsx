import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors, icons } from "../../constant";

const Container = styled.div`
    grid-column-start: 1;
    grid-column-end: 4;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CardWrapper = styled.div`
    border-radius: 2px;
    background: ${colors.divBackground[0]};
    color: ${colors.fontColor[0]};
    padding: 32px 85px;
    text-align: center;
    & > *:nth-child(2) {
        margin: 45px 0;
    }

    a {
        display: inline-block;
        color: ${colors.fontColor[0]};
        text-decoration: none;
        border-radius: 2px;
        padding: 10px 35px;
        background: ${colors.buttonBackground[2]};
        &:active {
            filter: brightness(1.1);
        }
    }
`;

const BuildingFeature = () => {
    return (
        <Container>
            <CardWrapper>
                <img src={process.env.PUBLIC_URL + icons.logo} alt="logo" />
                <p>We are still building this feature.</p>
                <Link to="/home">Go back</Link>
            </CardWrapper>
        </Container>
    );
};

export default BuildingFeature;
