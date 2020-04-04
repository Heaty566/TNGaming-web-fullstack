import React from "react";
import "./services/";
import styled, { createGlobalStyle } from "styled-components";
import { colors } from "./js/constant/";

import Navbar from "./js/containers/Navbar";

const Global = createGlobalStyle`
    body, #root {
        min-height: 100vh;
        background: ${colors.divBackground[1]};
    }

    *{
     font-family: 'Roboto', sans-serif;
     margin: 0;
     padding: 0;
    }
`;

const AppStyle = styled.header`
    background: ${colors.divBackground[2]};
    height: 60px;
    width: 100vw;
    position: fixed;
`;

function App() {
    return (
        <React.Fragment>
            <Global />
            <AppStyle>
                <Navbar />
            </AppStyle>
        </React.Fragment>
    );
}

export default App;
