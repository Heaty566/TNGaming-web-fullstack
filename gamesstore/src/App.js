import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";

import { colors } from "./js/constant/";

import Navbar from "./js/containers/Navbar";
import BuildingFeature from "./js/components/notification/buldingFreature";

const Global = createGlobalStyle`
    body, #root {
        min-height: 100vh;
        background: ${colors.divBackground[1]};
    }

    #root {
        display: grid;
        grid-template-rows: 60px auto;
    }

    *{
     font-family: 'Roboto', sans-serif;
     margin: 0;
     padding: 0;
    }
`;

const HeaderStyle = styled.header`
    background: ${colors.divBackground[2]};
    height: 60px;
    width: 100vw;
    position: fixed;
`;

const MainStyle = styled.div`
    grid-row-start: 2;
    grid-row-end: 3;
    height: 100%;
    display: grid;
    grid-template-columns: 18vw 5fr 18vw;
`;

function App() {
    return (
        <React.Fragment>
            <Global />
            <HeaderStyle>
                <Navbar />
            </HeaderStyle>
            <MainStyle>
                <Switch>
                    <Route path="/building" component={BuildingFeature} />
                    <Redirect from="/" to="/home" />
                </Switch>
            </MainStyle>
        </React.Fragment>
    );
}

export default App;
