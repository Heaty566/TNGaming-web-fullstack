import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";

import ProtectedRouter from "./js/components/routers/protectedRouter";

import Navbar from "./js/containers/Navbar";
import Notification from "./js/containers/notification";
import Login from "./js/containers/login";
import Register from "./js/containers/register";

import { colors } from "./js/constant/";

//waiting for mobile

const ImageMobile = styled.img`
  @media screen and (max-width: 425px) {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-image: url("/pages/images/background-mobile.jpg");
  }
`;
///

const Global = createGlobalStyle`
    body, #root {
        min-height: 100vh;
        background: ${colors.divBackground[1]};
        margin: 0;
        padding: 0;
    }

    #root { 
        font-family: 'Roboto', sans-serif;
        display: grid;
        grid-template-rows: 60px auto;
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
          <ProtectedRouter path="/users/login" component={Login} />
          <ProtectedRouter path="/users/register" component={Register} />
          <Redirect from="/" to="/home" />
        </Switch>

        <Notification />
      </MainStyle>
      <ImageMobile />
    </React.Fragment>
  );
}

export default App;
