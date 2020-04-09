import React from "react";
import styled from "styled-components";

import { store } from "../../stores/configStore";
import { updateMessage } from "../../stores/notification";

import { colors, icons, animations, styles } from "../../constant";
const { flexCenter, gridFullMain, noBorderAndOutline, maxHeightWidth, borderR2 } = styles;

const Container = styled.div`
    position: absolute;
    top: 0;
    z-index: 999;
    background: ${colors.rbga};
    
    ${maxHeightWidth}
    ${gridFullMain}
    ${flexCenter}
`;

const CardWrapper = styled.div`
    padding: 32px 85px;
    text-align: center;
    animation: ${animations.fadeIn} 0.5s ease-in-out;
    color: ${colors.fontColor[0]};
    background: ${colors.divBackground[0]};

    ${borderR2}
    & > *:nth-child(2) {
        margin: 45px 0;
    }

    button {
        display: inline-block;
        padding: 10px 35px;
        background: ${colors.buttonBackground[2]};
        color: ${colors.fontColor[0]};

        ${borderR2}
        ${noBorderAndOutline}
        &:active {
            filter: brightness(1.1);
        }
    }
`;

const NotificationUI = ({ content }) => {
    return (
        <Container>
            <CardWrapper>
                <img src={process.env.PUBLIC_URL + icons.logo} alt="logo" />
                <p>{content}</p>
                <button onClick={() => store.dispatch({ type: updateMessage.type, payload: { msg: "", errId: 0 } })}>Go back</button>
            </CardWrapper>
        </Container>
    );
};

export default NotificationUI;
